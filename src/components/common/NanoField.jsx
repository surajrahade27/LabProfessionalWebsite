import { useEffect, useRef } from 'react'

const COLORS = ['34 211 238', '129 140 248', '192 132 252']
const LINK_DISTANCE = 130
const POINTER_RADIUS = 160

// Decorative canvas of drifting "nanoparticles" that bond to their neighbours
// and gather around the pointer. Pauses when off screen or in a hidden tab.
function NanoField({ className }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -9999, y: -9999 }
    let particles = []
    let width = 0
    let height = 0
    let frame = 0
    let visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Density scales with area, capped for low-end phones
      const count = Math.min(110, Math.round((width * height) / 11000))
      // Keep existing particles so a resize (e.g. mobile URL bar) doesn't reshuffle
      particles = particles.slice(0, count)
      while (particles.length < count) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.8 + 0.8,
          c: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
      if (reducedMotion) draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgb(${a.c} / ${(1 - dist / LINK_DISTANCE) * 0.28})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y)
        const glow = pd < POINTER_RADIUS ? 1 - pd / POINTER_RADIUS : 0
        if (glow) {
          ctx.strokeStyle = `rgb(${a.c} / ${glow * 0.5})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(pointer.x, pointer.y)
          ctx.stroke()
        }
        ctx.fillStyle = `rgb(${a.c} / ${0.55 + glow * 0.45})`
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r + glow * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      for (const p of particles) {
        // Gentle pull towards the pointer
        const dx = pointer.x - p.x
        const dy = pointer.y - p.y
        const d = Math.hypot(dx, dy)
        if (d < POINTER_RADIUS && d > 1) {
          p.vx += (dx / d) * 0.012
          p.vy += (dy / d) * 0.012
        }
        p.vx *= 0.995
        p.vy *= 0.995
        p.x += p.vx
        p.y += p.vy
        // Bounce off the edges (abs() so particles left outside by a resize drift back in)
        if (p.x < 0) p.vx = Math.abs(p.vx)
        if (p.x > width) p.vx = -Math.abs(p.vx)
        if (p.y < 0) p.vy = Math.abs(p.vy)
        if (p.y > height) p.vy = -Math.abs(p.vy)
      }
      draw()
      frame = requestAnimationFrame(step)
    }

    const start = () => {
      cancelAnimationFrame(frame)
      if (!reducedMotion && visible && !document.hidden) frame = requestAnimationFrame(step)
    }

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      start()
    })
    const resizeObserver = new ResizeObserver(resize)

    resize()
    start()
    observer.observe(canvas)
    resizeObserver.observe(canvas)
    // Listen on the parent so content layered above the canvas still counts
    const host = canvas.parentElement
    host.addEventListener('pointermove', onPointerMove)
    host.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', start)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', start)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

export default NanoField
