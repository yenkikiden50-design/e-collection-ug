"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export default function Section() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-none bg-white">
        <header className="relative bg-white">
          <p className="flex h-5 w-full items-center justify-center gap-1 px-1 text-[12px] font-medium text-slate-700 sm:h-6 sm:px-2 sm:text-[13px] lg:px-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="whitespace-nowrap">Let's chat</span>
            <a href="https://wa.me/256751792211" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +256751792211" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, background: '#16A34A', borderRadius: 999, color: '#fff' }}>
                <FontAwesomeIcon icon={faWhatsapp} style={{ color: 'white', width: 16, height: 16 }} />
              </span>
            </a>
          </p>




        </header>
      </div>
    </div>
  )
}
