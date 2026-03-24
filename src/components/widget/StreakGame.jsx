import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDemo } from '../../state/DemoContext'
import { useTenant } from '../../tenants/TenantContext'
import { PREDICTIONS } from '../../data/mockData'

const slideVariants = {
  enter: { x: 80, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -80, opacity: 0 },
}

export default function StreakGame() {
  const { state, submitPrediction } = useDemo()
  const { tenant } = useTenant()
  const { currentPrediction, predictions, predictionsLocked } = state

  const accentColor = tenant.widget?.accentColor || tenant.pulse?.accentColor || '#a855f7'

  const [isTransitioning, setIsTransitioning] = useState(false)

  const allDone = currentPrediction >= 3

  const handleOptionClick = useCallback(
    (optionText) => {
      if (isTransitioning || allDone) return

      setIsTransitioning(true)

      setTimeout(() => {
        submitPrediction({ answer: optionText })
        setIsTransitioning(false)
      }, 250)
    },
    [isTransitioning, allDone, submitPrediction],
  )

  // Locked state after all 3 predictions
  if (allDone || predictionsLocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 flex flex-col items-center text-center gap-4"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          🔒
        </div>
        <h3 className="text-lg font-bold text-gray-900">Predictions Locked!</h3>
        <p className="text-gray-500 text-sm">
          Your 3 predictions for Bayern vs Dortmund are saved. Come back after the match to see
          your results!
        </p>
        <div className="flex gap-2 mt-2">
          {predictions.map((p, i) => (
            <div
              key={i}
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              {PREDICTIONS[i]?.question.split('?')[0]}: {p.answer}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">Match: Saturday, March 22 at 18:30</p>
      </motion.div>
    )
  }

  // Active prediction card
  const pred = PREDICTIONS[currentPrediction]
  if (!pred) return null

  const progressPercent = (currentPrediction / 3) * 100

  return (
    <div className="bg-white">
      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <motion.div
          className="h-full"
          style={{ background: accentColor }}
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-5">
        {/* Prediction counter */}
        <p className="text-xs text-gray-400 font-medium mb-4">
          Prediction {currentPrediction + 1} of 3
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPrediction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            {/* Team badges */}
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">FCB</span>
                </div>
                <span className="text-[10px] text-gray-500">Bayern</span>
              </div>
              <span className="text-gray-300 font-bold text-lg">vs</span>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
                  <span className="text-black font-bold text-xs">BVB</span>
                </div>
                <span className="text-[10px] text-gray-500">Dortmund</span>
              </div>
            </div>

            {/* Question */}
            <h3 className="text-center font-bold text-gray-900 text-lg mb-5">{pred.question}</h3>

            {/* Options */}
            <div className="flex gap-3">
              {pred.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOptionClick(opt)}
                  disabled={isTransitioning}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl py-3 text-center transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i <= currentPrediction
                  ? ''
                  : 'border-2 border-gray-300 bg-white'
              }`}
              style={i <= currentPrediction ? { backgroundColor: accentColor } : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
