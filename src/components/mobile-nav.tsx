"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

interface MobileNavProps {
  sections: { id: string; label: string }[]
  onNavigate: (sectionId: string) => void
  activeSection: string
}

export function MobileNav({ sections, onNavigate, activeSection }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const handleNavigate = (sectionId: string) => {
    setOpen(false)
    onNavigate(sectionId)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-zinc-200 hover:text-zinc-100 hover:bg-zinc-800"
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="bg-zinc-900/95 backdrop-blur-md border-zinc-800 p-0 w-[75vw] max-w-[320px]"
      >
        <div className="flex flex-col h-full px-6 py-12">
          <div className="flex justify-end mb-8">
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="text-zinc-400">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <nav className="flex flex-col gap-4">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                className={cn(
                  "justify-start relative rounded-md px-4 py-6 text-base h-auto bg-transparent",
                  activeSection === section.id 
                    ? "text-primary font-medium" 
                    : "text-zinc-400 hover:text-zinc-300"
                )}
                onClick={() => handleNavigate(section.id)}
              >
                <span>{section.label}</span>
                {activeSection === section.id && (
                  <motion.div 
                    layoutId="mobile-nav-indicator"
                    className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-md"
                    transition={{ duration: 0.15, type: "spring", stiffness: 500, damping: 25 }}
                  />
                )}
              </Button>
            ))}
          </nav>
          <div className="mt-auto pt-8 border-t border-zinc-800 text-zinc-400 text-sm">
            <p className="mb-2 font-medium text-zinc-300">Erick M. Kimani</p>
            <p>Systems Optimizer • AI Researcher</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 