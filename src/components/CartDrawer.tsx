// src/components/CartDrawer.tsx (complete)
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useApp } from '../App'

export default function CartDrawer() {
  const { state, closeCart, updateQuantity, removeFromCart, openAuth } = useApp()
  
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const handleCheckout = () => {
    if (!state.isAuthenticated) {
      closeCart()
      openAuth('login')
      return
    }
    alert('Proceeding to checkout... (Demo)')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex justify-end"
      onClick={closeCart}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-gradient-to-b from-[#2C1810] to-[#1A1110] h-full border-l border-white/10 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-xl font-bold text-[#F5E6D3]">Your Cart</h2>
            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-medium">
              {state.cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={closeCart}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#F5E6D3]/60 hover:text-[#F5E6D3] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {state.cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <ShoppingBag className="w-16 h-16 text-[#F5E6D3]/20 mx-auto mb-4" />
                <p className="text-[#F5E6D3]/50 text-lg">Your cart is empty</p>
                <p className="text-[#F5E6D3]/30 text-sm mt-2">Add some delicious items!</p>
              </motion.div>
            ) : (
              state.cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#F5E6D3] truncate">{item.name}</h4>
                    {item.variant && (
                      <p className="text-xs text-[#F5E6D3]/50 mt-0.5">{item.variant}</p>
                    )}
                    <p className="text-[#D4AF37] font-bold mt-1">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </motion.button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </motion.button>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {state.cart.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-4 bg-[#1A1110]/50">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#F5E6D3]/60">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#F5E6D3]/60">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#F5E6D3] pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="text-[#D4AF37]">${total.toFixed(2)}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110] font-bold text-lg flex items-center justify-center gap-2"
            >
              {state.isAuthenticated ? (
                <>
                  Checkout <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Login to Checkout <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}