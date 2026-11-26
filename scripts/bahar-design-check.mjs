// Bahar design-system audit.
// Read-only report by default; use --strict to fail on violations.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../src/app/app", import.meta.url));

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (path.endsWith(".tsx")) out.push(path);
  }
  return out;
}

function scanTags(source, name) {
  const tags = [];
  let cursor = 0;
  while (cursor < source.length) {
    const start = source.indexOf("<" + name, cursor);
    if (start < 0) break;
    const afterName = start + name.length + 1;
    if (afterName < source.length && ![" ", "\t", "\n", "/", ">"].includes(source[afterName])) {
      cursor = afterName;
      continue;
    }
    let depth = 0;
    let quote = "";
    let end = afterName;
    for (; end < source.length; end++) {
      const char = source[end];
      if (quote) {
        if (char === quote && source[end - 1] !== "\\") quote = "";
      } else if (char === '"' || char === "'") quote = char;
      else if (char === "{") depth++;
      else if (char === "}") depth = Math.max(0, depth - 1);
      else if (char === ">" && depth === 0) {
        tags.push(source.slice(start, end + 1));
        break;
      }
    }
    cursor = end + 1;
  }
  return tags;
}

const rootPages = new Set(["tv/page.tsx", "messages/page.tsx"]);
const files = walk(ROOT);
const report = [];

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const page = relative(ROOT, file).replaceAll("\\", "/");
  const violations = [];

  if (page.endsWith("page.tsx") && !source.includes("PageHeader") && !rootPages.has(page)) {
    violations.push("page has no shared PageHeader");
  }

  const rawButtons = scanTags(source, "button").filter((tag) =>
    tag.includes("className") &&
    !["b-btn", "Button", "aria-label", "b-option"].some((token) => tag.includes(token))
  );
  if (rawButtons.length) violations.push(`unstyled native buttons: ${rawButtons.length}`);

  const rawInputs = scanTags(source, "input").filter((tag) =>
    !tag.includes("b-input") &&
    !/type=["'](checkbox|radio|hidden|file|color|time)["']/.test(tag)
  );
  if (rawInputs.length) violations.push(`inputs without shared input styling: ${rawInputs.length}`);

  const rawSelects = scanTags(source, "select").filter((tag) => !tag.includes("b-input"));
  if (rawSelects.length) violations.push(`native selects without shared styling: ${rawSelects.length}`);

  const hardcodedColors = [...source.matchAll(/#[0-9a-fA-F]{3,8}\\b/g)].map((match) => match[0]);
  if (hardcodedColors.length) violations.push(`hard-coded colors: ${[...new Set(hardcodedColors)].join(", ")}`);

  report.push({ page, violations });
}

const failed = report.filter((row) => row.violations.length);
if (process.argv.includes("--json")) {
  process.stdout.write(JSON.stringify({ scanned: report.length, flagged: failed.length, results: failed }, null, 2) + "\\n");
} else {
  console.log(`Bahar UI audit: ${report.length} pages scanned, ${failed.length} flagged.`);
  for (const row of failed) console.log(`- ${row.page}: ${row.violations.join("; ")}`);
}

if (process.argv.includes("--strict") && failed.length) process.exitCode = 1;
