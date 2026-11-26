import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const css = read("../src/app/globals.css");
const shell = read("../src/components/app-shell/app-shell.tsx");
const button = read("../src/components/ui/button.tsx");
const dashboardStat = read("../src/components/bahar/dashboard/stat-card.tsx");
const design = read("../docs/design-system-v4.md");
const catalog = read("../docs/component-catalog-v4.md");
const fontLoader = read("../src/app/fonts.ts");
const layout = read("../src/app/layout.tsx");

const checks = [
  ["V4 theme layer exists", css.includes("BAHAR / VISUAL SYSTEM 4.0")],
  ["Light canvas token matches V4", css.includes("--bahar-canvas: #f5f7f5")],
  ["Dark canvas token matches V4", css.includes("--bahar-canvas: #0b1510")],
  ["Original spring green is preserved", css.includes("--spring: #00825e")],
  ["Original blossom pink is preserved", css.includes("--blossom: #e5548b")],
  ["Spring tonal scale is exposed", css.includes("--spring-950: #08251d") && css.includes("--color-spring-950: var(--spring-950)")],
  ["Blossom tonal scale is exposed", css.includes("--blossom-900: #581a37") && css.includes("--color-blossom-900: var(--blossom-900)")],
  ["Arad is the only declared font family", [...css.matchAll(/font-family\s*:\s*([^;]+);/g)].every(match => match[1].trim() === '"Arad"' || match[1].trim() === "var(--font-sans)") && [...css.matchAll(/@font-face\s*\{[^}]*font-family:\s*([^;]+);/gs)].every(match => match[1].trim() === '"Arad"')],
  ["Arad self-hosted weights are present", ["Light","Regular","Medium","SemiBold","Bold","ExtraBold"].every(weight => css.includes("AradFD-" + weight + ".woff2"))],
  ["External font loader is removed", !/next\/font|Vazirmatn/.test(fontLoader)],
  ["Root layout has no secondary font class", !/vazirmatn|Manrope|font-family/i.test(layout)],
  ["V4 design specification is present", design.includes("نسخهٔ 4.0") && design.includes("تنها خانوادهٔ فونت مجاز")],
  ["V4 component catalog is present", catalog.includes("کاتالوگ کامپوننت‌های بهار") && catalog.includes("AttendanceRegister")],
  ["Sidebar hook is connected", shell.includes("data-bahar-sidebar") && css.includes("[data-bahar-sidebar]")],
  ["Desktop topbar hook is connected", shell.includes("data-bahar-topbar") && css.includes("[data-bahar-topbar]")],
  ["Mobile topbar hook is connected", shell.includes("data-bahar-mobile-topbar") && css.includes("[data-bahar-mobile-topbar]")],
  ["Navigation active-state hook is connected", shell.includes("data-bahar-nav-link") && css.includes("[data-bahar-nav-link]")],
  ["Main content hook is connected", shell.includes("data-bahar-main")],
  ["Dashboard KPI icon exposes its tone", dashboardStat.includes("data-bahar-kpi-icon") && css.includes("[data-bahar-kpi-icon]")],
  ["Semantic KPI tones are exposed", /data-tone=\{tone\}/.test(read("../src/components/shared/bits.tsx"))],
  ["Explicit primary button variant exists", /primary:\s*"bg-primary/.test(button)],
  ["No malformed legacy topbar selector remains", !/\[data-bahar-shell\]\s*>\s*\.flex-1\s*>\s*div\s*>\s*header\s*,\s*(background|min-height):/.test(css)],
];

for (const [label, passed] of checks) {
  console.log(`${passed ? "✓" : "✗"} ${label}`);
}

const failed = checks.filter(([, passed]) => !passed);
console.log(`Bahar V4 design-system integrity: ${checks.length - failed.length}/${checks.length} checks passed.`);
if (failed.length) process.exitCode = 1;
