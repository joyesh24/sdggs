import { Inter, Orbitron } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ["latin"], variable: '--font-orbitron' })

export const metadata = {
  title: 'CyberConnect',
  description: 'A futuristic social platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="font-sans bg-gray-900 text-white">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}

