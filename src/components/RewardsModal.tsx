import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Coffee, Star, Gift } from 'lucide-react'
import { useApp } from '../App'

export default function RewardsModal() {
  const { closeRewards } = useApp()
  const totalPunches = 10
  // Local state to simulate ordering so you can see the gamification in action!
  const [punches, setPunches] = useState(4)

  const handleSimulateOrder = () => {
    if (punches < totalPunches) {
      setPunches(p => p + 1)
    } else {
      setPunches(1) // Reset card after claiming
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={closeRewards}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md bg-gradient-to-b from-[#2C1810] to-[#1A1110] rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.15)] p-8"
      >
        <button
          onClick={closeRewards}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#F5E6D3]/60 hover:text-[#F5E6D3] hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h2 className="text-3xl font-bold text-[#D4AF37] mb-2">Coffee Club</h2>
          <p className="text-[#F5E6D3]/70 text-sm">
            Buy 10 coffees, get your 11th one on us!
          </p>
        </div>

        {/* Punch Card Grid */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {Array.from({ length: totalPunches }).map((_, i) => {
            const isStamped = i < punches
            const isLast = i === totalPunches - 1

            return (
              <div key={i} className={`relative aspect-square rounded-full border-2 border-dashed ${isLast ? 'border-[#C67B5C]' : 'border-[#D4AF37]/30'} flex items-center justify-center bg-black/20`}>
                {isStamped ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: [-10, 10, 0] }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.1 }}
                    className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#C67B5C] rounded-full flex items-center justify-center shadow-lg"
                  >
                    {isLast ? <Gift className="w-5 h-5 text-[#1A1110]" /> : <Coffee className="w-5 h-5 text-[#1A1110]" />}
                  </motion.div>
                ) : (
                  isLast ? <Gift className="w-5 h-5 text-[#C67B5C]/50" /> : <span className="text-[#D4AF37]/30 text-sm font-bold">{i + 1}</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Status Message & Interaction */}
        <AnimatePresence mode="wait">
          {punches === totalPunches ? (
            <motion.div key="reward" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center p-4 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50">
              <p className="text-[#D4AF37] font-bold text-xl mb-1">Reward Unlocked! 🎉</p>
              <p className="text-[#F5E6D3]/70 text-sm">Show this screen to your barista.</p>
            </motion.div>
          ) : (
            <motion.div key="progress" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center p-4 rounded-xl bg-white/5 border border-[#D4AF37]/20">
              <p className="text-[#F5E6D3]">You are <span className="text-[#D4AF37] font-bold text-xl">{totalPunches - punches}</span> cups away from a free reward!</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSimulateOrder} className="w-full mt-6 py-4 rounded-xl bg-white/5 border border-white/10 text-[#F5E6D3] font-semibold hover:bg-white/10 transition-colors">
          Simulate New Order
        </motion.button>
      </motion.div>
    </motion.div>
  )
}