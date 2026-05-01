import { useEffect } from 'react'

// Background: warm cream → sand → andesite → dark navy → near-black teal
const BG_STOPS = [
  { at: 0.00, r: 240, g: 235, b: 224 },
  { at: 0.22, r: 190, g: 178, b: 160 },
  { at: 0.45, r: 62,  g: 60,  b: 66  },
  { at: 0.70, r: 26,  g: 34,  b: 54  },
  { at: 1.00, r: 10,  g: 22,  b: 22  },
]

// Text: dark warm brown → light cool teal-gray
const TEXT_STOPS = [
  { at: 0.00, r: 50,  g: 28,  b: 18  },
  { at: 0.35, r: 220, g: 215, b: 205 },
  { at: 1.00, r: 180, g: 212, b: 210 },
]

function lerp(a, b, t) { return Math.round(a + (b - a) * t) }

function interpolate(stops, p) {
  let i = 0
  while (i < stops.length - 2 && stops[i + 1].at <= p) i++
  const a = stops[i], b = stops[i + 1]
  const t = Math.min(1, Math.max(0, (p - a.at) / (b.at - a.at)))
  return `rgb(${lerp(a.r,b.r,t)},${lerp(a.g,b.g,t)},${lerp(a.b,b.b,t)})`
}

export function useScrollColor() {
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p   = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      document.documentElement.style.setProperty('--page-bg',   interpolate(BG_STOPS,   p))
      document.documentElement.style.setProperty('--page-text', interpolate(TEXT_STOPS, p))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
}