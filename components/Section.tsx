'use client'

export default function Section() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-none bg-white">
        <header className="relative bg-white">
        {/* <p className="flex h-10 items-center justify-center bg-indigo-700 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
           <i className="fa-brands fa-whatsapp"></i>
            WhatsApp us at: +256751792211 / +256780496217
          </p> */}
      
           <p className="flex h-5 w-full items-center justify-center gap-1 bg-amber-700 px-1 text-[9px] font-medium text-white sm:h-6 sm:px-3 sm:text-[10px] lg:px-4">
    <i className="fa-brands fa-whatsapp text-[9px] sm:text-[10px]"></i>
    <span className="whitespace-nowrap">WhatsApp us at:</span>{' '}
    <a href="tel:+256751792211" className="underline hover:text-amber-100">
      +256751792211
    </a>
    {' / '}
    <a href="tel:+256785921646" className="underline hover:text-amber-100">
      +256785921646
    </a>
  </p>




        </header>
      </div>
    </div>
  )
}
