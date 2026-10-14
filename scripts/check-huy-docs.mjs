import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const files = ["docs/api/cart.md", "docs/api/promotions-loyalty.md", "README.md"];
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
let jsonCount = 0;
let linkCount = 0;
let tableCount = 0;
function validateObject(value) {
  if (Array.isArray(value)) { value.forEach(validateObject); return; }
  if (!value || typeof value !== "object") return;
  for (const [key, field] of Object.entries(value)) {
    if (["id", "lineId", "productId", "toppingId", "orderId"].includes(key) && field !== null) {
      assert.equal(typeof field, "string"); assert.match(field, uuid);
    }
    if (key.endsWith("Vnd")) assert.ok(Number.isSafeInteger(field) && field >= 0);
    if (key === "qty") assert.ok(Number.isInteger(field) && field >= 1 && field <= 99);
    if (key === "quantity") assert.ok(Number.isInteger(field) && field >= 1 && field <= 3);
    if (key === "sizeCode") assert.ok(["S", "M", "L"].includes(field));
    validateObject(field);
  }
  if (value.error) {
    assert.deepEqual(Object.keys(value).sort(), ["error"]);
    assert.equal(typeof value.error.code, "string");
    assert.equal(typeof value.error.message, "string");
    assert.ok(Array.isArray(value.error.details));
    value.error.details.forEach((detail) => {
      assert.equal(typeof detail.field, "string");
      assert.equal(typeof detail.code, "string");
      assert.equal(typeof detail.message, "string");
    });
  }
  if (Object.hasOwn(value, "subtotalVnd") && Object.hasOwn(value, "totalVnd")) {
    assert.equal(value.totalVnd, value.subtotalVnd - value.discountVnd);
  }
  if (value.unitPriceVnd !== undefined && value.lineTotalVnd !== undefined) {
    assert.equal(value.lineTotalVnd, value.unitPriceVnd * value.qty);
  }
}
for (const relative of files) {
  const file = path.join(root, relative);
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(/```json\s*([\s\S]*?)```/g)) {
    validateObject(JSON.parse(match[1])); jsonCount++;
  }
  for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    if (/^https?:/.test(match[1])) continue;
    const target = match[1].split("#")[0];
    if (target) assert.ok(existsSync(path.resolve(path.dirname(file), target)), `${relative}: missing ${target}`);
    linkCount++;
  }
  let columns = null;
  let insideFence = false;
  for (const line of text.split(/\r?\n/)) {
    if (line.startsWith("```")) { insideFence = !insideFence; columns = null; continue; }
    if (!insideFence && line.startsWith("|")) {
      const count = line.split("|").length - 2;
      if (columns === null) { columns = count; tableCount++; }
      else assert.equal(count, columns, `${relative}: inconsistent table: ${line}`);
    } else columns = null;
  }
}
// Price fixture follows ProductDetail: full M price + two portions, not S + M.
assert.equal((35000 + 2 * 5000) * 2, 90000);
assert.equal(Math.min(Math.floor(90000 * 10 / 100), 20000, 90000), 9000);
assert.equal(Math.floor(81000 / 10000), 8);
console.log(`Đạt: ${jsonCount} JSON, ${linkCount} link nội bộ, ${tableCount} bảng; UUID/DTO/giá ví dụ hợp lệ.`);
