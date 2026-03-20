import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const COLOR_MAP = {
  green: 'text-emerald-400',
  blue: 'text-sky-400',
  gold: 'text-amber-400',
  orange: 'text-orange-400',
  gray: 'text-gray-500',
}

export default function TypewriterBlock({ lines = [], onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const bottomRef = useRef(null)
  const timeoutsRef = useRef([])

  // Clear all pending timeouts
  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }, [])

  // Store onComplete in a ref to avoid re-triggering the effect
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // Sequential reveal logic
  useEffect(() => {
    setVisibleCount(0)
    clearTimeouts()

    if (!lines.length) return

    let currentIndex = 0

    const scheduleNext = () => {
      if (currentIndex >= lines.length) {
        onCompleteRef.current?.()
        return
      }

      const line = lines[currentIndex]
      const delay = line.delay ?? 300

      const id = setTimeout(() => {
        currentIndex++
        setVisibleCount(currentIndex)

        // Schedule the next line
        scheduleNext()
      }, delay)

      timeoutsRef.current.push(id)
    }

    // Kick off the first line
    scheduleNext()

    return clearTimeouts
  }, [lines, clearTimeouts])

  // Auto-scroll to bottom when new lines appear
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [visibleCount])

  return (
    <div className="font-mono text-sm leading-relaxed">
      {lines.slice(0, visibleCount).map((line, i) => {
        // Spacer line
        if (line.color === 'none' || (!line.text && line.color === 'none')) {
          return (
            <motion.div
              key={i}
              className="h-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
          )
        }

        const colorClass = COLOR_MAP[line.color] || 'text-gray-300'

        return (
          <motion.div
            key={i}
            className={`${colorClass} whitespace-pre-wrap`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {line.text}
          </motion.div>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}
