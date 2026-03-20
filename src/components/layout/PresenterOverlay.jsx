import { motion, AnimatePresence } from 'framer-motion'
import { useDemo } from '../../state/DemoContext'
import { ACT_LABELS } from '../../data/actLabels'

export default function PresenterOverlay() {
  const {
    state,
    setAct,
    setPageType,
    reset,
    togglePanel,
    toggleOverlay,
  } = useDemo()

  const { currentAct, pageType, overlayMinimized } = state

  if (overlayMinimized) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-2">
        <motion.button
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={toggleOverlay}
          className="text-[10px] px-3 py-1 rounded-t-md bg-black/50 backdrop-blur border border-white/10 border-b-0 text-gray-500 hover:text-white transition-colors cursor-pointer"
        >
          ▲ Presenter
        </motion.button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 60, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-t border-white/10"
    >
      <div className="flex items-center gap-1 px-3 py-2">
        {/* Story steps — the main navigation */}
        <div className="flex items-center gap-1 flex-1">
          {ACT_LABELS.map(({ id, label }, i) => (
            <button
              key={id}
              onClick={() => setAct(id)}
              className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                currentAct === id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                  : id < currentAct
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    : 'bg-gray-800/50 text-gray-500 hover:bg-gray-700 hover:text-gray-300'
              }`}
            >
              <span className={`font-mono text-[10px] ${
                currentAct === id ? 'text-purple-200' : id < currentAct ? 'text-purple-400' : 'text-gray-600'
              }`}>{id}</span>
              <span>{label}</span>
              {/* Arrow between steps */}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Page toggle */}
        <div className="flex items-center bg-gray-800 rounded-md p-0.5">
          <button
            onClick={() => setPageType('sports')}
            className={`text-[10px] px-2.5 py-1 rounded transition-all cursor-pointer ${
              pageType === 'sports' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚽ Sports
          </button>
          <button
            onClick={() => setPageType('casino')}
            className={`text-[10px] px-2.5 py-1 rounded transition-all cursor-pointer ${
              pageType === 'casino' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🎰 Casino
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Quick actions */}
        <button
          onClick={reset}
          className="text-[10px] px-2 py-1 rounded text-gray-500 hover:text-white hover:bg-gray-700 transition-all cursor-pointer"
          title="Reset to start"
        >
          ↺
        </button>
        <button
          onClick={togglePanel}
          className="text-[10px] px-2 py-1 rounded text-gray-500 hover:text-white hover:bg-gray-700 transition-all cursor-pointer"
          title="Toggle intelligence panel"
        >
          ◧
        </button>
        <button
          onClick={toggleOverlay}
          className="text-[10px] px-2 py-1 rounded text-gray-500 hover:text-white hover:bg-gray-700 transition-all cursor-pointer"
          title="Hide toolbar"
        >
          ▼
        </button>
      </div>
    </motion.div>
  )
}
