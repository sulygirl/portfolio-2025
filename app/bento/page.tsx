import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function Bento() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-24 bg-white">
      <div className="max-w-md mx-auto text-center">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <h1 className="text-2xl font-normal text-gray-700 mb-8">My Bento</h1>

        <p className="text-gray-500 text-base mb-6 leading-relaxed">A collection of things I find interesting.</p>

        {/* This is a placeholder as the actual content wasn't visible in the screenshot */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-gray-100 p-4 rounded-lg aspect-square flex items-center justify-center text-gray-500">
            Item 1
          </div>
          <div className="bg-gray-100 p-4 rounded-lg aspect-square flex items-center justify-center text-gray-500">
            Item 2
          </div>
          <div className="bg-gray-100 p-4 rounded-lg aspect-square flex items-center justify-center text-gray-500">
            Item 3
          </div>
          <div className="bg-gray-100 p-4 rounded-lg aspect-square flex items-center justify-center text-gray-500">
            Item 4
          </div>
        </div>
      </div>
    </main>
  )
}

