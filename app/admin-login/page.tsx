"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "1" && password === "1") {
      localStorage.setItem("userType", "admin")
      router.push("/admin-dashboard")
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src="/images/cyberpunk-admin.jpg"
          alt="Cyberpunk Admin Background"
          fill
          className="object-cover opacity-30"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-[400px] bg-black/60 border border-purple-500/30 backdrop-blur-md rounded-lg p-8 relative z-10">
          <h2 className="text-3xl text-center text-purple-400 font-orbitron mb-8">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-gray-200 text-lg">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-gray-800/50 border border-purple-500/30 text-white text-lg py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-200 text-lg">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-800/50 border border-purple-500/30 text-white text-lg py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xl font-orbitron py-4 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            >
              Login
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

