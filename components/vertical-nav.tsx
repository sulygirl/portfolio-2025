"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export default function VerticalNav() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="fixed right-0 top-0 h-full flex flex-col items-center justify-center px-4 text-gray-400">
      <div className="vertical-text transform rotate-90 mb-24 text-xs uppercase tracking-widest">Back to Top</div>

      {showBackToTop && (
        <button onClick={scrollToTop} className="p-2 hover:text-gray-700 transition-colors">
          <ArrowUp size={16} />
        </button>
      )}

      <div className="vertical-text transform rotate-90 mt-24 text-xs uppercase tracking-widest">
        Everything around me was made by people no smarter than me
      </div>
    </div>
  )
}

