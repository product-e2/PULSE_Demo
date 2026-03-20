# PULSE Board Demo — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a clickable, interactive single-page demo that tells the PULSE story across 6 acts for the E2 board meeting on 2026-03-24.

**Architecture:** Vite + React SPA with Tailwind CSS. Split-screen layout: left (65%) shows mock publisher page with embedded PULSE widget, right (35%) shows intelligence panel. Floating presenter overlay at bottom. All state managed via React Context — no backend, localStorage for session persistence. Act-based state machine drives the entire flow.

**Tech Stack:** Vite, React 18, Tailwind CSS 3, Framer Motion (animations), canvas-confetti

---

## File Structure

```
src/
  main.jsx                          # Entry point
  App.jsx                           # Root layout: left/right panels + overlay
  index.css                         # Tailwind directives + global styles

  state/
    DemoContext.jsx                  # Central state machine (act, page, predictions, outcomes, session)

  data/
    mockData.js                     # Teams, operators, prizes, page contexts

  components/
    layout/
      LeftPanel.jsx                 # Publisher page container (65%)
      RightPanel.jsx                # Intelligence panel container (35%)
      PresenterOverlay.jsx          # Bottom floating control bar

    pages/
      SportsPage.jsx                # Mock Kicker Bundesliga article
      CasinoPage.jsx                # Mock casino review site

    widget/
      PulseWidget.jsx               # Floating widget shell (chat-window style)
      StreakGame.jsx                 # Sports: 3 prediction cards
      SpinWheel.jsx                 # Casino: spin-to-win wheel (canvas)
      BonusReveal.jsx               # Celebration + bonus card
      EmailGate.jsx                 # Email capture + redirect confirmation
      PersonalizedWidget.jsx        # Act 5: returning user content

    intelligence/
      IntelligencePanel.jsx         # Right panel orchestrator per act
      TypewriterBlock.jsx           # Animated line-by-line text reveal

    overlay/
      EmbedCodeOverlay.jsx          # Act 6: code snippet display

    shared/
      Confetti.jsx                  # canvas-confetti wrapper
```

---

## Chunk 1: Scaffolding + State + Layout

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

- [ ] **Step 1: Initialize Vite + React project**

```bash
cd /Users/carlosvargas/Projects/PULSE_Demo
pnpm create vite . --template react
pnpm install
pnpm add tailwindcss @tailwindcss/vite framer-motion canvas-confetti
```

- [ ] **Step 2: Configure Tailwind via Vite plugin**

