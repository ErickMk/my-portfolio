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
        <div className="fixed inset-0 z-[55] bg-zinc-900/80 backdrop-blur-lg">
          <div className="container flex min-h-screen flex-col items-center justify-center space-y-4">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                className={cn(
                  "text-lg",
                  activeSection === section.id ? "text-primary" : "text-zinc-400",
                )}
                onClick={() => {
                  onNavigate(section.id)
                  setIsOpen(false)
                }}
              >
                {section.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 