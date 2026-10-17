import { createHash } from "node:crypto";
import { locales, type Locale } from "@/i18n/messages";
import {
  TRANSLATION_FIELDS,
  type ArticleFields,
  type ArticleTranslations,
} from "@/lib/blog-db";

/* ============================================================================
 *  الترجمة التلقائية لمقالات المدوّنة — عربي → إنجليزي/تركي/فرنسي/روسي
 *
 *  المزوّد (بالترتيب):
 *    1) ANTHROPIC_API_KEY  → Claude (الأفضل جودة) — النموذج: TRANSLATE_MODEL
 *    2) OPENAI_API_KEY     → أي خدمة متوافقة مع OpenAI (OPENAI_BASE_URL اختياري)
 *    3) بدونهما            → مترجم مجاني احتياطي (جودة أقل، بلا مفتاح).
 *                            لتعطيله: TRANSLATE_FALLBACK=off
 *    يمكن فرض مزوّد: TRANSLATE_PROVIDER=anthropic|openai|zai|free
 *
 *  الترجمة تعمل بالتوازي للغات الأربع مع إعادة محاولة، ولا يفشل الحفظ أبداً
 *  بسببها: الأخطاء تُعاد للواجهة لتظهر للمدير بدل أن تُبتلع بصمت.
 *  إذا عُدّل النص العربي لاحقاً تُعاد ترجمة اللغات التي لم تُحرَّر يدوياً.
 * ============================================================================ */

const TARGET_LOCALES = (locales as readonly Locale[]).filter((l) => l !== "ar");

const LANGUAGE_NAMES: Record<Locale, string> = {
  ar: "Arabic",
  en: "English",
  tr: "Turkish",
  fr: "French",
  ru: "Russian",
};

const DEFAULT_AUTHOR: Record<Locale, string> = {
  ar: "فريق CASANOSTRA",
  en: "CASANOSTRA Team",
  tr: "CASANOSTRA Ekibi",
  fr: "Équipe CASANOSTRA",
  ru: "Команда CASANOSTRA",
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Provider = "anthropic" | "openai" | "zai" | "free" | "none";

export function getProvider(): Provider {
  const forced = process.env.TRANSLATE_PROVIDER?.toLowerCase();
  if (forced === "anthropic" || forced === "openai" || forced === "zai" || forced === "free") return forced;
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.TRANSLATE_FALLBACK?.toLowerCase() === "off") return "none";
  return "free";
}

/** بصمة النص العربي المصدر (لاكتشاف أن العربي تغيّر بعد الترجمة) */
export function arabicHash(ar: Partial<ArticleFields> | undefined): string {
  const payload = JSON.stringify(["title", "excerpt", "category", "body"].map((k) => ar?.[k as keyof ArticleFields] ?? ""));
  return createHash("sha1").update(payload).digest("hex").slice(0, 16);
}

/* ───────────────────────── مزوّدات LLM ───────────────────────── */

function buildPrompt(locale: Locale, ar: ArticleFields): string {
  return `You are a professional tourism-travel translator for a luxury Turkish travel agency (CASANOSTRA).
Translate the following blog article fields from Arabic into ${LANGUAGE_NAMES[locale]}.

Rules:
- Keep the meaning, tone and marketing style of a luxury travel agency. Keep the brand name CASANOSTRA unchanged.
- "category" is a short label — translate briefly.
- "author" is a name/team title — translate naturally (e.g. "فريق CASANOSTRA" → "CASANOSTRA Team").
- "body" uses a simple format: paragraphs separated by a blank line, lines starting with "## " are subheadings, lines starting with "- " are list items. PRESERVE this exact format and line breaks.
- Do not add commentary, notes or markdown code fences.

Return ONLY a valid JSON object with exactly these keys:
{"title": "...", "excerpt": "...", "category": "...", "author": "...", "body": "..."}

Arabic source:
${JSON.stringify({ title: ar.title, excerpt: ar.excerpt, category: ar.category, author: ar.author, body: ar.body }, null, 1)}`;
}

