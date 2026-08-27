"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export default function Section() {
  return (
    <a
      href="https://wa.me/256751792211"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        width: 'fit-content',
        margin: '0 auto',
        padding: '8px 12px 8px 10px',
        borderRadius: 999,
        background: '#16A34A',
        boxShadow: '0 6px 18px rgba(22,163,74,0.45)',
        fontFamily: "'Playfair Display', Georgia, serif",
      }}
    >
      <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <FontAwesomeIcon icon={faWhatsapp} style={{ color: 'white', width: 16, height: 16 }} />
      </span>
      <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>E-Collections</span>
    </a>
  )
}
