import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDemo } from '../../state/DemoContext'
import { useTenant } from '../../tenants/TenantContext'

export default function NextDayReveal() {
  const { revealBonus } = useDemo()
  const { tenant } = useTenant()
  const accentColor = tenant.widget?.accentColor || tenant.pulse?.accentColor || '#a855f7'
  const [revealedCount, setRevealedCount] = useState(0)
  const [showStreak, setShowStreak] = useState(false)

  // Sequentially reveal results
  useEffect(() => {
    if (revealedCount < 3) {
      const timer = setTimeout(() => setRevealedCount((c) => c + 1), 800)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setShowStreak(true), 600)
      return () => clearTimeout(timer)
    }
  }, [revealedCount])

  // After streak shown, reveal bonus
  useEffect(() => {
    if (showStreak) {
      const timer = setTimeout(() => revealBonus(), 1500)
      return () => clearTimeout(timer)
    }
  }, [showStreak, revealBonus])

  const results = [
    { question: 'Will Bayern win?', answer: 'Yes', result: 'Bayern 3-1 Dortmund' },
    { question: 'Over 2.5 goals?', answer: 'Over', result: '4 total goals' },
    { question: 'Both teams score?', answer: 'Yes', result: 'Bayern 3 - Dortmund 1' },
  ]

  return (
    <div className="p-5">
      <div className="text-center mb-4">
        <p className="font-semibold text-sm uppercase tracking-wide" style={{ color: accentColor }}>
          Match Complete
        </p>
        <h3 className="text-lg font-bold text-gray-900 mt-1">Bayern 3 - 1 Dortmund</h3>
        <p className="text-xs text-gray-400 mt-1">Your prediction results are in!</p>
      </div>

      <div className="space-y-3">
        {results.map((r, i) => (
          <AnimatePresence key={i}>
            {i < revealedCount && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 bg-green-50 rounded-xl p-3 border border-green-200"
              >
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  ✓
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{r.question}</p>
                  <p className="text-xs text-gray-500">
                    You said: <span className="font-medium text-green-700">{r.answer}</span> —{' '}
                    {r.result}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      <AnimatePresence>
        {showStreak && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 text-center"
          >
            <div className="text-3xl mb-2">🔥</div>
            <p className="text-lg font-bold" style={{ color: accentColor }}>
              Perfect Streak — 3/3!
            </p>
            <p className="text-sm text-gray-500 mt-1">Unlocking your reward...</p>
            <div className="flex justify-center gap-1 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: accentColor }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
