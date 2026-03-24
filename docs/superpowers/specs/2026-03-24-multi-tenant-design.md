# Multi-Tenant Demo Design

## Summary

Add tenant support to the PULSE Demo so the same app can present different publisher skins (E2 Sports, Kicker, LiveScore) based on a hash fragment in the URL. Tenants are identified by short, non-obvious hash codes so that sharing a URL with one client doesn't expose another client's demo.

## Tenants

| Tenant | URL | Skin |
|--------|-----|------|
| E2 Sports (default) | `/` | Current Kicker layout with logo/name changed to "E2 Sports" |
| Kicker | `/#/a1b2c3` | Current look, unchanged |
| LiveScore | `/#/x9y8z7` | LiveScore news article layout (dark theme) |

All tenants share the same demo content (Bayern vs Dortmund), PULSE widget, intelligence panel, demo acts, and casino page.

## Architecture

### New Files

1. **`src/tenants/tenants.js`** — Tenant configuration registry
2. **`src/tenants/TenantContext.jsx`** — React context provider that reads hash, resolves tenant, provides config
3. **`src/components/pages/LiveScoreSportsPage.jsx`** — LiveScore-specific sports article layout

### Modified Files

1. **`src/App.jsx`** — Wrap with `TenantProvider` (outside DemoProvider)
2. **`src/components/layout/LeftPanel.jsx`** — Use tenant to select SportsPage variant
3. **`src/components/pages/SportsPage.jsx`** — Parameterize logo/name/colors via tenant config
4. **`src/data/mockData.js`** — Convert `INTEL_SCRIPTS` to factory function `getIntelScripts(tenant, pageType)`
5. **`src/components/intelligence/IntelligencePanel.jsx`** — Consume `useTenant()` and call `getIntelScripts(tenant, pageType)` instead of importing static `INTEL_SCRIPTS`
6. **`src/components/layout/PresenterOverlay.jsx`** — Add small tenant indicator badge

### Tenant Config Shape (`tenants.js`)

```js
export const TENANTS = {
  e2sports: {
    id: 'e2sports',
    name: 'E2 Sports',
    hashCode: null, // default — shown at bare URL
    sports: {
      component: 'default', // uses SportsPage
      logo: 'E2 Sports',
      logoAccent: '#3b82f6',        // blue
      logoUnderline: 'bg-blue-600',
      headerBg: 'bg-gray-900',
      navItems: ['Bundesliga', 'Champions League', '2. Liga', 'DFB-Pokal'],
      heroGradient: 'from-blue-600 to-blue-400',
      tagBg: 'bg-white/90',
      tagText: 'text-blue-600',
      blockquoteBorder: 'border-blue-500',
      oddsHighlight: 'text-blue-600',
    },
    casino: { component: 'default' }, // CasinoPage is tenant-agnostic (branded "CasinoReview" by design)
    intel: { urlPrefix: 'e2sports.com', siteName: 'E2 Sports' },
  },
  kicker: {
    id: 'kicker',
    name: 'Kicker',
    hashCode: 'a1b2c3',
    sports: {
      component: 'default',
      logo: 'Kicker',
      logoAccent: '#dc2626',         // red
      logoUnderline: 'bg-red-600',
      headerBg: 'bg-gray-900',
      navItems: ['Bundesliga', 'Champions League', '2. Liga', 'DFB-Pokal'],
      heroGradient: 'from-red-600 to-amber-500',
      tagBg: 'bg-white/90',
      tagText: 'text-red-600',
      blockquoteBorder: 'border-red-500',
      oddsHighlight: 'text-red-600',
    },
    casino: { component: 'default' },
    intel: { urlPrefix: 'kicker.de', siteName: 'Kicker' },
  },
  livescore: {
    id: 'livescore',
    name: 'LiveScore',
    hashCode: 'x9y8z7',
    sports: {
      component: 'livescore', // uses LiveScoreSportsPage — self-contained styling
    },
    casino: { component: 'default' },
    intel: { urlPrefix: 'livescore.com', siteName: 'LiveScore' },
  },
}
```

### Provider Nesting Order

