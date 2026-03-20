# PULSE Board Demo — Build Brief

**Context:** Demo for E2 board meeting Monday 2026-03-24. Carlos (CPO) presents PULSE — a new engagement layer for publisher sites that converts passive audiences into qualified operator leads via game mechanics. ~7 minute walkthrough.

**Goal:** A clickable, interactive demo that tells the PULSE story. No slides — the demo IS the presentation. All data is mocked. No live APIs.

**Tech:** Single-page web app. Vanilla HTML/CSS/JS or lightweight framework (Alpine.js, React — fastest wins). Tailwind for styling. No backend. localStorage for session state. Must run locally.

---

## Screen Layout

**Left (~65%):** Mock publisher page with PULSE widget embedded. This is "what the user sees."

**Right (~35%):** "What PULSE sees" — intelligence panel. Shows detected context, user signals, decisions being made. Makes the invisible logic visible. Should feel like a polished live system monitor (monospace data, color-coded signals), not raw dev tools.

**Bottom (floating overlay):** Presenter Control Panel. Semi-transparent, glassmorphism dark style. Docked at bottom or draggable. Has a minimize/collapse button for clean screenshot moments.

---

## Presenter Control Panel (Overlay)

Visual buttons, clearly labeled. NOT keyboard shortcuts.

| Button | Action |
|--------|--------|
| **Reset** | Clear all state. Fresh user, no session, widget resets |
| **Sports Page** | Switch left side to mock sports article |
| **Casino Page** | Switch left side to mock casino review |
| **→ Win** | Force next game outcome to WIN |
| **→ Lose** | Force next game outcome to LOSE |
| **→ Near Miss** | Force wheel to land just past jackpot |
| **Fast Forward** | Auto-complete 3/3 winning streak instantly |
| **Toggle Panel** | Show/hide the intelligence panel |
| **Act 1–6** | Jump to specific act in the presentation |
| **Minimize** | Collapse overlay to a small tab |

---

## Presentation Flow (6 Acts)

### Act 1: "The Problem"

**Left:** Mock Kicker-style Bundesliga article page (Bayern vs Dortmund). Static. Generic banner ads in sidebar. A basic odds table. Feels like today's E2 — functional, not engaging.

**Right panel shows:**
```
Context: Unknown user
Signals: None
Content: Generic / static
Engagement: Passive
```

**Presenter narrative:** "This is what E2 delivers today. Every user gets the same thing. No engagement, no intelligence."

→ Presenter clicks **Act 2** (or an "Activate PULSE" button on the mock page).

---

### Act 2: "Smart Context"

**Left:** A PULSE widget bubble appears bottom-right of the mock page. Opens automatically.

**Right panel animates** — signals appear sequentially with slight delays (typewriter/fade-in effect):
```
🔍 Scanning page...
  URL: kicker.de/bundesliga/bayern-dortmund-preview
  <title>: "Bayern vs Dortmund: Bundesliga Showdown"
  <meta sport>: football
  <meta competition>: Bundesliga
  <meta teams>: Bayern Munich, Borussia Dortmund

✅ Context resolved:
  Sport: Football
  Match: Bayern München vs Borussia Dortmund
  Competition: Bundesliga
  Page type: Match preview

🎮 Loading: Sports Streak Mode
  Prize pool: Tipico Welcome Bonus (€50)
```

**Left widget:** Streak game appears, pre-loaded with Bayern vs Dortmund content.

**Narrative:** "One embed code. The widget reads the page and decides what to show. Zero publisher configuration."

---

### Act 3: "The Game — Sports Streak"

**Left widget:** Interactive streak prediction game. Three prediction cards:
1. "Will Bayern win?" → Yes / No
2. "Over/Under 2.5 goals?" → Over / Under
3. "Both teams to score?" → Yes / No

Each card has team badges (mock), clean sports UI. User clicks to predict.

**Right panel updates after each prediction:**
```
Prediction 1/3: Bayern to win → YES ✅
  Streak: 1/3
  Signal: Prefers Bayern, bullish

Prediction 2/3: Over 2.5 goals → OVER ✅
  Streak: 2/3
  Signal: Expects high-scoring match

Prediction 3/3: BTTS → YES ✅
  Streak: 3/3 → 🎯 MILESTONE REACHED

→ Trigger: Bonus reveal
→ Selected: Tipico Welcome Bonus (€50)
→ Reason: GEO=DE, Sport=Football, Operator match=Tipico
→ CPA tracking: Activated
```

**Left widget:** Celebration animation (confetti, glow) → bonus reveal card:
> 🎉 "You've earned a €50 Tipico Welcome Bonus!"
> [Claim Now →]
> "Register at Tipico to claim. 18+ | T&Cs apply."

Clicking "Claim Now" → email submit gate → "Redirecting to Tipico..." confirmation.

**Demo replay using overlay:**
1. First run: Use **→ Win** 3x → full streak → bonus reveal (the happy path)
2. **Reset** → replay with **→ Lose** on prediction 2:
   > "Almost! 1/3 correct. Come back tomorrow for a new streak."
   > (No bonus wasted. Retention hook.)

**Narrative:** "User plays for free. E2 pays nothing — the prize IS the operator's existing sign-up bonus. We earn CPA when they convert. If they lose, they come back tomorrow."

---

### Act 4: "Casino — New Revenue Stream"

Presenter clicks **Casino Page**.

**Left:** Page morphs to a mock casino review site. Darker theme, casino aesthetic. "CasinoReview.com — Best Online Slots 2026."

