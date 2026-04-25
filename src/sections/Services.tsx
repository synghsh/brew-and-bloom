// src/sections/Services.tsx
import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { UtensilsCrossed, Truck, Armchair, Clock, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Armchair,
    title: 'Dine-In Experience',
    description: 'Immerse yourself in our carefully curated ambiance with table service and chef specials.',
    color: 'from-[#D4AF37] to-[#C67B5C]',
    href: '#booking',
  },
  {
    icon: UtensilsCrossed,
    title: 'Table Booking',
    description: 'Reserve your perfect spot—window views, private corners, or rooftop seating available.',
    color: 'from-[#C67B5C] to-[#4A3728]',
    href: '#booking',
  },
  {
    icon: Truck,
    title: 'Delivery',
    description: 'From our kitchen to your door. Hot, fresh, and beautifully packaged.',
    color: 'from-[#4A3728] to-[#2C1810]',
    href: '#order',
  },
  {
    icon: Clock,
    title: 'Quick Pickup',
    description: 'Order ahead and skip the line. Your order ready exactly when you arrive.',
    color: 'from-[#2C1810] to-[#D4AF37]',
    href: '#order',
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1A1110]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm font-medium tracking-widest uppercase">Services</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">How Can We Serve You?</h2>
          <p className="mt-4 text-[#F5E6D3]/60 max-w-2xl mx-auto">
            Choose your preferred way to experience Brew & Bloom. Each service is designed 
            with the same attention to quality and detail.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} p-0.5 mb-6`}>
                  <div className="w-full h-full rounded-[10px] bg-[#1A1110] flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#F5E6D3] mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#F5E6D3]/60 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => document.querySelector(service.href)?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2 text-[#D4AF37] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}