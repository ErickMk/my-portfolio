import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ClientAnimations } from './ClientAnimations'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Erick M. Kimani - Portfolio',
  description: 'Personal portfolio of Erick M. Kimani, Systems Optimizer & AI Researcher',
  authors: [{ name: 'Erick M. Kimani' }],
  keywords: ['portfolio', 'developer', 'AI researcher', 'systems optimizer', 'Nova'],
  creator: 'Erick M. Kimani',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f8f8' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full scroll-smooth">
      <body className={`${inter.className} h-full antialiased text-zinc-800 dark:text-zinc-200 touch-manipulation`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          <ClientAnimations>{children}</ClientAnimations>
        </ThemeProvider>
      </body>
    </html>
  )
}
