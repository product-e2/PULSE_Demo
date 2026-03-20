import { motion } from 'framer-motion'
import { useDemo } from '../../state/DemoContext'

export default function PersonalizedWidget() {
  const { state } = useDemo()
  const { sessionProfile } = state

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-5 flex flex-col gap-4"
    >
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-900">Welcome back! 👋</h3>

      {/* Sports card */}
      <div className="rounded-xl border-l-4 border-red-600 bg-white shadow-sm p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs">FCB</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Bayern plays Friday
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Predict the score and earn an odds boost.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Casino card */}
      <div className="relative rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm p-4 overflow-hidden">
        {/* Golden glow effect */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-300/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-400/15 rounded-full blur-xl" />

        <div className="relative flex items-start gap-3">
          <div className="text-2xl shrink-0">🎰</div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Your LeoVegas bonus is waiting
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Claim 100 Free Spins
            </p>
          </div>
        </div>
      </div>

      {/* Session info footer */}
      {sessionProfile?.segment && (
        <p className="text-[10px] text-gray-400 text-center mt-1">
          Segment: {sessionProfile.segment}
        </p>
      )}
    </motion.div>
  )
}
