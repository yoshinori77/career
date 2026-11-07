import { execFile } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const outputs = [
  {
    sourcePath: resolve(repoRoot, "docs/index.md"),
    htmlPath: resolve(repoRoot, "tmp/resume-print.html"),
    pdfPath: resolve(repoRoot, "職務経歴書.pdf"),
    copies: [resolve(repoRoot, "README.pdf")],
    title: "職務経歴書 - 山下慶倫",
  },
  {
    sourcePath: resolve(repoRoot, "docs/short.md"),
    htmlPath: resolve(repoRoot, "tmp/resume-short-print.html"),
    pdfPath: resolve(repoRoot, "職務経歴書_短縮版.pdf"),
    copies: [],
    title: "職務経歴書 短縮版 - 山下慶倫",
  },
];

const chromeCandidates = [
  process.env.CHROME_PATH,
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
];

const chromePath = chromeCandidates.find(path => path && existsSync(path));
if (!chromePath) {
  throw new Error("Chrome executable was not found.");
}

for (const output of outputs) {
  mkdirSync(dirname(output.htmlPath), { recursive: true });

  const source = readFileSync(output.sourcePath, "utf8");
  const bodyMarkdown = extractPrintableMarkdown(source);
  const contentHtml = renderMarkdown(bodyMarkdown);
  const html = renderPage(contentHtml, output.title);
  writeFileSync(output.htmlPath, html, "utf8");

  await printPdf(chromePath, output.htmlPath, output.pdfPath);
  console.log(`Wrote ${output.pdfPath}`);

  for (const copyPath of output.copies) {
    copyFileSync(output.pdfPath, copyPath);
    console.log(`Wrote ${copyPath}`);
  }
}

function extractPrintableMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  let inFrontMatter = lines[0]?.trim() === "---";
  let frontMatterDone = !inFrontMatter;
  let started = false;
  let inWebCareerCard = false;
  const out = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (index === 0 && inFrontMatter) continue;
    if (!frontMatterDone && inFrontMatter) {
      if (line.trim() === "---") {
        inFrontMatter = false;
        frontMatterDone = true;
      }
      continue;
    }
    // Web-only company cards keep the printed Markdown and layout unchanged.
    if (line === '<section class="career-entry" markdown="block">') {
      inWebCareerCard = true;
      continue;
    }
    if (inWebCareerCard && line === "</section>") {
      inWebCareerCard = false;
      continue;
    }
    if (line.startsWith("<div class=\"print-note\"")) break;
    if (line.startsWith("## プロフィール")) started = true;
    if (started) out.push(line);
  }

  return out.join("\n").trim();
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let listOpen = false;
  let paragraph = [];
  let topSectionOpen = false;
  let roleSectionOpen = false;
  let jobBlockOpen = false;

  const closeParagraph = () => {
    if (paragraph.length === 0) return;
    html.push(`<p>${inline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const closeList = () => {
    if (!listOpen) return;
    html.push("</ul>");
    listOpen = false;
  };
  const closeJobBlock = () => {
    if (!jobBlockOpen) return;
    closeParagraph();
    closeList();
    html.push("</section>");
    jobBlockOpen = false;
  };
  const closeRoleSection = () => {
    closeJobBlock();
    if (!roleSectionOpen) return;
    closeParagraph();
    closeList();
    html.push("</section>");
    roleSectionOpen = false;
  };
  const closeTopSection = () => {
    closeRoleSection();
    if (!topSectionOpen) return;
    closeParagraph();
    closeList();
    html.push("</section>");
    topSectionOpen = false;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      closeParagraph();
      closeList();
      continue;
    }
    if (line === "---") {
      closeRoleSection();
      html.push("<hr>");
      continue;
    }

    const heading = line.match(/^(#{2,5})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const rawText = heading[2];
      const text = inline(rawText);
      closeParagraph();
      closeList();

      if (level === 2) {
        closeTopSection();
        const sectionClass = rawText === "職務経歴" ? "section section-l2 career-section" : "section section-l2";
        html.push(`<section class="${sectionClass}"><h2>${text}</h2>`);
        topSectionOpen = true;
      } else if (level === 3) {
        closeRoleSection();
        html.push(`<section class="role-section"><h3>${text}</h3>`);
        roleSectionOpen = true;
      } else if (level === 4) {
        closeJobBlock();
        html.push(`<section class="job-block"><h4>${text}</h4>`);
        jobBlockOpen = true;
      } else {
        html.push(`<h${level}>${text}</h${level}>`);
      }
      continue;
    }

    if (line.startsWith("- ")) {
      closeParagraph();
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }

    paragraph.push(line);
  }

  closeTopSection();
  return html.join("\n");
}

function inline(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderPage(contentHtml, title) {
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<style>
@page {
  size: A4;
  margin: 12mm 12mm 13mm;
}

* {
  box-sizing: border-box;
}

body {
  color: #1f2933;
  font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", "YuGothic", "Noto Sans JP", sans-serif;
  font-size: 9.8pt;
  line-height: 1.38;
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

.resume-header {
  border-bottom: 2px solid #147a4d;
  margin-bottom: 7mm;
  padding-bottom: 4mm;
}

.resume-header__top {
  align-items: end;
  display: flex;
  gap: 10mm;
  justify-content: space-between;
}

h1 {
  color: #111827;
  font-size: 20pt;
  letter-spacing: 0;
  line-height: 1.15;
  margin: 0;
}

.resume-header__role {
  color: #147a4d;
  font-size: 11pt;
  font-weight: 700;
  margin-top: 1.5mm;
}

.resume-header__meta {
  color: #4b5563;
  font-size: 9pt;
  text-align: right;
}

.resume-header__links {
  color: #374151;
  display: flex;
  flex-wrap: wrap;
  font-size: 8.8pt;
  gap: 2mm 5mm;
  margin-top: 3mm;
}

h2,
h3,
h4,
h5 {
  break-after: avoid;
  color: #147a4d;
  letter-spacing: 0;
}

h2 {
  border-bottom: 1px solid #d9e2dc;
  font-size: 14pt;
  margin: 6mm 0 3mm;
  padding-bottom: 1.2mm;
}

h3 {
  color: #0f5132;
  font-size: 12pt;
  margin: 5mm 0 2.2mm;
}

h4 {
  color: #111827;
  font-size: 10.8pt;
  margin: 3mm 0 1.8mm;
}

h5 {
  color: #147a4d;
  font-size: 9.5pt;
  margin: 2.4mm 0 1mm;
}

p {
  margin: 0 0 2.2mm;
}

ul {
  break-inside: avoid;
  margin: 0 0 2.4mm 4.5mm;
  padding: 0;
}

li {
  break-inside: avoid;
  margin: 0 0 0.8mm;
  padding-left: 0.5mm;
}

hr {
  border: 0;
  border-top: 1px solid #e5e7eb;
  margin: 4mm 0;
}

.role-section,
.job-block {
  break-inside: avoid;
}

.role-section {
  border-top: 1px solid #eef2ef;
  padding-top: 1mm;
}

.career-section > .role-section {
  background: #f7fbf8;
  border: 1px solid #e4efe8;
  border-left: 3px solid #b8dec8;
  border-radius: 3mm;
  margin: 0 0 4mm;
  padding: 3mm 3.5mm 2.6mm 4mm;
}

.career-section > .role-section > h3 {
  margin-top: 0;
}

.job-block {
  margin: 0 0 3mm;
  padding: 0;
}

.job-block h4 {
  border-top: 1px solid #d9e9df;
  color: #0f5132;
  margin: 3mm 0 1.8mm;
  padding-top: 2mm;
}

.job-block:first-of-type h4 {
  border-top: 0;
  margin-top: 0;
  padding-top: 0;
}

.section-l2:first-of-type h2 {
  margin-top: 0;
}

.career-section {
  break-before: auto;
}

.career-section > .role-section {
  break-inside: auto;
}

.career-section .role-section:first-of-type .job-block {
  break-inside: avoid;
}

strong {
  color: #111827;
  font-weight: 700;
}
</style>
</head>
<body>
<header class="resume-header">
  <div class="resume-header__top">
    <div>
      <h1>山下 慶倫 / Yoshinori Yamashita</h1>
      <div class="resume-header__role">データエンジニア・データアナリスト</div>
    </div>
    <div class="resume-header__meta">押上在住 / 35歳</div>
  </div>
  <div class="resume-header__links">
    <span>X: https://x.com/50kaitenzlove</span>
    <span>GitHub: https://github.com/yoshinori77</span>
    <span>GitHub Pages: https://yoshinori77.github.io/career/</span>
  </div>
</header>
${contentHtml}
</body>
</html>`;
}

async function printPdf(chromePath, inputHtml, outputPdf) {
  const buildDir = mkdtempSync(resolve(repoRoot, "tmp/pdf-build-"));
  const freshPdf = resolve(buildDir, "output.pdf");
  try {
    const args = [
      "--headless=new",
      ...(process.getuid?.() === 0 ? ["--no-sandbox"] : []),
      "--disable-gpu",
      "--no-first-run",
      "--no-pdf-header-footer",
      `--user-data-dir=${resolve(buildDir, "profile")}`,
      `--print-to-pdf=${freshPdf}`,
      pathToFileURL(inputHtml).href,
    ];
    await new Promise((resolvePrint, rejectPrint) => {
      execFile(chromePath, args, { timeout: 20000 }, error => error ? rejectPrint(error) : resolvePrint());
    });
    const pdf = readFileSync(freshPdf);
    if (!pdf.subarray(0, 5).equals(Buffer.from("%PDF-")) || !pdf.subarray(-32).includes(Buffer.from("%%EOF"))) {
      throw new Error("Chrome did not produce a complete PDF.");
    }
    renameSync(freshPdf, outputPdf);
  } finally {
    rmSync(buildDir, { recursive: true, force: true });
  }
}
