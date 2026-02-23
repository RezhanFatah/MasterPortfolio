'use client'

import Image from 'next/image'

interface ImageConveyorProps {
  images: Array<{
    src: string
    alt: string
  }>
  speed?: number // seconds for one full cycle (lower = faster)
}

export function ImageConveyor({ images, speed = 20 }: ImageConveyorProps) {
  // Duplicate images for seamless infinite loop
  // We duplicate twice so when first set scrolls out, second set is ready
  const duplicatedImages = [...images, ...images]

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div
        className="conveyor-track flex gap-6 will-change-transform"
        style={{
          width: 'max-content',
          animationDuration: `${speed}s`,
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-lg overflow-hidden border-2 border-border bg-muted shadow-lg group"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-semibold opacity-0 group-hover:opacity-100">
              {image.alt}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
