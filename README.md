# Anytime Music Studio — Studio Assistant

A premium, mobile-first one-page web app that onboards artists at
**Anytime Music Studio**. Scanned from a QR code inside the studio, it
welcomes visitors, walks them through the house rules, unlocks the studio
WiFi once the rules are accepted, and gives them everything they need to
run a session on their own — guides, troubleshooting and support.

Built with **Astro**, minimal JavaScript, semantic + accessible HTML and
a dark, rose-gradient look inspired by Apple's restraint.

---

## Quick start

```bash
npm install
cp .env.example .env    # fill in the real studio values
npm run dev             # http://localhost:4321
npm run build           # static output in dist/
npm run preview         # preview the production build
```

The build is fully static — deploy `dist/` to any static host
(Netlify, Vercel, Cloudflare Pages, S3, …).

---

## ⚙️ Configuration — one place to edit

Everything practical lives in **`src/config/`**:

| File | What it holds |
| --- | --- |
| `studio.ts` | Studio name, headings, WiFi credentials, WhatsApp number, support email, issue-form endpoint. Reads from env vars. |
| `houseRules.ts` | The list of house rules (icon + title + one line each). |
| `howTo.ts` | The "How To" guides and their step-by-step content. |
| `troubleshooting.ts` | The troubleshooting quick-answers. |

### Environment variables (`.env`)

Secrets are **not** committed. Copy `.env.example` → `.env`:

| Variable | Purpose |
| --- | --- |
| `WIFI_SSID` | Network name |
| `WIFI_PASSWORD` | Network password — build-side only, never rendered as text |
| `WIFI_ENCRYPTION` | `WPA` \| `WEP` \| `nopass` |
| `WIFI_HIDDEN` | `true` for hidden networks |
| `PUBLIC_WHATSAPP_NUMBER` | Support WhatsApp number, digits only (intl format) |
| `PUBLIC_SUPPORT_EMAIL` | Support email shown on the Help screen |
| `PUBLIC_ISSUE_FORM_ENDPOINT` | Optional POST endpoint for the "Report an issue" form |

> Variables **without** the `PUBLIC_` prefix are only available at build
> time and never shipped to the browser as readable text.

---

## 🔐 How the WiFi flow works

The password is **never printed on the page**. When a visitor accepts the
house rules and taps **Connect to WiFi**, they get:

1. **A `WIFI:` QR code**, generated at *build time* from the env
   credentials. iPhone (iOS 11+) and Android cameras read it and offer a
   one-tap join — the password lives only inside the QR image's pixels.
2. **A "Copy password" fallback** for the same phone the page is open on
   (a phone can't scan its own screen). The password is base64-encoded in
   the markup and copied straight to the clipboard — never shown on screen.

Because browsers and iOS/Android forbid websites from silently joining
networks, the QR *is* the closest thing to a native join flow, with the
clipboard copy as a graceful fallback.

To change the network, edit `WIFI_SSID` / `WIFI_PASSWORD` in `.env` and
rebuild — the QR regenerates automatically.

---

## 🧩 Components

Reusable Astro components in `src/components/`:

| Component | Role |
| --- | --- |
| `HouseRule.astro` | A single house-rule card |
| `ActionCard.astro` | Large tappable hub card (How To / Need help) |
| `HowToGuide.astro` | An expandable How-To guide with flexible content blocks |
| `TroubleshootingItem.astro` | A troubleshooting accordion row |
| `SupportForm.astro` | The "Report an issue" form (endpoint or mail/WhatsApp fallback) |
| `WiFiConnect.astro` | Agreement checkbox + gated WiFi QR / copy flow |
| `Nav.astro` | iOS-style bottom tab bar (Home / How To / Help) |
| `Icon.astro` | Inline stroke-icon set |
| `Waveform.astro` | Subtle animated equaliser accent |

---

## ✍️ Editing content later

- **Add a house rule** → append to `houseRules.ts`. Pick an `icon` key from
  `Icon.astro` (or add a new one there).
- **Fill in a How To guide** → replace the `TODO` blocks in `howTo.ts`.
  Each guide accepts `text`, `steps`, `note` (tip/warning), `image` and
  `video` blocks, so you can drop in real instructions, photos and tutorial
  videos without touching any component.
- **Add troubleshooting answers** → edit the `steps` arrays in
  `troubleshooting.ts`.

The content model is intentionally list-driven so the site is easy to
expand with **additional studios, rooms and instructions** later.

---

## ♿ Accessibility & performance

- Semantic landmarks, labelled controls, visible focus states.
- Respects `prefers-reduced-motion`.
- Accessible contrast on the dark theme.
- No web fonts, tiny JS footprint, static output → excellent mobile
  performance.

---

## 🎨 Brand

Rose gradient sampled from the studio logo over near-black surfaces.
Tokens live at the top of `src/styles/global.css` — adjust `--rose-*`,
surfaces and radii there to retune the whole look.
