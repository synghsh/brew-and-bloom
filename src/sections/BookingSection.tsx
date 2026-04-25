// src/sections/BookingSection.tsx
import React, { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Users, MapPin, ChevronRight, Check } from 'lucide-react'
import { useApp } from '../App'

const tableTypes = [
  { id: 'couple', name: 'Couple Table', icon: '💑', capacity: '2 People', description: 'Intimate setting for two' },
  { id: 'family', name: 'Family Booth', icon: '👨‍👩‍👧‍👦', capacity: '4 People', description: 'Comfortable booth seating' },
  { id: 'group', name: 'Group Table', icon: '🎉', capacity: '6-8 People', description: 'Large communal table' },
  { id: 'window', name: 'Window Side', icon: '🪟', capacity: '2-4 People', description: 'Natural light views' },
  { id: 'private', name: 'Private Corner', icon: '🕯️', capacity: '2-4 People', description: 'Secluded and quiet' },
  { id: 'rooftop', name: 'Rooftop', icon: '🌅', capacity: '2-6 People', description: 'Open air dining' },
]

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM'
]

export default function BookingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { state, openAuth } = useApp()
  
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    tableType: '',
    specialRequest: '',
  })
  const [confirmed, setConfirmed] = useState(false)

  const handleSubmit = () => {
    if (!state.isAuthenticated) {
      openAuth('login')
      return
    }
    setConfirmed(true)
  }

  return (
    <section id="booking" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1A1110]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-sm font-medium tracking-widest uppercase">Reservations</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Book Your Experience</h2>
          <p className="mt-4 text-[#F5E6D3]/60 max-w-xl mx-auto">
            Secure your perfect table. Whether it's a romantic dinner or a group celebration, 
            we'll make it memorable.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-gradient-to-b from-white/5 to-transparent rounded-3xl p-8 border border-white/10">
              {/* Progress */}
              <div className="flex items-center gap-4 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      step >= s 
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110]' 
                        : 'bg-white/10 text-[#F5E6D3]/40'
                    }`}>
                      {step > s ? <Check className="w-5 h-5" /> : s}
                    </div>
                    {s < 3 && <div className={`flex-1 h-0.5 rounded-full ${step > s ? 'bg-[#D4AF37]' : 'bg-white/10'}`} />}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-[#F5E6D3]/70 mb-3">
                        <Calendar className="w-4 h-4 inline mr-2" /> Select Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F5E6D3] focus:border-[#D4AF37] focus:outline-none transition-colors"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#F5E6D3]/70 mb-3">
                        <Clock className="w-4 h-4 inline mr-2" /> Select Time
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                          <motion.button
                            key={time}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFormData({ ...formData, time })}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              formData.time === time
                                ? 'bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110]'
                                : 'bg-white/5 text-[#F5E6D3]/70 hover:bg-white/10 border border-white/10'
                            }`}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#F5E6D3]/70 mb-3">
                        <Users className="w-4 h-4 inline mr-2" /> Number of Guests
                      </label>
                      <div className="flex items-center gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <motion.button
                            key={num}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setFormData({ ...formData, guests: num })}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                              formData.guests === num
                                ? 'bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110]'
                                : 'bg-white/5 text-[#F5E6D3]/70 hover:bg-white/10 border border-white/10'
                            }`}
                          >
                            {num}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(2)}
                      disabled={!formData.date || !formData.time}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110] font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Continue <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-[#F5E6D3]/70 mb-3">
                        <MapPin className="w-4 h-4 inline mr-2" /> Select Table Type
                      </label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {tableTypes.map((table) => (
                          <motion.button
                            key={table.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData({ ...formData, tableType: table.id })}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              formData.tableType === table.id
                                ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <span className="text-2xl mb-2 block">{table.icon}</span>
                                <h4 className="font-semibold text-[#F5E6D3]">{table.name}</h4>
                                <p className="text-xs text-[#F5E6D3]/50 mt-1">{table.description}</p>
                              </div>
                              <span className="text-xs text-[#D4AF37] font-medium">{table.capacity}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#F5E6D3]/70 mb-3">
                        Special Requests
                      </label>
                      <textarea
                        value={formData.specialRequest}
                        onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                        placeholder="Any dietary restrictions, special occasions, or seating preferences..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F5E6D3] placeholder-[#F5E6D3]/30 focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-[#F5E6D3] font-semibold"
                      >
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(3)}
                        disabled={!formData.tableType}
                        className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110] font-bold disabled:opacity-50"
                      >
                        Review Booking
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {!confirmed ? (
                      <>
                        <div className="bg-white/5 rounded-xl p-6 space-y-4 border border-white/10">
                          <h3 className="text-lg font-bold text-[#D4AF37] mb-4">Booking Summary</h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-[#F5E6D3]/60">Date</span>
                              <span className="font-medium">{formData.date}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#F5E6D3]/60">Time</span>
                              <span className="font-medium">{formData.time}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#F5E6D3]/60">Guests</span>
                              <span className="font-medium">{formData.guests} People</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#F5E6D3]/60">Table</span>
                              <span className="font-medium">{tableTypes.find(t => t.id === formData.tableType)?.name}</span>
                            </div>
                            {formData.specialRequest && (
                              <div className="pt-3 border-t border-white/10">
                                <span className="text-[#F5E6D3]/60 block mb-1">Special Request</span>
                                <span className="text-sm">{formData.specialRequest}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setStep(2)}
                            className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-[#F5E6D3] font-semibold"
                          >
                            Modify
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110] font-bold"
                          >
                            {state.isAuthenticated ? 'Confirm Booking' : 'Login to Book'}
                          </motion.button>
                        </div>
                      </>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] flex items-center justify-center mx-auto mb-6">
                          <Check className="w-10 h-10 text-[#1A1110]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">Booking Confirmed!</h3>
                        <p className="text-[#F5E6D3]/70">We've sent a confirmation to your email. See you soon!</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setStep(1)
                            setConfirmed(false)
                            setFormData({ date: '', time: '', guests: 2, tableType: '', specialRequest: '' })
                          }}
                          className="mt-6 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-[#F5E6D3] hover:bg-white/10 transition-colors"
                        >
                          Book Another Table
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 relative"
          >
            <div className="sticky top-24 space-y-6">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80" 
                  alt="Restaurant Interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1110] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[#D4AF37] font-medium mb-1">Main Dining Hall</p>
                  <p className="text-sm text-[#F5E6D3]/70">Elegant atmosphere with ambient lighting</p>
                </div>
              </div>
              
              <div className="bg-glass rounded-2xl p-6 premium-shadow">
                <h4 className="font-bold text-[#F5E6D3] mb-3">Opening Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[#F5E6D3]/70">
                    <span>Monday - Friday</span>
                    <span className="text-[#D4AF37]">7:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between text-[#F5E6D3]/70">
                    <span>Saturday - Sunday</span>
                    <span className="text-[#D4AF37]">8:00 AM - 11:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}