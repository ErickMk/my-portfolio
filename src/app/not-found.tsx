import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button asChild className="mt-4">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
} 