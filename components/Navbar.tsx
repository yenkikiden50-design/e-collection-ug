'use client'

interface NavbarProps {
  cartCount: number
  onCheckout: () => void
}

export default function Navbar({ cartCount, onCheckout }: NavbarProps) {
  return (
    // CHANGED: fixed to the top of the viewport, constrained to the same 420px
    // column as the rest of the page, so it stays visible while scrolling on mobile
    <div className="fixed left-0 right-0 top-0 z-40 mx-auto w-full max-w-[420px] bg-white">
      <header className="relative bg-white">
        <p className="flex h-6 items-center justify-center bg-amber-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over 300k
        </p>

        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
          {/* CHANGED: logo text replaced with an image. Place your logo file at
              /public/logo.jpg (or update the src below to match your file's path/name). */}
          <img
            src="/images/logo.jpg"
            alt="E-Collections.ug"
            className="h-12 w-auto object-contain"
          />

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
  )
}