function extractJson(text: string): Partial<ArticleFields> | null {
  const cleaned = text.replace(/^\s*```(?:json)?/i, "").replace(/```\s*$/i, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1)) as Partial<ArticleFields>;
  } catch {
    return null;
  }
}

async function callLLM(provider: Provider, prompt: string, signal: AbortSignal): Promise<string> {
  if (provider === "anthropic") {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal,
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.TRANSLATE_MODEL || "claude-haiku-4-5",
        max_tokens: 8000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) throw new Error(`anthropic ${res.status}`);
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    return data.content?.find((c) => c.type === "text")?.text ?? "";
  }
  if (provider === "openai") {
    const base = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
    const res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      signal,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      body: JSON.stringify({
        model: process.env.TRANSLATE_MODEL || "gpt-4o-mini",
        temperature: 0.2,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) throw new Error(`openai ${res.status}`);
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return data.choices?.[0]?.message?.content ?? "";
  }
  /* zai: مزوّد قديم — يعمل فقط داخل بيئة Z.ai المُعدّة */
  const { default: ZAI } = await import("z-ai-web-dev-sdk");
  const zai = await ZAI.create();
  const response = await zai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    thinking: { type: "disabled" },
  });
  return response.choices?.[0]?.message?.content ?? "";
}

async function translateWithLLM(provider: Provider, locale: Locale, ar: ArticleFields, signal: AbortSignal): Promise<ArticleFields> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const parsed = extractJson(await callLLM(provider, buildPrompt(locale, ar), signal));
      const result: Partial<ArticleFields> = {};
      for (const key of TRANSLATION_FIELDS) {
        const value = parsed?.[key];
        if (typeof value === "string" && value.trim()) result[key] = value.trim();
      }
      if (result.title && result.body) {
        return { excerpt: "", category: "", author: DEFAULT_AUTHOR[locale], ...result } as ArticleFields;
      }
      lastError = new Error("unparsable response");
    } catch (error) {
      lastError = error;
      if (signal.aborted) break;
    }
    await sleep(attempt * 1500);
  }
  throw lastError instanceof Error ? lastError : new Error("translation failed");
}

/* ───────────────────────── مترجم مجاني احتياطي ───────────────────────── */

async function freeTranslateLine(text: string, locale: Locale, signal: AbortSignal): Promise<string> {
  if (!text.trim()) return text;
  const res = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&dt=t&tl=" + locale, {
    method: "POST",
    signal,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: "q=" + encodeURIComponent(text),
  });
  if (!res.ok) throw new Error(`free ${res.status}`);
  const data = (await res.json()) as unknown;
  const segments = Array.isArray(data) && Array.isArray(data[0]) ? (data[0] as unknown[][]) : [];
  const out = segments.map((s) => (typeof s?.[0] === "string" ? s[0] : "")).join("");
  if (!out.trim()) throw new Error("free empty");
  return out.trim();
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await fn(items[i]);
      }
    }),
  );
  return results;
}

