import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDemo } from '../../state/DemoContext'
import StreakGame from './StreakGame'
import SpinWheel from './SpinWheel'
import BonusReveal from './BonusReveal'
import EmailGate from './EmailGate'
import NextDayReveal from './NextDayReveal'

export default function PulseWidget() {
  const { state, toggleWidget } = useDemo()
  const { currentAct, widgetOpen, widgetVisible, bonusRevealed, emailSubmitted } = state

  if (!widgetVisible) return null

  return (
    <div className="absolute bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {/* Expanded widget panel */}
      <AnimatePresence>
        {widgetOpen && (
          <motion.div
            key="widget-panel"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="w-[360px] max-h-[520px] rounded-2xl shadow-2xl bg-white overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-3 flex items-center justify-between shrink-0">
              <span className="text-white font-bold text-lg tracking-wide">PULSE</span>
              <button
                onClick={toggleWidget}
                className="text-white/80 hover:text-white text-xl leading-none transition-colors cursor-pointer"
                aria-label="Close widget"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <WidgetBody
                currentAct={currentAct}
                bonusRevealed={bonusRevealed}
                emailSubmitted={emailSubmitted}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating bubble button */}
      {!widgetOpen && (
        <button
          onClick={toggleWidget}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg flex items-center justify-center text-white font-bold text-xl hover:scale-110 transition-transform cursor-pointer relative"
          aria-label="Open PULSE widget"
        >
          <span className="relative z-10">P</span>
          {/* Pulse ring animation */}
          <span className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-30" />
        </button>
      )}
    </div>
  )
}

function WidgetBody({ currentAct, bonusRevealed, emailSubmitted }) {
  const { state } = useDemo()
  const isCasino = state.pageType === 'casino'

  switch (currentAct) {
    case 1:
      return <WelcomeTeaser />
    case 2:
      // Sports: pre-event prediction game / Casino: spin wheel
      return isCasino ? <SpinWheel /> : <StreakGame />
    case 3:
      // Game Won — bonus reveal for both sports & casino
      if (emailSubmitted) return <EmailGate submitted />
      if (bonusRevealed) return <BonusReveal />
      return isCasino ? <CasinoWinReveal /> : <NextDayReveal />
    case 4:
      return <VisionWidget isCasino={isCasino} />
    default:
      return (
        <div className="p-6 text-center text-gray-400 text-sm">
          Widget content loading...
        </div>
      )
  }
}

function WelcomeTeaser() {
  const { startPredicting, state } = useDemo()
  const isSports = state.pageType === 'sports'

  if (isSports) {
    return (
      <div className="p-6 flex flex-col items-center text-center gap-4">
        <div className="text-4xl">⚽</div>
        <div>
          <p className="text-purple-600 font-semibold text-sm uppercase tracking-wide">
            Predict & Win
          </p>
          <h3 className="text-xl font-bold text-gray-900 mt-1">
            Bayern München vs Borussia Dortmund
          </h3>
          <p className="text-gray-500 text-sm mt-1">Bundesliga Matchday 28</p>
        </div>
        <div className="w-full space-y-2 mt-1">
          <div className="flex items-center gap-3 bg-purple-50 rounded-lg p-3 text-left">
            <span className="text-xl">🏆</span>
            <div>
              <p className="text-sm font-semibold text-gray-900">3-Question Streak</p>
              <p className="text-xs text-gray-500">Get all 3 right to unlock an exclusive bonus</p>
            </div>
          </div>
        </div>
        <button
          onClick={startPredicting}
          className="w-full mt-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl py-3 px-4 text-center hover:opacity-90 transition-opacity cursor-pointer"
        >
          Start Predicting →
        </button>
      </div>
    )
  }

  // Casino teaser
  return (
    <div className="p-6 flex flex-col items-center text-center gap-4">
      <div className="text-4xl">🎰</div>
      <div>
        <p className="text-amber-500 font-semibold text-sm uppercase tracking-wide">
          Spin & Win
        </p>
        <h3 className="text-xl font-bold text-gray-900 mt-1">
          Exclusive Casino Challenge
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          Spin the wheel to unlock a surprise reward
        </p>
      </div>
      <div className="w-full space-y-2 mt-1">
        <div className="flex items-center gap-3 bg-amber-50 rounded-lg p-3 text-left">
          <span className="text-xl">🎡</span>
          <div>
            <p className="text-sm font-semibold text-gray-900">Spin & Win</p>
            <p className="text-xs text-gray-500">Every spin wins — try your luck!</p>
          </div>
        </div>
      </div>
      <button
        onClick={startPredicting}
        className="w-full mt-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl py-3 px-4 text-center hover:opacity-90 transition-opacity cursor-pointer"
      >
        Spin Now →
      </button>
    </div>
  )
}

function VisionWidget({ isCasino }) {
  if (isCasino) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 flex flex-col gap-3"
      >
        <div className="text-center">
          <p className="text-sm text-gray-500">Welcome back,</p>
          <h3 className="text-xl font-bold text-gray-900">Carlos! 🚀</h3>
        </div>
        <div className="bg-gradient-to-br from-sky-50 to-indigo-50 rounded-xl p-4 text-center">
          <p className="text-xs text-sky-600 font-semibold uppercase tracking-wide">Your Game</p>
          <p className="text-2xl mt-1">✈️</p>
          <p className="text-lg font-bold text-gray-900 mt-1">Aviator Challenge</p>
          <p className="text-sm text-gray-500 mt-1">Cash out before the plane flies away!</p>
          <div className="mt-3 bg-white rounded-lg p-2 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Target multiplier</span>
              <span className="font-bold text-sky-600">5.00x</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Reward</span>
              <span className="font-bold text-amber-600">200 Free Rounds</span>
            </div>
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold rounded-xl py-3 text-center hover:opacity-90 transition-opacity cursor-pointer">
          Play Aviator →
        </button>
        <div className="flex items-center gap-2 justify-center">
          <span className="text-xs text-gray-400">Also for you:</span>
          <span className="text-xs bg-red-50 text-red-600 font-medium px-2 py-0.5 rounded-full">🔴 Flamengo Bet</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 flex flex-col gap-3"
    >
      <div className="text-center">
        <p className="text-sm text-gray-500">Welcome back,</p>
        <h3 className="text-xl font-bold text-gray-900">Carlos! ⚽</h3>
      </div>
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🔴⚫</span>
          <div>
            <p className="text-xs text-red-600 font-semibold uppercase tracking-wide">Your Team</p>
            <p className="text-sm font-bold text-gray-900">CR Flamengo</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-2">Brasileirão — Round 5</p>
        <div className="bg-white rounded-lg p-3 text-center">
          <p className="font-bold text-gray-900">Flamengo vs Palmeiras</p>
          <p className="text-xs text-gray-500 mt-0.5">Sunday, 16:00 BRT</p>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="text-center">
              <span className="text-xs text-gray-500 block">1</span>
              <span className="text-sm font-bold text-red-700">2.10</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-gray-500 block">X</span>
              <span className="text-sm font-bold text-gray-600">3.20</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-gray-500 block">2</span>
              <span className="text-sm font-bold text-green-700">3.40</span>
            </div>
          </div>
        </div>
      </div>
      <button className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-xl py-3 text-center hover:opacity-90 transition-opacity cursor-pointer">
        Predict & Win →
      </button>
      <div className="flex items-center gap-2 justify-center">
        <span className="text-xs text-gray-400">Also for you:</span>
        <span className="text-xs bg-sky-50 text-sky-600 font-medium px-2 py-0.5 rounded-full">🚀 Aviator Bonus</span>
      </div>
    </motion.div>
  )
}

function CasinoWinReveal() {
  const { revealBonus } = useDemo()
  const [showBonus, setShowBonus] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBonus(true)
      setTimeout(() => revealBonus(), 1200)
    }, 800)
    return () => clearTimeout(timer)
  }, [revealBonus])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 flex flex-col items-center text-center gap-3"
    >
      <div className="text-4xl">🎉</div>
      <h3 className="text-lg font-bold text-gray-900">You Won!</h3>
      <p className="text-amber-600 font-bold text-xl">100 Free Spins</p>
      <p className="text-gray-500 text-sm">Unlocking your reward...</p>
      <div className="flex justify-center gap-1 mt-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-amber-500"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  )
}
