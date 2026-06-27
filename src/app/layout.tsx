import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://idreamaiworks.com"),
  title: {
    default: "I Dream. AI Works. — 我負責夢想，AI 負責工作",
    template: "%s · I Dream. AI Works.",
  },
  description:
    "一本公開寫作中的書。人生遊戲作弊全攻略：從 NPC 快速升級 OPC。我負責夢想，AI 負責工作——用 Agent 開創夢想的事業。",
  openGraph: {
    title: "I Dream. AI Works. — 我負責夢想，AI 負責工作",
    description: "公開寫作中的活書：人生遊戲作弊全攻略，從 NPC 升級 OPC，成為 AI 時代的超級個體。",
    type: "website",
    locale: "zh_TW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body className="flex min-h-screen flex-col bg-[var(--surface)] text-[var(--fg)] antialiased">
        {/* 全螢幕版型：白底滿版，chrome 滿寬髮絲線，內容置中於寬容器 */}
        <header className="border-b border-[var(--line)]">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
            <Link
              href="/"
              className="text-[var(--fg-strong)] font-semibold tracking-tight"
            >
              I Dream. AI Works.
            </Link>
            <nav className="flex items-center gap-6 text-sm text-[var(--muted)]">
              <Link href="/book" className="hover:text-[var(--fg-strong)]">
                目錄
              </Link>
              <Link href="/log" className="hover:text-[var(--fg-strong)]">
                日誌
              </Link>
              <Link href="/about" className="hover:text-[var(--fg-strong)]">
                關於
              </Link>
              <Link
                href="/writing-in-public"
                className="hover:text-[var(--fg-strong)]"
              >
                WRITING IN PUBLIC
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 sm:px-10">
          {children}
        </main>

        <footer className="border-t border-[var(--line)]">
          <div className="mx-auto w-full max-w-6xl px-6 py-8 text-sm text-[var(--muted)] sm:px-10">
            <p className="flex items-center gap-2">
              <span className="live-mark" />
              <span className="eyebrow">Writing in Public</span>
            </p>
            <p className="mt-3 text-[var(--fg)]">
              《I Dream. AI Works.》 · 我負責夢想，AI 負責工作
            </p>
            <p className="mt-0.5">作者 AI-MAN · 公開寫作中</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
