'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

interface GalleryThumbnailsProps {
  images: string[]
  onImageClick: (index: number) => void
}

export function GalleryThumbnails({ images, onImageClick }: GalleryThumbnailsProps) {
  if (!images || images.length === 0) return null

  return (
    <div className="mt-12 border-t border-border pt-8">
      <div className="flex items-center gap-3 mb-6">
        <Camera className="text-cyan-500" size={24} />
        <h3 className="text-xl font-black uppercase tracking-widest text-foreground">
          Galeri Foto
        </h3>
        <span className="text-sm text-muted-foreground font-mono">
          ({images.length})
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onImageClick(index)}
            className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted group cursor-pointer border border-border hover:border-cyan-500/50 transition-colors"
          >
            <Image
              src={src}
              alt={`Gallery thumbnail ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
