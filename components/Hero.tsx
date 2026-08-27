'use client'

import { useEffect, useState } from 'react'

const slides = [
  { src: '/images/men/shirts/headsets.jpg', alt: "Personal Tech" },
  { src: '/images/men/shirts/jersey.jpg', alt: "Men's shirts" },
  { src: '/images/ladies/shoes.jpg', alt: "Women's shoes" },

]

interface HeroProps {
  onPromoClick?: () => void
}

export default function Hero({ onPromoClick }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 4000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="mx-auto w-full overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-md shadow-orange-200/50 sm:w-[85%]">
      <div className="relative w-full overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[21/9] lg:aspect-[21/8]">
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          ))}

          
          
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show slide ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
