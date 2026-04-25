// src/sections/Hero.tsx
import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows, Text3D, Center, OrbitControls } from '@react-three/drei'
import { motion, useScroll, useMotionValue, useSpring, HTMLMotionProps } from 'framer-motion'
import { ChevronDown, Calendar, ShoppingBag, BookOpen } from 'lucide-react'
import * as THREE from 'three'

function CoffeeSteam({ position }: { position: [number, number, number] }) {
  const particlesRef = useRef<THREE.Group>(null)
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 0.5,
      y: Math.random() * 2,
      z: (Math.random() - 0.5) * 0.5,
      speed: 0.005 + Math.random() * 0.01,
      opacity: Math.random() * 0.5 + 0.2,
    }))
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return
    particlesRef.current.children.forEach((child, i) => {
      const p = particles[i]
      child.position.y += p.speed
      child.position.x = p.x + Math.sin(state.clock.elapsedTime * 2 + i) * 0.1
      if (child.position.y > 3) {
        child.position.y = 0
      }
      const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
      material.opacity = Math.max(0, 0.3 - child.position.y * 0.1)
    })
  })

  return (
    <group ref={particlesRef} position={position}>
      {particles.map((p) => (
        <mesh key={p.id} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#F5E6D3" transparent opacity={p.opacity} />
        </mesh>
      ))}
    </group>
  )
}

function FloatingCoffeeBean({ position, rotation, scrollMultiplier = 2 }: { position: [number, number, number], rotation: [number, number, number], scrollMultiplier?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { scrollYProgress } = useScroll()
  
  useFrame((state) => {
    if (!meshRef.current) return
    const scrollY = scrollYProgress.get()
    
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 + scrollY * 5
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2 + scrollY * scrollMultiplier
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <capsuleGeometry args={[0.15, 0.3, 8, 16]} />
        <meshStandardMaterial color="#4A3728" roughness={0.8} metalness={0.2} />
      </mesh>
    </Float>
  )
}

function CoffeeCup() {
  const cupRef = useRef<THREE.Group>(null)
  const { scrollYProgress } = useScroll()
  
  useFrame((state) => {
    if (!cupRef.current) return
    const scrollY = scrollYProgress.get()
    
    cupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + scrollY * Math.PI * 2
  })

  return (
    <group ref={cupRef} position={[0, -0.5, 0]}>
      {/* Cup body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.8, 0.6, 1.2, 32]} />
        <meshStandardMaterial color="#F5E6D3" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Coffee liquid */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.05, 32]} />
        <meshStandardMaterial color="#2C1810" roughness={0.9} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.9, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.4, 0.1, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#F5E6D3" roughness={0.3} />
      </mesh>
      {/* Saucer */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial color="#E8D5B7" roughness={0.4} />
      </mesh>
      <CoffeeSteam position={[0, 1.2, 0]} />
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#D4AF37" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C67B5C" />
      
      <CoffeeCup />
      
      <FloatingCoffeeBean position={[-2, 1, -1]} rotation={[0.5, 0, 0.3]} scrollMultiplier={3} />
      <FloatingCoffeeBean position={[2.5, 0.5, -2]} rotation={[0.3, 0.5, 0]} scrollMultiplier={1.5} />
      <FloatingCoffeeBean position={[-1.5, 2, 1]} rotation={[0, 0.3, 0.5]} scrollMultiplier={4} />
      <FloatingCoffeeBean position={[1.5, 1.5, 2]} rotation={[0.5, 0.2, 0]} scrollMultiplier={2.5} />
      
      <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      <Environment preset="city" />
    </>
  )
}

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

function MagneticButton({ children, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    x.set(middleX * 0.3) // Magnetic pull strength
    y.set(middleY * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ x: springX, y: springY }} {...props}>
      {children}
    </motion.button>
  )
}

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1110]/30 via-[#1A1110]/60 to-[#1A1110] z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-medium mb-6">
              Est. 2024 • Artisan Coffee & Cuisine
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              Where Every<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5E6D3] to-[#C67B5C]">
                Sip Tells
              </span>
              <br />A Story
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg text-[#F5E6D3]/70 max-w-lg leading-relaxed"
          >
            Experience the perfect blend of artisan coffee, gourmet cuisine, and 
            unforgettable ambiance in our carefully curated spaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#booking')}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C67B5C] text-[#1A1110] font-bold text-lg"
            >
              <Calendar className="w-5 h-5" />
              Book a Table
            </MagneticButton>
            
            <MagneticButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#order')}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/20 text-[#F5E6D3] font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Order Online
            </MagneticButton>
            
            <MagneticButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#menu')}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] font-semibold text-lg hover:bg-[#D4AF37]/10 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Explore Menu
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right side decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="hidden lg:block relative"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#C67B5C]/20 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#F5E6D3]/50 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
        </motion.div>
      </motion.div>
    </section>
  )
}