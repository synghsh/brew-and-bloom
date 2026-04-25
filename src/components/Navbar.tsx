// src/components/Navbar.tsx (updated)
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, Menu, X, ShoppingBag, User, LogOut, Volume2, VolumeX } from 'lucide-react'
import { useApp } from '../App'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#brand' },
  { label: 'Menu', href: '#menu' },
  { label: 'Book Table', href: '#booking' },
  { label: 'Order Online', href: '#order' },
  { label: 'Offers', href: '#offers' },
  { label: 'Contact', href: '#footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { state, openAuth, logout, openCart } = useApp()
  
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.volume = 0.9 // Increased volume for better audibility
        audioRef.current.play().catch(e => console.error('Audio play blocked by browser:', e))
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#1A1110]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        {/* Hidden ambient audio element */}
        <audio ref={audioRef} loop preload="auto">
          {/* Primary high-quality OGG from Google */}
          <source src="https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg" type="audio/ogg" />
          {/* Fallback MP3 for Safari/iOS compatibility */}
          <source src="https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3" type="audio/mpeg" />
        </audio>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollTo('#hero')}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C67B5C] flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#1A1110]" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Brew & <span className="text-[#D4AF37]">Bloom</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-[#F5E6D3]/70 hover:text-[#D4AF37] transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full" />
              </motion.button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {/* Audio Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAudio}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-[#F5E6D3]/70 hover:text-[#D4AF37]"
              title={isPlaying ? "Mute Atmosphere" : "Play Atmosphere"}
            >
              {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCart}
              className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4AF37] text-[#1A1110] text-xs font-bold flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </motion.button>

            {state.isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#F5E6D3]/70">Hi, {state.user?.name}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openAuth('login')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110] font-semibold text-sm"
              >
                <User className="w-4 h-4" />
                Sign In
              </motion.button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-40 bg-[#1A1110] lg:hidden pt-20"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-2xl font-light text-[#F5E6D3]/80 hover:text-[#D4AF37] transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              
              {/* Mobile Audio Toggle */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                onClick={toggleAudio}
                className="flex items-center gap-3 mt-4 text-[#F5E6D3]/70 hover:text-[#D4AF37] transition-colors"
              >
                {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                <span>{isPlaying ? 'Mute Atmosphere' : 'Play Atmosphere'}</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => {
                  setMobileOpen(false)
                  openAuth()
                }}
                className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110] font-bold"
              >
                Sign In
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}