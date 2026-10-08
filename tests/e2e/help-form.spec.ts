import { expect, test } from "@playwright/test";

const locales = [
  {
    code: "ar",
    submit: "إرسال عبر البريد الإلكتروني",
    nameRequired: "الاسم مطلوب",
    messageRequired: "وصف المشكلة مطلوب",
  },
  {
    code: "en",
    submit: "Send by email",
    nameRequired: "Name is required",
    messageRequired: "Please describe the issue",
  },
  {
    code: "tr",
    submit: "E-posta ile gönder",
    nameRequired: "Ad gereklidir",
    messageRequired: "Lütfen sorunu açıklayın",
  },
  {
    code: "fr",
    submit: "Envoyer par e-mail",
    nameRequired: "Le nom est obligatoire",
    messageRequired: "Veuillez décrire le problème",
  },
  {
    code: "ru",
    submit: "Отправить по почте",
    nameRequired: "Укажите имя",
    messageRequired: "Опишите проблему",
  },
] as const;

test("help form validates required fields by mouse and keyboard in every locale", async ({
  page,
  baseURL,
}) => {
  if (!baseURL) {
    throw new Error("Playwright baseURL must be configured for the help form test.");
  }

  for (const [index, locale] of locales.entries()) {
    await page.goto(`/${locale.code}/help`, { waitUntil: "domcontentloaded" });
    // انتظر اكتمال التحميل قبل ضغط Enter — وإلا قد يسبق الإرسالُ hydration
    // فيقع submit أصلي (native) بلا تحقق React، خاصة عند بدء بارد.
    await page.waitForLoadState("load");

    const form = page.locator("form").first();
    if (index === 0) {
      await form.locator('input[type="text"]').press("Enter");
    } else {
      await form.getByRole("button", { name: locale.submit }).click();
    }

    await expect(form).toContainText(locale.nameRequired);
    await expect(form).toContainText(locale.messageRequired);
  }
});
