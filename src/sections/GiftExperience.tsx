// src/sections/GiftExperience.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, X, Sparkles, Coffee, Cake, Percent } from 'lucide-react'
import { useApp } from '../App'

const rewards = [
  {
    icon: Cake,
    title: 'Free Dessert',
    description: 'Choose any dessert from our menu on your first visit',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Percent,
    title: '10% Off',
    description: 'Get 10% off your first order total',
    color: 'from-[#D4AF37] to-[#C67B5C]',
  },
  {
    icon: Coffee,
    title: 'Free Coffee',
    description: 'Complimentary signature espresso',
    color: 'from-amber-600 to-orange-500',
  },
]

export default function GiftExperience() {
  const { state, setState } = useApp()
  const [opened, setOpened] = useState(false)
  const [selectedReward, setSelectedReward] = useState<typeof rewards[0] | null>(null)

  const handleClose = () => {
    setState(prev => ({ ...prev, showGift: false, hasSeenGift: true }))
  }

  const handleOpen = () => {
    setOpened(true)
    // Randomly select a reward
    const reward = rewards[Math.floor(Math.random() * rewards.length)]
    setSelectedReward(reward)
  }

  const handleClaim = () => {
    setState(prev => ({ ...prev, showGift: false, hasSeenGift: true }))
    // In a real app, this would save the reward to the user's account
  }

  return (
    <AnimatePresence>
      {state.showGift && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative max-w-md w-full"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {!opened ? (
              <div className="text-center">
                {/* Floating Gift Box */}
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mb-8"
                >
                  <div className="relative w-40 h-40 mx-auto">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-[#D4AF37]/30 rounded-full blur-3xl" />
                    
                    {/* Gift Box */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleOpen}
                      className="relative w-full h-full bg-gradient-to-br from-[#D4AF37] to-[#C67B5C] rounded-3xl flex items-center justify-center cursor-pointer shadow-2xl"
                    >
                      <Gift className="w-20 h-20 text-[#1A1110]" />
                      
                      {/* Sparkles */}
                      <motion.div
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-2 -right-2"
                      >
                        <Sparkles className="w-8 h-8 text-yellow-300" />
                      </motion.div>
                      <motion.div
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="absolute -bottom-2 -left-2"
                      >
                        <Sparkles className="w-6 h-6 text-yellow-300" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>

                <h3 className="text-3xl font-bold text-[#D4AF37] mb-3">Welcome Gift!</h3>
                <p className="text-[#F5E6D3]/70 mb-8">
                  As a first-time visitor, we have a special surprise waiting for you. 
                  Tap the gift box to reveal your reward!
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpen}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110] font-bold text-lg"
                >
                  Open Gift
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="bg-gradient-to-b from-[#2C1810] to-[#1A1110] rounded-3xl p-8 border border-[#D4AF37]/30 text-center"
              >
                {/* Celebration Particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        opacity: 1, 
                        y: 0, 
                        x: Math.random() * 400 - 200,
                        scale: Math.random() * 0.5 + 0.5
                      }}
                      animate={{ 
                        opacity: 0,
                        y: -300,
                        x: Math.random() * 400 - 200,
                      }}
                      transition={{ duration: 2, delay: i * 0.1 }}
                      className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: ['#D4AF37', '#C67B5C', '#F5E6D3', '#FFD700'][Math.floor(Math.random() * 4)]
                      }}
                    />
                  ))}
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10, delay: 0.3 }}
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${selectedReward?.color} mx-auto mb-6 flex items-center justify-center`}
                >
                  {selectedReward && <selectedReward.icon className="w-12 h-12 text-white" />}
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl font-bold text-[#D4AF37] mb-2"
                >
                  {selectedReward?.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-[#F5E6D3]/70 mb-8"
                >
                  {selectedReward?.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClaim}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110] font-bold text-lg"
                  >
                    Claim Reward
                  </motion.button>
                  <button
                    onClick={handleClose}
                    className="text-sm text-[#F5E6D3]/50 hover:text-[#F5E6D3] transition-colors"
                  >
                    Maybe later
                  </button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}