async function translateFree(locale: Locale, ar: ArticleFields, signal: AbortSignal): Promise<ArticleFields> {
  const tr = async (text: string) => {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        return await freeTranslateLine(text, locale, signal);
      } catch (error) {
        if (attempt === 3 || signal.aborted) throw error;
        await sleep(attempt * 1000);
      }
    }
    return text;
  };
  const lines = ar.body.replace(/\r\n/g, "\n").split("\n");
  const body = await mapLimit(lines, 5, async (line) => {
    const m = line.match(/^(##\s+|[-•*]\s+)(.*)$/);
    if (m) return m[1].replace(/[•*]/, "-") + (await tr(m[2]));
    return line.trim() ? tr(line) : "";
  });
  const [title, excerpt, category] = await Promise.all([tr(ar.title), tr(ar.excerpt), tr(ar.category)]);
  const author = ar.author.trim() === DEFAULT_AUTHOR.ar ? DEFAULT_AUTHOR[locale] : await tr(ar.author);
  return { title, excerpt, category, author, body: body.join("\n") };
}

/* ───────────────────────── الواجهة العامة ───────────────────────── */

const isComplete = (f: Partial<ArticleFields> | undefined) =>
  TRANSLATION_FIELDS.every((k) => Boolean(f?.[k]?.trim()));
const sameFields = (a: Partial<ArticleFields> | undefined, b: Partial<ArticleFields> | undefined) =>
  TRANSLATION_FIELDS.every((k) => (a?.[k] ?? "").trim() === (b?.[k] ?? "").trim());
const isEmpty = (f: Partial<ArticleFields> | undefined) => TRANSLATION_FIELDS.every((k) => !f?.[k]?.trim());

export interface TranslateOutcome {
  translations: ArticleTranslations;
  /** اللغات التي تُرجمت (أو أُعيدت ترجمتها) في هذه العملية */
  translated: Locale[];
  provider: Provider;
  /** سبب الفشل لأي لغة لم تكتمل (للعرض للمدير) */
  error?: string;
}

/**
 * يحدد اللغات المطلوب ترجمتها ويترجمها ويدمجها مع الإدخال اليدوي.
 * - لغة فارغة → تُترجم.
 * - لغة مترجمة آلياً سابقاً ولم تُحرَّر يدوياً + تغيّر العربي → تُعاد ترجمتها.
 * - حقول كتبها المدير يدوياً لا تُستبدل أبداً (الترجمة تملأ الفراغات فقط).
 */
export async function translateForSave(
  incoming: ArticleTranslations,
  previous: ArticleTranslations | null,
): Promise<TranslateOutcome> {
  const provider = getProvider();
  const ar = incoming.ar as ArticleFields;
  const hash = arabicHash(ar);
  const prevAuto = previous?._auto ?? {};
  const merged: ArticleTranslations = { ...incoming };
  const auto: Partial<Record<Locale, string>> = { ...prevAuto };

  const jobs: { locale: Locale; overwrite: boolean }[] = [];
  for (const locale of TARGET_LOCALES) {
    const now = incoming[locale];
    const before = previous?.[locale];
    const untouchedAuto = Boolean(prevAuto[locale]) && sameFields(now, before);
    if (untouchedAuto) {
      if (prevAuto[locale] !== hash) jobs.push({ locale, overwrite: true });
    } else {
      delete auto[locale];
      if (!isComplete(now)) jobs.push({ locale, overwrite: false });
    }
  }

  if (jobs.length === 0) {
    merged._auto = auto;
    return { translations: merged, translated: [], provider };
  }
  if (provider === "none") {
    merged._auto = auto;
    return { translations: merged, translated: [], provider, error: "no-provider" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 55_000);
  const errors: string[] = [];
  const translated: Locale[] = [];
  try {
    const results = await Promise.allSettled(
      jobs.map(({ locale }) =>
        provider === "free"
          ? translateFree(locale, ar, controller.signal)
          : translateWithLLM(provider, locale, ar, controller.signal),
      ),
    );
    results.forEach((result, i) => {
      const { locale, overwrite } = jobs[i];
      if (result.status !== "fulfilled") {
        errors.push(`${locale}: ${result.reason instanceof Error ? result.reason.message : "failed"}`);
        return;
      }
      const manual = (incoming[locale] ?? {}) as Partial<ArticleFields>;
      const fields: Partial<ArticleFields> = { ...result.value };
      if (!overwrite) {
        for (const key of TRANSLATION_FIELDS) {
          if (manual[key]?.trim()) fields[key] = manual[key];
        }
      }
      merged[locale] = fields;
      if (overwrite || isEmpty(manual)) auto[locale] = hash;
      translated.push(locale);
    });
  } finally {
    clearTimeout(timer);
  }

  merged._auto = auto;
  return {
    translations: merged,
    translated,
    provider,
    error: errors.length ? errors.join(" | ") : undefined,
  };
}

/** أسماء اللغات المترجمة (لعرضها في رسالة النجاح) */
export const TRANSLATED_LOCALE_LABELS: Record<string, string> = {
  en: "English",
  tr: "Türkçe",
  fr: "Français",
  ru: "Русский",
};
