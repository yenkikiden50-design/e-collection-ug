"use client";

import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from "react";
import Hero from "./Hero";
import Section from "./Section";
import Navbar from "./Navbar";
import Footer from "./Footer";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page = 'listing' | 'checkout' | 'detail' | 'wishlist' | 'cart'
type CheckoutStep = 1 | 2
type NavLine = 'Store' | 'Ladies line' | 'GentleMen' | 'Personal Tech' | 'Beddings'
type PaymentMethod = 'mobile_money' | 'cash'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  image: string
  tag?: string
}

interface CartItem {
  product: Product
  quantity: number
}

interface WishlistItem {
  product: Product
  size: string
  quantity: number
}

interface DeliveryInfo {
  firstName: string
  lastName: string
  phone: string
  area: string
  landmark: string
}

const LADIES_PRODUCTS: Product[] = [
  { id: 1, name: 'Floral wrap dress', price: 68000, originalPrice: 85000, discount: 20, category: 'Dresses', image: 'https://images.unsplash.com/photo-1696962678565-bee84e6b9cb6?w=400&h=520&fit=crop&auto=format', tag: 'Bestseller' },
  { id: 2, name: 'Linen blouse', price: 40000, category: 'Tops', image: 'https://images.unsplash.com/photo-1608234807905-4466023792f5?w=400&h=520&fit=crop&auto=format' },
  { id: 3, name: 'Silk midi dress', price: 89000, category: 'Dresses', image: 'https://images.unsplash.com/photo-1709809081557-78f803ce93a0?w=400&h=520&fit=crop&auto=format', tag: 'New' },
  { id: 4, name: 'Cotton crop top', price: 38000, originalPrice: 48000, discount: 21, category: 'Tops', image: 'https://images.unsplash.com/photo-1761117228880-df2425bd70da?w=400&h=520&fit=crop&auto=format' },
  { id: 5, name: 'Strappy sandals', price: 55000, category: 'Footwear', image: 'https://images.unsplash.com/photo-1630386474440-8f2e6d752a98?w=400&h=520&fit=crop&auto=format' },
  { id: 6, name: 'ChrisBella bag', price: 120000, category: 'Bags', image: '/images/ladies/bag3.jpg', tag: 'New' },
  { id: 7, name: 'Boyfriend Jeans', price: 49000, category: 'Pants', image: '/images/ladies/pants.jpg' },
  { id: 8, name: 'Woven sun hat', price: 22000, originalPrice: 30000, discount: 27, category: 'Caps', image: 'https://images.unsplash.com/photo-1696962701419-6f510910e838?w=400&h=520&fit=crop&auto=format' },
  { id: 9, name: 'Boho maxi dress', price: 95000, category: 'Dresses', image: 'https://images.unsplash.com/photo-1687052093309-7a14efa58ecb?w=400&h=520&fit=crop&auto=format', tag: 'New' },
  { id: 10, name: 'Checked shirt', price: 25000, category: 'Tops', image: 'https://images.unsplash.com/photo-1625517527468-a6f1e2b124be?w=400&h=520&fit=crop&auto=format' },
  { id: 11, name: 'Pushin sandals', price: 35000, originalPrice: 50000, discount: 30, category: 'Footwear', image: '/images/ladies/shoes.jpg' },
  { id: 12, name: 'ChrisBella bag', price: 120000, category: 'Bags', image: '/images/ladies/bag4.jpg' },
  { id: 13, name: 'Hermes bag', price: 80000, category: 'Bags', image: '/images/ladies/bag2.jpg' },
  { id: 14, name: 'Louis Vuitton bag', price: 120000, category: 'Bags', image: '/images/ladies/bag1.jpg' },
  { id: 15, name: 'Pushin sandals', price: 35000, category: 'Footwear', image: '/images/men/shoes/shoe12.jpg' },
  { id: 16, name: 'Flat sandals', price: 25000, category: 'Footwear', image: '/images/men/shoes/shoe.jpg' },
  { id: 17, name: 'Silk pajama set', price: 58000, originalPrice: 72000, discount: 19, category: 'Night wear', image: '/images/ladies/nightwear1.jpg', tag: 'Bestseller' },
  { id: 18, name: 'Cotton nightdress', price: 35000, category: 'Night wear', image: '/images/ladies/nightwear2.jpg' },
  { id: 19, name: 'Satin robe', price: 45000, category: 'Night wear', image: '/images/ladies/nightwear3.jpg', tag: 'New' },
  { id: 20, name: 'Lace-trim chemise', price: 40000, originalPrice: 52000, discount: 23, category: 'Night wear', image: '/images/ladies/nightwear4.jpg' },
  { id: 21, name: 'Cotton nightdress', price: 35000, category: 'Night wear', image: '/images/ladies/nightwear5.jpg' },
  { id: 22, name: 'Cotton nightdress', price: 45000, category: 'Night wear', image: '/images/ladies/nightwear6.jpg' },

]

