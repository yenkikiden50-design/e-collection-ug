'use client'

type Props = {
  cartCount?: number
  onCheckout?: () => void
}

function CartIcon({ count = 0 }: { count?: number }) {
  return (
    <div className="relative">
      <svg className="w-5 h-5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#C4562A] text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center" aria-hidden="false">
          <span aria-hidden className="-mt-px">{count}</span>
          <span className="sr-only">{count} items in cart</span>
        </span>
      )}
    </div>
  )
}

export default function Navbar({ cartCount = 0, onCheckout }: Props) {
  return (
    <div className="bg-white">
      <header className="sticky top-0 z-40 bg-white border-b">
        <p className="flex h-6 items-center justify-center bg-amber-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over 300k
        </p>

        <div className="max-w-[420px] mx-auto flex items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center gap-2">
            <span className="sr-only">e-collections.ug</span>
            <span aria-hidden="true" className="text-2xl font-bold tracking-tight text-black">
              E-Collections<span className="text-[#C4562A]">.ug</span>
            </span>
          </a>

          <button onClick={onCheckout} aria-label="View cart" className="p-1 bg-transparent border-0 cursor-pointer">
            <CartIcon count={cartCount} />
            <span className="sr-only">Open cart</span>
          </button>
        </div>
      </header>
    </div>
  )
}