In `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

In `src/index.css`:
```css
@import "tailwindcss";
```

- [ ] **Step 3: Verify dev server runs**

```bash
pnpm dev
```
Expected: Vite dev server starts on localhost:5173

- [ ] **Step 4: Commit**

```bash
git init && git add -A && git commit -m "chore: scaffold Vite + React + Tailwind project"
```

---

### Task 2: Mock Data

**Files:**
- Create: `src/data/mockData.js`

- [ ] **Step 1: Create mock data file**

All teams, operators, prizes, page context definitions, prediction questions, wheel segments. This is the single source of truth for all demo content.

Key structures:
- `PAGE_CONTEXTS` — sports and casino page metadata (URL, title, meta tags)
- `PREDICTIONS` — 3 prediction cards for streak game (question, options, teams)
- `WHEEL_SEGMENTS` — spin wheel segments with labels, colors, angles
- `OPERATORS` — Tipico, LeoVegas, bet365 with prize info
- `INTELLIGENCE_SCRIPTS` — per-act arrays of `{ text, color, delay }` lines for the typewriter panel

- [ ] **Step 2: Commit**

---

### Task 3: Central State Machine (DemoContext)

**Files:**
- Create: `src/state/DemoContext.jsx`

- [ ] **Step 1: Define state shape and actions**

State:
```js
{
  currentAct: 1,           // 1-6
  pageType: 'sports',      // 'sports' | 'casino'
  widgetVisible: false,
  panelVisible: true,
  overlayMinimized: false,
  forcedOutcome: null,      // 'win' | 'lose' | 'nearMiss' | null
  predictions: [],          // [{question, answer, correct}]
  streakComplete: false,
  spinResult: null,
  bonusRevealed: false,
  emailSubmitted: false,
  sessionProfile: {         // Built up across acts
    sport: null,
    teamAffinity: null,
    casinoEngaged: false,
    segment: null
  },
  intelligenceLines: [],    // Lines currently displayed in right panel
  animatingIntelligence: false
}
```

Actions:
- `setAct(n)` — jump to act, reset relevant state, set pageType
- `setPageType(type)` — switch page context
- `forceOutcome(type)` — set forced outcome for next interaction
- `submitPrediction(prediction)` — record prediction, check against forced outcome
- `completeSpin(result)` — record spin result
- `revealBonus()` — trigger celebration
- `submitEmail()` — mark email submitted
- `resetAll()` — clear everything back to Act 1
- `fastForward()` — auto-complete 3/3 streak with wins
- `togglePanel()` — show/hide intelligence panel
- `minimizeOverlay()` — collapse presenter overlay
- `addIntelligenceLine(line)` — append animated line to panel

- [ ] **Step 2: Implement as React Context with useReducer**

- [ ] **Step 3: Commit**

---

### Task 4: Layout Shell

**Files:**
- Create: `src/App.jsx`, `src/components/layout/LeftPanel.jsx`, `src/components/layout/RightPanel.jsx`, `src/components/layout/PresenterOverlay.jsx`

- [ ] **Step 1: Build App.jsx — root layout**

Flexbox row: LeftPanel (65%) + RightPanel (35%). PresenterOverlay absolutely positioned at bottom. DemoProvider wraps everything.

- [ ] **Step 2: Build LeftPanel.jsx**

Renders SportsPage or CasinoPage based on `pageType`. Contains the PulseWidget when `widgetVisible`.

- [ ] **Step 3: Build RightPanel.jsx**

Dark background, monospace font. Renders IntelligencePanel. Slide-in/out animation based on `panelVisible`.

- [ ] **Step 4: Build PresenterOverlay.jsx**

Glassmorphism dark bar. Buttons: Reset, Sports Page, Casino Page, → Win, → Lose, → Near Miss, Fast Forward, Toggle Panel, Act 1–6, Minimize. Each dispatches to DemoContext.

- [ ] **Step 5: Verify layout renders with placeholder content**

- [ ] **Step 6: Commit**

---

## Chunk 2: Mock Pages + Intelligence Panel

### Task 5: Sports Page (Act 1 "before" state)

**Files:**
- Create: `src/components/pages/SportsPage.jsx`

- [ ] **Step 1: Build mock Kicker-style Bundesliga article**

Layout:
- Header bar with "Kicker.de" branding (generic)
- Breadcrumb: Bundesliga > Bayern vs Dortmund
- Article title: "Bayern vs Dortmund: Bundesliga Showdown"
- Subtitle with date, author
- Hero image placeholder (gradient with team colors)
- Article body: 2-3 paragraphs of lorem ipsum sports text
- Sidebar: generic banner ad placeholder + static odds table (Bayern 1.85 | Draw 3.60 | Dortmund 4.20)
- Muted, functional styling — "today's E2, not engaging"

- [ ] **Step 2: Commit**

---

### Task 6: Casino Page

**Files:**
- Create: `src/components/pages/CasinoPage.jsx`

- [ ] **Step 1: Build mock casino review site**

Dark theme. "CasinoReview.com" branding. "Best Online Slots 2026" title. Grid of slot game cards with placeholders. Sidebar with operator ratings. Casino aesthetic — dark bg, gold accents.

- [ ] **Step 2: Commit**

---

### Task 7: Intelligence Panel + Typewriter Animation

**Files:**
- Create: `src/components/intelligence/IntelligencePanel.jsx`, `src/components/intelligence/TypewriterBlock.jsx`

- [ ] **Step 1: Build TypewriterBlock component**

Accepts an array of `{text, color, delay}` lines. Renders them sequentially with fade-in + typewriter effect using Framer Motion. Colors: green (context), blue (signals), gold (prizes), orange (CPA). Monospace font.

- [ ] **Step 2: Build IntelligencePanel**

Reads `currentAct` from context. For each act, feeds the appropriate intelligence script to TypewriterBlock. Clears and re-animates when act changes. Shows the "static" state for Act 1 (unknown user, no signals).

- [ ] **Step 3: Verify animation timing feels good (200-400ms per line)**

- [ ] **Step 4: Commit**

---

## Chunk 3: PULSE Widget + Streak Game (Acts 2-3)

### Task 8: PULSE Widget Shell

**Files:**
- Create: `src/components/widget/PulseWidget.jsx`

- [ ] **Step 1: Build floating widget container**

Chat-window style, ~350×500px, floating bottom-right of the left panel. Rounded corners, shadow, smooth open/close animation (scale + fade). Header with "PULSE" branding. Body renders child content based on current act/state. Starts hidden, appears in Act 2.

- [ ] **Step 2: Add bubble trigger button (PULSE logo circle)**

Small floating circle that opens the widget on click. Auto-opens in Act 2.

- [ ] **Step 3: Commit**

---

### Task 9: Streak Game (Act 3)

**Files:**
- Create: `src/components/widget/StreakGame.jsx`

- [ ] **Step 1: Build 3 prediction cards**

Cards:
1. "Will Bayern win?" — Yes / No (team badges as placeholders)
2. "Over/Under 2.5 goals?" — Over / Under
3. "Both teams to score?" — Yes / No

Each card: question text, two option buttons, progress indicator (1/3, 2/3, 3/3). Cards reveal one at a time. Selected option highlights. After selection, card shows result (✅ or ❌) based on `forcedOutcome` from context.

- [ ] **Step 2: Wire up forced outcomes**

If `forcedOutcome === 'win'`, prediction is always correct. If `forcedOutcome === 'lose'`, prediction is wrong. If null, random. Each prediction dispatches to context and triggers intelligence panel update.

- [ ] **Step 3: Handle streak completion**

At 3/3 correct → trigger `revealBonus()`. At any miss → show "Almost! X/3 correct. Come back tomorrow." message.

- [ ] **Step 4: Commit**

---

### Task 10: Bonus Reveal + Email Gate

**Files:**
- Create: `src/components/widget/BonusReveal.jsx`, `src/components/widget/EmailGate.jsx`, `src/components/shared/Confetti.jsx`

- [ ] **Step 1: Build Confetti wrapper**

Uses canvas-confetti. Fires on bonus reveal. Multiple bursts for celebration feel.

- [ ] **Step 2: Build BonusReveal**

Triggered after streak complete or spin win. Shows:
- Confetti explosion
- Glow/scale-bounce animation
- "🎉 You've earned a €50 Tipico Welcome Bonus!" (sports) or "100 Free Spins at LeoVegas!" (casino)
- [Claim Now →] button
- "18+ | T&Cs apply" fine print

Claim Now → transitions to EmailGate.

- [ ] **Step 3: Build EmailGate**

Simple email input + submit button. On submit: "Redirecting to Tipico/LeoVegas..." confirmation with checkmark animation. Dispatches `submitEmail()` to context.

- [ ] **Step 4: Commit**

---

## Chunk 4: Casino Mode (Act 4)

### Task 11: Spin-to-Win Wheel

**Files:**
- Create: `src/components/widget/SpinWheel.jsx`

- [ ] **Step 1: Build canvas-based spin wheel**

Segments: "100 Free Spins", "50 Free Spins", "Try Again", "25 Free Spins", "Try Again", "JACKPOT: 500 Free Spins". Each segment has distinct color. Wheel drawn on HTML5 Canvas.

- [ ] **Step 2: Implement spin physics**

Click "SPIN" button. Wheel accelerates, then decelerates with easing (cubic bezier). Tick sounds optional. Final position determined by `forcedOutcome`:
- `win` → lands on "100 Free Spins"
- `nearMiss` → lands just past "JACKPOT" segment (on "Try Again" right after it)
- `lose` → lands on "Try Again"
- `null` → random segment

- [ ] **Step 3: Wire to context**

On stop: dispatch `completeSpin(result)`. If prize segment → trigger BonusReveal flow. If "Try Again" → show "So close! Come back tomorrow for another spin."

- [ ] **Step 4: Commit**

---

## Chunk 5: Acts 5 + 6 + Act Navigation Logic

### Task 12: Act 5 — "It Remembers" (Personalized Widget)

**Files:**
- Create: `src/components/widget/PersonalizedWidget.jsx`

- [ ] **Step 1: Build personalized returning-user widget**

Reads session profile from context. Shows:
- "Welcome back! Bayern plays Friday — predict the score and earn an odds boost."
- Cross-sell: "🎰 Your LeoVegas bonus is waiting — claim 100 Free Spins"
- Tailored to accumulated signals

- [ ] **Step 2: Commit**

---

### Task 13: Act 6 — "One Line of Code" (Embed Overlay)

**Files:**
- Create: `src/components/overlay/EmbedCodeOverlay.jsx`

- [ ] **Step 1: Build code overlay**

Semi-transparent overlay on the left panel. Shows:
```html
<!-- PULSE by E2 — that's it. -->
<script src="https://pulse.e2.at/widget.js"
        data-publisher="kicker"
        data-geo="DE">
