import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDemo } from '../../state/DemoContext'
import { useTenant } from '../../tenants/TenantContext'
import { fireConfetti } from '../shared/Confetti'

// Segment colors are derived from accentColor at render time
const BASE_SEGMENTS = [
  { label: '100 Free Spins', shade: 0, prize: true },
  { label: 'Try Again', shade: -1, prize: false },
  { label: '50 Free Spins', shade: 1, prize: true },
  { label: 'JACKPOT', shade: -2, prize: true },
  { label: 'Try Again', shade: -1, prize: false },
  { label: '25 Free Spins', shade: 2, prize: true },
]

// Always land on index 0 (100 Free Spins) — hardcoded win
const WIN_INDEX = 0

// Helper to derive shaded colors from a hex accent
function shadeColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16)
  let r = (num >> 16) + amount * 20
  let g = ((num >> 8) & 0x00ff) + amount * 20
  let b = (num & 0x0000ff) + amount * 20
  r = Math.max(0, Math.min(255, r))
  g = Math.max(0, Math.min(255, g))
  b = Math.max(0, Math.min(255, b))
  return `rgb(${r},${g},${b})`
}

export default function SpinWheel() {
  const { setAct } = useDemo()
  const { tenant } = useTenant()
  const accentColor = tenant.widget?.accentColor || tenant.pulse?.accentColor || '#a855f7'
  const canvasRef = useRef(null)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const angleRef = useRef(0)
  const rafRef = useRef(null)

  // Build segments with accent-derived colors
  const SEGMENTS = BASE_SEGMENTS.map((seg) => ({
    ...seg,
    color: seg.shade === -1 ? '#1e1b4b' : seg.shade === -2 ? '#f59e0b' : shadeColor(accentColor, seg.shade),
  }))

  // Draw wheel
  const drawWheel = useCallback((rotation = 0) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const size = canvas.width
    const center = size / 2
    const radius = center - 4
    const segAngle = (2 * Math.PI) / SEGMENTS.length

    ctx.clearRect(0, 0, size, size)
    ctx.save()
    ctx.translate(center, center)
    ctx.rotate(rotation)

    SEGMENTS.forEach((seg, i) => {
      const startAngle = i * segAngle - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, radius, startAngle, startAngle + segAngle)
      ctx.closePath()
      ctx.fillStyle = seg.color
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Label
      ctx.save()
      ctx.rotate(startAngle + segAngle / 2)
      ctx.textAlign = 'center'
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 11px system-ui'
      ctx.fillText(seg.label, radius * 0.6, 4)
      ctx.restore()
    })

    // Center circle
    ctx.beginPath()
    ctx.arc(0, 0, 28, 0, 2 * Math.PI)
    ctx.fillStyle = '#1e1b4b'
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 10px system-ui'
    ctx.textAlign = 'center'
    ctx.fillText('PULSE', 0, 4)

    ctx.restore()
  }, [SEGMENTS])

  useEffect(() => {
    drawWheel(0)
  }, [drawWheel])

  const spin = useCallback(() => {
    if (spinning) return
    setSpinning(true)

    // Calculate target angle to land on WIN_INDEX
    const segAngle = 360 / SEGMENTS.length
    const targetDeg = 360 - (WIN_INDEX * segAngle + segAngle / 2)
    const totalRotation = 360 * 5 + targetDeg // 5 full rotations + target
    const duration = 4000
    const startTime = Date.now()
    const startAngle = angleRef.current

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentDeg = startAngle + totalRotation * eased
      angleRef.current = currentDeg % 360

      drawWheel((currentDeg * Math.PI) / 180)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setSpinning(false)
        setResult(SEGMENTS[WIN_INDEX])
        fireConfetti(['#fbbf24', accentColor, '#ffffff', '#ef4444'])
        // Move to Act 3 (Game Won) after brief pause
        setTimeout(() => setAct(3), 2000)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [spinning, drawWheel, setAct])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 flex flex-col items-center text-center gap-3"
      >
        <div className="text-4xl">🎉</div>
        <h3 className="text-lg font-bold text-gray-900">{result.label}!</h3>
        <p className="text-gray-500 text-sm">Unlocking your reward...</p>
        <div className="flex justify-center gap-1 mt-1">
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
    )
  }

  return (
    <div className="p-4 flex flex-col items-center gap-3">
      {/* Pointer */}
      <div className="text-2xl -mb-2" style={{ color: accentColor }}>▼</div>

      {/* Canvas wheel */}
      <canvas
        ref={canvasRef}
        width={260}
        height={260}
        className="w-[260px] h-[260px]"
      />

      {/* Spin button */}
      <button
        onClick={spin}
        disabled={spinning}
        className="w-full text-white font-semibold rounded-xl py-3 text-center hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: accentColor }}
      >
        {spinning ? 'Spinning...' : 'SPIN!'}
      </button>
    </div>
  )
}
