"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const images = [
  "/nova screenshot 1.PNG",
  "/nova screenshot 2.PNG",
  "/nova screenshot 3.PNG",
]

export function NovaSlideshow() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImage]}
            alt={`Nova AI System Screenshot ${currentImage + 1}`}
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 