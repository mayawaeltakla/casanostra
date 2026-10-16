/**
 * RootLayout الجذري — الحد الأدنى فقط.
 *
 * التوطين يعيش في `src/app/[locale]/layout.tsx` (lang/dir والرسائل والشل)،
 * وهذا الجذر يُمرّر الأبناء فحسب. الـ proxy يضمن بادئة لغوية صالحة دائماً.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
