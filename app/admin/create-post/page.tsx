"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface CreatePostFormProps {
  onCreatePost: (post: {
    title: string
    content: string
    author: string
    timestamp: string
    isVIP: boolean
    attachments: string[]
  }) => void
}

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isVIP, setIsVIP] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This is a mock function. In a real application, you would send this data to your backend.
    console.log({
      title,
      content,
      author: 'Admin',
      timestamp: new Date().toLocaleString(),
      isVIP,
      attachments: []
    })
    // Reset form
    setTitle('')
    setContent('')
    setIsVIP(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-orbitron text-white mb-8">Create New Post</h1>
        
        <Card className="bg-black/40 backdrop-blur-xl border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-2xl font-orbitron text-cyan-400">New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-cyan-300">Title</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title" 
                  className="bg-white/5 border-cyan-500/30 text-white placeholder:text-cyan-300/50"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content" className="text-cyan-300">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content here..."
                  className="min-h-[200px] bg-white/5 border-cyan-500/30 text-white placeholder:text-cyan-300/50"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="vip-mode"
                  checked={isVIP}
                  onCheckedChange={setIsVIP}
                />
                <Label htmlFor="vip-mode" className="text-cyan-300">VIP Post</Label>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-orbitron tracking-wide py-6 text-lg">
                Create Post
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

