// ── Page Contexts ──────────────────────────────────────────
export const PAGE_CONTEXTS = {
  sports: {
    url: 'kicker.de/bundesliga/bayern-dortmund-preview',
    title: 'Bayern vs Dortmund: Bundesliga Showdown',
    metaSport: 'football',
    metaCompetition: 'Bundesliga',
    metaTeams: ['Bayern Munich', 'Borussia Dortmund'],
    pageType: 'Match preview',
  },
  casino: {
    url: 'casinoreview.com/best-slots-2026',
    title: 'Top 10 Online Slots 2026',
    metaCategory: 'casino',
    metaSubcategory: 'slots',
    pageType: 'Review / Editorial',
  },
}

// ── Predictions (Streak Game) ──────────────────────────────
export const PREDICTIONS = [
  {
    id: 1,
    question: 'Will Bayern win?',
    options: ['Yes', 'No'],
    teamA: 'Bayern Munich',
    teamB: 'Borussia Dortmund',
  },
  {
    id: 2,
    question: 'Over/Under 2.5 goals?',
    options: ['Over', 'Under'],
    teamA: 'Bayern Munich',
    teamB: 'Borussia Dortmund',
  },
  {
    id: 3,
    question: 'Both teams to score?',
    options: ['Yes', 'No'],
    teamA: 'Bayern Munich',
    teamB: 'Borussia Dortmund',
  },
]

// ── Operators / Prizes ─────────────────────────────────────
export const OPERATORS = {
  tipico: {
    name: 'Tipico',
    prize: '€50 Welcome Bonus',
    type: 'sports',
    market: 'DE',
    color: '#1a365d',
  },
  leovegas: {
    name: 'LeoVegas',
    prize: '100 Free Spins',
    type: 'casino',
    color: '#f97316',
  },
  bet365: {
    name: 'bet365',
    prize: '€30 Odds Boost',
    type: 'sports',
    color: '#047857',
  },
}

