import fs from "node:fs";
import path from "node:path";
import cp from "node:child_process";
import { fileURLToPath } from "node:url";

// Run consistently from any working directory. Uses Git inventory, never node_modules.
process.chdir(fileURLToPath(new URL("../", import.meta.url)));

const files = cp
  .execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard"],
    { encoding: "utf8" },
  )
  .trim()
  .split("\n")
  .filter((p) => p.endsWith(".md"));
const historical = (p) =>
  p.startsWith("docs/audits/") || p.startsWith("docs/archive/");
const slug = (s) =>
  s
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\p{L}\p{N}\p{M}_\-\s]/gu, "")
    .replace(/ /g, "-");
let links = 0,
  json = 0;
const errors = [],
  historicalErrors = [];
for (const p of files) {
  const s = fs.readFileSync(p, "utf8"),
    fail = (x) =>
      (historical(p) ? historicalErrors : errors).push(`${p}: ${x}`);
  let inFence = false;
  for (const line of s.split("\n")) if (/^```/.test(line)) inFence = !inFence;
  if (inFence) fail("unclosed code fence");
  for (const m of s.matchAll(/```json\s*\n([\s\S]*?)```/g)) {
    try {
      JSON.parse(m[1]);
      json++;
    } catch (e) {
      fail("invalid JSON: " + e.message);
    }
  }
  const prose = s.replace(/```[^\n]*\n[\s\S]*?```/g, "");
  for (const m of prose.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    let t = m[1];
    if (/^[a-z][a-z0-9+.-]*:/i.test(t)) continue;
    links++;
    const [f, h] = t.split("#");
    const dest = path.resolve(
      path.dirname(p),
      decodeURIComponent(f || path.basename(p)),
    );
    const actual = f ? dest : path.resolve(p);
    if (!fs.existsSync(actual)) {
      fail(`missing target ${t}`);
      continue;
    }
    if (h && actual.endsWith(".md")) {
      let seen = {};
      const headings = fs
        .readFileSync(actual, "utf8")
        .replace(/```[^\n]*\n[\s\S]*?```/g, "")
        .split("\n")
        .filter((l) => /^#{1,6}\s/.test(l))
        .map((l) => {
          const a = slug(l.replace(/^#+\s+/, ""));
          const n = seen[a] || 0;
          seen[a] = n + 1;
          return a + (n ? "-" + n : "");
        });
      if (!headings.includes(decodeURIComponent(h)))
        fail(`missing anchor ${t}`);
    }
  }
}
const drafts = files.filter((p) => p.startsWith("docs/backlog/"));
if (drafts.length !== 26)
  errors.push("expected 26 backlog files, got " + drafts.length);
for (const p of drafts) {
  const s = fs.readFileSync(p, "utf8");
  for (const x of [
    "DRAFT — Pending owner review",
    "Chủ sở hữu",
    "Mục tiêu",
    "Công việc",
    "File/sản phẩm bắt buộc",
    "Acceptance Criteria",
    "Phụ thuộc",
    "Điều kiện Done",
  ])
    if (!s.includes(x)) errors.push(`${p}: missing ${x}`);
}
console.log(
  JSON.stringify(
    {
      markdownFiles: files.length,
      localLinks: links,
      validJsonExamples: json,
      backlogDrafts: drafts.length,
      errors,
      historicalErrors,
    },
    null,
    2,
  ),
);
if (errors.length) process.exitCode = 1;
