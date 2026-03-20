import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDemo } from '../../state/DemoContext'

export default function EmailGate({ submitted }) {
  const { state, submitEmail } = useDemo()
  const { pageType, emailSubmitted } = state
  const [email, setEmail] = useState('')

  const isSports = pageType === 'sports'
  const operator = isSports ? 'Tipico' : 'LeoVegas'

  const isSubmitted = submitted || emailSubmitted

  if (isSubmitted) {
    return (
      <div className="p-6 flex flex-col items-center text-center gap-4">
        {/* Checkmark animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center"
        >
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="w-8 h-8 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            />
          </motion.svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-900 font-semibold">You're all set!</p>
          <p className="text-gray-500 text-sm mt-1 flex items-center justify-center gap-1">
            Redirecting to {operator}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ...
            </motion.span>
          </p>
        </motion.div>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    submitEmail()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 flex flex-col gap-4"
    >
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900">Almost there!</h3>
        <p className="text-gray-500 text-sm mt-1">
          Enter your email to claim your bonus at {operator}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl py-3 hover:opacity-90 transition-opacity cursor-pointer"
        >
          Continue &rarr;
        </button>
      </form>

      <p className="text-xs text-gray-400 text-center">
        We'll never share your email. 18+ | T&amp;Cs apply.
      </p>
    </motion.div>
  )
}
