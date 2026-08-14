'use client'

import { useEffect, useState } from 'react'

const slides = [
  { src: '/images/men/shirts/handsome-man-with-hat-posing.jpg', alt: "Men's shirts" },
  { src: '/images/short dress.webp', alt: "Women's dresses" },
  { src: '/images/men/shirts/african man.jpg', alt: "Men's shirts" },
 
]

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 4000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full overflow-hidden rounded-base">
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[16/8]">
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
  )
}
