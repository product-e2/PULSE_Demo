import confetti from 'canvas-confetti'

export function fireConfetti(colors = ['#fbbf24', '#a855f7', '#ffffff', '#ef4444']) {
  // Big center burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors,
  })
  // Left burst after 200ms
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors,
    })
  }, 200)
  // Right burst after 400ms
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors,
    })
  }, 400)
}
