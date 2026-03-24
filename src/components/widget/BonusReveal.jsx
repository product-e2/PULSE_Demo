import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDemo } from '../../state/DemoContext'
import { useTenant } from '../../tenants/TenantContext'
import { fireConfetti } from '../shared/Confetti'
import EmailGate from './EmailGate'

export default function BonusReveal() {
  const { state } = useDemo()
  const { tenant } = useTenant()
  const accentColor = tenant.widget?.accentColor || tenant.pulse?.accentColor || '#a855f7'
  const { pageType } = state
  const [showEmail, setShowEmail] = useState(false)

  const isSports = pageType === 'sports'
  const operator = isSports ? 'Tipico' : 'LeoVegas'
  const prize = isSports ? '€50 Welcome Bonus' : '100 Free Spins'

  // Fire confetti on mount
  useEffect(() => {
    fireConfetti(['#fbbf24', accentColor, '#ffffff', '#ef4444'])
  }, [accentColor])

  if (showEmail || state.emailSubmitted) {
    return <EmailGate submitted={state.emailSubmitted} />
  }

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="p-6 flex flex-col items-center text-center gap-4"
    >
      <div className="text-5xl">🎉</div>

      <p className="text-gray-500 text-sm">You've earned a</p>

      <h2 className="text-2xl font-bold" style={{ color: accentColor }}>
        {prize}
      </h2>

      <p className="text-gray-700 font-medium">{operator}</p>

      <button
        onClick={() => setShowEmail(true)}
        className="w-full text-white font-semibold rounded-xl py-3 hover:opacity-90 transition-opacity cursor-pointer"
        style={{ backgroundColor: accentColor }}
      >
        Claim Now &rarr;
      </button>

      <p className="text-xs text-gray-400 leading-relaxed">
        Register at {operator} to claim. 18+ | T&amp;Cs apply.
      </p>
    </motion.div>
  )
}
