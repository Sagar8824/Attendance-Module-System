const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  PageBreak, TabStopPosition, TabStopType, Header, Footer, PageNumber,
  NumberFormat
} = require("docx");

const md = fs.readFileSync("Chapters_Only.md", "utf-8");
const lines = md.split(/\r?\n/);

const children = [];
let inCodeBlock = false;
let codeLines = [];
let inTable = false;
let tableRows = [];
let tableHeader = false;

const FONT = "Times New Roman";
const FONT_SIZE = 24; // 12pt in half-points
const H1_SIZE = 32;   // 16pt
const H2_SIZE = 28;   // 14pt
const H3_SIZE = 26;   // 13pt
const H4_SIZE = 24;   // 12pt
const CODE_FONT = "Consolas";

function cleanText(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function makeRuns(text) {
  const runs = [];
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith("**") && part.endsWith("**")) {
      runs.push(new TextRun({ text: part.slice(2, -2), bold: true, font: FONT, size: FONT_SIZE }));
    } else if (part.startsWith("`") && part.endsWith("`")) {
      runs.push(new TextRun({ text: part.slice(1, -1), font: CODE_FONT, size: FONT_SIZE - 2 }));
    } else {
      const clean = part.replace(/\*(.+?)\*/g, "$1").replace(/\[(.+?)\]\(.+?\)/g, "$1").replace(/<[^>]+>/g, "");
      if (clean) runs.push(new TextRun({ text: clean, font: FONT, size: FONT_SIZE }));
    }
  }
  return runs;
}

function flushTable() {
  if (tableRows.length === 0) return;
  const filteredRows = tableRows.filter(r => !r.every(c => c.match(/^[-:]+$/)));
  if (filteredRows.length === 0) { tableRows = []; inTable = false; return; }

  const colCount = Math.max(...filteredRows.map(r => r.length));
  const colWidth = Math.floor(9000 / colCount);

  const docRows = filteredRows.map((row, ri) => {
    const cells = [];
    for (let ci = 0; ci < colCount; ci++) {
      const cellText = (row[ci] || "").trim();
      cells.push(new TableCell({
        children: [new Paragraph({
          children: ri === 0
            ? [new TextRun({ text: cleanText(cellText), bold: true, font: FONT, size: FONT_SIZE - 2 })]
            : makeRuns(cellText).map(r => { r.size = FONT_SIZE - 2; return r; }),
          spacing: { before: 40, after: 40 },
        })],
        width: { size: colWidth, type: WidthType.DXA },
        shading: ri === 0 ? { type: ShadingType.SOLID, color: "D9E2F3" } : undefined,
        margins: { top: 40, bottom: 40, left: 80, right: 80 },
      }));
    }
    return new TableRow({ children: cells });
  });

  children.push(new Table({
    rows: docRows,
    width: { size: 9000, type: WidthType.DXA },
  }));
  children.push(new Paragraph({ spacing: { after: 120 } }));
  tableRows = [];
  inTable = false;
}

function flushCode() {
  if (codeLines.length === 0) return;
  for (const cl of codeLines) {
    children.push(new Paragraph({
      children: [new TextRun({ text: cl || " ", font: CODE_FONT, size: FONT_SIZE - 4 })],
      spacing: { before: 0, after: 0 },
      shading: { type: ShadingType.SOLID, color: "F2F2F2" },
      indent: { left: 360 },
    }));
  }
  children.push(new Paragraph({ spacing: { after: 120 } }));
  codeLines = [];
  inCodeBlock = false;
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Code blocks
  if (line.trim().startsWith("```")) {
    if (inCodeBlock) { flushCode(); }
    else { if (inTable) flushTable(); inCodeBlock = true; }
    continue;
  }
  if (inCodeBlock) { codeLines.push(line); continue; }

  // Table rows
  if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
    if (!inTable) inTable = true;
    const cells = line.split("|").slice(1, -1);
    tableRows.push(cells);
    continue;
  } else if (inTable) {
    flushTable();
  }

  const trimmed = line.trim();

  // Skip HTML div tags and hr
  if (trimmed.startsWith("<div") || trimmed.startsWith("</div") || trimmed === "<br/>" || trimmed === "<br>") continue;
  if (trimmed === "---") {
    children.push(new Paragraph({ children: [], spacing: { after: 200 } }));
    continue;
  }

  // Empty line
  if (!trimmed) {
    continue;
  }

  // Headings
  if (trimmed.startsWith("# ")) {
    const text = cleanText(trimmed.slice(2));
    children.push(new Paragraph({
      children: [new TextRun({ text, bold: true, font: FONT, size: H1_SIZE })],
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 360, after: 200 },
      alignment: text.length < 50 ? AlignmentType.CENTER : AlignmentType.LEFT,
    }));
    continue;
  }
  if (trimmed.startsWith("## ")) {
    const text = cleanText(trimmed.slice(3));
    children.push(new Paragraph({
      children: [new TextRun({ text, bold: true, font: FONT, size: H2_SIZE })],
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 160 },
      alignment: text.length < 40 ? AlignmentType.CENTER : AlignmentType.LEFT,
    }));
    continue;
  }
  if (trimmed.startsWith("### ")) {
    const text = cleanText(trimmed.slice(4));
    children.push(new Paragraph({
      children: [new TextRun({ text, bold: true, font: FONT, size: H3_SIZE })],
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 240, after: 120 },
    }));
    continue;
  }
  if (trimmed.startsWith("#### ")) {
    const text = cleanText(trimmed.slice(5));
    children.push(new Paragraph({
      children: [new TextRun({ text, bold: true, font: FONT, size: H4_SIZE })],
      heading: HeadingLevel.HEADING_4,
      spacing: { before: 200, after: 100 },
    }));
    continue;
  }

  // Bullet points
  if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
    const text = trimmed.slice(2);
    const indent = line.search(/\S/) > 1 ? 720 : 360;
    children.push(new Paragraph({
      children: [new TextRun({ text: "• ", font: FONT, size: FONT_SIZE }), ...makeRuns(text)],
      spacing: { before: 40, after: 40 },
      indent: { left: indent },
    }));
    continue;
  }

  // Numbered lists
  const numMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
  if (numMatch) {
    children.push(new Paragraph({
      children: [new TextRun({ text: `${numMatch[1]}. `, bold: true, font: FONT, size: FONT_SIZE }), ...makeRuns(numMatch[2])],
      spacing: { before: 40, after: 40 },
      indent: { left: 360 },
    }));
    continue;
  }

  // Regular paragraph
  children.push(new Paragraph({
    children: makeRuns(trimmed),
    spacing: { before: 60, after: 100 },
    alignment: AlignmentType.JUSTIFIED,
  }));
}

// Flush remaining
if (inCodeBlock) flushCode();
if (inTable) flushTable();

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: FONT, size: FONT_SIZE },
        paragraph: { spacing: { line: 360 } },
      },
    },
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        size: { width: 12240, height: 15840 },
      },
    },
    children,
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  const outPath = "Chapters_Only.docx";
  fs.writeFileSync(outPath, buffer);
  console.log(`✅ DOCX created successfully: ${outPath}`);
  console.log(`   File size: ${(buffer.length / 1024).toFixed(1)} KB`);
}).catch(err => {
  console.error("Error generating DOCX:", err);
});
