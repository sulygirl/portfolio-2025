"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { usePathname } from 'next/navigation'
import { Search, Brain, Globe, Layers } from 'lucide-react'

interface NavigationItem {
  href: string
  icon: React.FC<{ size?: number; className?: string }>
  label: { zh: string; en: string }
  color: string
  isLucideIcon: boolean
}

export interface SidebarProps {
  scrollToSection?: (section: string) => void
}

export default function Sidebar({ scrollToSection: externalScrollToSection }: SidebarProps) {
  const { language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)

  const navigationItems: NavigationItem[] = [
    { 
      href: '#OSB智能搜索', 
      icon: Search, 
      label: { zh: 'OSB智能搜索', en: 'OneSearchBox' },
      color: 'bg-[rgba(65,97,253,1)]',
      isLucideIcon: true
    },
    { 
      href: '#AI驱动的研发全链路赋能', 
      icon: Brain,
      label: { zh: 'AI驱动研发', en: 'AI-Driven R&D' },
      color: 'bg-blue-500',
      isLucideIcon: true
    },
    { 
      href: '#I18N设计策略及一键翻译', 
      icon: Globe,
      label: { zh: 'I18N设计策略', en: 'I18N Strategy' },
      color: 'bg-green-500',
      isLucideIcon: true
    },
    { 
      href: '#AI智能设计系统', 
      icon: Layers,
      label: { zh: '物流行业设计系统', en: 'Design System' },
      color: 'bg-purple-500',
      isLucideIcon: true
    },
  ]

  const renderIcon = (item: NavigationItem) => {
    const IconComponent = item.icon
    return <IconComponent size={18} className="text-white" />
  }

  const handleScrollToSection = (section: string) => {
    if (externalScrollToSection) {
      externalScrollToSection(section)
    } else {
      // Default scroll behavior if prop is not provided
      const element = document.getElementById(section)
      if (element) {
        const offset = element.offsetTop - 80
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[72px] hover:w-[240px] bg-white transition-all duration-300 ease-in-out group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col flex-grow justify-center pl-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = window.location.hash === item.href
              
              return (
                <button
                  key={item.href}
                  onClick={() => handleScrollToSection(item.href)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 w-full",
                    "hover:bg-[#f3f6fc]",
                    isActive ? "text-[#0066FF]" : "text-[#64748b] hover:text-[#0066FF]"
                  )}
                >
                  <div className={cn(
                    "min-w-[32px] min-h-[32px] w-8 h-8 rounded-full flex items-center justify-center text-lg overflow-hidden transition-all duration-300",
                    item.color,
                    "text-white flex-shrink-0"
                  )}>
                    {renderIcon(item)}
                  </div>
                  <span className={cn(
                    "transition-all duration-300 whitespace-nowrap",
                    isHovered ? "opacity-100" : "opacity-0"
                  )}>
                    {item.label[language]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#e5e7eb] z-50">
        <div className="flex items-center h-full px-4">
          <div className="flex w-full overflow-x-auto no-scrollbar gap-2">
            {navigationItems.map((item) => {
              const isActive = window.location.hash === item.href
              
              return (
                <button
                  key={item.href}
                  onClick={() => handleScrollToSection(item.href)}
                  className={`flex items-center shrink-0 space-x-2 px-3 py-2 rounded-full whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#f3f6fc] text-[#0066FF]'
                      : 'hover:bg-[#f3f6fc] text-[#64748b] hover:text-[#0066FF]'
                  }`}
                >
                  <div className={cn(
                    "min-w-[28px] min-h-[28px] w-[28px] h-[28px] rounded-full flex items-center justify-center text-lg overflow-hidden",
                    item.color,
                    "text-white"
                  )}>
                    {renderIcon(item)}
                  </div>
                  <span className="text-sm">{item.label[language]}</span>
                </button>
              )
            })}
            <div className="flex-shrink-0 ml-auto pl-2 border-l border-gray-100">
              <button
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="flex items-center px-3 py-2 text-sm text-[#64748b] hover:text-[#0066FF] rounded-full hover:bg-[#f3f6fc] transition-colors whitespace-nowrap"
              >
                {language === 'zh' ? 'EN' : '中文'}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
} 