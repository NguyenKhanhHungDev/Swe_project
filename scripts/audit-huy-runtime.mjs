import { createRequire } from "node:module";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const requireBackend = createRequire(path.join(root, "backend", "package.json"));
const modulePath = path.join(root, "backend", "dist", "app.module.js");
if (!existsSync(modulePath)) {
  console.error("Chạy npm.cmd --prefix backend run build trước khi audit runtime.");
  process.exit(1);
}
requireBackend("reflect-metadata");
const { NestFactory } = requireBackend("@nestjs/core");
const request = requireBackend("supertest");
const { AppModule } = requireBackend(modulePath);
const payload = {
  promotionCode: null,
  items: [{ productId: "32cc8746-fbaf-4dc4-9d58-9caf39df1601", sizeCode: "M", qty: 2, toppings: [] }],
};
const checks = [
  { method: "get", route: "/", purpose: "API Hello nền tảng", baseline: true },
  { method: "get", route: "/products", purpose: "Catalog cần cho Cart" },
  { method: "get", route: "/products/32cc8746-fbaf-4dc4-9d58-9caf39df1601", purpose: "Chi tiết món để chọn size/topping" },
  { method: "post", route: "/promotions/validate", body: { code: "BREW10", items: payload.items }, purpose: "UC-08 voucher" },
  { method: "get", route: "/loyalty/me", purpose: "UC-14 số dư điểm" },
  { method: "get", route: "/loyalty/me/transactions", purpose: "Lịch sử điểm đề xuất" },
  { method: "post", route: "/orders", body: payload, purpose: "Tạo đơn cho Cart/BUY_NOW" },
  { method: "post", route: "/payments", body: {}, purpose: "Payment cho lượt mua" },
  { method: "post", route: "/auth/login", body: {}, purpose: "Auth cần cho voucher/đơn/điểm" },
];
const app = await NestFactory.create(AppModule, { logger: false });
try {
  await app.init();
  const results = [];
  for (const check of checks) {
    let call = request(app.getHttpServer())[check.method](check.route);
    if (check.body) call = call.send(check.body);
    const response = await call;
    const outcome = check.baseline
      ? response.status === 200 ? "BASELINE_OK" : "BASELINE_ERROR"
      : response.status === 404 ? "NOT_IMPLEMENTED" : "ROUTE_RESPONDED_NOT_UC_VERIFIED";
    results.push({ method: check.method.toUpperCase(), route: check.route, purpose: check.purpose, status: response.status, outcome });
    console.log(`${check.method.toUpperCase()} ${check.route}: HTTP ${response.status} — ${outcome}`);
  }
  const missing = results.filter((result) => result.outcome === "NOT_IMPLEMENTED").length;
  const output = path.join(root, "docs", "audits", "huy-runtime-results.json");
  mkdirSync(path.dirname(output), { recursive: true });
  writeFileSync(output, JSON.stringify({ scope: "Swe_project current NestJS AppModule, no database mutation", results, missingRoutes: missing, ucComplianceVerified: false }, null, 2) + "\n");
  console.log(`Audit: ${missing} route nghiệp vụ chưa triển khai. HTTP khác 404 cũng chưa chứng minh UC đạt.`);
  if (missing || results.some((result) => result.outcome === "BASELINE_ERROR")) process.exitCode = 1;
} finally {
  await app.close();
}
