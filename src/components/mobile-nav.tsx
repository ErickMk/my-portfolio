"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  sections: { id: string; label: string }[]
  onNavigate: (sectionId: string) => void
  activeSection: string
}

export function MobileNav({ sections, onNavigate, activeSection }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="relative z-[60]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[55] bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 z-[60] h-full w-[280px] bg-zinc-900/95 border-l border-zinc-800/50 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-zinc-800/50 bg-zinc-900/95">
                <h2 className="text-lg font-semibold text-zinc-100">Navigation</h2>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-2 bg-zinc-900/95">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-base",
                      activeSection === section.id 
                        ? "text-primary bg-primary/10" 
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                    )}
                    onClick={() => {
                      onNavigate(section.id)
                      setIsOpen(false)
                    }}
                  >
                    {section.label}
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 