import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ClientAnimations } from './ClientAnimations'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Erick Mungai Kimani - Portfolio',
  description: 'Personal portfolio of Erick Mungai Kimani',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={`${inter.className} h-full antialiased text-zinc-800 dark:text-zinc-200`}>
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
