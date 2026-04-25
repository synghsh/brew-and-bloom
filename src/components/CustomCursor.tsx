import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Spring configuration for the smooth trailing ring
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check if hovering over a clickable element
      const isClickable = target.closest('button') || target.closest('a') || target.closest('input')
      setIsHovering(!!isClickable)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  // Hide custom cursor on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Main solid dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#D4AF37] rounded-full pointer-events-none z-[100] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Trailing outline ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[#D4AF37] rounded-full pointer-events-none z-[100]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
        }}
      />
    </>
  )
}