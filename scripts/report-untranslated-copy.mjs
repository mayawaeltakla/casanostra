import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const sourceRoot = path.resolve("src");
const arabicPattern = /[\u0600-\u06FF]/;
const counts = new Map();

function collectFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(filePath) : [filePath];
  });
}

for (const filePath of collectFiles(sourceRoot).filter((file) => /\.(tsx?|jsx?)$/.test(file))) {
  const relativePath = path.relative(process.cwd(), filePath).replaceAll("\\", "/");
  if (relativePath.startsWith("src/i18n/")) continue;

  const source = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  let count = 0;

  function visit(node) {
    if (
      (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
      arabicPattern.test(node.text)
    ) {
      count += 1;
    } else if (ts.isTemplateExpression(node)) {
      count += node.templateSpans.filter((span) => arabicPattern.test(span.literal.text)).length;
      if (arabicPattern.test(node.head.text)) count += 1;
    } else if (ts.isJsxText(node) && arabicPattern.test(node.text)) {
      count += 1;
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  if (count > 0) counts.set(relativePath, count);
}

const sortedCounts = [...counts].sort((left, right) => right[1] - left[1]);
const total = sortedCounts.reduce((sum, [, count]) => sum + count, 0);
for (const [filePath, count] of sortedCounts) console.log(`${filePath}: ${count}`);
console.log(`Total Arabic string literals outside src/i18n: ${total}`);
