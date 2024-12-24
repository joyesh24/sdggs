"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'

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

const initialPosts: Post[] = [
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

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const router = useRouter()

  useEffect(() => {
    const userType = localStorage.getItem("userType")
    if (userType !== "admin") {
      router.push('/login')
    }
  }, [router])

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'likes' | 'comments'>) => {
    const post: Post = {
      ...newPost,
      id: posts.length + 1,
      likes: 0,
      comments: []
    }
    setPosts([post, ...posts])
  }

  const handleLogout = () => {
    localStorage.removeItem("userType")
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/cyberpunk-admin-dashboard.jpg"
          alt="Cyberpunk Admin Dashboard"
          fill
          className="object-cover opacity-20"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
      <header className="relative bg-gray-800/80 backdrop-blur-md py-6 px-6 flex justify-between items-center border-b border-purple-500/30">
        <h1 className="text-3xl font-orbitron text-purple-400">Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-lg font-orbitron tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 rounded-md"
        >
          Logout
        </button>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/80 backdrop-blur-md rounded-lg p-6 mb-8 border border-purple-500/30"
        >
          <h2 className="text-2xl font-orbitron text-purple-400 mb-4">Create New Post</h2>
          <form onSubmit={(e) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            const title = (form.elements.namedItem('title') as HTMLInputElement).value
            const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value
            const isVIP = (form.elements.namedItem('isVIP') as HTMLInputElement).checked
            handleCreatePost({
              title,
              content,
              author: "Admin",
              timestamp: new Date().toLocaleString(),
              isVIP,
              attachments: []
            })
            form.reset()
          }} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
              <input type="text" id="title" name="title" required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-300">Content</label>
              <textarea id="content" name="content" rows={4} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="isVIP" name="isVIP" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
              <label htmlFor="isVIP" className="ml-2 block text-sm text-gray-300">VIP Post</label>
            </div>
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Create Post
            </button>
          </form>
        </motion.div>

        <div className="space-y-6">
          {posts.map(post => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/80 backdrop-blur-md rounded-lg overflow-hidden border border-purple-500/30"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-purple-400 mb-2">{post.title}</h2>
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
                <span className="text-purple-400">Likes: {post.likes}</span>
                <span className="text-purple-400">Comments: {post.comments.length}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

