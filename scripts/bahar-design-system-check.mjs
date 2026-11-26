import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const css = read("../src/app/globals.css");
const shell = read("../src/components/app-shell/app-shell.tsx");
const button = read("../src/components/ui/button.tsx");
const dashboardStat = read("../src/components/bahar/dashboard/stat-card.tsx");
const design = read("../docs/design-language.md");

const checks = [
  ["V3.1 token layer exists", css.includes("BAHAR / VISUAL SYSTEM 3.1")],
  ["Light canvas token exists", css.includes("--bahar-canvas: #f4f7f4")],
  ["Dark canvas token exists", css.includes("--bahar-canvas: #0c1511")],
  ["Original spring green is preserved", css.includes("--spring: #00825e")],
  ["Original blossom pink is preserved", css.includes("--blossom: #e5548b")],
  ["Sidebar hook is connected", shell.includes("data-bahar-sidebar") && css.includes("[data-bahar-sidebar]")],
  ["Desktop topbar hook is connected", shell.includes("data-bahar-topbar") && css.includes("[data-bahar-topbar]")],
  ["Mobile topbar hook is connected", shell.includes("data-bahar-mobile-topbar") && css.includes("[data-bahar-mobile-topbar]")],
  ["Navigation active-state hook is connected", shell.includes("data-bahar-nav-link") && css.includes("[data-bahar-nav-link]")],
  ["Semantic KPI tones are exposed", /data-tone=\{tone\}/.test(read("../src/components/shared/bits.tsx"))],
  ["Explicit primary button variant exists", /primary:\s*"bg-primary/.test(button)],
  ["Design guide is versioned 3.1", design.includes("نسخهٔ 3.1")],
  ["No malformed legacy topbar selector remains", !/\[data-bahar-shell\]\s*>\s*\.flex-1\s*>\s*div\s*>\s*header\s*,\s*(background|min-height):/.test(css)],
  ["Design guide avoids naming reference brands", !/Meta Design|Magic UI|Scrolltide/.test(design)],
];

for (const [label, passed] of checks) {
  console.log(`${passed ? "✓" : "✗"} ${label}`);
}

const failed = checks.filter(([, passed]) => !passed);
console.log(`Bahar design-system integrity: ${checks.length - failed.length}/${checks.length} checks passed.`);
if (failed.length) process.exitCode = 1;