**Right panel animates:**
```
🔍 Scanning page...
  URL: casinoreview.com/best-slots-2026
  <title>: "Top 10 Online Slots 2026"
  <meta category>: casino
  <meta subcategory>: slots

✅ Context resolved:
  Category: Casino
  Subcategory: Slots / Online Gaming
  Page type: Review / Editorial

🎰 Loading: Casino Challenge Mode
  Prize pool: LeoVegas 100 Free Spins
```

**Left widget:** Same PULSE widget frame, now casino-themed. A spin-to-win wheel with segments: "100 Free Spins", "50 Free Spins", "Try Again", "25 Free Spins", "Try Again", "JACKPOT: 500 Free Spins".

The wheel should feel physical — momentum, deceleration, realistic stop.

**Demo replay:**
1. **→ Near Miss**: Wheel stops just past jackpot → "So close! Come back tomorrow for another spin." (retention)
2. **Reset** → **→ Win**: Wheel lands on "100 Free Spins" → celebration → email gate → "Redirecting to LeoVegas..."

**Right panel on win:**
```
🎰 Spin result: 100 Free Spins
→ Trigger: Casino bonus reveal
→ Selected: LeoVegas Free Spins (100)
→ Reason: Category=Casino, Subcategory=Slots
→ CPA tracking: Activated
→ Signal: Casino-engaged user
```

**Narrative:** "E2 has never activated casino audiences. Same widget, same infrastructure. The page context switches the mechanic automatically. This is a new revenue stream."

---

### Act 5: "It Remembers" (stretch goal)

Presenter clicks **Sports Page** to go back to the Bundesliga article.

**Right panel:**
```
📋 Session profile loaded:
  Sport: Football (Bundesliga)
  Team affinity: Bayern Munich (2 predictions)
  Casino: Engaged (1 spin, LeoVegas)
  Segment: Sports + Casino crossover

→ Personalising widget...
→ Content: Bayern-specific
→ Cross-sell: Casino bonus in sports context
```

**Left widget:** Instead of generic streak, shows:
> "Welcome back! Bayern plays Friday — predict the score and earn an odds boost."
> Below: "🎰 Your LeoVegas bonus is waiting — claim 100 Free Spins"

**Narrative:** "Every interaction makes the next one smarter. Sports signals improve casino offers. Casino engagement feeds back into sports. One profile, smarter every visit."

---

### Act 6: "One Line of Code"

Presenter clicks **Act 6**.

**Left:** An overlay appears over the mock page showing the embed code:

```html
<!-- PULSE by E2 — that's it. -->
<script src="https://pulse.e2.at/widget.js"
        data-publisher="kicker"
        data-geo="DE">
</script>
```

**Right panel:**
```
Auto-configured:
  ✅ Page context detection
  ✅ Sport / Casino mode selection
  ✅ Prize catalog (GEO-filtered)
  ✅ Session profiling
  ✅ CPA tracking
  ✅ Operator deeplinks

Publisher effort: Zero configuration
E2 prize cost: €0
Revenue: CPA on operator conversion
```

**Narrative:** "Zero config for publishers. One script tag. PULSE handles everything."

---

## Mock Data

**Sports predictions:**
- Bayern München vs Borussia Dortmund (Bundesliga)
- Real Madrid vs Barcelona (La Liga)
- Liverpool vs Arsenal (Premier League)

**Operators / prizes:**
- Tipico: €50 Welcome Bonus (sports, DE market)
- LeoVegas: 100 Free Spins (casino)
- bet365: €30 Odds Boost (sports, generic)

**Page contexts:**
- Sports: kicker.de/bundesliga/bayern-vs-dortmund — football, Bundesliga, teams
- Casino: casinoreview.com/best-online-slots-2026 — casino, slots, editorial

---

## Visual Design

- **Mock publisher pages:** Realistic but obviously mock. Neutral sports article styling for sports page, dark casino theme for casino page. Don't impersonate real brands — generic styling that evokes the context.
- **PULSE widget:** Chat-window style (~350×500px), floating bottom-right. Rounded corners, smooth animations. Clean and modern — sports app feel, not banner ad.
- **Intelligence panel:** Monospace for data. Color-coded: green = resolved context, blue = user signals, gold = prize triggers, orange = CPA events. Sequential animation (typewriter/fade-in) — NOT all dumped at once.
- **Celebrations:** Confetti, glow, scale-bounce on bonus reveals. Satisfying micro-animations at emotional peaks.
- **Spin wheel:** Physical feel — momentum, deceleration, tick sounds optional.
- **Presenter overlay:** Glassmorphism dark, clearly distinct from demo content. Minimizable.

---

## What NOT to build

- No backend / API calls
- No real authentication or operator deeplinks
- No mobile responsiveness (laptop presentation only)
- No real MCP integration — all context is simulated
- Don't spend time on mock article body content (lorem ipsum is fine)
- No real operator logos needed — clean placeholders with operator name

## Priority order if running low on time

1. **Presenter overlay + act navigation** (skeleton for the whole flow)
2. **Act 2: Context detection animation on the right panel** (the "smart" moment)
3. **Act 3: Sports streak game + forced outcomes + bonus reveal** (the money story)
4. **Act 4: Casino spin-to-win + page context switch** (the new revenue story)
5. **Act 1: Static "before" state** (easy starting point)
6. **Act 6: Embed code overlay** (styled code block, quick)
7. **Act 5: Session memory** (skip if running out of time)
