// src/App.tsx (updated - complete version)
import React, { useState, createContext, useContext, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import BrandExperience from './sections/BrandExperience'
import Services from './sections/Services'
import MenuSection from './sections/MenuSection'
import BookingSection from './sections/BookingSection'
import OrderSection from './sections/OrderSection'
import GiftExperience from './sections/GiftExperience'
import Testimonials from './sections/Testimonials'
import Footer from './sections/Footer'
import AuthModal from './components/AuthModal'
import CartDrawer from './components/CartDrawer'
import CustomCursor from './components/CustomCursor'
import RewardsModal from './components/RewardsModal'
import { AnimatePresence } from 'framer-motion'

// Context for global state
interface AppState {
  isAuthenticated: boolean
  user: User | null
  cart: CartItem[]
  showAuth: boolean
  authMode: 'login' | 'signup'
  showCart: boolean
  showGift: boolean
  hasSeenGift: boolean
  showRewards: boolean
}

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  variant?: string
}

const defaultState: AppState = {
  isAuthenticated: false,
  user: null,
  cart: [],
  showAuth: false,
  authMode: 'login',
  showCart: false,
  showGift: false,
  hasSeenGift: false,
  showRewards: false,
}

const AppContext = createContext<{
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  login: (user: User) => void
  logout: () => void
  openAuth: (mode?: 'login' | 'signup') => void
  closeAuth: () => void
  openCart: () => void
  closeCart: () => void
  openRewards: () => void
  closeRewards: () => void
}>({
  state: defaultState,
  setState: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  login: () => {},
  logout: () => {},
  openAuth: () => {},
  closeAuth: () => {},
  openCart: () => {},
  closeCart: () => {},
  openRewards: () => {},
  closeRewards: () => {},
})

export const useApp = () => useContext(AppContext)

function App() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('brew-bloom-state')
    const parsed = saved ? JSON.parse(saved) : {}
    return { ...defaultState, ...parsed }
  })

  useEffect(() => {
    localStorage.setItem('brew-bloom-state', JSON.stringify({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      hasSeenGift: state.hasSeenGift,
    }))
  }, [state.isAuthenticated, state.user, state.hasSeenGift])

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setState(prev => {
      const existing = prev.cart.find(i => i.id === item.id && i.variant === item.variant)
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map(i => 
            i.id === item.id && i.variant === item.variant
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          showCart: true,
        }
      }
      return {
        ...prev,
        cart: [...prev.cart, { ...item, quantity: 1 }],
        showCart: true,
      }
    })
  }

  const removeFromCart = (id: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(i => i.id !== id),
    }))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setState(prev => ({
      ...prev,
      cart: prev.cart.map(i => i.id === id ? { ...i, quantity } : i),
    }))
  }

  const login = (user: User) => {
    setState(prev => ({
      ...prev,
      isAuthenticated: true,
      user,
      showAuth: false,
    }))
  }

  const logout = () => {
    setState(prev => ({
      ...prev,
      isAuthenticated: false,
      user: null,
      cart: [],
    }))
  }

  const openAuth = (mode: 'login' | 'signup' = 'login') => {
    setState(prev => ({ ...prev, showAuth: true, authMode: mode }))
  }

  const closeAuth = () => {
    setState(prev => ({ ...prev, showAuth: false }))
  }

  const openCart = () => setState(prev => ({ ...prev, showCart: true }))
  const closeCart = () => setState(prev => ({ ...prev, showCart: false }))

  const openRewards = () => setState(prev => ({ ...prev, showRewards: true }))
  const closeRewards = () => setState(prev => ({ ...prev, showRewards: false }))

  // Show gift on first visit after 3 seconds
  useEffect(() => {
    if (!state.hasSeenGift && !state.showGift) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, showGift: true }))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [state.hasSeenGift, state.showGift])

  return (
    <AppContext.Provider value={{
      state, setState, addToCart, removeFromCart, updateQuantity,
      login, logout, openAuth, closeAuth, openCart, closeCart, openRewards, closeRewards
    }}>
      <div className="relative min-h-screen bg-[#1A1110]">
        <CustomCursor />
        <Navbar />
        
        <main>
          <Hero />
          <BrandExperience />
          <Services />
          <MenuSection />
          <BookingSection />
          <OrderSection />
          <Testimonials />
        </main>
        
        <Footer />
        
        <AnimatePresence>
          {state.showAuth && <AuthModal />}
          {state.showCart && <CartDrawer />}
          {state.showGift && <GiftExperience />}
          {state.showRewards && <RewardsModal />}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  )
}

export default App