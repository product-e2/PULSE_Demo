import { AnimatePresence, motion } from 'framer-motion'
import { useDemo } from '../../state/DemoContext'
import SportsPage from '../pages/SportsPage'
import CasinoPage from '../pages/CasinoPage'
import PulseWidget from '../widget/PulseWidget'
import EmbedCodeOverlay from '../overlay/EmbedCodeOverlay'

export default function LeftPanel() {
  const { state } = useDemo()
  const { pageType, panelVisible, widgetVisible, showEmbedOverlay } = state

  return (
    <div
      className={`relative flex-shrink-0 transition-all duration-500 ease-in-out flex flex-col ${
        panelVisible ? 'w-[65%]' : 'w-full'
      } ${pageType === 'sports' ? 'bg-gray-100' : 'bg-gray-900'}`}
    >
      {/* Scrollable page content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {pageType === 'sports' ? (
            <motion.div
              key="sports"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="min-h-full"
            >
              <SportsPage />
            </motion.div>
          ) : (
            <motion.div
              key="casino"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="min-h-full"
            >
              <CasinoPage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Embed Code Overlay (Act 6) — covers entire panel */}
      {showEmbedOverlay && <EmbedCodeOverlay />}

      {/* PULSE Widget — fixed to bottom-right of the left panel, above the compact toolbar */}
      {widgetVisible && (
        <div className="absolute bottom-12 right-6 z-30">
          <PulseWidget />
        </div>
      )}
    </div>
  )
}
