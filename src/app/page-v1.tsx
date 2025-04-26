import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Erick Mungai Kimani - Systems Optimizer & AI Researcher",
  description: "Portfolio of Erick Mungai Kimani, creator of Nova - an AI-powered performance optimization system.",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center">Erick Mungai Kimani</h1>
        <p className="text-xl text-center mt-4">Systems Optimizer & AI Researcher</p>
      </div>
    </main>
  )
}