// ── Intelligence Panel Scripts ─────────────────────────────
export const INTEL_SCRIPTS = {
  act1: [
    { text: 'Context: Unknown user', color: 'gray' },
    { text: 'Signals: None', color: 'gray' },
    { text: 'Content: Generic / static', color: 'gray' },
    { text: 'Engagement: Passive', color: 'gray' },
  ],

  act2_scan: [
    { text: '🔍 Scanning page...', color: 'blue', delay: 400 },
    { text: `  URL: kicker.de/bundesliga/bayern-dortmund-preview`, color: 'blue', delay: 300 },
    { text: '  <title>: "Bayern vs Dortmund: Bundesliga Showdown"', color: 'blue', delay: 300 },
    { text: '  <meta sport>: football', color: 'blue', delay: 200 },
    { text: '  <meta competition>: Bundesliga', color: 'blue', delay: 200 },
    { text: '  <meta teams>: Bayern Munich, Borussia Dortmund', color: 'blue', delay: 200 },
    { text: '', color: 'none', delay: 400 },
    { text: '✅ Context resolved:', color: 'green', delay: 500 },
    { text: '  Sport: Football', color: 'green', delay: 200 },
    { text: '  Match: Bayern München vs Borussia Dortmund', color: 'green', delay: 200 },
    { text: '  Competition: Bundesliga', color: 'green', delay: 200 },
    { text: '  Page type: Match preview', color: 'green', delay: 200 },
    { text: '', color: 'none', delay: 300 },
    { text: '🎮 Loading: Sports Streak Mode', color: 'gold', delay: 400 },
    { text: '  Prize pool: Tipico Welcome Bonus (€50)', color: 'gold', delay: 300 },
    { text: '', color: 'none', delay: 300 },
    { text: '📡 Ad slot detected: 300×250 placeholder', color: 'blue', delay: 400 },
    { text: '→ Replacing with: Bayern vs BVB match odds (Tipico)', color: 'orange', delay: 300 },
    { text: '→ Ad activated ✅', color: 'green', delay: 200 },
  ],

  act2_scan_casino: [
    { text: '🔍 Scanning page...', color: 'blue', delay: 400 },
    { text: '  URL: casinoreview.com/best-slots-2026', color: 'blue', delay: 300 },
    { text: '  <title>: "Top 10 Online Slots 2026"', color: 'blue', delay: 300 },
    { text: '  <meta category>: casino', color: 'blue', delay: 200 },
    { text: '  <meta subcategory>: slots', color: 'blue', delay: 200 },
    { text: '', color: 'none', delay: 400 },
    { text: '✅ Context resolved:', color: 'green', delay: 500 },
    { text: '  Category: Casino', color: 'green', delay: 200 },
    { text: '  Subcategory: Slots / Online Gaming', color: 'green', delay: 200 },
    { text: '  Page type: Review / Editorial', color: 'green', delay: 200 },
    { text: '', color: 'none', delay: 300 },
    { text: '📡 Ad slot detected: 300×250 placeholder', color: 'blue', delay: 400 },
    { text: '→ Replacing with: LeoVegas exclusive bonus', color: 'orange', delay: 300 },
    { text: '→ Ad activated ✅', color: 'green', delay: 200 },
    { text: '', color: 'none', delay: 300 },
    { text: '🎰 Loading: Casino Spin Mode', color: 'gold', delay: 400 },
    { text: '  Prize pool: LeoVegas Free Spins (100)', color: 'gold', delay: 300 },
  ],

  act4_return: [
    { text: '📋 Returning user detected', color: 'green', delay: 500 },
    { text: '  Last visit: Yesterday', color: 'blue', delay: 300 },
    { text: '  Pending predictions: 3', color: 'blue', delay: 200 },
    { text: '', color: 'none', delay: 400 },
    { text: '⚽ Match result: Bayern 3-1 Dortmund', color: 'green', delay: 500 },
    { text: '', color: 'none', delay: 300 },
    { text: '🔍 Evaluating predictions...', color: 'blue', delay: 500 },
    { text: '  ✅ Prediction 1: "Will Bayern win?" → Yes → CORRECT', color: 'green', delay: 400 },
    { text: '  ✅ Prediction 2: "Over 2.5 goals?" → Over → CORRECT (4 goals)', color: 'green', delay: 400 },
    { text: '  ✅ Prediction 3: "Both teams score?" → Yes → CORRECT', color: 'green', delay: 400 },
    { text: '', color: 'none', delay: 300 },
    { text: '🎯 PERFECT STREAK: 3/3', color: 'gold', delay: 500 },
    { text: '', color: 'none', delay: 300 },
    { text: '→ Trigger: Bonus reveal', color: 'orange', delay: 300 },
    { text: '→ Selected: Tipico Welcome Bonus (€50)', color: 'orange', delay: 200 },
    { text: '→ Reason: GEO=DE, Sport=Football, Operator match=Tipico', color: 'orange', delay: 200 },
    { text: '→ CPA tracking: Activated', color: 'orange', delay: 200 },
  ],

  act5_vision: [
    { text: '👤 User profile loaded:', color: 'green', delay: 500 },
    { text: '  Name: Carlos Vargas', color: 'green', delay: 300 },
    { text: '  Favourite team: CR Flamengo 🔴⚫', color: 'green', delay: 300 },
    { text: '  Bet preference: Combi / Accumulator', color: 'green', delay: 200 },
    { text: '  Casino preference: Aviator (crash game)', color: 'green', delay: 200 },
    { text: '  Segment: Sports + Casino crossover', color: 'blue', delay: 300 },
    { text: '', color: 'none', delay: 400 },
    { text: '🧠 Personalisation engine:', color: 'gold', delay: 500 },
    { text: '  → Ads: Flamengo combi bet (Tipico)', color: 'orange', delay: 300 },
    { text: '  → PULSE game: Tailored to Flamengo match', color: 'orange', delay: 300 },
    { text: '  → Greeting: "Welcome back, Carlos"', color: 'orange', delay: 200 },
    { text: '  → Cross-sell: Aviator bonus in sports context', color: 'orange', delay: 200 },
    { text: '', color: 'none', delay: 300 },
    { text: '📡 Ad slot personalised:', color: 'blue', delay: 400 },
    { text: '→ Replacing generic ad with: Carlos-specific Flamengo offer', color: 'orange', delay: 300 },
    { text: '→ Ad activated ✅', color: 'green', delay: 200 },
  ],

  act5_vision_casino: [
    { text: '👤 User profile loaded:', color: 'green', delay: 500 },
    { text: '  Name: Carlos Vargas', color: 'green', delay: 300 },
    { text: '  Favourite team: CR Flamengo 🔴⚫', color: 'green', delay: 200 },
    { text: '  Bet preference: Combi / Accumulator', color: 'green', delay: 200 },
    { text: '  Casino preference: Aviator (crash game)', color: 'green', delay: 200 },
    { text: '  Segment: Sports + Casino crossover', color: 'blue', delay: 300 },
    { text: '', color: 'none', delay: 400 },
    { text: '🧠 Personalisation engine:', color: 'gold', delay: 500 },
    { text: '  → Ads: Aviator exclusive bonus (LeoVegas)', color: 'orange', delay: 300 },
    { text: '  → PULSE game: Aviator-themed challenge', color: 'orange', delay: 300 },
    { text: '  → Greeting: "Welcome back, Carlos"', color: 'orange', delay: 200 },
    { text: '  → Cross-sell: Flamengo bet in casino context', color: 'orange', delay: 200 },
    { text: '', color: 'none', delay: 300 },
    { text: '📡 Ad slot personalised:', color: 'blue', delay: 400 },
    { text: '→ Replacing generic ad with: Carlos-specific Aviator offer', color: 'orange', delay: 300 },
    { text: '→ Ad activated ✅', color: 'green', delay: 200 },
  ],

  act6_summary: [
    { text: 'Auto-configured:', color: 'green', delay: 300 },
    { text: '  ✅ Page context detection', color: 'green', delay: 200 },
    { text: '  ✅ Sport / Casino mode selection', color: 'green', delay: 200 },
    { text: '  ✅ Prize catalog (GEO-filtered)', color: 'green', delay: 200 },
    { text: '  ✅ Session profiling', color: 'green', delay: 200 },
    { text: '  ✅ CPA tracking', color: 'green', delay: 200 },
    { text: '  ✅ Operator deeplinks', color: 'green', delay: 200 },
    { text: '', color: 'none', delay: 400 },
    { text: 'Publisher effort: Zero configuration', color: 'gold', delay: 300 },
    { text: 'E2 prize cost: €0', color: 'gold', delay: 200 },
    { text: 'Revenue: CPA on operator conversion', color: 'gold', delay: 200 },
  ],
}

