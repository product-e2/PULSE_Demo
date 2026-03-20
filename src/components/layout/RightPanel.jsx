import { AnimatePresence, motion } from 'framer-motion'
import { useDemo } from '../../state/DemoContext'
import IntelligencePanel from '../intelligence/IntelligencePanel'

export default function RightPanel() {
  const { state } = useDemo()
  const { panelVisible } = state

  return (
    <AnimatePresence>
      {panelVisible && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 200 }}
          className="w-[35%] flex-shrink-0 bg-[#0a0a12] border-l border-gray-800 font-mono flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-800">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <h2 className="text-sm text-gray-300 tracking-wide">
              What PULSE sees
            </h2>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <IntelligencePanel />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
