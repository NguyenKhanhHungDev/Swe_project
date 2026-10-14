import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const jarIndex = process.argv.indexOf("--jar");
const jar = jarIndex >= 0
  ? process.argv[jarIndex + 1]
  : process.env.PLANTUML_JAR || path.join(root, "tools", "plantuml", "plantuml.jar");
if (!jar || !existsSync(jar)) {
  console.error("Thiếu PlantUML JAR. Dùng node scripts/huy-diagrams.mjs --jar <đường dẫn JAR>.");
  process.exit(1);
}
const files = [
  "cart/01-add-item.puml", "cart/02-update-remove-item.puml",
  "promotions-loyalty/01-apply-voucher.puml", "promotions-loyalty/02-use-loyalty-points.puml",
].map((file) => path.join(root, "docs", "diagrams", "sequence", file));
for (const file of files) {
  if (!existsSync(file)) throw new Error(`Thiếu sơ đồ ${file}`);
  const code = readFileSync(file, "utf8");
  if (!code.includes("activate ") || !code.includes("deactivate ")) {
    throw new Error(`Thiếu thanh kích hoạt trong ${file}`);
  }
}
for (const mode of ["-checkonly", "-tsvg"]) {
  const result = spawnSync("java", ["-Djava.awt.headless=true", "-jar", path.resolve(jar), "-charset", "UTF-8", mode, ...files], {
    cwd: root, stdio: "inherit", shell: false,
  });
  if (result.error) { console.error(result.error.message); process.exit(1); }
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log("Đã kiểm tra và xuất 4 SVG của Huy từ PlantUML.");
