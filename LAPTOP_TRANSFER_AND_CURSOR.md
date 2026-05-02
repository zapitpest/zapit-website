# Zap It website — second laptop handoff & Cursor transfer

This document is for **moving the project to another machine** and **continuing work in Cursor** with as much context as possible. The Git repo root is this folder: `zapit-website/`.

---

## 1. Push code from this laptop (first machine)

### Prerequisites

- Git installed and configured (`git config user.name` / `user.email`).
- Access to the GitHub remote: `https://github.com/zapitpest/zapit-website.git`.
- GitHub auth: **HTTPS** → Personal Access Token (classic) or **SSH** key added to GitHub.

### Commands (run in Terminal)

```bash
cd /path/to/zapit-website
git status
npm run build          # optional but recommended before push
git add -A
git status             # review what will be committed
git commit -m "feat: Figma-aligned pages, assets, hero refresh, handoff docs"
git push origin main
```

If `git push` fails:

- **Authentication**: Sign in via GitHub CLI (`gh auth login`) or use an SSH remote instead of HTTPS.
- **Permission denied**: Confirm your GitHub user has write access to `zapitpest/zapit-website`.
- **Large files**: If push fails on size, use Git LFS for heavy images or ask the repo owner to raise limits.

### What is intentionally not in Git

- `node_modules/` — reinstall with `npm install`.
- `.next/`, `out/` — rebuild with `npm run build`.
- `netlify-deploy/` — local copy of static export; **regenerate** after build (see §4). Listed in `.gitignore`.

---

## 2. Second laptop — get the project

### Clone

```bash
git clone https://github.com/zapitpest/zapit-website.git
cd zapit-website
```

(Use SSH URL if you use SSH keys.)

### Node.js

- Use a current **LTS** Node (e.g. 20.x or 22.x). Check `package.json` / team standard.
- Install dependencies:

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000` (or the port shown in the terminal).

### Production-style static output (Netlify)

This app uses **static export** (`output: 'export'` in Next.js config). After changes:

```bash
npm run build
```

Output is in `out/`. For a folder you can upload to Netlify manually:

```bash
rm -rf netlify-deploy && mkdir netlify-deploy && cp -R out/* netlify-deploy/
```

(`netlify-deploy/` is gitignored; recreate on each machine as needed.)

---

## 3. Project map (where things live)

| Area | Path |
|------|------|
| App Router pages | `src/app/` |
| Layout, header, footer, floating CTA | `src/components/layout/` |
| Shared sections (hero, calculator, forms) | `src/components/sections/` |
| Site config & nav | `src/lib/constants.ts` |
| Global styles / animations | `src/app/globals.css` |
| Public images | `public/images/` (residential, commercial, about, icons, wp-assets, …) |
| Client / design source dumps | `source-assets/` (if present; optional to clone) |
| Client PDFs / docs (parent folder) | `../Zapit style guide_01.pdf`, review PDFs, etc. (outside repo if not committed) |

**Important pages:** `/`, `/residential`, `/commercial-pest-control`, `/about-us`, `/contact-us`, `/service-areas`, `/pest-solutions`, dynamic routes under `[serviceSlug]` and `pest-solutions/[slug]`.

---

## 4. Design & client context (for the other laptop)

- **Primary design:** Figma (client file).
- **Secondary:** Canva where Figma is missing.
- **Last resort:** live site for **content/logic only**, not visual copy.
- **Brand (from style guide PDF):** colours `#131a1c`, `#0d402e`, `#3fa535`, `#414042`; typography **Graphik** (fallback Arial) — see `src/app/globals.css`.
- **Hero image:** `public/images/residential/hero-cottage.png` — used on home, residential, and some pest-solution heroes (single path, many references).

Commit any **new** client PDFs/DOCX into the repo or a shared Drive if the team needs them on the second laptop.

---

## 5. Cursor → Cursor: “knowledge transfer”

### Same Cursor account (simplest)

1. Install **Cursor** on the second laptop and **sign in with the same account**.
2. Open the cloned folder: **File → Open Folder → `zapit-website`**.
3. Optional: enable **Settings Sync** (VS Code/Cursor) so extensions and user settings match.

You still **won’t** get old chat threads automatically unless you use one of the methods below.

### Rules & project-specific AI context

If you use project rules, they live under:

- `.cursor/rules/` (if present in repo)
- Or workspace/user rules configured in Cursor settings

Commit any `.cursor/` project rules you want shared. User-level **Skills** live under `~/.cursor/skills-cursor/` on each machine — copy that folder if you rely on custom skills.

### MCP (Figma, etc.)

MCP servers are configured **per machine** in Cursor. On the new laptop:

- Re-add the same MCP servers (Figma, Context7, etc.) in **Cursor Settings → MCP**.
- Re-authenticate (e.g. Figma) if required.

---

## 6. Sharing **this chat** on the other laptop

Chats are **not** stored inside the Git repo. Use one or more of these:

### A) Manual export / copy-paste (always works)

1. In Cursor, open the chat.
2. Select all important messages → copy → paste into a Google Doc / Notion / **Markdown file in the repo** (e.g. `docs/CHAT_SUMMARY_2026-04-28.md`) and commit.  
   That way the second laptop gets the summary via `git pull`.

### B) Cursor UI export (if your build has it)

Check the chat panel menu (**…** or kebab) for **Export** / **Copy conversation**. Save the file to the repo or cloud drive.

### C) Agent transcripts (advanced, local path)

Cursor stores parent conversation transcripts on disk under the **project** path, for example:

`~/.cursor/projects/<encoded-workspace-path>/agent-transcripts/<uuid>.jsonl`

- The folder name reflects how the workspace was opened (path may differ on the second laptop).
- You can **copy the relevant `.jsonl` file** to the new machine (same relative place under `~/.cursor/projects/...`) — this is **fragile** (paths/IDs differ). Prefer **A** or **B** for a clean handoff.

### D) Ongoing work

For the next session on the new laptop: **@ mention** the handoff file:

`@LAPTOP_TRANSFER_AND_CURSOR.md`

and any `docs/CHAT_SUMMARY*.md` you created, so the model loads context without needing the old thread.

---

## 7. Environment & secrets

- If the project uses **`.env` / `.env.local`**, they are **gitignored**. Copy them securely (1Password, encrypted USB, or team vault) — **never** commit secrets.
- GTM or analytics IDs: check `layout.tsx` / env usage.

---

## 8. Quick verification checklist (second laptop)

- [ ] `git clone` + `cd zapit-website`
- [ ] `npm install`
- [ ] `npm run dev` — home page loads
- [ ] `npm run build` — completes without errors
- [ ] Cursor opened on repo folder; MCP reconfigured if needed
- [ ] Optional: regenerate `netlify-deploy/` and upload to Netlify

---

## 9. Support references

- **Next.js static export:** https://nextjs.org/docs/app/building-your-application/deploying/static-exports  
- **Cursor docs:** https://cursor.com/docs  

---

*Last updated: handoff for second laptop + git push workflow.*
