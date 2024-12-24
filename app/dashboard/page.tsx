"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  content: string
  author: string
  timestamp: string
  isVIP: boolean
  likes: number
  comments: string[]
  attachments: string[]
}

const mockPosts: Post[] = [
  {
    id: 1,
    title: "Welcome to CyberConnect",
    content: "Dive into the neon-lit world of our cyberpunk social platform. Share your augmented reality experiences and connect with fellow netrunners.",
    author: "CyberMod",
    timestamp: "2023-06-10 10:00",
    isVIP: false,
    likes: 42,
    comments: ["Awesome platform!", "Can't wait to explore more!"],
    attachments: ["/images/cyber-world.jpg"]
  },
  {
    id: 2,
    title: "VIP Exclusive: Upcoming Cyber Enhancements",
    content: "Get a sneak peek at the latest neural implants and cybernetic upgrades. Only for our VIP members.",
    author: "TechGuru",
    timestamp: "2023-06-11 14:30",
    isVIP: true,
    likes: 78,
    comments: ["Mind-blowing tech!", "When can we pre-order?"],
    attachments: ["/images/cyber-implants.jpg"]
  },
]

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [userType, setUserType] = useState<'normal' | 'vip' | 'admin'>('normal')
  const router = useRouter()

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType") as 'normal' | 'vip' | 'admin' | null
    if (storedUserType === 'normal' || storedUserType === 'vip' || storedUserType === 'admin') {
      setUserType(storedUserType)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const handleComment = (postId: number, comment: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
    ))
  }

  const handleLogout = () => {
    localStorage.removeItem("userType")
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/cyberpunk-city-3.jpg"
          alt="Cyberpunk City"
          fill
          className="object-cover opacity-20"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
      <header className="relative bg-gray-800/80 backdrop-blur-md py-4 px-6 flex justify-between items-center border-b border-cyan-500/30">
        <h1 className="text-4xl font-orbitron text-cyan-400">
          {userType === 'vip' ? 'VIP Dashboard' : userType === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
        </h1>
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-orbitron tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 rounded-md"
        >
          Logout
        </button>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {posts.filter(post => !post.isVIP || userType === 'vip' || userType === 'admin').map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/80 backdrop-blur-md rounded-lg overflow-hidden border border-cyan-500/30"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-cyan-400 mb-2">{post.title}</h2>
                  <p className="text-gray-300 mb-4">{post.content}</p>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{post.author} • {post.timestamp}</span>
                    {post.isVIP && (
                      <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs">VIP</span>
                    )}
                  </div>
                </div>
                {post.attachments.length > 0 && (
                  <div className="px-6 pb-4">
                    <Image
                      src={post.attachments[0]}
                      alt="Post attachment"
                      width={500}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>
                )}
                <div className="px-6 py-4 bg-gray-700/50 flex justify-between items-center">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                  >
                    Like ({post.likes})
                  </button>
                  <button
                    onClick={() => handleComment(post.id, "Great post!")}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                  >
                    Comment ({post.comments.length})
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="space-y-8">
            <div className="bg-gray-800/80 backdrop-blur-md rounded-lg p-6 border border-cyan-500/30">
              <h2 className="text-2xl font-orbitron text-cyan-400 mb-4">User Profile</h2>
              <p className="text-gray-300">Welcome, {userType} user!</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-md rounded-lg p-6 border border-cyan-500/30">
              <h2 className="text-2xl font-orbitron text-cyan-400 mb-4">Trending Topics</h2>
              <ul className="space-y-2">
                <li className="text-gray-300">#CyberImplants</li>
                <li className="text-gray-300">#NeonNights</li>
                <li className="text-gray-300">#VirtualReality</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

