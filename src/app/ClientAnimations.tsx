"use client"

import { motion, AnimatePresence } from "framer-motion"
import ParticlesBackground from "@/components/particles-background"

export function ClientAnimations({ children }: { children: React.ReactNode }) {
  return (
    <ParticlesBackground 
      particleCount={1800}
      noiseIntensity={0.003}
      particleSize={{ min: 0.5, max: 1.5 }}
    >
      {/* Content with animations */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ParticlesBackground>
  )
} 