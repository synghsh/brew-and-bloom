// src/sections/MenuSection.tsx
import React, { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Star, Flame, Leaf, Clock } from 'lucide-react'
import { useApp } from '../App'

const categories = ['All', 'Coffee', 'Tea', 'Snacks', 'Main Course', 'Desserts', 'Beverages']

const menuItems = [
  {
    id: '1',
    name: 'Signature Espresso',
    category: 'Coffee',
    price: 4.50,
    rating: 4.9,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80',
    description: 'Double shot of our house blend with caramel notes',
    isVeg: true,
    isPopular: true,
    prepTime: '3 min',
  },
  {
    id: '2',
    name: 'Caramel Macchiato',
    category: 'Coffee',
    price: 5.75,
    rating: 4.8,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&q=80',
    description: 'Velvety steamed milk with vanilla and caramel drizzle',
    isVeg: true,
    isPopular: true,
    prepTime: '5 min',
  },
  {
    id: '3',
    name: 'Matcha Latte',
    category: 'Tea',
    price: 5.50,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3114?w=400&q=80',
    description: 'Ceremonial grade matcha with oat milk',
    isVeg: true,
    isPopular: false,
    prepTime: '4 min',
  },
  {
    id: '4',
    name: 'Truffle Grilled Cheese',
    category: 'Snacks',
    price: 12.00,
    rating: 4.9,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80',
    description: 'Aged cheddar, truffle oil, sourdough',
    isVeg: true,
    isPopular: true,
    prepTime: '8 min',
  },
  {
    id: '5',
    name: 'Avocado Toast Deluxe',
    category: 'Main Course',
    price: 14.50,
    rating: 4.6,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1588137372308-15f75323ca8d?w=400&q=80',
    description: 'Smashed avocado, poached egg, chili flakes, sourdough',
    isVeg: true,
    isPopular: false,
    prepTime: '10 min',
  },
  {
    id: '6',
    name: 'Wagyu Beef Burger',
    category: 'Main Course',
    price: 18.00,
    rating: 4.9,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    description: 'A5 wagyu patty, brioche bun, truffle aioli',
    isVeg: false,
    isPopular: true,
    prepTime: '15 min',
  },
  {
    id: '7',
    name: 'Tiramisu Classico',
    category: 'Desserts',
    price: 9.00,
    rating: 4.8,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
    description: 'Espresso-soaked ladyfingers, mascarpone, cocoa',
    isVeg: true,
    isPopular: true,
    prepTime: '5 min',
  },
  {
    id: '8',
    name: 'Cold Brew Tonic',
    category: 'Beverages',
    price: 6.00,
    rating: 4.5,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80',
    description: '24hr cold brew, tonic water, orange peel',
    isVeg: true,
    isPopular: false,
    prepTime: '2 min',
  },
]

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { addToCart, openAuth, state } = useApp()

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
  }

  return (
    <section id="menu" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1110] via-[#2C1810] to-[#1A1110]" />
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-[#D4AF37] text-sm font-medium tracking-widest uppercase">Our Menu</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Curated With Passion</h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110]'
                  : 'bg-white/5 text-[#F5E6D3]/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="group relative bg-gradient-to-b from-white/5 to-transparent rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1110] via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {item.isPopular && (
                      <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#1A1110] text-xs font-bold flex items-center gap-1">
                        <Flame className="w-3 h-3" /> Popular
                      </span>
                    )}
                    {item.isVeg ? (
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium flex items-center gap-1 border border-green-500/30">
                        <Leaf className="w-3 h-3" /> Veg
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium border border-red-500/30">
                        Non-Veg
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-4 right-4">
                    <span className="text-2xl font-bold text-[#D4AF37]">${item.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                    <span className="text-sm font-medium">{item.rating}</span>
                    <span className="text-xs text-[#F5E6D3]/40">({item.reviews} reviews)</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#F5E6D3] mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#F5E6D3]/60 mb-4">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#F5E6D3]/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.prepTime}
                    </span>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddToCart(item)}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] flex items-center justify-center text-[#1A1110]"
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}