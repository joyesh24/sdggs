"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"

export default function LoginPage() {
  const [userType, setUserType] = useState<"normal" | "vip" | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "1" && password === "1") {
      localStorage.setItem("userType", userType || "normal")
      router.push("/dashboard")
    } else {
      setError("Invalid username or password")
    }
  }

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cyberpunk-city-2.jpg"
            alt="Cyberpunk City"
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
          <div className="w-[400px] bg-gray-800/80 border border-cyan-500/30 backdrop-blur-md rounded-lg p-8">
            <h2 className="text-3xl text-center text-cyan-400 font-orbitron mb-8">Choose User Type</h2>
            <div className="space-y-6">
              <button
                onClick={() => setUserType("normal")}
                className="w-full h-16 text-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-orbitron transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 rounded-lg"
              >
                Login as Normal User
              </button>
              <button
                onClick={() => setUserType("vip")}
                className="w-full h-16 text-xl border-2 border-purple-500 text-purple-400 hover:bg-purple-500/20 font-orbitron transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 rounded-lg"
              >
                Login as VIP User
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/cyberpunk-city-2.jpg"
          alt="Cyberpunk City"
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
        <div className="w-[400px] bg-gray-800/80 border border-cyan-500/30 backdrop-blur-md rounded-lg p-8">
          <h2 className="text-3xl text-center text-cyan-400 font-orbitron mb-8">
            {userType === "normal" ? "User Login" : "VIP Login"}
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-gray-200 text-lg">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-gray-700/50 border border-gray-600 text-white text-lg py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                className="w-full bg-gray-700/50 border border-gray-600 text-white text-lg py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-xl font-orbitron py-4 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Login
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

