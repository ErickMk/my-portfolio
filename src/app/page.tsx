"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Rocket,
  Zap,
  Brain,
  Code,
  Server,
  Cpu,
  ChevronRight,
  LineChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export default function Home() {
  const isMobile = useMobile()
  const [activeSection, setActiveSection] = useState("about")
  const sectionRefs = {
    about: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    strengths: useRef<HTMLElement>(null),
    highlights: useRef<HTMLElement>(null),
    exploring: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // Find which section is currently in view
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const element = ref.current
          const offsetTop = element.offsetTop
          const height = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Define exploring items separately to fix type issues
  const exploringItems = [
    {
      title: "Compiled Hybrid System",
      description:
        "Transforming Nova into a compiled hybrid system (C++/Python) for maximum runtime performance",
    },
    {
      title: "Adaptive Meta-Learning",
      description: "Developing cross-hardware operator learning for improved adaptability",
    },
    {
      title: "AI-Driven Cache Minimization",
      description: "Exploring transformer-based tensor optimizations for efficient caching",
    },
    {
      title: "Sustainable Computing",
      description: "Targeting Nova to critical systems, edge devices, and sustainable cloud environments",
    },
  ]

  return (
    <div className="relative z-10 min-h-screen bg-transparent text-zinc-100">
      {/* Background elements - make these transparent */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-[40%] left-[20%] w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

        {/* Circuit-like pattern - reduce opacity */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0 50 H100 M50 0 V100 M25 25 H75 V75 H25 Z" stroke="currentColor" strokeWidth="1" fill="none" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-lg supports-[backdrop-filter]:bg-zinc-900/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <motion.span
                className="inline-block font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Erick Mungai Kimani
              </motion.span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              {Object.keys(sectionRefs).map((section) => (
                <Button
                  key={section}
                  variant={activeSection === section ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "relative overflow-hidden transition-all duration-300",
                    activeSection === section ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-100",
                  )}
                  onClick={() => {
                    sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  {activeSection === section && (
                    <motion.div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" layoutId="underline" />
                  )}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section
          ref={sectionRefs.about}
          id="about"
          className="py-12 md:py-24 lg:py-32 flex flex-col items-center text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          <div className="mx-auto max-w-[800px] space-y-6">
            <motion.div
              className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-zinc-800 bg-zinc-800 shadow-xl"
              variants={item}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Image
                src="/placeholder.svg?height=160&width=160"
                alt="Erick Mungai Kimani"
                width={160}
                height={160}
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
            </motion.div>
            <motion.h1
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
              variants={item}
            >
              Erick Mungai Kimani
            </motion.h1>
            <motion.h2 className="text-xl text-zinc-400 md:text-2xl" variants={item}>
              Systems Optimizer • AI Researcher • Performance Engineer
            </motion.h2>
            <motion.div className="flex flex-wrap justify-center gap-2" variants={item}>
              <Badge
                variant="outline"
                className="text-sm border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-300"
              >
                📍 Based in Kenya
              </Badge>
              <Badge
                variant="outline"
                className="text-sm border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-300"
              >
                🚀 Engineering Nova
              </Badge>
            </motion.div>
            <motion.p className="text-zinc-400 md:text-xl" variants={item}>
              Building the future of smarter, greener compute
            </motion.p>
            <motion.div className="flex justify-center gap-4" variants={item}>
              <Button
                className="relative overflow-hidden group"
                onClick={() => {
                  sectionRefs.contact.current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }}
              >
                <span className="relative z-10">Get in Touch</span>
                <span className="absolute inset-0 bg-primary/80 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                className="relative overflow-hidden group border-zinc-700 hover:border-primary/50"
                onClick={() => {
                  sectionRefs.projects.current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }}
              >
                <span className="relative z-10 group-hover:text-zinc-900 transition-colors duration-300">
                  View My Work
                </span>
                <span className="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* What I'm Building Section */}
        <motion.section
          ref={sectionRefs.projects}
          id="projects"
          className="py-12 space-y-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.div className="space-y-4 text-center" variants={item}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              🚧 What I'm Building
            </h2>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Pioneering the next generation of computational optimization
            </p>
          </motion.div>

          <motion.div
            variants={item}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative h-[300px] md:h-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Nova AI System"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-zinc-900/30" />

                  {/* Performance metrics visualization */}
                  <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/80 backdrop-blur-sm p-3 rounded-md border border-zinc-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-zinc-400">Performance Gain</span>
                      <span className="text-xs text-primary font-bold">10x</span>
                    </div>
                    <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary/80 to-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col justify-center space-y-4">
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Nova
                  </h3>
                  <p className="text-zinc-300">
                    A dynamic AI-powered performance optimization system that intelligently speeds up how computers
                    run—achieving up to <span className="font-bold text-primary">10× acceleration</span> in real-world
                    computational workloads.
                  </p>
                  <p className="text-zinc-400">
                    Nova unifies <span className="font-semibold text-zinc-200">tensor factorization</span>,{" "}
                    <span className="font-semibold text-zinc-200">operator switching</span>,{" "}
                    <span className="font-semibold text-zinc-200">reinforcement learning</span>, and{" "}
                    <span className="font-semibold text-zinc-200">Numba-based parallelization</span> to deliver
                    unmatched speed, power efficiency, and system stability across devices.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-none transition-colors duration-300">
                      Python
                    </Badge>
                    <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-none transition-colors duration-300">
                      Numba
                    </Badge>
                    <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-none transition-colors duration-300">
                      PyTorch
                    </Badge>
                    <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-none transition-colors duration-300">
                      NumPy
                    </Badge>
                    <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-none transition-colors duration-300">
                      Reinforcement Learning
                    </Badge>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* Core Strengths Section */}
        <motion.section
          ref={sectionRefs.strengths}
          id="strengths"
          className="py-12 space-y-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.div className="space-y-4 text-center" variants={item}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              🔥 My Core Strengths
            </h2>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Technical expertise built through years of systems optimization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Server className="h-5 w-5 text-primary" />,
                title: "Systems Thinking",
                description: "Architected Nova's modular, extensible optimization framework from the ground up.",
              },
              {
                icon: <Brain className="h-5 w-5 text-primary" />,
                title: "AI Innovation",
                description: "Integrated reinforcement learning for real-time decision-making on operator performance.",
              },
              {
                icon: <Zap className="h-5 w-5 text-primary" />,
                title: "Performance Engineering",
                description: "Achieved consistent 3–10× speedups across tensor, ALU, and FPU workloads.",
              },
              {
                icon: <Cpu className="h-5 w-5 text-primary" />,
                title: "Hardware-Aware Design",
                description: "Optimizations adapt dynamically based on CPU/GPU usage, memory state, and thermal load.",
              },
              {
                icon: <Code className="h-5 w-5 text-primary" />,
                title: "Deep Technical Insight",
                description: "Applied algorithms from math olympiads, compiler theory, and HPC research.",
              },
              {
                icon: <LineChart className="h-5 w-5 text-primary" />,
                title: "Efficiency Optimization",
                description: "Developed algorithms that maximize performance while minimizing resource consumption.",
              },
            ].map((strength, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Card className="h-full border border-zinc-800 bg-zinc-800/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="pt-6 h-full flex flex-col">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 group-hover:bg-zinc-900/80 transition-colors duration-300 border border-zinc-700">
                      {strength.icon}
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {strength.title}
                    </h3>
                    <p className="text-zinc-400 mt-2 group-hover:text-zinc-300 transition-colors duration-300">
                      {strength.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent Highlights Section */}
        <motion.section
          ref={sectionRefs.highlights}
          className="py-12 space-y-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.div className="space-y-4 text-center" variants={item}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              💡 Recent Highlights
            </h2>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">Key achievements and developments</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Rocket className="h-4 w-4 text-primary" />,
                title: "Developed Nova's Unified Optimizer",
                subtitle: "Python, Numba, Torch, NumPy",
              },
              {
                icon: <Cpu className="h-4 w-4 text-primary" />,
                title: "Built system-aware ALU/FPU operator agent",
                subtitle: "With RL switching capabilities",
              },
              {
                icon: <Zap className="h-4 w-4 text-primary" />,
                title: "Benchmarked Nova against NumPy and Python",
                subtitle: "Achieved up to 10x speedups",
              },
              {
                icon: <Server className="h-4 w-4 text-primary" />,
                title: "Devised caching strategies with AI",
                subtitle: "For performance + memory efficiency",
              },
            ].map((highlight, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Card className="border border-zinc-800 bg-zinc-800/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-md group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 group-hover:bg-zinc-900/80 transition-colors duration-300 border border-zinc-700">
                        {highlight.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                          {highlight.title}
                        </h3>
                        <p className="text-sm text-zinc-400">{highlight.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Currently Exploring Section */}
        <motion.section
          ref={sectionRefs.exploring}
          className="py-12 space-y-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.div className="space-y-4 text-center" variants={item}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              🧠 Currently Exploring
            </h2>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">Future directions and ongoing research</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exploringItems.map((item, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Card className="h-full border border-zinc-800 bg-zinc-800/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-6 space-y-2 h-full flex flex-col">
                    <h3 className="text-lg font-semibold flex items-center group-hover:text-primary transition-colors duration-300">
                      {item.title}
                      <ChevronRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    </h3>
                    <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          ref={sectionRefs.contact}
          id="contact"
          className="py-12 space-y-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.div className="space-y-4 text-center" variants={item}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              📫 Let's Connect
            </h2>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Reach out to discuss collaboration opportunities
            </p>
          </motion.div>

          <motion.div className="mx-auto max-w-md space-y-4" variants={item}>
            <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
              <Card className="overflow-hidden border border-zinc-800 bg-zinc-800/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      {
                        icon: <Mail className="h-5 w-5 text-primary" />,
                        label: "Email",
                        value: "erickmungai27@gmail.com",
                        href: "mailto:erickmungai27@gmail.com",
                      },
                      {
                        icon: <Phone className="h-5 w-5 text-primary" />,
                        label: "Phone",
                        value: "+254 115 950 995",
                        href: "tel:+254115950995",
                      },
                      {
                        icon: <Github className="h-5 w-5 text-primary" />,
                        label: "GitHub",
                        value: "github.com/ErickMk",
                        href: "https://github.com/ErickMk",
                      },
                      {
                        icon: <Linkedin className="h-5 w-5 text-primary" />,
                        label: "LinkedIn",
                        value: "linkedin.com/in/erick-mungai-558b00338",
                        href: "https://www.linkedin.com/in/erick-mungai-558b00338",
                      },
                    ].map((contact, index) => (
                      <div key={index} className="group">
                        <div className="flex items-center space-x-4 group-hover:translate-x-1 transition-transform duration-300">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 group-hover:bg-zinc-900/80 transition-colors duration-300 border border-zinc-700">
                            {contact.icon}
                          </div>
                          <div>
                            <p className="text-sm text-zinc-400">{contact.label}</p>
                            {contact.href ? (
                              <Link
                                href={contact.href}
                                className="font-medium hover:text-primary transition-colors duration-300 flex items-center"
                              >
                                {contact.value}
                                <ChevronRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                              </Link>
                            ) : (
                              <p className="font-medium">{contact.value}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                🚀 Let's build the future of intelligent, sustainable compute together.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-zinc-400 md:text-left">
              © 2025 Erick Mungai Kimani. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
