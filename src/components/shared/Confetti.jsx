import confetti from 'canvas-confetti'

export function fireConfetti() {
  // Big center burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#fbbf24', '#7c3aed', '#ffffff', '#ef4444'],
  })
  // Left burst after 200ms
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ['#fbbf24', '#7c3aed', '#ffffff'],
    })
  }, 200)
  // Right burst after 400ms
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ['#fbbf24', '#7c3aed', '#ffffff'],
    })
  }, 400)
}