```
TenantProvider > DemoProvider > UI
```

TenantProvider is outermost because it is pure URL-driven state with no dependency on DemoContext. DemoContext does not need tenant info. The IntelligencePanel reads both contexts independently.

### TenantContext (`TenantContext.jsx`)

- On mount, reads `window.location.hash`
- Strips `#/` prefix, exact-matches against `TENANTS[*].hashCode`
- Falls back to `e2sports` if no match (including empty hash, `/#/`, or `/#/unknown`)
- Provides `{ tenant }` via context
- Exports `useTenant()` hook
- Listens for `hashchange` event for live switching during demos
- Tenant persists through DemoContext resets (since it's URL-driven, not state-driven)

### LiveScore Sports Page Layout

Based on the LiveScore news article page. Self-contained component with its own hardcoded styles (does not read from tenant config — all LiveScore-specific styling lives in this component).

- **Dark header bar**: `bg-[#1a1a2e]` with white "LiveScore" wordmark, nav links (Scores, News, Transfers, Betting)
- **Full-width hero**: gradient overlay (`from-[#1a1a2e]` tones) with article title, "Match Preview" tag in LiveScore green
- **Author byline**: avatar placeholder, author name, date
- **Article body**: dark background (`bg-[#0d0d1a]`), light text, same Bayern vs Dortmund content as other tenants
- **Sidebar**: betting odds card (green accent `#4caf50`), related articles
- **Pull quote**: left-border in LiveScore green (`#4caf50`)
- **Ad slot**: same `adActivated` / `currentAct` logic as SportsPage, reskinned with LiveScore colors

### SportsPage Refactor

The existing SportsPage becomes configurable via tenant. All dynamic values use explicit Tailwind class names from the tenant config (no string interpolation of color names):

- Logo text → `tenant.sports.logo`
- Logo underline → `tenant.sports.logoUnderline` (full class: `bg-red-600`)
- Hero gradient → `tenant.sports.heroGradient` (full classes: `from-red-600 to-amber-500`)
- Tag colors → `tenant.sports.tagBg` + `tenant.sports.tagText`
- Blockquote border → `tenant.sports.blockquoteBorder` (full class: `border-red-500`)
- Odds highlight → `tenant.sports.oddsHighlight`
- Logo accent used as inline `style={{ color }}` for the logo text

E2 Sports and Kicker share this component. LiveScore uses `LiveScoreSportsPage`.

### Intelligence Panel Updates

`INTEL_SCRIPTS` in `mockData.js` becomes `getIntelScripts(tenant)` — a factory function returning the same object shape but with URLs interpolated from `tenant.intel.urlPrefix`.

- `IntelligencePanel.jsx` imports `useTenant()`, calls `getIntelScripts(tenant)` and uses the result exactly as before
- Casino scan scripts (`act2_scan_casino`) remain unchanged — they reference `casinoreview.com` which is tenant-agnostic
- `predictionSignals`, `streakCompleteSignals`, and `PAGE_CONTEXTS` are tenant-agnostic and remain static exports

### What Does NOT Change

- PULSE widget (all components in `src/components/widget/`)
- TypewriterBlock layout
- Demo flow / acts (DemoContext reducer logic)
- Casino page (intentionally branded "CasinoReview" across all tenants — it simulates a third-party casino review site)
- Shared components (Confetti)
- Embed code overlay
- `predictionSignals`, `streakCompleteSignals` in mockData.js

## Implementation Order

1. Create `src/tenants/tenants.js` and `src/tenants/TenantContext.jsx`
2. Wrap App with TenantProvider (outside DemoProvider)
3. Refactor SportsPage to read tenant config (logo, colors, nav)
4. Update LeftPanel to route to correct SportsPage variant
5. Update `mockData.js` intel scripts → `getIntelScripts(tenant)` factory + update IntelligencePanel.jsx
6. Add tenant badge to PresenterOverlay
7. Test E2 Sports (`/`) and Kicker (`/#/a1b2c3`) end-to-end
8. Build LiveScoreSportsPage
9. Test LiveScore (`/#/x9y8z7`) end-to-end