const MENS_PRODUCTS: Product[] = [
  { id: 101, name: 'Casual fit shirt', price: 52000, category: 'Shirts', image: '/images/men/shirts/shirt2.jpg', tag: 'Bestseller' },
  { id: 102, name: 'Casual trousers', price: 60000, originalPrice: 75000, discount: 20, category: 'Trousers', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=520&fit=crop&auto=format' },
  { id: 103, name: 'Mens Leather ', price: 280000, category: 'Shoes', image: '/images/men/shoes/shoe8.jpg', tag: 'New' },
  { id: 104, name: 'Denim jacket', price: 88000, category: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=520&fit=crop&auto=format' },
  { id: 105, name: 'Canvas backpack', price: 65000, originalPrice: 80000, discount: 19, category: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=520&fit=crop&auto=format' },
  { id: 106, name: 'Classic snapback', price: 28000, category: 'Caps', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=520&fit=crop&auto=format' },
  { id: 107, name: 'Linen short-sleeve shirt', price: 46000, category: 'Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=520&fit=crop&auto=format' },
  { id: 108, name: 'Tailored suit trousers', price: 110000, category: 'Trousers', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=520&fit=crop&auto=format', tag: 'New' },
  { id: 109, name: 'Suede sneakers', price: 100000, category: 'Shoes', image: '/images/men/shoes/shoe22.jpg' },
  { id: 110, name: 'Bomber jacket', price: 100000, originalPrice: 120000, discount: 21, category: 'Jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=520&fit=crop&auto=format' },
  { id: 111, name: 'Manchester City ', price: 65000, category: 'Jerseys', image: '/images/men/shirts/jersey1.jpg', tag: 'New' },
  { id: 112, name: 'Manchester United', price: 65000, category: 'Jerseys', image: '/images/men/shirts/jersey2.jpg', tag: 'New' },
  { id: 113, name: 'Liverpool', price: 65000, category: 'Jerseys', image: '/images/men/shirts/shirt21.jpg', tag: 'New' },
  { id: 114, name: 'Leeds United', price: 65000, category: 'Jerseys', image: '/images/men/shirts/jersey4.jpg', tag: 'New' },
  { id: 115, name: 'Ipswich Town', price: 65000, category: 'Jerseys', image: '/images/men/shirts/jersey5.jpg', tag: 'New' },
  { id: 116, name: 'Brentford', price: 65000, category: 'Jerseys', image: '/images/men/shirts/jersey6.jpg', tag: 'New' },
  { id: 117, name: 'Aston Villa', price: 65000, category: 'Jerseys', image: '/images/men/shirts/jersey7.jpg', tag: 'New' },
  { id: 118, name: 'Chelsea', price: 65000, category: 'Jerseys', image: '/images/men/shirts/Chelsea.jpg', tag: 'New' },
  { id: 119, name: 'Nottingham Forest', price: 65000, category: 'Jerseys', image: '/images/men/shirts/Nottingham Forest.jpg', tag: 'New' },
  { id: 120, name: 'Newcastle United', price: 65000, category: 'Jerseys', image: '/images/men/shirts/Newcastle United.jpg', tag: 'New' },
  { id: 121, name: 'Sweater shirt', price: 52000, category: 'Shirts', image: '/images/men/shirts/shirt4.jpg', tag: 'Bestseller' },
  { id: 122, name: 'Casual fit shirt', price: 52000, category: 'Shirts', image: '/images/men/shirts/shirt5.jpg', tag: 'Bestseller' },
  { id: 123, name: 'Polo  shirt', price: 52000, category: 'Shirts', image: '/images/men/shirts/shirt6.jpg',  },
  { id: 124, name: 'Tshirt', price: 52000, category: 'Shirts', image: '/images/men/shirts/shirt7.jpg',  },
  { id: 125, name: 'Office shirt', price: 52000, category: 'Shirts', image: '/images/men/shirts/shirt16.jpg',  },
  { id: 126, name: 'Office shirt', price: 52000, category: 'Shirts', image: '/images/men/shirts/shirt9.jpg',  },
  { id: 127, name: 'Casual Smart', price: 52000, category: 'Shirts', image: '/images/men/shirts/shirt17.jpg',  },
  { id: 128, name: 'Tie', price: 52000, category: 'Shirts', image: '/images/men/shirts/tie2.jpg',  },
  { id: 129, name: 'Pants', price: 60000, category: 'Trousers', image: '/images/men/shirts/pant1.jpg',  },
  { id: 130, name: 'Pants', price: 60000, category: 'Trousers', image: '/images/men/shirts/pant2.jpg',  },
  { id: 131, name: 'Shorts', price: 25000, category: 'Trousers', image: '/images/men/shirts/short.jpg',  },
  { id: 132, name: 'White sneakers', price: 130000, category: 'Shoes', image: '/images/men/shoes/shoe21.jpg' },
  { id: 133, name: 'Suede sneakers', price: 100000, category: 'Shoes', image: '/images/men/shoes/shoe18.jpg' },
  { id: 134, name: 'Suede sneakers', price: 100000, category: 'Shoes', image: '/images/men/shoes/shoe16.jpg' },
  { id: 135, name: 'White sneakers', price: 120000, category: 'Shoes', image: '/images/men/shoes/shoe15.jpg' },
  { id: 136, name: 'Mens Leather', price: 280000, category: 'Shoes', image: '/images/men/shoes/shoe9.jpg' },
  { id: 137, name: 'Timberland boots', price: 150000, category: 'Shoes', image: '/images/men/shoes/shoe5.jpg' },
  { id: 138, name: 'Mens leather ', price: 280000, category: 'Trousers', image: '/images/men/shoes/shoe13.jpg',  },
  { id: 139, name: 'Cotton briefs 3-pack', price: 32000, category: 'Briefs', image: '/images/men/menbrief1.jpg', tag: 'Bestseller' },
  { id: 140, name: 'Sport boxer briefs', price: 28000, originalPrice: 36000, discount: 22, category: 'Briefs', image: '/images/men/menbrief2.jpg' },
  { id: 141, name: 'Classic nighties', price: 25000, category: 'Briefs', image: '/images/men/mennight.jpg', tag: 'New' },
  { id: 142, name: 'Classic socks', price: 20000, category: 'Briefs', image: '/images/men/shirts/sock2.jpg', tag: 'New' },

]

const ELECTRONICS_PRODUCTS: Product[] = [
  { id: 201, name: 'Wireless ear buds', price: 60000, category: 'Audio', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=520&fit=crop&auto=format', tag: 'Bestseller' },
  { id: 202, name: 'Smartphone 128GB', price: 850000, originalPrice: 950000, discount: 11, category: 'Phones', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=520&fit=crop&auto=format' },
  { id: 204, name: 'Smartwatch', price: 220000, originalPrice: 280000, discount: 21, category: 'Wearables', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=520&fit=crop&auto=format' },
  { id: 205, name: 'Bluetooth speaker', price: 95000, category: 'Audio', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=520&fit=crop&auto=format' },
  { id: 206, name: 'Fast charger 65W', price: 45000, category: 'Accessories', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=520&fit=crop&auto=format' },
  { id: 208, name: 'Power bank 20000mAh', price: 55000, category: 'Accessories', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=520&fit=crop&auto=format' },
]

const BEDDINGS_PRODUCTS: Product[] = [
  { id: 301, name: 'Cotton bath towel set', price: 42000, originalPrice: 52000, discount: 19, category: 'Towels', image: '/images/beddings/bedsheet5.jpg', tag: 'Bestseller' },
  { id: 302, name: 'Egyptian cotton hand towels', price: 18000, category: 'Towels', image: '/images/beddings/bedsheet4.jpg' },
  { id: 303, name: '100% cotton bedsheet set', price: 65000, originalPrice: 80000, discount: 19, category: 'Bedsheets', image: '/images/beddings/bedsheet3.jpg', tag: 'New' },
  { id: 304, name: 'Microfiber fitted bedsheet', price: 38000, category: 'Bedsheets', image: '/images/beddings/bedsheet1.jpg' },
  { id: 305, name: 'All-season duvet', price: 78000, originalPrice: 115000, discount: 17, category: 'Duvets', image: '/images/beddings/bedsheet7.jpg', tag: 'Bestseller' },
  { id: 306, name: 'Quilted duvet cover set', price: 95000, category: 'Duvets', image: '/images/beddings/bedsheet8.jpg', tag: 'New' },
  { id: 307, name: 'All-season duvet', price: 78000, category: 'Duvets', image: '/images/beddings/bedsheet9.jpg', tag: 'New' },
  { id: 308, name: 'All-season duvet', price: 78000, category: 'Duvets', image: '/images/beddings/bedsheet10.jpg', tag: 'New' },
  { id: 309, name: 'Microfiber fitted bedsheet', price: 38000, category: 'Bedsheets', image: '/images/beddings/bedsheet2.jpg' },
  { id: 310, name: 'Cotton bedsheet', price: 38000, category: 'Bedsheets', image: '/images/beddings/bedsheet6.jpg' },
]

const ALL_PRODUCTS: Product[] = [
  ...LADIES_PRODUCTS.map(p => ({ ...p, id: p.id + 10000 })),
  ...MENS_PRODUCTS.map(p => ({ ...p, id: p.id + 10000 })),
  ...ELECTRONICS_PRODUCTS.map(p => ({ ...p, id: p.id + 10000 })),
  ...BEDDINGS_PRODUCTS.map(p => ({ ...p, id: p.id + 10000 })),
]

const CATEGORIES_BY_LINE: Record<NavLine, string[]> = {
  'Store': ['All', 'Dresses', 'Tops', 'Night wear', 'Footwear', 'Bags', 'Pants', 'Caps', 'Shirts', 'Trousers', 'Briefs', 'Shoes', 'Jackets', 'Jerseys', 'Phones', 'Audio', 'Wearables', 'Accessories', 'Towels', 'Bedsheets', 'Duvets'],
  'Ladies line': ['All', 'Dresses', 'Tops', 'Night wear', 'Footwear', 'Bags', 'Pants', 'Caps'],
  'GentleMen': ['All', 'Shirts', 'Trousers', 'Briefs', 'Shoes', 'Jackets', 'Jerseys', 'Bags', 'Caps'],
  'Personal Tech': ['All', 'Phones', 'Audio', 'Wearables', 'Accessories'],
  'Beddings': ['All', 'Towels', 'Bedsheets', 'Duvets'],
}

const PRODUCTS_BY_LINE: Record<NavLine, Product[]> = {
  'Store': ALL_PRODUCTS,
  'Ladies line': LADIES_PRODUCTS,
  'GentleMen': MENS_PRODUCTS,
  'Personal Tech': ELECTRONICS_PRODUCTS,
  'Beddings': BEDDINGS_PRODUCTS,
}

// Flat list used by the Navbar's side menu — each entry jumps straight to a
// specific nav line + category, without needing to first tap the line's tab.
interface CategoryMenuItem {
  label: string
  line: NavLine
  category: string
}
const CATEGORY_MENU: CategoryMenuItem[] = [
  { label: 'All products', line: 'Store', category: 'All' },
  { label: 'Dresses', line: 'Ladies line', category: 'Dresses' },
  { label: 'Tops', line: 'Ladies line', category: 'Tops' },
  { label: 'Night wear', line: 'Ladies line', category: 'Night wear' },
  { label: 'Footwear', line: 'Ladies line', category: 'Footwear' },
  { label: 'Pants', line: 'Ladies line', category: 'Pants' },
  { label: 'Bags', line: 'Ladies line', category: 'Bags' },
  { label: 'Caps', line: 'Ladies line', category: 'Caps' },
  { label: 'Shirts', line: 'GentleMen', category: 'Shirts' },
  { label: 'Trousers', line: 'GentleMen', category: 'Trousers' },
  { label: 'Briefs', line: 'GentleMen', category: 'Briefs' },
  { label: 'Shoes', line: 'GentleMen', category: 'Shoes' },
  { label: 'Jackets', line: 'GentleMen', category: 'Jackets' },
  { label: 'Jerseys', line: 'GentleMen', category: 'Jerseys' },
  { label: 'Phones', line: 'Personal Tech', category: 'Phones' },
  { label: 'Audio', line: 'Personal Tech', category: 'Audio' },
  { label: 'Wearables', line: 'Personal Tech', category: 'Wearables' },
  { label: 'Accessories', line: 'Personal Tech', category: 'Accessories' },
  { label: 'Beddings', line: 'Beddings', category: 'All' },
  { label: 'Towels', line: 'Beddings', category: 'Towels' },
  { label: 'Bedsheets', line: 'Beddings', category: 'Bedsheets' },
  { label: 'Duvets', line: 'Beddings', category: 'Duvets' },
]

// WhatsApp number in full international format, no leading 0 or +
const WHATSAPP_NUMBER = '256751792211'

function fmt(n: number) {
  return `UGX ${n.toLocaleString()}`
}

// Shared across the product detail page and the wishlist so size options stay consistent.
function getSizesForCategory(category: string): string[] {
  if (category === 'Shoes') return Array.from({ length: 9 }, (_, i) => String(37 + i)) // 37–45
  if (category === 'Footwear') return Array.from({ length: 6 }, (_, i) => String(37 + i)) // 37–42
  if (category === 'Bags') return []
  if (category === 'Phones' || category === 'Audio' || category === 'Wearables' || category === 'Accessories') return []
  if (category === 'Bedsheets' || category === 'Duvets') return ['4 by 6', '5 by 6', '6 by 6']
  return ['S', 'M', 'L', 'XL', '2XL']
}

// Cart items don't otherwise track size, so bake the chosen size into the
// display name — it still shows up correctly in the order summary and the
// WhatsApp order message.
function withSizeLabel(product: Product, size: string): Product {
  return size ? { ...product, name: `${product.name} (Size ${size})` } : product
}

function buildWhatsAppMessage(cartItems: CartItem[], delivery: DeliveryInfo, method: PaymentMethod, mobileNumber: string) {
  const lines: string[] = []
  const fullName = `${delivery.firstName} ${delivery.lastName}`.trim()
  const now = new Date()
  const timestamp = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ', ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  lines.push('New Order — E-Collections.ug')
  lines.push(timestamp)
  lines.push('')

  lines.push('*Contact:*')
  if (fullName) lines.push(fullName)
  if (delivery.phone) lines.push(`Phone: ${delivery.phone}`)
  if (delivery.area) lines.push(`Area: ${delivery.area}`)
  if (delivery.landmark) lines.push(`Landmark: ${delivery.landmark}`)
  lines.push('')

  lines.push('*Items:*')
  if (cartItems.length === 0) {
    lines.push('(cart is empty)')
  } else {
    cartItems.forEach((item, i) => {
      lines.push(`${i + 1}. ${item.product.name}${item.quantity > 1 ? ` x${item.quantity}` : ''} — ${fmt(item.product.price * item.quantity)}`)
    })
  }
  lines.push('')

  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0)
  lines.push(`*Subtotal:* ${fmt(subtotal)}`)
  lines.push(`*Total:* ${fmt(subtotal)}`)
  lines.push('')

  const methodLabel = method === 'mobile_money'
    ? (mobileNumber ? `Mobile Money (${mobileNumber})` : 'Mobile Money')
    : 'Cash on delivery'
  lines.push(`*Payment:* ${methodLabel}`)

  return lines.join('\n')
}

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
)
const CartIcon = ({ count }: { count: number }) => (
  <div style={{ position: 'relative' }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
    {count > 0 && (
      <span style={{ position: 'absolute', top: -6, right: -6, background: '#C4562A', color: '#fff', fontSize: 10, fontWeight: 700, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {count}
      </span>
    )}
  </div>
)
const HeartIcon = ({ count }: { count: number }) => (
  <div style={{ position: 'relative' }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
    {count > 0 && (
      <span style={{ position: 'absolute', top: -6, right: -6, background: '#C4562A', color: '#fff', fontSize: 10, fontWeight: 700, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {count}
      </span>
    )}
  </div>
)
const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
  </svg>
)
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export default function App() {
  const [page, setPage] = useState<Page>('listing')
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>(2)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const addToCart = (product: Product, qty: number = 1) => {
    setCartItems(items => {
      const existing = items.find(i => i.product.id === product.id)
      if (existing) {
        return items.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i)
      }
      return [...items, { product, quantity: qty }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems(items => items.filter(i => i.product.id !== productId))
  }

  const updateCartQuantity = (productId: number, delta: number) => {
    setCartItems(items => items
      .map(i => i.product.id === productId ? { ...i, quantity: i.quantity + delta } : i)
      .filter(i => i.quantity > 0)
    )
  }

  // Tapping the wishlist heart no longer adds to cart — it just collects the
  // item (with a default size and quantity) for review on the wishlist page.
  const toggleWishlist = (product: Product) => {
    setWishlistItems(items => {
      const exists = items.some(i => i.product.id === product.id)
      if (exists) return items.filter(i => i.product.id !== product.id)
      const sizes = getSizesForCategory(product.category)
      return [...items, { product, size: sizes[0] ?? '', quantity: 1 }]
    })
  }

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(items => items.filter(i => i.product.id !== productId))
  }

  const setWishlistItemSize = (productId: number, size: string) => {
    setWishlistItems(items => items.map(i => i.product.id === productId ? { ...i, size } : i))
  }

  const setWishlistItemQuantity = (productId: number, delta: number) => {
    setWishlistItems(items => items.map(i => i.product.id === productId ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
  }

  const moveWishlistItemToCart = (productId: number) => {
    const item = wishlistItems.find(i => i.product.id === productId)
    if (item) addToCart(withSizeLabel(item.product, item.size), item.quantity)
    removeFromWishlist(productId)
  }

  const moveAllWishlistToCart = () => {
    wishlistItems.forEach(item => addToCart(withSizeLabel(item.product, item.size), item.quantity))
    setWishlistItems([])
  }

  const viewProduct = (product: Product) => {
    setSelectedProduct(product)
    setPage('detail')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Poppins', sans-serif" }}>
      {page === 'listing' && (
        <>
          <ListingPage
            cartItems={cartItems}
            wishlistItems={wishlistItems}
            addToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            onCheckout={() => setPage('cart')}
            onViewProduct={viewProduct}
            onViewWishlist={() => setPage('wishlist')}
          />
          <Footer />
        </>
      )}
      {page === 'detail' && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          cartItems={cartItems}
          addToCart={addToCart}
          onCheckout={() => setPage('cart')}
          onBack={() => setPage('listing')}
          onViewProduct={viewProduct}
        />
      )}
      {page === 'wishlist' && (
        <WishlistPage
          wishlistItems={wishlistItems}
          onBack={() => setPage('listing')}
          onRemove={removeFromWishlist}
          onSetSize={setWishlistItemSize}
          onSetQuantity={setWishlistItemQuantity}
          onMoveToCart={moveWishlistItemToCart}
          onMoveAllToCart={() => { moveAllWishlistToCart(); setPage('cart') }}
        />
      )}
      {page === 'cart' && (
        <CartPage
          cartItems={cartItems}
          onBack={() => setPage('listing')}
          onRemove={removeFromCart}
          onSetQuantity={updateCartQuantity}
          onCheckout={() => { setPage('checkout'); setCheckoutStep(2) }}
        />
      )}
      {page === 'checkout' && (
        <CheckoutPage
          step={checkoutStep}
          onStepChange={setCheckoutStep}
          onBack={() => setPage('listing')}
          cartItems={cartItems}
          onRemoveFromCart={removeFromCart}
          onUpdateCartQuantity={updateCartQuantity}
        />
      )}
    </div>
  )
}

function ListingPage({ cartItems, wishlistItems, addToCart, onToggleWishlist, onCheckout, onViewProduct, onViewWishlist }: { cartItems: CartItem[]; wishlistItems: WishlistItem[]; addToCart: (product: Product, qty?: number) => void; onToggleWishlist: (product: Product) => void; onCheckout: () => void; onViewProduct: (product: Product) => void; onViewWishlist: () => void }) {
  const [selectedNav, setSelectedNav] = useState<NavLine>('Store')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlistItems.length

  // Products that come in sizes open a quick size-picker sheet instead of
  // adding straight to the cart with no size chosen.
  const [sizeSheetProduct, setSizeSheetProduct] = useState<Product | null>(null)
  const [sheetJustAdded, setSheetJustAdded] = useState(false)

  const handleAddToCart = (product: Product) => {
    const sizes = getSizesForCategory(product.category)
    if (sizes.length === 0) {
      addToCart(product)
    } else {
      setSizeSheetProduct(product)
      setSheetJustAdded(false)
    }
  }

  const confirmSheetSize = (size: string) => {
    if (!sizeSheetProduct) return
    addToCart(withSizeLabel(sizeSheetProduct, size))
    setSheetJustAdded(true)
    window.setTimeout(() => setSizeSheetProduct(null), 500)
  }

  const navItems: NavLine[] = ['Store', 'Ladies line', 'GentleMen', 'Personal Tech', 'Beddings']

  const categories = CATEGORIES_BY_LINE[selectedNav]
  const lineProducts = PRODUCTS_BY_LINE[selectedNav]

  // Jumping to a specific category (via the side menu) sets both the line and
  // category directly, without being reset back to 'All'.
  const jumpToCategory = (line: NavLine, category: string) => {
    setSelectedNav(line)
    setActiveCategory(category)
  }

  const visible = lineProducts.filter(p => activeCategory === 'All' || p.category === activeCategory)

  return (
    <div style={{ width: '100%', maxWidth: 420, margin: '0 auto', minHeight: '100vh', backgroundColor: '#FFF', position: 'relative', overflowX: 'hidden' }}>
      <Navbar cartCount={cartCount} onCheckout={onCheckout} wishlistCount={wishlistCount} onWishlist={onViewWishlist} categories={CATEGORY_MENU} onSelectCategory={(line, category) => jumpToCategory(line as NavLine, category)} />

      {/* CHANGED: spacer reserves space for the now-fixed Navbar (promo bar ~24px + logo row ~57px = ~81px)
          so Hero and page content don't render underneath it */}
      <div style={{ height: 81 }} />

      <div style={{ padding: '8px 20px 0' }}>
        <Hero />
      </div>

      <div style={{ marginTop: 16 }}>
        <Section />
      </div>

      <div style={{ padding: '0 20px 12px' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginTop: 22, marginBottom: 14, scrollbarWidth: 'none' }}>
          {navItems.map(item => {
            const active = selectedNav === item
            return (
              <button
                key={item}
                onClick={() => { setSelectedNav(item); setActiveCategory('All') }}
                style={{
                  padding: '7px 11px', borderRadius: 20, fontSize: 14, fontWeight: active ? 700 : 600,
                  border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                  transition: 'all 0.15s',
                  backgroundColor: active ? '#16A34A' : '#F5F3EF',
                  color: active ? '#FFFFFF' : '#4A4A4A',
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {item}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 22, scrollbarWidth: 'none' }}>
          {categories.map(cat => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '7px 11px', borderRadius: 20, fontSize: 14, fontWeight: active ? 600 : 400,
                  border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                  transition: 'all 0.15s',
                  backgroundColor: active ? '#C8E6D4' : '#E8E4DE',
                  color: active ? '#1B5E3E' : '#4A4A4A',
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {visible.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              wishlisted={wishlistItems.some(i => i.product.id === product.id)}
              onToggleWishlist={() => onToggleWishlist(product)}
              onAddToCart={() => handleAddToCart(product)}
              onViewProduct={() => onViewProduct(product)}
            />
          ))}
        </div>

        {visible.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#717171' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🛍</div>
            <p style={{ fontSize: 16 }}>No items in this category yet</p>
          </div>
        )}
      </div>

      <button
        onClick={onCheckout}
        aria-label="View cart and checkout"
        style={{
          position: 'fixed', right: 20, bottom: 70, zIndex: 999,
          width: 50, height: 50, borderRadius: '50%',
          backgroundColor: '#cf5e31', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 18px rgba(196,86,42,0.45)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <span style={{
          position: 'absolute', top: -4, right: -4,
          width: 22, height: 22, borderRadius: '50%',
          backgroundColor: '#fff', color: '#C4562A',
          fontSize: 12, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid #C4562A',
        }}>
          {cartCount}
        </span>
      </button>

      {sizeSheetProduct && (
        <SizePickerSheet
          product={sizeSheetProduct}
          justAdded={sheetJustAdded}
          onClose={() => setSizeSheetProduct(null)}
          onConfirm={confirmSheetSize}
        />
      )}
    </div>
  )
}

function SizePickerSheet({ product, justAdded, onClose, onConfirm }: { product: Product; justAdded: boolean; onClose: () => void; onConfirm: (size: string) => void }) {
  const sizes = getSizesForCategory(product.category)
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] ?? '')

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}
      />
      <div
        style={{
          position: 'relative', width: '100%', maxWidth: 420, backgroundColor: '#fff',
          borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: '20px 20px 24px',
          boxShadow: '0 -6px 24px rgba(0,0,0,0.15)', fontFamily: "'Playfair Display', Georgia, serif",
        }}
      >
        <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#DDD9D3', margin: '0 auto 16px' }} />

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
          <img src={product.image} alt={product.name} style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover', backgroundColor: '#D8D3CB', flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3, marginBottom: 2 }}>{product.name}</p>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#16A34A' }}>{fmt(product.price)}</span>
          </div>
        </div>

        <p style={{ fontSize: 14, fontWeight: 600, color: '#717171', marginBottom: 10 }}>Select a size</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {sizes.map(size => {
            const active = selectedSize === size
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{
                  padding: '9px 16px', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer',
                  border: `1.5px solid ${active ? '#1B5E3E' : '#DDD9D3'}`,
                  backgroundColor: active ? '#EAF5EE' : '#fff',
                  color: active ? '#1B5E3E' : '#1A1A1A',
                }}
              >
                {size}
              </button>
            )
          })}
        </div>

        <button
          onClick={() => onConfirm(selectedSize)}
          disabled={justAdded}
          style={{
            width: '100%', padding: '15px', border: 'none', borderRadius: 14, fontSize: 17, fontWeight: 600,
            cursor: justAdded ? 'default' : 'pointer',
            backgroundColor: justAdded ? '#1B5E3E' : '#16A34A', color: '#fff',
            transition: 'background-color 0.15s',
          }}
        >
          {justAdded ? 'Added ✓' : 'Add to cart'}
        </button>
      </div>
    </div>
  )
}

function WishlistPage({ wishlistItems, onBack, onRemove, onSetSize, onSetQuantity, onMoveToCart, onMoveAllToCart }: {
  wishlistItems: WishlistItem[]
  onBack: () => void
  onRemove: (productId: number) => void
  onSetSize: (productId: number, size: string) => void
  onSetQuantity: (productId: number, delta: number) => void
  onMoveToCart: (productId: number) => void
  onMoveAllToCart: () => void
}) {
  const hasItems = wishlistItems.length > 0

  return (
    <div style={{ width: '100%', maxWidth: 420, margin: '0 auto', minHeight: '100vh', backgroundColor: '#F5F3EF', fontFamily: "'Playfair Display', Georgia, serif" }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 30, backgroundColor: '#F5F3EF', borderBottom: '1px solid #E8E4DE', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: 6, fontSize: 16, fontWeight: 500 }}>
          <BackIcon /> Back
        </button>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>Wishlist</span>
        <span style={{ width: 20 }} />
      </div>

      <div style={{ padding: '20px 20px 120px' }}>
        {!hasItems && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#717171' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🤍</div>
            <p style={{ fontSize: 16 }}>Your wishlist is empty</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {wishlistItems.map(item => {
            const sizes = getSizesForCategory(item.product.category)
            return (
              <div key={item.product.id} style={{ display: 'flex', gap: 12, backgroundColor: '#fff', borderRadius: 16, padding: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover', flexShrink: 0, backgroundColor: '#D8D3CB' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3, marginBottom: 2 }}>{item.product.name}</p>
                    <button
                      onClick={() => onRemove(item.product.id)}
                      aria-label="Remove from wishlist"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9A9590', fontSize: 18, lineHeight: 1, flexShrink: 0, padding: 0 }}
                    >
                      ×
                    </button>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#16A34A' }}>{fmt(item.product.price)}</span>

                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
                    {sizes.length > 0 && (
                      <select
                        value={item.size}
                        onChange={e => onSetSize(item.product.id, e.target.value)}
                        style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', border: '1.5px solid #DDD9D3', borderRadius: 8, padding: '4px 6px', fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {sizes.map(s => <option key={s} value={s}>Size {s}</option>)}
                      </select>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #DDD9D3', borderRadius: 8, overflow: 'hidden' }}>
                      <button
                        onClick={() => onSetQuantity(item.product.id, -1)}
                        aria-label="Decrease quantity"
                        style={{ width: 26, height: 26, border: 'none', background: '#F5F3EF', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#1A1A1A' }}
                      >
                        −
                      </button>
                      <span style={{ width: 26, textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{item.quantity}</span>
                      <button
                        onClick={() => onSetQuantity(item.product.id, 1)}
                        aria-label="Increase quantity"
                        style={{ width: 26, height: 26, border: 'none', background: '#F5F3EF', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#1A1A1A' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onMoveToCart(item.product.id)}
                    style={{ marginTop: 10, width: '100%', padding: '8px', border: 'none', borderRadius: 8, backgroundColor: '#16A34A', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {hasItems && (
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 420, padding: '14px 20px', backgroundColor: 'rgba(245,243,239,0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid #E8E4DE', zIndex: 30 }}>
          <button
            onClick={onMoveAllToCart}
            style={{ width: '100%', padding: '15px', backgroundColor: '#166534', color: '#fff', border: 'none', borderRadius: 14, fontSize: 17, fontWeight: 600, cursor: 'pointer' }}
          >
            Add all to cart
          </button>
        </div>
      )}
    </div>
  )
}

function CartPage({ cartItems, onBack, onRemove, onSetQuantity, onCheckout }: {
  cartItems: CartItem[]
  onBack: () => void
  onRemove: (productId: number) => void
  onSetQuantity: (productId: number, delta: number) => void
  onCheckout: () => void
}) {
  const hasItems = cartItems.length > 0
  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const total = subtotal

  return (
    <div style={{ width: '100%', maxWidth: 420, margin: '0 auto', minHeight: '100vh', backgroundColor: '#F5F3EF', fontFamily: "'Playfair Display', Georgia, serif" }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 30, backgroundColor: '#F5F3EF', borderBottom: '1px solid #E8E4DE', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: 6, fontSize: 16, fontWeight: 500 }}>
          <BackIcon /> Back
        </button>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>Your cart</span>
        <span style={{ width: 20 }} />
      </div>

      <div style={{ padding: '20px 20px 140px' }}>
        {!hasItems && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#717171' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🛍</div>
            <p style={{ fontSize: 16 }}>Your cart is empty</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {cartItems.map(item => (
            <div key={item.product.id} style={{ display: 'flex', gap: 12, backgroundColor: '#fff', borderRadius: 16, padding: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover', flexShrink: 0, backgroundColor: '#D8D3CB' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3, marginBottom: 2 }}>{item.product.name}</p>
                  <button
                    onClick={() => onRemove(item.product.id)}
                    aria-label="Remove from cart"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9A9590', fontSize: 18, lineHeight: 1, flexShrink: 0, padding: 0 }}
                  >
                    ×
                  </button>
                </div>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#16A34A' }}>{fmt(item.product.price * item.quantity)}</span>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: 8, border: '1.5px solid #DDD9D3', borderRadius: 8, width: 'fit-content', overflow: 'hidden' }}>
                  <button
                    onClick={() => onSetQuantity(item.product.id, -1)}
                    aria-label="Decrease quantity"
                    style={{ width: 26, height: 26, border: 'none', background: '#F5F3EF', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#1A1A1A' }}
                  >
                    −
                  </button>
                  <span style={{ width: 26, textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{item.quantity}</span>
                  <button
                    onClick={() => onSetQuantity(item.product.id, 1)}
                    aria-label="Increase quantity"
                    style={{ width: 26, height: 26, border: 'none', background: '#F5F3EF', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#1A1A1A' }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {hasItems && (
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 420, padding: '14px 20px', backgroundColor: 'rgba(245,243,239,0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid #E8E4DE', zIndex: 30 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#717171' }}>Total</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#1B5E3E' }}>{fmt(total)}</span>
          </div>
          <button
            onClick={onCheckout}
            style={{ width: '100%', padding: '15px', backgroundColor: '#166534', color: '#fff', border: 'none', borderRadius: 14, fontSize: 17, fontWeight: 600, cursor: 'pointer' }}
          >
            Proceed to checkout
          </button>
        </div>
      )}
    </div>
  )
}

function ProductCard({ product, wishlisted, onToggleWishlist, onAddToCart, onViewProduct }: { product: Product; wishlisted: boolean; onToggleWishlist: () => void; onAddToCart: () => void; onViewProduct: () => void }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      onClick={onViewProduct}
      className="flex h-full flex-col bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image container: fixed aspect ratio, image clipped/fitted inside with rounded top corners */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-xl bg-[#D8D3CB]">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#9A9590] text-2xl">
            👗
          </div>
        )}

        {product.discount && (
          <div className="absolute top-1.5 left-1.5 bg-[#C4562A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            -{product.discount}%
          </div>
        )}
        {product.tag && !product.discount && (
          <div className="absolute top-1.5 left-1.5 bg-[#1B5E3E] text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
            {product.tag}
          </div>
        )}

        <button
          onClick={e => { e.stopPropagation(); onToggleWishlist() }}
          className={`absolute top-1.5 right-1.5 w-[26px] h-[26px] rounded-full bg-white/95 border-none cursor-pointer text-base font-bold leading-none flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-transform duration-150 ${wishlisted ? 'scale-105 text-[#fd0606]' : 'scale-100 text-[#fe4a03]'}`}
        >
          {wishlisted ? '♥' : '♡'}
        </button>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col px-2 pt-1 pb-1.5">
        <p className="text-[13px] font-bold text-[#1A1A1A] leading-tight mb-0.5 line-clamp-1">
          {product.name}
        </p>
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-[16px] font-bold text-[#16A34A]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{fmt(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[13px] font-semibold text-[#9A9590] line-through" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{fmt(product.originalPrice)}</span>
          )}
        </div>
        <button
          onClick={e => { e.stopPropagation(); onAddToCart() }}
          className="w-full mt-auto py-2 px-2 border-none rounded-lg bg-[#16A34A] text-white text-[14px] font-medium cursor-pointer hover:bg-[#128a3e] transition-colors"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

function ProductDetailPage({ product, cartItems, addToCart, onCheckout, onBack, onViewProduct }: { product: Product; cartItems: CartItem[]; addToCart: (product: Product, qty?: number) => void; onCheckout: () => void; onBack: () => void; onViewProduct: (product: Product) => void }) {
  const [imgError, setImgError] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>('M')
  const [qty, setQty] = useState(1)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const sizes = getSizesForCategory(product.category)

  useEffect(() => {
    setSelectedSize(sizes[0] ?? '')
  }, [product.id])

  // "Customers also bought" — prefer same category, fall back to other products in the same line
  const related = ALL_PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 6)
  const relatedToShow = related.length > 0
    ? related
    : ALL_PRODUCTS.filter(p => p.id !== product.id).slice(0, 6)

  return (
    <div style={{ width: '100%', maxWidth: 420, margin: '0 auto', minHeight: '100vh', backgroundColor: '#FFF', position: 'relative', fontFamily: "'Playfair Display', Georgia, serif" }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 30, backgroundColor: '#fff', borderBottom: '1px solid #E8E4DE' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: 6, fontSize: 16, fontWeight: 500 }}>
            <BackIcon /> Back
          </button>
          <button
            onClick={onCheckout}
            aria-label="View cart"
            style={{ position: 'relative', border: 'none', background: 'transparent', color: '#1A1A1A', cursor: 'pointer', padding: 0 }}
          >
            <CartIcon count={cartCount} />
          </button>
        </div>
        <div style={{ padding: '0 20px 12px', fontSize: 14, color: '#9A9590', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          Home <span style={{ margin: '0 4px' }}>/</span> {product.category} <span style={{ margin: '0 4px' }}>/</span>
          <span style={{ color: '#C4562A', fontWeight: 500 }}> {product.name}</span>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', backgroundColor: '#D8D3CB' }}>
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9A9590', fontSize: 48 }}>
            👗
          </div>
        )}
        {product.discount && (
          <div style={{ position: 'absolute', top: 14, left: 14, backgroundColor: '#C4562A', color: '#fff', fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 20, fontFamily: "'Playfair Display', Georgia, serif" }}>
            -{product.discount}%
          </div>
        )}
        {product.tag && !product.discount && (
          <div style={{ position: 'absolute', top: 14, left: 14, backgroundColor: '#1B5E3E', color: '#fff', fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 20 }}>
            {product.tag}
          </div>
        )}
      </div>

      <div style={{ padding: '22px 20px 0' }}>
        <h1 style={{ fontSize: 27, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.25, marginBottom: 12, fontFamily: "'Playfair Display', serif" }}>{product.name}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 26, fontWeight: 800, color: '#16A34A' }}>{fmt(product.price)}</span>
          {product.originalPrice && (
            <span style={{ fontSize: 18, color: '#9A9590', textDecoration: 'line-through' }}>{fmt(product.originalPrice)}</span>
          )}
        </div>
        <p style={{ fontSize: 16, color: '#4A4A4A', lineHeight: 1.6, marginBottom: 24 }}>
          {product.name} — {product.category}. Comfortable, everyday quality designed to last.
        </p>

        {sizes.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#717171', marginBottom: 10 }}>Size</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {sizes.map(size => {
              const active = selectedSize === size
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '9px 16px', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer',
                    border: `1.5px solid ${active ? '#1B5E3E' : '#DDD9D3'}`,
                    backgroundColor: active ? '#EAF5EE' : '#fff',
                    color: active ? '#1B5E3E' : '#1A1A1A',
                  }}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#717171' }}>Quantity</p>
          <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #DDD9D3', borderRadius: 10, overflow: 'hidden' }}>
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              style={{ width: 34, height: 34, border: 'none', background: '#F5F3EF', fontSize: 16, fontWeight: 600, cursor: 'pointer', color: '#1A1A1A' }}
            >
              −
            </button>
            <span style={{ width: 36, textAlign: 'center', fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>{qty}</span>
            <button
              onClick={() => setQty(q => q + 1)}
              style={{ width: 34, height: 34, border: 'none', background: '#F5F3EF', fontSize: 16, fontWeight: 600, cursor: 'pointer', color: '#1A1A1A' }}
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={() => addToCart(product, qty)}
          style={{ width: '100%', padding: '15px', backgroundColor: '#16A34A', color: '#fff', border: 'none', borderRadius: 14, fontSize: 19, fontWeight: 700, cursor: 'pointer', marginBottom: 36, fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Add to cart
        </button>
      </div>

      {relatedToShow.length > 0 && (
        <div style={{ padding: '0 0 40px' }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', margin: '0 20px 14px' }}>Customers also bought</p>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px 4px', scrollbarWidth: 'none' }}>
            {relatedToShow.map(p => (
              <button
                key={p.id}
                onClick={() => onViewProduct(p)}
                style={{ flexShrink: 0, width: 130, textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
              >
                <div style={{ width: 130, aspectRatio: '3/4', borderRadius: 14, overflow: 'hidden', backgroundColor: '#D8D3CB', marginBottom: 8 }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                <p style={{ fontSize: 12.5, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.3, marginBottom: 4 }}>{p.name}</p>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#16A34A' }}>{fmt(p.price)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CheckoutPage({ step, onStepChange, onBack, cartItems, onRemoveFromCart, onUpdateCartQuantity }: { step: CheckoutStep; onStepChange: (s: CheckoutStep) => void; onBack: () => void; cartItems: CartItem[]; onRemoveFromCart: (productId: number) => void; onUpdateCartQuantity: (productId: number, delta: number) => void }) {
  const steps: { label: string; n: CheckoutStep }[] = [
    { label: 'Delivery', n: 1 },
    { label: 'Payment', n: 2 },
  ]

  const [delivery, setDelivery] = useState<DeliveryInfo>({
    firstName: '', lastName: '', phone: '', area: '', landmark: '',
  })
  const [method, setMethod] = useState<PaymentMethod>('mobile_money')
  const [mobileNumber, setMobileNumber] = useState('')
  const [showValidation, setShowValidation] = useState(false)
  const [showCartEmptyError, setShowCartEmptyError] = useState(false)

  const isContactInfoValid = delivery.firstName.trim() !== '' && delivery.phone.trim() !== '' && delivery.area.trim() !== ''
  const isCartEmpty = cartItems.length === 0

  const sendToWhatsApp = () => {
    const message = buildWhatsAppMessage(cartItems, delivery, method, mobileNumber)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const handlePrimaryAction = () => {
    if (step === 2 && isCartEmpty) {
      // Block confirming payment on an empty cart
      setShowCartEmptyError(true)
      return
    }
    if (step === 2 && !isContactInfoValid) {
      // Block advancing to Confirm until name, phone, and location are filled
      setShowValidation(true)
      return
    }
    if (step === 2) {
      // Confirm & Pay sends the order straight to WhatsApp — no separate confirm page
      sendToWhatsApp()
      return
    }
    onStepChange((step + 1) as CheckoutStep)
  }

  useEffect(() => {
    if (!isCartEmpty) setShowCartEmptyError(false)
  }, [isCartEmpty])

  return (
    <div style={{ width: '100%', maxWidth: 420, margin: '0 auto', minHeight: '100vh', backgroundColor: '#F5F3EF', fontFamily: "'Playfair Display', Georgia, serif" }}>
      <div style={{ backgroundColor: '#F5F3EF', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E8E4DE', position: 'sticky', top: 0, zIndex: 30 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: 6, fontSize: 16, fontWeight: 500 }}>
          <BackIcon /> Back
        </button>
        <div>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A', fontFamily: "'Playfair Display', serif" }}>E-Collections</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#717171', fontSize: 15 }}>
          <LockIcon /> Secure checkout
        </div>
      </div>

      <div style={{ padding: '8px 24px 0', backgroundColor: '#F5F3EF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {steps.map((s, i) => {
            const done = step > s.n
            const active = step === s.n
            const upcoming = step < s.n
            return (
              <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, transition: 'all 0.2s',
                    backgroundColor: done || active ? '#1B5E3E' : '#DDD9D3',
                    color: done || active ? '#fff' : '#717171',
                    border: active ? '2px solid #1B5E3E' : 'none',
                  }}>
                    {done ? <CheckIcon /> : s.n}
                  </div>
                  <span style={{ fontSize: 15, fontWeight: active ? 600 : 400, color: upcoming ? '#9A9590' : '#1A1A1A' }}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: 1.5, backgroundColor: done ? '#1B5E3E' : '#DDD9D3', margin: '0 10px', transition: 'background 0.2s' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ padding: '24px 20px 100px' }}>
        {step === 1 && <DeliveryStep cartItems={cartItems} delivery={delivery} setDelivery={setDelivery} />}
        {step === 2 && <PaymentStep cartItems={cartItems} method={method} setMethod={setMethod} mobileNumber={mobileNumber} setMobileNumber={setMobileNumber} delivery={delivery} setDelivery={setDelivery} showValidation={showValidation} showCartEmptyError={showCartEmptyError} onRemoveFromCart={onRemoveFromCart} onUpdateCartQuantity={onUpdateCartQuantity} />}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 420, padding: '14px 20px', backgroundColor: 'rgba(245,243,239,0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid #E8E4DE', zIndex: 30 }}>
        <button
          onClick={handlePrimaryAction}
          style={{ width: '100%', padding: '15px', backgroundColor: '#166534', color: '#fff', border: 'none', borderRadius: 14, fontSize: 17, fontWeight: 600, cursor: 'pointer' }}
        >
          {step === 1 ? 'Continue to Payment' : 'Confirm & Pay'}
        </button>
      </div>
    </div>
  )
}

function DeliveryStep({ cartItems, delivery, setDelivery }: { cartItems: CartItem[]; delivery: DeliveryInfo; setDelivery: Dispatch<SetStateAction<DeliveryInfo>> }) {
  const inputStyle = {
    width: '100%', padding: '13px 15px', borderRadius: 12, border: '1.5px solid #DDD9D3',
    backgroundColor: '#fff', fontSize: 16, color: '#1A1A1A', outline: 'none',
    boxSizing: 'border-box' as const,
  }
  const update = (field: keyof DeliveryInfo) => (e: ChangeEvent<HTMLInputElement>) =>
    setDelivery(d => ({ ...d, [field]: e.target.value }))

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, fontFamily: "'Playfair Display', serif" }}>Delivery details</h2>
      <OrderSummary items={cartItems} />
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: '#717171', marginBottom: 6, display: 'block' }}>First name</label>
            <input style={inputStyle} placeholder="Amara" value={delivery.firstName} onChange={update('firstName')} />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, color: '#717171', marginBottom: 6, display: 'block' }}>Last name</label>
            <input style={inputStyle} placeholder="Nakato" value={delivery.lastName} onChange={update('lastName')} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 14, fontWeight: 500, color: '#717171', marginBottom: 6, display: 'block' }}>Phone number</label>
          <input style={inputStyle} placeholder="07XX XXX XXX" value={delivery.phone} onChange={update('phone')} />
        </div>
        <div>
          <label style={{ fontSize: 14, fontWeight: 500, color: '#717171', marginBottom: 6, display: 'block' }}>Delivery area</label>
          <input style={inputStyle} placeholder="e.g. Kampala, Wakiso" value={delivery.area} onChange={update('area')} />
        </div>
        <div>
          <label style={{ fontSize: 14, fontWeight: 500, color: '#717171', marginBottom: 6, display: 'block' }}>Nearest landmark</label>
          <input style={inputStyle} placeholder="e.g. Next to Garden City mall" value={delivery.landmark} onChange={update('landmark')} />
        </div>
      </div>
    </div>
  )
}

function PaymentStep({ cartItems, method, setMethod, mobileNumber, setMobileNumber, delivery, setDelivery, showValidation, showCartEmptyError, onRemoveFromCart, onUpdateCartQuantity }: { cartItems: CartItem[]; method: PaymentMethod; setMethod: Dispatch<SetStateAction<PaymentMethod>>; mobileNumber: string; setMobileNumber: Dispatch<SetStateAction<string>>; delivery: DeliveryInfo; setDelivery: Dispatch<SetStateAction<DeliveryInfo>>; showValidation: boolean; showCartEmptyError: boolean; onRemoveFromCart: (productId: number) => void; onUpdateCartQuantity: (productId: number, delta: number) => void }) {
  const methods: { key: PaymentMethod; title: string; subtitle: string }[] = [
    { key: 'mobile_money', title: 'Mobile Money', subtitle: 'MTN and Airtel accepted' },
    { key: 'cash', title: 'Cash on delivery', subtitle: 'Pay when your order arrives' },
  ]

  const fullName = `${delivery.firstName} ${delivery.lastName}`.trim()
  const nameError = showValidation && fullName === ''
  const phoneError = showValidation && delivery.phone.trim() === ''
  const areaError = showValidation && delivery.area.trim() === ''

  const inputStyle = (hasError: boolean) => ({
    width: '100%', padding: '13px 15px', borderRadius: 12, border: `1.5px solid ${hasError ? '#DC2626' : '#DDD9D3'}`,
    backgroundColor: '#fff', fontSize: 14, color: '#1A1A1A', outline: 'none',
    boxSizing: 'border-box' as const,
  })
  const labelStyle = { fontSize: 14, fontWeight: 500, color: '#717171', marginBottom: 6, display: 'block' as const }
  const errorTextStyle = { fontSize: 13, color: '#DC2626', marginTop: 4, display: 'block' as const }

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, fontFamily: "'Playfair Display', serif" }}>Payment method</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {methods.map(m => {
          const active = method === m.key
          return (
            <button
              key={m.key}
              onClick={() => setMethod(m.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 10, textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s',
                border: `2px solid ${active ? '#1B5E3E' : '#DDD9D3'}`,
                backgroundColor: active ? '#EAF5EE' : '#fff',
              }}
            >
              <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${active ? '#1B5E3E' : '#9A9590'}`, backgroundColor: active ? '#1B5E3E' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                {active && <CheckIcon />}
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: active ? '#1B5E3E' : '#1A1A1A', marginBottom: 2 }}>{m.title}</p>
                <p style={{ fontSize: 13, color: active ? '#2D7A56' : '#717171' }}>{m.subtitle}</p>
              </div>
            </button>
          )
        })}
      </div>

      <div style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={labelStyle}>Full name *</label>
          <input
            required
            style={inputStyle(nameError)}
            placeholder="Amara Nakato"
            value={fullName}
            onChange={e => {
              const [firstName = '', ...rest] = e.target.value.split(' ')
              setDelivery(d => ({ ...d, firstName, lastName: rest.join(' ') }))
            }}
          />
          {nameError && <span style={errorTextStyle}>Please enter your name</span>}
        </div>
        <div>
          <label style={labelStyle}>Phone number *</label>
          <input
            required
            style={inputStyle(phoneError)}
            placeholder="07XX XXX XXX"
            value={delivery.phone}
            onChange={e => setDelivery(d => ({ ...d, phone: e.target.value }))}
          />
          {phoneError && <span style={errorTextStyle}>Please enter your phone number</span>}
        </div>
        <div>
          <label style={labelStyle}>Location *</label>
          <input
            required
            style={inputStyle(areaError)}
            placeholder="e.g. Kampala, Wakiso"
            value={delivery.area}
            onChange={e => setDelivery(d => ({ ...d, area: e.target.value }))}
          />
          {areaError && <span style={errorTextStyle}>Please enter your location</span>}
        </div>
      </div>

      {method === 'mobile_money' && (
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 15, fontWeight: 500, color: '#717171', marginBottom: 8, display: 'block' }}>Mobile Money number</label>
          <input
            value={mobileNumber}
            onChange={e => setMobileNumber(e.target.value)}
            placeholder="07XX XXX XXX"
            style={{ width: '100%', padding: '15px 18px', borderRadius: 14, border: 'none', backgroundColor: '#1A1A1A', color: '#fff', fontSize: 16, fontWeight: 500, outline: 'none', letterSpacing: '0.04em', boxSizing: 'border-box' }}
          />
        </div>
      )}

      <CartItemsPreview items={cartItems} onRemove={onRemoveFromCart} />

      <OrderSummary items={cartItems} highlightEmpty={showCartEmptyError} onRemove={onRemoveFromCart} onSetQuantity={onUpdateCartQuantity} />
    </div>
  )
}

function CartItemsPreview({ items, onRemove }: { items: CartItem[]; onRemove?: (productId: number) => void }) {
  if (items.length === 0) return null
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 15, fontWeight: 600, color: '#717171', marginBottom: 10 }}>Items in your cart</p>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
        {items.map(item => (
          <div key={item.product.id} style={{ flexShrink: 0, width: 84, backgroundColor: '#fff', borderRadius: 12, padding: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', backgroundColor: '#D8D3CB', marginBottom: 6 }}>
              <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {item.quantity > 1 && (
                <span style={{ position: 'absolute', top: 4, right: 4, backgroundColor: '#16A34A', color: '#fff', fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.quantity}
                </span>
              )}
              {onRemove && (
                <button
                  onClick={() => onRemove(item.product.id)}
                  aria-label="Remove from cart"
                  style={{ position: 'absolute', top: 4, left: 4, width: 18, height: 18, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer', color: '#9A9590', fontSize: 13, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                >
                  ×
                </button>
              )}
            </div>
            <p className="line-clamp-2" style={{ fontSize: 11, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.25 }}>{item.product.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrderSummary({ items, highlightEmpty, onRemove, onSetQuantity }: { items: CartItem[]; highlightEmpty?: boolean; onRemove?: (productId: number) => void; onSetQuantity?: (productId: number, delta: number) => void }) {
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const hasItems = items.length > 0
  const total = subtotal
  const editable = !!(onRemove && onSetQuantity)

  return (
    <div style={{ backgroundColor: '#E8E4DE', borderRadius: 18, padding: '18px 20px', border: highlightEmpty && !hasItems ? '1.5px solid #DC2626' : '1.5px solid transparent', transition: 'border-color 0.15s' }}>
      <p style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 14 }}>Order summary</p>
      {!hasItems && (
        <p style={{ fontSize: 15.5, color: highlightEmpty ? '#DC2626' : '#717171', fontWeight: highlightEmpty ? 700 : 400, marginBottom: 14 }}>
          {highlightEmpty ? '⚠ Your cart is empty — add items before paying' : 'Your cart is empty'}
        </p>
      )}
      {items.map(item => (
        <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 15.5, color: '#1A1A1A', lineHeight: 1.4, display: 'block' }}>{item.product.name}{!editable && item.quantity > 1 ? ` x${item.quantity}` : ''}</span>
            {editable && (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 6, border: '1.5px solid #D0CDC7', borderRadius: 8, width: 'fit-content', overflow: 'hidden', backgroundColor: '#fff' }}>
                <button
                  onClick={() => onSetQuantity!(item.product.id, -1)}
                  aria-label="Decrease quantity"
                  style={{ width: 24, height: 24, border: 'none', background: 'transparent', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#1A1A1A' }}
                >
                  −
                </button>
                <span style={{ width: 22, textAlign: 'center', fontSize: 12.5, fontWeight: 600, color: '#1A1A1A' }}>{item.quantity}</span>
                <button
                  onClick={() => onSetQuantity!(item.product.id, 1)}
                  aria-label="Increase quantity"
                  style={{ width: 24, height: 24, border: 'none', background: 'transparent', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#1A1A1A' }}
                >
                  +
                </button>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A' }}>{fmt(item.product.price * item.quantity)}</span>
            {editable && (
              <button
                onClick={() => onRemove!(item.product.id)}
                aria-label="Remove from cart"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9A9590', fontSize: 18, lineHeight: 1, padding: 0 }}
              >
                ×
              </button>
            )}
          </div>
        </div>
      ))}
      <div style={{ borderTop: '1.5px solid #D0CDC7', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>Total</span>
        <span style={{ fontSize: 24, fontWeight: 800, color: '#1B5E3E' }}>{fmt(total)}</span>
      </div>
    </div>
  )
}
