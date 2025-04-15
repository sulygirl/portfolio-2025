'use client'

import { useState, useEffect } from "react"
import { PasscodeScreen } from "@/components/PasscodeScreen"
import { ThemeProvider } from "@/components/theme-provider"

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const [isPasscodeEntered, setIsPasscodeEntered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hasPasscode = localStorage.getItem('websitePasscodeEntered') === 'true'
    setIsPasscodeEntered(hasPasscode)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="max-w-[518px] w-full px-6 pt-[220px] pb-12">
        {children}
      </div>
    </div>
  )
} 