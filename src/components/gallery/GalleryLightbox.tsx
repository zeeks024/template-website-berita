'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface GalleryLightboxProps {
  images: string[]
  initialIndex?: number
  onClose: () => void
}

export function GalleryLightbox({ images, initialIndex = 0, onClose }: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const [direction, setDirection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    setIsLoading(true)
  }, [index])

  const handleNext = useCallback(() => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [handleNext, handlePrev, onClose])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x)

    if (swipe < -swipeConfidenceThreshold) {
      handleNext()
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 text-white/80">
        <div className="font-mono text-sm tracking-widest">
          {index + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>
      </div>

      <button
        className="absolute left-4 z-50 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all hidden md:block"
        onClick={(e) => {
          e.stopPropagation()
          handlePrev()
        }}
        aria-label="Previous image"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        className="absolute right-4 z-50 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all hidden md:block"
        onClick={(e) => {
          e.stopPropagation()
          handleNext()
        }}
        aria-label="Next image"
      >
        <ChevronRight size={40} />
      </button>

      <div 
        className="relative w-full h-full max-w-7xl max-h-[85vh] mx-auto flex items-center justify-center overflow-hidden px-4 md:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-white/10 border-t-cyan-500 rounded-full animate-spin" />
                </div>
              )}
              <Image
                src={images[index]}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
