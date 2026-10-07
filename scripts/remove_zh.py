#!/usr/bin/env python3
"""
Remove Chinese (zh) language support completely from the CASANOSTRA codebase.

Targets:
1. src/lib/locale-text.ts            — Locale type, LocaleTexts interface
2. src/i18n/messages.ts              — locales array, languageNames, messages.zh block
3. src/i18n/page-messages.ts         — 4 zh blocks (about/faq/contact/quickBooking)
4. src/components/LanguageSwitcher.tsx — zh entry in LANGUAGES list
5. All .tsx files using lt(locale, { ..., zh: "..." }) — strip zh key from each call
"""

import re
from pathlib import Path

ROOT = Path("/home/z/my-project/src")

# ---------------------------------------------------------------
# 1) Generic cleaner: strip `, zh: "..."` from lt(locale, { ... }) calls
# ---------------------------------------------------------------
# Pattern matches `, zh: "..."` where the string can contain escaped quotes
# but no raw newlines. zh is always the LAST key in lt() calls, so the
# comma is always before zh.
ZH_KEY_PATTERN = re.compile(
    r',\s*zh:\s*"((?:[^"\\]|\\.)*)"'
)

def strip_zh_from_lt_calls(text: str) -> tuple[str, int]:
    """Remove `, zh: "..."` patterns from lt() calls. Returns (new_text, n_replacements)."""
    new_text, n = ZH_KEY_PATTERN.subn("", text)
    return new_text, n


# ---------------------------------------------------------------
# 2) Block remover: remove `zh: { ... },` blocks from messages objects
# ---------------------------------------------------------------
def remove_zh_block(text: str, block_start_pattern: str) -> tuple[str, int]:
    """
    Remove `zh: { ... },` or `zh: { ... }` block from the text.
    The block starts with `zh: {` and ends with the matching closing `}`.
    """
    # Find all occurrences of `zh: {` then track matching braces
    pattern = re.compile(block_start_pattern)
    matches = list(pattern.finditer(text))
    if not matches:
        return text, 0

    n_removed = 0
    result = []
    last_end = 0
    for m in matches:
        # Start from the position right after `zh: {`
        block_start = m.start()
        # Find matching closing brace
        depth = 1
        i = m.end()  # position right after the opening `{`
        while i < len(text) and depth > 0:
            ch = text[i]
            if ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
            elif ch == '"':
                # skip string content
                i += 1
                while i < len(text):
                    if text[i] == '\\':
                        i += 2
                        continue
                    if text[i] == '"':
                        break
                    i += 1
            i += 1
        # i is now position right after closing `}`
        # Skip trailing comma + whitespace
        j = i
        while j < len(text) and text[j] in ' \t':
            j += 1
        if j < len(text) and text[j] == ',':
            j += 1
        # Also consume following newline
        if j < len(text) and text[j] == '\n':
            j += 1
        # Append text before block
        result.append(text[last_end:block_start])
        last_end = j
        n_removed += 1
    result.append(text[last_end:])
    return "".join(result), n_removed


# ---------------------------------------------------------------
# Apply changes
# ---------------------------------------------------------------
total_changes = 0

def edit_file(path: Path, transform):
    global total_changes
    if not path.exists():
        print(f"  ! not found: {path}")
        return
    original = path.read_text(encoding="utf-8")
    new_text, n = transform(original)
    if n > 0:
        path.write_text(new_text, encoding="utf-8")
        print(f"  ✓ {path.relative_to(ROOT)} — {n} change(s)")
        total_changes += n
    else:
        print(f" · {path.relative_to(ROOT)} — no changes")


print("Removing zh from lt() calls in tsx files...")
tsx_files = list(ROOT.rglob("*.tsx")) + list(ROOT.rglob("*.ts"))
for f in tsx_files:
    # Skip i18n message files — handled separately
    if "i18n/" in str(f):
        continue
    # Skip locale-text.ts — handled separately
    if f.name == "locale-text.ts":
        continue
    edit_file(f, strip_zh_from_lt_calls)

