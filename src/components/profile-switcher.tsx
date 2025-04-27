"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function ProfileSwitcher() {
  const [activeProfile, setActiveProfile] = useState<"color" | "bw">("bw")
  const containerRef = useRef<HTMLDivElement>(null)

  // Track touch/swipe events
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const toggleProfile = () => {
    setActiveProfile(activeProfile === "color" ? "bw" : "color")
  }

  // Handle swipe events
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    // Only toggle on swipe in the correct direction based on which image is active
    if (activeProfile === "color" && isLeftSwipe) {
      toggleProfile()
    } else if (activeProfile === "bw" && isRightSwipe) {
      toggleProfile()
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] max-w-[280px] sm:max-w-[320px] md:max-w-[360px] mx-auto"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Container for the stacked images */}
      <div className="relative w-full h-full perspective-1000">
        {/* B&W Image */}
        <motion.div
          className="absolute inset-0 cursor-pointer"
          animate={{
            zIndex: activeProfile === "bw" ? 10 : 5,
            x: activeProfile === "bw" ? 0 : -20,
            y: activeProfile === "bw" ? 0 : 5,
            scale: activeProfile === "bw" ? 1 : 0.95,
            rotateY: activeProfile === "bw" ? "0deg" : "10deg",
            borderRadius: activeProfile === "bw" ? "0%" : "12px",
            filter: activeProfile === "bw" ? "blur(0px)" : "blur(1px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={() => activeProfile === "color" && toggleProfile()}
        >
          <div
            className={cn(
              "relative w-full h-full overflow-hidden shadow-xl",
              activeProfile === "bw" ? "rounded-none" : "rounded-xl",
            )}
          >
            <Image 
              src="/bw-profile.jpg" 
              alt="Black and white profile" 
              fill 
              className="object-cover" 
              priority 
              sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
            />
          </div>
        </motion.div>

        {/* Color Image */}
        <motion.div
          className="absolute inset-0 cursor-pointer"
          animate={{
            zIndex: activeProfile === "color" ? 10 : 5,
            x: activeProfile === "color" ? 0 : 20,
            y: activeProfile === "color" ? 0 : 5,
            scale: activeProfile === "color" ? 1 : 0.95,
            rotateY: activeProfile === "color" ? "0deg" : "-10deg",
            borderRadius: activeProfile === "color" ? "0%" : "12px",
            filter: activeProfile === "color" ? "blur(0px)" : "blur(1px)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={() => activeProfile === "bw" && toggleProfile()}
        >
          <div
            className={cn(
              "relative w-full h-full overflow-hidden shadow-xl",
              activeProfile === "color" ? "rounded-none" : "rounded-xl",
            )}
          >
            <Image 
              src="/color-profile.jpg" 
              alt="Color profile" 
              fill 
              className="object-cover" 
              priority 
              sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
} 