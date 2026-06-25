import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ChapterStatus = "planned" | "drafting" | "published";

export type StageMeta = {
  n: number;
  theme: string; // 主題一/二/三
  title: string; // 主題英文名 + 中文
  blurb: string;
};

export type ChapterMeta = {
  slug: string;
  stage: number;
  chapter: number; // 0 = 前言
  order: number;
  title: string;
  summary: string;
  status: ChapterStatus;
  updated?: string;
  hasContent: boolean;
};

// ── 全書 canonical 結構（即使尚未撰寫，目錄也顯示全貌）──
export const STAGES: StageMeta[] = [
  { n: 1, theme: "STAGE 1 · 第一部", title: "選擇你的遊戲", blurb: "AI 時代，人類要有新的活法" },
  { n: 2, theme: "STAGE 2 · 第二部", title: "IDAW 外掛秘技全解鎖", blurb: "掌握 Cheat Code，跳過所有限制" },
  { n: 3, theme: "STAGE 3 · 第三部", title: "實戰關卡全攻略", blurb: "你的 Cheat Code，今天就能啟動" },
  { n: 4, theme: "EXTRAS · 附錄", title: "隱藏關卡", blurb: "通關後才能解鎖的寶藏區" },
];

type Canon = { slug: string; stage: number; chapter: number; title: string; summary: string };

export const CANON: Canon[] = [
  { slug: "intro", stage: 0, chapter: 0, title: "前言：SYSTEM ALERT — NPC vs OPC", summary: "史上最強員工已出現。玩法已更新，舊版本不再相容——這是 Z 世代的人生遊戲作弊碼。" },
  { slug: "ch01", stage: 1, chapter: 1, title: "錯誤 404：玩法已不相容", summary: "舊地圖假設人類是工作主體；AI Agent 出現後，這個前提崩了。" },
  { slug: "ch02", stage: 1, chapter: 2, title: "開外掛玩人生遊戲：I Dream. AI Works.", summary: "我負責夢想，AI 負責工作。10/90 法則：你出 10%，AI 出 90%，產出 100。" },
  { slug: "ch03", stage: 1, chapter: 3, title: "我獨自升級 OPC", summary: "OPC 不是自由工作者，是一個人扮演整家公司的策略中樞，先活下來再升級。" },
  { slug: "ch04", stage: 2, chapter: 4, title: "夢想主線任務：IDOL", summary: "把夢想大聲說出來、公開建造，練成未來替你工作的 IDOL Agent。" },
  { slug: "ch05", stage: 2, chapter: 5, title: "做 AI 的老闆", summary: "從工具思維升級成老闆思維：提示詞不是重點，任務設計才是核心武器。" },
  { slug: "ch06", stage: 2, chapter: 6, title: "召喚你的 Agent 軍團", summary: "三大核心系統：Agent 原生網站 + Agent 員工 + Agent 工作流，讓事業 24 小時自動運轉。" },
  { slug: "ch07", stage: 3, chapter: 7, title: "AI 裝備升級指南：AIOPC", summary: "Agent 原生網站會主動回應、篩選、引導成交——是會工作的業務員，不是名片。" },
  { slug: "ch08", stage: 3, chapter: 8, title: "尋找盟友，越級打怪", summary: "一人公司不是孤軍：串起人類盟友、Agent 盟友、系統盟友的外部網路。" },
  { slug: "ch09", stage: 3, chapter: 9, title: "夢想實境秀：AI-MAN 闖關全記錄", summary: "OPAND Inc. 創辦人把建造過程本身變成內容——Eating my Own Agent Food。" },
  { slug: "ch10", stage: 3, chapter: 10, title: "The Super One：三位一體的超級個體", summary: "OPC 掌握品牌 + 媒體 + 通路，成為指數增長的多重收入飛輪。" },
  { slug: "ap01", stage: 4, chapter: 1, title: "附錄一｜裝備欄：OPC 工具箱", summary: "AI-MAN 實際在用的日常工具配置與三大系統工具包。" },
  { slug: "ap02", stage: 4, chapter: 2, title: "附錄二｜技能樹：IDAW 關鍵詞典", summary: "NPC / OPC / AI Boss / IDOL / AIOPC / 10/90 法則等核心術語精確定義。" },
  { slug: "ap03", stage: 4, chapter: 3, title: "附錄三｜遊戲地圖：OPC 王國生態系統", summary: "Aipill / ANAI Studio / ClawUps / AgentDTC / AIMODÈLE / AI BOSS CLUB 的戰略關係。" },
];

const CONTENT_DIR = path.join(process.cwd(), "content", "book");

function fmtDate(v: unknown): string | undefined {
  if (!v) return undefined;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

function readFileFor(slug: string): { data: Record<string, unknown>; content: string } | null {
  for (const ext of [".mdx", ".md"]) {
    const p = path.join(CONTENT_DIR, slug + ext);
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, "utf8");
      const { data, content } = matter(raw);
      return { data, content };
    }
  }
  return null;
}

export function getChapters(): ChapterMeta[] {
  return CANON.map((c, i) => {
    const file = readFileFor(c.slug);
    const data = (file?.data ?? {}) as Record<string, unknown>;
    const status = (data.status as ChapterStatus) ?? (file ? "drafting" : "planned");
    return {
      slug: c.slug,
      stage: c.stage,
      chapter: c.chapter,
      order: i,
      title: (data.title as string) ?? c.title,
      summary: (data.summary as string) ?? c.summary,
      status,
      updated: fmtDate(data.updated),
      hasContent: Boolean(file),
    };
  });
}

export function getChapter(slug: string): { meta: ChapterMeta; content: string } | null {
  const chapters = getChapters();
  const meta = chapters.find((c) => c.slug === slug);
  if (!meta) return null;
  const file = readFileFor(slug);
  return { meta, content: file?.content ?? "" };
}

export function chapterNeighbors(slug: string) {
  const chapters = getChapters();
  const idx = chapters.findIndex((c) => c.slug === slug);
  return {
    prev: idx > 0 ? chapters[idx - 1] : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1] : null,
  };
}

export const STATUS_LABEL: Record<ChapterStatus, string> = {
  planned: "規劃中",
  drafting: "草稿中",
  published: "已發布",
};
