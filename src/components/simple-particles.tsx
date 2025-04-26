"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  velocity: { x: number; y: number }
  color: string
  glowing: boolean
}

interface ParticlesProps {
  className?: string
  quantity?: number
  stationary?: boolean
  color?: string
  glowColor?: string
  glowSize?: number
  mouseGlowRadius?: number
  elementGlowRadius?: number
}

export function SimpleParticles({
  className,
  quantity = 2000,
  stationary = false,
  color,
  glowColor,
  glowSize = 2,
  mouseGlowRadius = 100,
  elementGlowRadius = 20,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: -1000, y: -1000 })
  const [activeElements, setActiveElements] = useState<DOMRect[]>([])
  const isDarkMode = typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true
  
  const defaultColor = isDarkMode ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.07)'
  const defaultGlowColor = isDarkMode ? 'rgba(138, 180, 248, 0.2)' : 'rgba(66, 135, 245, 0.2)'
  
  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  // Find UI elements for glow effect
  useEffect(() => {
    const findElements = () => {
      const selector = `
        button, a, .card, [role="button"], .badge, 
        h1, h2, h3, header, nav, 
        [class*="card"], [class*="button"], [class*="btn"]
      `
      const elements = document.querySelectorAll(selector)
      const rects: DOMRect[] = []
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.width > 10 && rect.height > 10 && 
            rect.top < window.innerHeight && rect.bottom > 0 &&
            rect.left < window.innerWidth && rect.right > 0) {
          rects.push(rect)
        }
      })
      
      setActiveElements(rects)
    }
    
    findElements()
    window.addEventListener('scroll', findElements)
    window.addEventListener('resize', findElements)
    
    return () => {
      window.removeEventListener('scroll', findElements)
      window.removeEventListener('resize', findElements)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particles: Particle[] = []

    const createParticles = () => {
      const { width, height } = canvas
      
      for (let i = 0; i < quantity; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const size = Math.random() * 1.5 + 0.1

        particles.push({
          x,
          y,
          size,
          speed: Math.random() * 1,
          velocity: {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5,
          },
          color: color || defaultColor,
          glowing: false
        })
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles.length = 0
      createParticles()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Semi-transparent background for trails
      ctx.fillStyle = isDarkMode ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle) => {
        // Reset glowing state each frame
        particle.glowing = false
        
        // Check if particle is near cursor
        const dx = particle.x - cursorPosition.x
        const dy = particle.y - cursorPosition.y
        const distToCursor = Math.sqrt(dx * dx + dy * dy)
        
        if (distToCursor < mouseGlowRadius) {
          particle.glowing = true
        }
        
        // Check if particle is near UI elements
        if (!particle.glowing) {
          for (const rect of activeElements) {
            const isNear = 
              particle.x >= rect.left - elementGlowRadius && 
              particle.x <= rect.right + elementGlowRadius && 
              particle.y >= rect.top - elementGlowRadius && 
              particle.y <= rect.bottom + elementGlowRadius
              
            if (isNear) {
              particle.glowing = true
              break
            }
          }
        }
        
        // Move particles if not stationary
        if (!stationary) {
          particle.x += particle.velocity.x
          particle.y += particle.velocity.y

          if (particle.x > canvas.width) {
            particle.x = 0
          } else if (particle.x < 0) {
            particle.x = canvas.width
          }

          if (particle.y > canvas.height) {
            particle.y = 0
          } else if (particle.y < 0) {
            particle.y = canvas.height
          }
        }

        // Draw particle with appropriate color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 
                particle.glowing ? particle.size * glowSize : particle.size, 
                0, Math.PI * 2)
        ctx.fillStyle = particle.glowing ? (glowColor || defaultGlowColor) : particle.color
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [quantity, stationary, color, glowColor, glowSize, cursorPosition, activeElements, defaultColor, defaultGlowColor, elementGlowRadius, mouseGlowRadius, isDarkMode])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("fixed inset-0 pointer-events-none", className)}
    />
  )
} 