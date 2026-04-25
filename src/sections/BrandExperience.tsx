// src/sections/BrandExperience.tsx
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Award, ChefHat, Leaf, Clock } from 'lucide-react'

const features = [
  {
    icon: ChefHat,
    title: 'Master Baristas',
    description: 'Our certified baristas craft each cup with precision and passion, using beans sourced from ethical farms worldwide.',
  },
  {
    icon: Leaf,
    title: 'Farm to Table',
    description: 'We partner with local organic farms to bring you the freshest ingredients, supporting sustainable agriculture.',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized by the Specialty Coffee Association for our innovative brewing techniques and flavor profiles.',
  },
  {
    icon: Clock,
    title: 'Always Fresh',
    description: 'Our beans are roasted in small batches every morning, ensuring peak flavor in every single cup served.',
  },
]

export default function BrandExperience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="brand" className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1110] via-[#2C1810] to-[#1A1110]" />
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image Grid */}
          <motion.div 
            style={{ y }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-[#4A3728] to-[#2C1810] relative group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1110] to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-[#D4AF37] text-sm font-medium">Artisan Roasts</p>
                  </div>
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#C67B5C] to-[#4A3728] relative group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1110] to-transparent" />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4 pt-8"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#D4AF37] to-[#C67B5C] relative group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1110] to-transparent" />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-[#2C1810] to-[#1A1110] relative group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1110] to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-[#D4AF37] text-sm font-medium">Cozy Ambiance</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-glass rounded-2xl p-6 premium-shadow"
            >
              <p className="text-4xl font-bold text-[#D4AF37]">12K+</p>
              <p className="text-sm text-[#F5E6D3]/70">Happy Customers</p>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#D4AF37] text-sm font-medium tracking-widest uppercase">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
                Crafting Moments of<br />
                <span className="text-[#D4AF37]">Pure Delight</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#F5E6D3]/70 text-lg leading-relaxed"
            >
              Founded in 2024, Brew & Bloom began with a simple mission: to create a sanctuary 
              where exceptional coffee meets culinary artistry. Every corner of our space is 
              designed to inspire conversation, creativity, and comfort.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/30 transition-colors group"
                >
                  <feature.icon className="w-8 h-8 text-[#D4AF37] mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-[#F5E6D3] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#F5E6D3]/60 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}