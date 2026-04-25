// src/sections/Testimonials.tsx
import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Food Blogger',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    text: "The ambiance is absolutely magical. From the moment you walk in, you're transported to a world where every detail matters. The signature espresso is the best I've had in the city.",
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Regular Customer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    text: "I've been coming here every weekend for the past 6 months. The consistency in quality and service is remarkable. The rooftop seating during sunset is unbeatable.",
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Event Planner',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    text: "We hosted our company anniversary here and it was perfect. The private corner, the curated menu, and the attentive staff made it an evening to remember.",
  },
  {
    id: 4,
    name: 'Michael Park',
    role: 'Coffee Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    rating: 5,
    text: "As someone who takes coffee very seriously, I can say that Brew & Bloom understands the craft. Their cold brew tonic is innovative and perfectly balanced.",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1A1110]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C67B5C]/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm font-medium tracking-widest uppercase">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">What Our Guests Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-[#D4AF37]/20 transition-all group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#D4AF37]/20 group-hover:text-[#D4AF37]/40 transition-colors" />
              
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>

              <p className="text-[#F5E6D3]/80 leading-relaxed mb-6 text-lg">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]/30"
                />
                <div>
                  <h4 className="font-semibold text-[#F5E6D3]">{testimonial.name}</h4>
                  <p className="text-sm text-[#F5E6D3]/50">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}