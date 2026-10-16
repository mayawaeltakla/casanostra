import type { BlogBlock } from "@/lib/blog";

/**
 * يحوّل نص المقال المكتوب في لوحة التحكم إلى كتل (BlogBlock):
 *  - سطر يبدأ بـ "## " → عنوان فرعي
 *  - مجموعة أسطر تبدأ بـ "- " → قائمة (السطر السابق لها إن لم يبدأ بـ "- " يصبح عنوان القائمة)
 *  - غير ذلك → فقرة (الفقرات تُفصل بسطر فارغ)
 */
export function parseArticleBody(text: string): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  const groups = text
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((group) => group.split("\n").map((line) => line.trim()).filter(Boolean))
    .filter((lines) => lines.length > 0);

  for (const lines of groups) {
    let paragraph: string[] = [];
    let listTitle = "";
    let items: string[] = [];

    const flushParagraph = () => {
      if (paragraph.length > 0) {
        blocks.push({ type: "paragraph", content: paragraph.join(" ") });
        paragraph = [];
      }
    };
    const flushList = () => {
      if (items.length > 0) {
        blocks.push({ type: "list", content: listTitle, items });
        items = [];
        listTitle = "";
      }
    };

    for (const line of lines) {
      if (line.startsWith("## ")) {
        flushParagraph();
        flushList();
        blocks.push({ type: "heading", content: line.slice(3).trim() });
      } else if (line.startsWith("- ")) {
        if (items.length === 0 && paragraph.length > 0) {
          listTitle = paragraph.join(" ");
          paragraph = [];
        }
        items.push(line.slice(2).trim());
      } else {
        flushList();
        paragraph.push(line);
      }
    }
    flushParagraph();
    flushList();
  }
  return blocks;
}
