"use client"

import { LanguageProvider } from "@/context/LanguageContext"
import Sidebar from "@/components/sidebar"

export function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <Sidebar />
      {children}
    </LanguageProvider>
  )
} 