import { readFileSync, readdirSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const v5 = read("../src/app/bahar-v5.css");
const legacy = read("../src/app/globals.css");
const root = read("../src/app/layout.tsx");
const shell = read("../src/components/app-shell/app-shell.tsx");
const bits = read("../src/components/shared/bits.tsx");
const design = read("../docs/design-system-v5.md");
const catalog = read("../docs/component-catalog-v5.md");
const rebuild = read("../docs/ui-rebuild-v5.md");
const fontLoader = read("../src/app/fonts.ts");
const uiFiles = readdirSync(new URL("../src/components/ui", import.meta.url), { withFileTypes: true })
  .filter(entry => entry.isFile() && entry.name.endsWith(".tsx"))
  .map(entry => entry.name);

const checks = [
  ["V5 stylesheet is imported after global CSS", root.indexOf('import "./globals.css";') < root.indexOf('import "./bahar-v5.css";')],
  ["V5 is activated on the root document", root.includes('data-bahar-ui="v5"')],
  ["Light canvas and surfaces match the specification", v5.includes("--v5-canvas:#f5f7f5") && v5.includes("--v5-surface:#fff")],
  ["Dark canvas and surfaces match the specification", v5.includes("--v5-canvas:#0b1510") && v5.includes("--v5-surface:#111f17")],
  ["Original Spring brand anchor is preserved", v5.includes("--v5-spring:#00825e")],
  ["Original Blossom brand anchor is preserved", v5.includes("--v5-blossom:#e5548b")],
  ["Light and dark semantic state tokens exist", ["--v5-success-bg","--v5-warning-bg","--v5-danger-bg","--v5-info-bg"].every(token => v5.includes(token))],
  ["Legacy utility aliases are mapped to V5 tokens", ["--ink:var(--v5-text)","--steel:var(--v5-secondary)","--hairline:var(--v5-border)","--cloud:var(--v5-muted)"].every(token => v5.includes(token))],
  ["Arad remains the only font family in font faces", [...legacy.matchAll(/@font-face\s*\{[^}]*font-family:\s*([^;]+);/gs)].every(match => match[1].trim() === '"Arad"')],
  ["Arad self-hosted weights are present", ["Light","Regular","Medium","SemiBold","Bold","ExtraBold"].every(weight => legacy.includes("AradFD-" + weight + ".woff2"))],
  ["No external font loader is used", !/next\/font|Vazirmatn|Manrope|Inter/.test(fontLoader)],
  ["All 49 UI primitive files are present", uiFiles.length === 49],
  ["Shared PageHeader and KPI primitives use V5 hooks", bits.includes("data-bahar-page-heading") && bits.includes("data-bahar-kpi")],
  ["Shared loading, empty and error states are present", ["bahar-loading-state","bahar-empty-state","role=\"alert\""].every(token => bits.includes(token))],
  ["Sidebar and active navigation hooks are styled", shell.includes("data-bahar-sidebar") && shell.includes("data-bahar-nav-link") && v5.includes("[data-bahar-nav-link]")],
  ["Desktop and mobile topbars use V5 styling", shell.includes("data-bahar-topbar") && shell.includes("data-bahar-mobile-topbar") && v5.includes("[data-bahar-mobile-topbar]")],
  ["Main content hook is connected", shell.includes("data-bahar-main") && v5.includes("#main-content")],
  ["Design specification is complete and versioned", design.includes("سیستم طراحی بهار — V5") && design.includes("Definition of Done")],
  ["Component catalog documents school-domain components", catalog.includes("AttendanceRegister") && catalog.includes("FeeInvoice")],
  ["Route inventory and migration status are documented", rebuild.includes("موجودی دقیق routeهای پنل") && rebuild.includes("۱۴۴") || /تعداد route pageهای موجود/.test(rebuild)],
  ["V4 docs are not the active source of truth", read("../DESIGN.md").includes("V5")],
];

for (const [label, passed] of checks) console.log(`${passed ? "✓" : "✗"} ${label}`);
const failed = checks.filter(([, passed]) => !passed);
console.log(`Bahar V5 design-system integrity: ${checks.length - failed.length}/${checks.length} checks passed.`);
if (failed.length) process.exitCode = 1;
