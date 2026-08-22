'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

interface CategoryMenuItem {
  label: string
  line: string
  category: string
}

interface NavbarProps {
  cartCount: number
  onCheckout: () => void
  categories: CategoryMenuItem[]
  onSelectCategory: (line: string, category: string) => void
}

export default function Navbar({ cartCount, onCheckout, categories, onSelectCategory }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSelect = (item: CategoryMenuItem) => {
    onSelectCategory(item.line, item.category)
    setMenuOpen(false)
  }

  return (
    <>
      {/* CHANGED: fixed to the top of the viewport, constrained to the same 420px
          column as the rest of the page, so it stays visible while scrolling on mobile */}
      <div className="fixed left-0 right-0 top-0 z-38 mx-auto w-full max-w-[420px] bg-white">
        <header className="relative bg-white">
          <p className="flex h-5 items-center justify-center bg-amber-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            Get free delivery on orders over 300k
          </p>

          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
            <div className="flex items-center gap-3">
              {/* CHANGED: hamburger button opens a side menu of shop-by-category shortcuts */}
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-white text-[#1A1A1A]"
              >
                <FontAwesomeIcon icon={faBars} style={{ color: 'rgb(6, 6, 6)' }} />
              </button>

              {/* CHANGED: logo text replaced with an image. Place your logo file at
                  /public/images/logo.jpg (or update the src below to match your file's path/name).
                  -my-2 lets the image overflow slightly above/below the row without
                  growing the row's own height (padding stays py-3, image reads bigger). */}
              <img
                src="/images/logo.jpg"
                alt="E-Collections.ug"
                className="h-16 max-w-[55%] object-contain -my-2"
                style={{ filter: 'contrast(1.12) saturate(1.1)' }}
              />
            </div>

            <button
              onClick={onCheckout}
              className="relative border-none bg-transparent p-0 text-[#1A1A1A]"
              aria-label="View cart"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C4562A] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* Menu overlay stays inside the same 420px-wide product container */}
      <div className="fixed inset-0 z-40 flex justify-center pointer-events-none">
        <div className="relative h-full w-full max-w-[420px] overflow-hidden">

          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              menuOpen
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none opacity-0'
            }`}
          />

          {/* Side menu */}
          <div
            className={`pointer-events-auto absolute inset-y-0 left-0 z-50 w-[82%] max-w-[344px] transform bg-white shadow-2xl transition-transform duration-300 ease-out ${
              menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <span className="text-base font-bold text-[#1A1A1A]">
                Shop by category
              </span>

              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[#1A1A1A]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            <div className="h-[calc(100%-64px)] overflow-y-auto py-2">
              {categories.map((item, i) => (
                <button
                  key={`${item.line}-${item.category}-${i}`}
                  onClick={() => handleSelect(item)}
                  className="flex w-full items-center px-5 py-3 text-left text-[15px] font-medium text-[#1A1A1A] hover:bg-gray-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
