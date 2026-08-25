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
        position: 'fixed',
        right: 20,
        bottom: 92,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 16px 10px 12px',
        borderRadius: 999,
        background: '#16A34A',
        boxShadow: '0 6px 18px rgba(22,163,74,0.45)',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <FontAwesomeIcon icon={faWhatsapp} style={{ color: 'white', width: 18, height: 18 }} />
      </span>
      <span style={{ color: '#fff', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>Let's chat</span>
    </a>
  )
}
