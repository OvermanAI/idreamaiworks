# I Dream. AI Works. — idreamaiworks.com

一本**公開寫作中**的書（系列母世界觀）。靜態網站，內容由 MDX 驅動，`git push` 自動部署到 Vercel。

核心宣言：**我負責夢想，AI 負責工作。** 框架：YOU（IDOL）→ OPC → The Super One，保留 NPC vs OPC 遊戲化敘事。

---

## 內容怎麼來的（重要）

真稿來源是 Obsidian，網站只是它的發布出口。**永遠在 Obsidian 改，不要直接改這裡的 `.mdx`。**

| | 位置 |
|---|---|
| 📝 Obsidian 真稿 | `~/IDreamAIWorks/`（vault 根目錄）：`00_前言_SYSTEM_ALERT/`、`01_第一部_選擇你的遊戲/`、`02_第二部…/`、`03_第三部…/`、`90_附錄/` |
| 🌐 網站內容（自動產生） | `content/book/*.mdx` |

> ⚠️ 第①本的書稿散在 vault **根目錄**（不像②③各有獨立子資料夾）。

### 發布／更新一章

在 Obsidian 改好後，對 Claude Code 說：**「發布 ch03」** 或 **「publish-idreamaiworks ap01」**。

skill（`~/.claude/skills/publish-idreamaiworks.md`）會：讀草稿 → 補 frontmatter → 清 Obsidian 語法 → 展示預覽 → 你說「發布」→ 寫入 `content/book/` → git push → Vercel 部署。

同步是單向的（Obsidian → 網站）。直接改網站 `.mdx` 不會回寫 Obsidian，且下次發布同章會被覆蓋。

---

## 結構

- `src/lib/book.ts` — 全書 CANON（intro + 10 章 + 3 附錄）與章節資料層
- `content/book/*.mdx` — 章節內容（frontmatter 的 `status` 控制：planned / drafting / published）
- `docs/DESIGN.md` — Dieter Rams 設計系統（三站共用 token）

## 開發

```bash
npm install
npm run dev    # 本機預覽
npm run build  # 驗證建置
```

部署：push 到 `main` → Vercel 自動部署到 idreamaiworks.com。

---

姊妹站：[aileanstartup.com](https://aileanstartup.com)（怎麼開始）· [thesuperone.com](https://thesuperone.com)（怎麼放大）
