// src/sections/OrderSection.tsx (complete with proper imports)
import React, { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Clock, MapPin, Home, Car, Package, Minus, Plus, X, Check, Box } from 'lucide-react'
import { useApp } from '../App'
import '@google/model-viewer'

// Extend TypeScript JSX to recognize the custom <model-viewer> web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        'ios-src'?: string;
        alt?: string;
        ar?: boolean | string;
        'ar-modes'?: string;
        'camera-controls'?: boolean | string;
        'auto-rotate'?: boolean | string;
      };
    }
  }
}

const orderTypes = [
  { id: 'dinein', label: 'Dine-In', icon: Home, description: 'Eat at our restaurant' },
  { id: 'delivery', label: 'Delivery', icon: Car, description: 'Delivered to your door' },
  { id: 'pickup', label: 'Pickup', icon: Package, description: 'Pick up when ready' },
]

const categories = ['All', 'Coffee', 'Tea', 'Snacks', 'Main Course', 'Desserts']

const menuItems = [
  {
    id: 'o1',
    name: 'Signature Espresso',
    category: 'Coffee',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80',
    description: 'Double shot house blend',
    prepTime: '3 min',
    variants: ['Regular', 'Large', 'Extra Shot'],
    addOns: ['Oat Milk (+$0.50)', 'Vanilla Syrup (+$0.75)', 'Extra Shot (+$1.00)'],
  },
  {
    id: 'o2',
    name: 'Avocado Toast',
    category: 'Snacks',
    price: 14.50,
    image: 'https://images.unsplash.com/photo-1588137372308-15f75323ca8d?w=400&q=80',
    description: 'Sourdough, poached egg, chili',
    prepTime: '10 min',
    variants: ['Regular', 'With Salmon (+$4)'],
    addOns: ['Extra Egg (+$2)', 'Feta Cheese (+$1.50)'],
  },
  {
    id: 'o3',
    name: 'Matcha Latte',
    category: 'Tea',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3114?w=400&q=80',
    description: 'Ceremonial matcha, oat milk',
    prepTime: '4 min',
    variants: ['Hot', 'Iced'],
    addOns: ['Honey (+$0.50)', 'Extra Matcha (+$1)'],
  },
  {
    id: 'o4',
    name: 'Wagyu Burger',
    category: 'Main Course',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    description: 'A5 wagyu, brioche, truffle',
    prepTime: '15 min',
    variants: ['Medium Rare', 'Medium', 'Well Done'],
    addOns: ['Bacon (+$3)', 'Extra Cheese (+$2)', 'Truffle Fries (+$4)'],
  },
  {
    id: 'o5',
    name: 'Tiramisu',
    category: 'Desserts',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
    description: 'Classic Italian dessert',
    prepTime: '5 min',
    variants: ['Regular', 'Large'],
    addOns: ['Extra Cocoa (+$0.50)', 'Espresso Shot (+$2)'],
  },
  {
    id: 'o6',
    name: 'Cold Brew Tonic',
    category: 'Coffee',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
    description: '24hr brew, tonic, orange',
    prepTime: '2 min',
    variants: ['Regular', 'Large'],
    addOns: ['Extra Orange (+$0.50)', 'Syrup (+$0.75)'],
  },
]

