import Link from "next/link";
import { getChapters } from "@/lib/book";

const THEMES = [
  {
    n: "YOU",
    t: "IDOL · 你負責夢想",
    d: "把夢想大聲說出來、公開建造，活出只有你能演的主線任務。",
  },
  {
    n: "OPC",
    t: "Agent · AI 負責工作",
    d: "召喚 Agent 軍團，用一人公司系統 24 小時自動運轉你的事業。",
  },
  {
    n: "SUPER ONE",
    t: "三位一體的超級個體",
    d: "OPC 掌握品牌 × 媒體 × 通路，成為指數增長的多重收入飛輪。",
  },
];

export default function Home() {
  const chapters = getChapters();
  const live = chapters.filter((c) => c.hasContent).length;

  return (
    <div>
      {/* ── Hero ── */}
      <section className="border-b border-[var(--line)] py-16 sm:py-20">
        <p className="flex items-center gap-2">
          <span className="live-mark" />
          <span className="eyebrow">公開寫作中 · Writing in Public</span>
        </p>

        <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--fg-strong)] sm:text-5xl">
          I Dream. AI Works.
        </h1>
        <p className="mt-3 text-lg text-[var(--muted)]">
          我負責夢想，AI 負責工作 · 人生遊戲作弊全攻略
        </p>

        <p className="prose-zh mt-8 max-w-[var(--reading)] text-lg">
          史上最強員工已經出現，它的名字叫 AI Agent。
          <strong className="text-[var(--fg-strong)]">
            與其學 AI 當更好的員工，不如讓 AI 替你工作。
          </strong>
          這是一張新地圖：把夢想拿回自己手上，把工作交給 Agent——從 NPC 模式，切換到 OPC 模式。
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/book"
            className="rounded-[var(--radius)] bg-[var(--fg-strong)] px-6 py-3 text-sm font-medium text-[var(--surface)] transition-opacity hover:opacity-85"
          >
            開始讀（{live} 章已上線）
          </Link>
          <Link
            href="/book/intro"
            className="rounded-[var(--radius)] border border-[var(--line-strong)] px-6 py-3 text-sm font-medium text-[var(--fg)] hover:bg-[var(--surface-2)]"
          >
            從前言開始
          </Link>
        </div>
      </section>

      {/* ── 升級路徑：功能規格卡 ── */}
      <section className="py-14">
        <p className="eyebrow">升級路徑 · YOU → OPC → The Super One</p>
        <div className="mt-6 grid border-t border-[var(--line)] sm:grid-cols-3 sm:border-t-0">
          {THEMES.map((x, i) => (
            <div
              key={x.t}
              className={`py-6 sm:px-6 sm:py-2 sm:first:pl-0 ${
                i > 0
                  ? "border-t border-[var(--line)] sm:border-l sm:border-t-0"
                  : ""
              }`}
            >
              <div className="font-mono text-xs text-[var(--metal)]">{x.n}</div>
              <div className="mt-2 font-semibold text-[var(--fg-strong)]">
                {x.t}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {x.d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