</script>
```
Syntax-highlighted code block. Clean, dramatic reveal.

- [ ] **Step 2: Commit**

---

### Task 14: Act Navigation State Machine

**Files:**
- Modify: `src/state/DemoContext.jsx`

- [ ] **Step 1: Wire act transitions**

Each `setAct(n)` must:
- **Act 1:** Hide widget. Sports page. Static intelligence (no signals).
- **Act 2:** Show widget bubble → auto-open. Trigger intelligence scan animation. Load streak game.
- **Act 3:** Widget shows streak game. Intelligence updates per prediction.
- **Act 4:** Switch to casino page. Widget switches to spin wheel. Intelligence re-scans.
- **Act 5:** Switch back to sports. Widget shows personalized content. Intelligence shows session profile.
- **Act 6:** Show embed code overlay. Intelligence shows summary checklist.

- [ ] **Step 2: Wire presenter buttons**

Each overlay button dispatches correct action. "Fast Forward" auto-completes streak with 3 wins + bonus reveal.

- [ ] **Step 3: Commit**

---

## Chunk 6: Polish + Deploy

### Task 15: Visual Polish

- [ ] **Step 1: Intelligence panel color coding and timing**

Green (✅ context), blue (🔍 signals), gold (🎯 prizes), orange (→ CPA). Ensure sequential animation with proper delays (200-400ms between lines).

- [ ] **Step 2: Widget animations**

Smooth open/close. Card flip/slide on predictions. Scale-bounce on bonus reveal. Framer Motion throughout.

- [ ] **Step 3: Page transition animations**

Smooth crossfade between sports/casino pages. Widget content transitions.

- [ ] **Step 4: Presenter overlay glassmorphism**

`backdrop-filter: blur(16px)`, semi-transparent dark bg, subtle border. Minimize/expand animation.

- [ ] **Step 5: Commit**

---

### Task 16: Local Run Verification + Deploy

- [ ] **Step 1: Full walkthrough test**

Run through all 6 acts. Test every presenter button. Verify forced outcomes work. Check animations.

- [ ] **Step 2: Build for production**

```bash
pnpm build
pnpm preview
```

- [ ] **Step 3: Deploy to Vercel (optional)**

```bash
npx vercel --prod
```

- [ ] **Step 4: Final commit**

```bash
git add -A && git commit -m "feat: PULSE board demo complete"
```