export default function OrderSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { addToCart } = useApp()
  
  const [orderType, setOrderType] = useState('dinein')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null)
  const [selectedVariant, setSelectedVariant] = useState('')
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1)
  const [showAR, setShowAR] = useState(false)

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  const handleAddToCart = () => {
    if (!selectedItem) return
    
    const addOnPrice = selectedAddOns.reduce((sum, addon) => {
      const match = addon.match(/\$(\d+\.?\d*)/)
      return sum + (match ? parseFloat(match[1]) : 0)
    }, 0)
    
    const variantPrice = selectedVariant.includes('+') ? 4 : 0
    
    addToCart({
      id: `${selectedItem.id}-${selectedVariant}-${selectedAddOns.join(',')}`,
      name: `${selectedItem.name} ${selectedVariant ? `(${selectedVariant})` : ''}`,
      price: (selectedItem.price + addOnPrice + variantPrice) * quantity,
      image: selectedItem.image,
      variant: selectedAddOns.join(', ') || undefined,
    })
    
    setSelectedItem(null)
    setSelectedVariant('')
    setSelectedAddOns([])
    setQuantity(1)
  }

  return (
    <section id="order" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1110] via-[#2C1810] to-[#1A1110]" />
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-[#D4AF37] text-sm font-medium tracking-widest uppercase">Order Online</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">From Our Kitchen to You</h2>
        </motion.div>

        {/* Order Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {orderTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOrderType(type.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all ${
                orderType === type.id
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <type.icon className={`w-5 h-5 ${orderType === type.id ? 'text-[#D4AF37]' : 'text-[#F5E6D3]/50'}`} />
              <div className="text-left">
                <p className={`font-semibold ${orderType === type.id ? 'text-[#D4AF37]' : 'text-[#F5E6D3]'}`}>
                  {type.label}
                </p>
                <p className="text-xs text-[#F5E6D3]/50">{type.description}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Delivery Info Bar */}
        <AnimatePresence>
          {orderType === 'delivery' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-2xl mx-auto mb-8 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4"
            >
              <MapPin className="w-5 h-5 text-[#D4AF37]" />
              <input
                type="text"
                placeholder="Enter delivery address..."
                className="flex-1 bg-transparent text-[#F5E6D3] placeholder-[#F5E6D3]/30 focus:outline-none"
              />
              <span className="text-xs text-[#F5E6D3]/50">Free over $25</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110]'
                  : 'bg-white/5 text-[#F5E6D3]/70 hover:bg-white/10'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => {
                  setSelectedItem(item)
                  setSelectedVariant(item.variants[0])
                  setSelectedAddOns([])
                  setQuantity(1)
                  setShowAR(false)
                }}
                className="group cursor-pointer bg-gradient-to-b from-white/5 to-transparent rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/30 transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1110] to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-[#F5E6D3] group-hover:text-[#D4AF37] transition-colors">{item.name}</h3>
                      <p className="text-sm text-[#F5E6D3]/60">{item.description}</p>
                    </div>
                    <span className="text-xl font-bold text-[#D4AF37]">${item.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-xs text-[#F5E6D3]/40 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.prepTime}
                  </span>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 text-[#1A1110]" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#2C1810] rounded-3xl overflow-hidden max-w-lg w-full border border-white/10 max-h-[90vh] overflow-y-auto"
            >
              <div className="relative aspect-video">
                {showAR ? (
                  <model-viewer
                    src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
                    ios-src="https://modelviewer.dev/shared-assets/models/Astronaut.usdz"
                    alt={`A 3D model of ${selectedItem.name}`}
                    ar="true"
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls="true"
                    auto-rotate="true"
                    style={{ width: '100%', height: '100%', backgroundColor: '#1A1110', display: 'block' }}
                  >
                    <button slot="ar-button" className="absolute bottom-4 right-4 bg-[#D4AF37] text-[#1A1110] px-4 py-2 rounded-full font-bold shadow-lg">
                      👋 View in your space
                    </button>
                  </model-viewer>
                ) : (
                  <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAR(!showAR)}
                  className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-[#1A1110]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] font-medium text-sm shadow-lg flex items-center gap-2 z-10"
                >
                  {showAR ? 'Hide 3D View' : (
                    <><Box className="w-4 h-4" /> View in 3D / AR</>
                  )}
                </motion.button>

                <button
                  onClick={() => { setSelectedItem(null); setShowAR(false); }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#F5E6D3]">{selectedItem.name}</h3>
                  <p className="text-[#F5E6D3]/60 mt-1">{selectedItem.description}</p>
                  <p className="text-2xl font-bold text-[#D4AF37] mt-2">${selectedItem.price.toFixed(2)}</p>
                </div>

                {/* Variants */}
                <div>
                  <label className="text-sm font-medium text-[#F5E6D3]/70 mb-3 block">Size / Variant</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.variants.map((variant) => (
                      <button
                        key={variant}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedVariant === variant
                            ? 'bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110]'
                            : 'bg-white/5 text-[#F5E6D3]/70 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {variant}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <label className="text-sm font-medium text-[#F5E6D3]/70 mb-3 block">Add-ons</label>
                  <div className="space-y-2">
                    {selectedItem.addOns.map((addon) => (
                      <button
                        key={addon}
                        onClick={() => {
                          setSelectedAddOns(prev => 
                            prev.includes(addon) 
                              ? prev.filter(a => a !== addon)
                              : [...prev, addon]
                          )
                        }}
                        className={`w-full px-4 py-3 rounded-lg text-sm text-left transition-all flex items-center justify-between ${
                          selectedAddOns.includes(addon)
                            ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/30'
                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span className={selectedAddOns.includes(addon) ? 'text-[#D4AF37]' : 'text-[#F5E6D3]/70'}>
                          {addon}
                        </span>
                        {selectedAddOns.includes(addon) && <Check className="w-4 h-4 text-[#D4AF37]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#F5E6D3]/70">Quantity</span>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Add to Cart */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110] font-bold text-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart - ${((selectedItem.price + selectedAddOns.reduce((sum, a) => {
                    const m = a.match(/\$(\d+\.?\d*)/)
                    return sum + (m ? parseFloat(m[1]) : 0)
                  }, 0) + (selectedVariant.includes('+') ? 4 : 0)) * quantity).toFixed(2)}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}