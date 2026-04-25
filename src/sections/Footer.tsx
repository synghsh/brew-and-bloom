// src/sections/Footer.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { Coffee, MapPin, Phone, Mail, Clock, ArrowUp,  } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="footer" className="relative pt-32 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0908] to-[#1A1110]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C67B5C] flex items-center justify-center">
                <Coffee className="w-5 h-5 text-[#1A1110]" />
              </div>
              <span className="text-xl font-bold">
                Brew & <span className="text-[#D4AF37]">Bloom</span>
              </span>
            </div>
            <p className="text-[#F5E6D3]/60 text-sm leading-relaxed">
              Crafting moments of pure delight through exceptional coffee, 
              gourmet cuisine, and unforgettable ambiance since 2024.
            </p>
            {/* <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#F5E6D3]/60 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#F5E6D3] mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Menu', 'Book Table', 'Order Online', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-[#F5E6D3]/60 hover:text-[#D4AF37] transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[#F5E6D3] mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[#F5E6D3]/60">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>123 Artisan Avenue, Downtown District<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#F5E6D3]/60">
                <Phone className="w-5 h-5 text-[#D4AF37]" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#F5E6D3]/60">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
                <span>hello@brewandbloom.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold text-[#F5E6D3] mb-6">Opening Hours</h4>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-[#F5E6D3]/60">Mon - Fri</span>
                <span className="text-[#D4AF37] font-medium">7:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-[#F5E6D3]/60">Saturday</span>
                <span className="text-[#D4AF37] font-medium">8:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-[#F5E6D3]/60">Sunday</span>
                <span className="text-[#D4AF37] font-medium">8:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#F5E6D3]/40">
            © 2024 Brew & Bloom. All rights reserved.
          </p>
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] flex items-center justify-center text-[#1A1110]"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}