// Prediction signal lines (appended dynamically during Act 3)
export const predictionSignals = (index, question, answer, correct) => [
  { text: '', color: 'none', delay: 200 },
  {
    text: `Prediction ${index + 1}/3: ${question} → ${answer} ${correct ? '✅' : '❌'}`,
    color: correct ? 'green' : 'orange',
    delay: 300,
  },
  { text: `  Streak: ${correct ? index + 1 : index}/3`, color: 'blue', delay: 200 },
  {
    text: `  Signal: ${
      index === 0
        ? 'Prefers Bayern, bullish'
        : index === 1
          ? 'Expects high-scoring match'
          : 'Believes in open game'
    }`,
    color: 'blue',
    delay: 200,
  },
]

export const streakCompleteSignals = [
  { text: '', color: 'none', delay: 200 },
  { text: '  Streak: 3/3 → 🎯 MILESTONE REACHED', color: 'gold', delay: 400 },
  { text: '', color: 'none', delay: 300 },
  { text: '→ Trigger: Bonus reveal', color: 'orange', delay: 300 },
  { text: '→ Selected: Tipico Welcome Bonus (€50)', color: 'orange', delay: 200 },
  { text: '→ Reason: GEO=DE, Sport=Football, Operator match=Tipico', color: 'orange', delay: 200 },
  { text: '→ CPA tracking: Activated', color: 'orange', delay: 200 },
]

