"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src="/images/cyberpunk-city.jpg"
          alt="Cyberpunk City"
          fill
          className="object-cover opacity-30"
          priority
          quality={100}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
          style={{
            backgroundPosition: `${mousePosition.x / 50}px ${mousePosition.y / 50}px`
          }}
        />
      </div>
      
      <div className="absolute top-4 right-4 z-20 flex space-x-4">
        <Link href="/login">
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 text-lg font-orbitron tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 rounded-md">
            Login
          </button>
        </Link>
        <Link href="/admin-login">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 text-lg font-orbitron tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 rounded-md">
            Admin
          </button>
        </Link>
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center space-y-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-7xl font-bold text-cyan-400 text-center font-orbitron"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          CyberConnect
        </motion.h1>
        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link href="https://t.me/viper_xpro3" target="_blank" rel="noopener noreferrer">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-6 text-2xl font-orbitron tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 rounded-md">
              Enter the Grid
            </button>
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-cyan-500/20 to-transparent" />
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-purple-500/20 to-transparent" />

      <motion.div 
        className="absolute pointer-events-none"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="w-6 h-6 bg-cyan-500 rounded-full blur-md opacity-50" />
      </motion.div>
    </div>
  )
}

