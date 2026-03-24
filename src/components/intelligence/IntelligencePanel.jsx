import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useDemo } from '../../state/DemoContext'
import { useTenant } from '../../tenants/TenantContext'
import {
  getIntelScripts,
  PREDICTIONS,
} from '../../data/mockData'
import { getActLabel } from '../../data/actLabels'
import TypewriterBlock from './TypewriterBlock'

// Static display — no animation, all lines visible at once
function StaticBlock({ lines }) {
  const COLOR_MAP = {
    green: 'text-emerald-400',
    blue: 'text-sky-400',
    gold: 'text-amber-400',
    orange: 'text-orange-400',
    gray: 'text-gray-500',
  }

  return (
    <div className="font-mono text-sm leading-relaxed">
      {lines.map((line, i) => {
        if (line.color === 'none') {
          return <div key={i} className="h-2" />
        }
        const colorClass = COLOR_MAP[line.color] || 'text-gray-300'
        return (
          <div key={i} className={`${colorClass} whitespace-pre-wrap`}>
            {line.text}
          </div>
        )
      })}
    </div>
  )
}

export default function IntelligencePanel() {
  const { state, activateAd } = useDemo()
  const { tenant } = useTenant()
  const INTEL_SCRIPTS = useMemo(() => getIntelScripts(tenant), [tenant])
  const { currentAct } = state

  // Determine which scan script to use based on pageType
  const scanScript = state.pageType === 'casino'
    ? INTEL_SCRIPTS.act2_scan_casino
    : INTEL_SCRIPTS.act2_scan

  // ── Act 2: prediction lines (scan is shown as StaticBlock) ──
  const [predLines, setPredLines] = useState([])
  const prevPredCountRef = useRef(0)
  const revealedCountRef = useRef(0)

  // Reset prediction lines when entering Act 2 (Game Invoked)
  useEffect(() => {
    if (currentAct === 2) {
      setPredLines([])
      prevPredCountRef.current = 0
      revealedCountRef.current = 0
    }
  }, [currentAct, state.intelligenceKey])

  // Watch predictions in Act 2 and append signal lines
  useEffect(() => {
    if (currentAct !== 2) return

    const predCount = state.predictions.length
    if (predCount > prevPredCountRef.current) {
      const newLines = []
      for (let i = prevPredCountRef.current; i < predCount; i++) {
        const pred = state.predictions[i]
        const question = PREDICTIONS[i]?.question ?? `Prediction ${i + 1}`
        newLines.push(
          { text: '', color: 'none', delay: 200 },
          { text: `📝 Prediction ${i + 1}/3: ${question} → ${pred.answer}`, color: 'blue', delay: 300 },
          { text: `  Status: Locked (pre-match)`, color: 'gray', delay: 200 },
        )
      }
      if (predCount >= 3) {
        newLines.push(
          { text: '', color: 'none', delay: 300 },
          { text: '🔒 All predictions locked', color: 'gold', delay: 400 },
          { text: '  Awaiting match result...', color: 'gray', delay: 200 },
        )
      }
      prevPredCountRef.current = predCount
      setPredLines((prev) => [...prev, ...newLines])
    }
  }, [currentAct, state.predictions.length, state.predictions])

  // Mark current prediction lines as "revealed" so they become static
  const onPredTypewriterComplete = useCallback(() => {
    revealedCountRef.current = predLines.length
  }, [predLines.length])

  // Split pred lines into already-shown (static) and new (animated)
  const shownLines = predLines.slice(0, revealedCountRef.current)
  const newLines = predLines.slice(revealedCountRef.current)

  // Determine what to render based on current act
  const content = useMemo(() => {
    switch (currentAct) {
      case 1:
        return (
          <TypewriterBlock
            key={`${state.intelligenceKey}-${state.pageType}`}
            lines={scanScript}
            onComplete={activateAd}
          />
        )

      case 2:
        return (
          <>
            {/* Scan content — shown instantly */}
            <StaticBlock lines={scanScript} />
            {/* Previously revealed prediction lines — shown instantly */}
            {shownLines.length > 0 && <StaticBlock lines={shownLines} />}
            {/* New prediction lines — animated */}
            {newLines.length > 0 && (
              <TypewriterBlock
                key={revealedCountRef.current}
                lines={newLines}
                onComplete={onPredTypewriterComplete}
              />
            )}
          </>
        )

      case 3:
        return (
          <TypewriterBlock
            key={state.intelligenceKey}
            lines={INTEL_SCRIPTS.act4_return}
          />
        )

      case 4: {
        const visionScript = state.pageType === 'casino'
          ? INTEL_SCRIPTS.act5_vision_casino
          : INTEL_SCRIPTS.act5_vision
        return (
          <TypewriterBlock
            key={`${state.intelligenceKey}-${state.pageType}`}
            lines={visionScript}
            onComplete={activateAd}
          />
        )
      }

      case 5:
        return (
          <TypewriterBlock
            key={state.intelligenceKey}
            lines={INTEL_SCRIPTS.act6_summary}
          />
        )

      default:
        return null
    }
  }, [currentAct, state.intelligenceKey, state.pageType, scanScript, shownLines, newLines, onPredTypewriterComplete, activateAd, INTEL_SCRIPTS])

  return (
    <div className="relative flex h-full flex-col overflow-y-auto p-4" style={{ scrollBehavior: 'smooth' }}>
      {/* Act badge */}
      <div className="mb-3 flex items-center gap-2">
        <span
          className="rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{
            backgroundColor: `${tenant.pulse?.accentColor || '#a855f7'}33`,
            color: tenant.pulse?.accentColor || '#a855f7',
          }}
        >
          {currentAct}. {getActLabel(currentAct)}
        </span>
        <span className="text-xs text-gray-600">Intelligence Feed</span>
      </div>

      {/* Lines content */}
      <div className="flex-1">{content}</div>

      {/* Blinking cursor */}
      <div className="mt-3 flex items-center gap-1">
        <div className="h-4 w-2 animate-pulse rounded-sm bg-emerald-400" />
      </div>
    </div>
  )
}