print("\nRemoving zh entry from LanguageSwitcher LANGUAGES list...")
ls_file = ROOT / "components" / "LanguageSwitcher.tsx"
if ls_file.exists():
    original = ls_file.read_text(encoding="utf-8")
    new = original.replace(
        '  { code: "zh", name: "中文", flag: "🇨🇳" },\n', ""
    )
    if new != original:
        ls_file.write_text(new, encoding="utf-8")
        print(f"  ✓ removed zh entry from LanguageSwitcher.tsx")
        total_changes += 1

print("\nUpdating locale-text.ts type definitions...")
lt_file = ROOT / "lib" / "locale-text.ts"
if lt_file.exists():
    original = lt_file.read_text(encoding="utf-8")
    new = original.replace(
        'export type Locale = "ar" | "en" | "tr" | "fr" | "ru" | "zh";',
        'export type Locale = "ar" | "en" | "tr" | "fr" | "ru";'
    )
    new = new.replace("  zh: string;\n", "")
    if new != original:
        lt_file.write_text(new, encoding="utf-8")
        print(f"  ✓ updated locale-text.ts")
        total_changes += 1

print("\nUpdating messages.ts (locales array, languageNames, comment, zh block)...")
msg_file = ROOT / "i18n" / "messages.ts"
if msg_file.exists():
    original = msg_file.read_text(encoding="utf-8")

    # 1) Remove comment line about zh
    new = original.replace(" *    - zh (中文) — LTR\n", "")

    # 2) Update header comment "6 لغات" → "5 لغات"
    new = new.replace("CASANOSTRA — رسائل الترجمة لـ 6 لغات",
                      "CASANOSTRA — رسائل الترجمة لـ 5 لغات")

    # 3) Remove "zh" from locales array
    new = new.replace(
        'export const locales = ["ar", "en", "tr", "fr", "ru", "zh"] as const;',
        'export const locales = ["ar", "en", "tr", "fr", "ru"] as const;'
    )

    # 4) Remove zh from languageNames
    new = new.replace(
        '  zh: { flag: "🇨🇳", native: "中文", code: "ZH" },\n', ""
    )

    # 5) Remove zh block from messages object
    new, n1 = remove_zh_block(new, r'\n  /\* ──+\s*中文\s*──+\s*\*/\s*\n  zh:\s*\{')
    # Fallback if comment format differs
    if n1 == 0:
        new, n1 = remove_zh_block(new, r'\n  zh:\s*\{')

    if new != original:
        msg_file.write_text(new, encoding="utf-8")
        print(f"  ✓ updated messages.ts ({n1} zh block removed)")
        total_changes += 1

print("\nUpdating page-messages.ts (4 zh blocks)...")
pm_file = ROOT / "i18n" / "page-messages.ts"
if pm_file.exists():
    original = pm_file.read_text(encoding="utf-8")

    # Remove each zh block. Each block starts with `\n  zh: {` (possibly preceded by comment).
    new, n_total = remove_zh_block(original, r'\n  zh:\s*\{')
    # Also strip any standalone comment line mentioning 中文 / Chinese
    new = re.sub(r'\n\s*/\*\s*.*?(中文|Chinese).*?\*/\s*\n', '\n', new)

    if new != original:
        pm_file.write_text(new, encoding="utf-8")
        print(f"  ✓ updated page-messages.ts ({n_total} zh block(s) removed)")
        total_changes += 1

print(f"\n{'='*60}")
print(f"Total changes: {total_changes}")
print(f"{'='*60}")

# Final verification: search for any remaining zh occurrences
print("\nVerifying no zh references remain...")
remaining = []
for f in ROOT.rglob("*.ts"):
    if f.is_file():
        content = f.read_text(encoding="utf-8")
        for ln_no, line in enumerate(content.splitlines(), 1):
            if re.search(r'\bzh\b', line):
                remaining.append((f, ln_no, line))
for f in ROOT.rglob("*.tsx"):
    if f.is_file():
        content = f.read_text(encoding="utf-8")
        for ln_no, line in enumerate(content.splitlines(), 1):
            if re.search(r'\bzh\b', line):
                remaining.append((f, ln_no, line))

if remaining:
    print(f"\n⚠ {len(remaining)} line(s) still reference 'zh':")
    for f, ln, line in remaining:
        print(f"  {f.relative_to(ROOT)}:{ln}: {line.strip()[:120]}")
else:
    print("  ✓ No 'zh' references remain in src/")
