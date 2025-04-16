"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X, Search, Brain, Globe, Layers, Boxes } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PasscodeDialog } from "@/components/PasscodeDialog"
import { useLanguage } from "@/context/LanguageContext"
import { PasscodeScreen } from "@/components/PasscodeScreen"
import { MusicPlayerDialog } from "@/components/MusicPlayerDialog"
import { cn, getImagePath } from "@/lib/utils"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import Sidebar from "@/components/sidebar"
import AnimatedContent from "@/components/AnimatedContent"


type ProjectId = 'OSB智能搜索' | 'AI驱动的研发全链路赋能' | 'I18N设计策略及一键翻译' | 'AI智能设计系统';

type ProjectDetails = {
  [K in ProjectId]: {
    name: string;
    color: string;
    icon: React.ReactNode;
  }
}

interface NavigationItem {
  href: string;
  icon: React.FC<{ size?: number; className?: string }>;
  label: { zh: string; en: string };
  color: string;
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectId | null>(null)
  const [isPasscodeDialogOpen, setIsPasscodeDialogOpen] = useState(false)
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showTopNav, setShowTopNav] = useState(false)
  const [showHamburger, setShowHamburger] = useState(true)
  const { t, language, setLanguage, isAnimating } = useLanguage()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const osbSectionRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState("home")
  const [showHomeIcon, setShowHomeIcon] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showPasscodeScreen, setShowPasscodeScreen] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const hasPasscode = localStorage.getItem('websitePasscodeEntered') === 'true'
    setShowPasscodeScreen(!hasPasscode)
  }, [])

  const handleCorrectPasscode = () => {
    setShowPasscodeScreen(false)
    localStorage.setItem('websitePasscodeEntered', 'true')
  }

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@eikedrescher.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToSection = (section: string) => {
    if (typeof window === 'undefined') return;
    if (section === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      setActiveSection('home')
      window.location.hash = ''
      return
    }
    
    const element = document.getElementById(section.replace('#', ''))
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    const scrollPosition = window.scrollY
    const projectSections = document.querySelectorAll('section[id]')
    const mb8Sections = document.querySelectorAll('section.mb-8')
    let isInProjectSection = false
    let isInHomeSection = false
    let isInMb8Section = false

    projectSections.forEach((section) => {
      if (section.id === 'home') {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 0) {
          isInHomeSection = true
        }
      } else {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 0) {
          isInProjectSection = true
        }
      }
    })

    mb8Sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 0) {
        isInMb8Section = true
      }
    })

    // Show buttons only when not in any special sections
    setShowHamburger(!isInProjectSection && !isInHomeSection && !isInMb8Section)
    if ((isInProjectSection || isInHomeSection || isInMb8Section) && isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
    setShowHomeIcon(scrollPosition < 100)
  }, [isMobileMenuOpen])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    const projectHeaders = document.querySelectorAll(".project-header")

    const handleHeaderScroll = () => {
      projectHeaders.forEach((header) => {
        const rect = header.getBoundingClientRect()
        if (rect.top <= 0) {
          header.setAttribute('data-sticky', 'true')
        } else {
          header.setAttribute('data-sticky', 'false')
        }
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            setActiveSection(sectionId)
            window.location.hash = `#${sectionId}`
          }
        })
      },
      {
        rootMargin: '0px 0px -50% 0px',
        threshold: 0
      }
    )

    sections.forEach((section) => {
      observer.observe(section)
    })

    window.addEventListener('scroll', handleHeaderScroll)
    return () => {
      window.removeEventListener('scroll', handleHeaderScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (osbSectionRef.current) {
        const rect = osbSectionRef.current.getBoundingClientRect()
        setShowTopNav(rect.top <= 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const projectDetails: ProjectDetails = {
    'OSB智能搜索': {
      name: "OSB智能搜索",
      color: "bg-[rgba(65,97,253,1)]",
      icon: <Search size={18} className="text-white" />
    },
    'AI驱动的研发全链路赋能': {
      name: "AI驱动的研发全链路赋能",
      color: "bg-blue-500",
      icon: <Boxes size={18} className="text-white" />
    },
    'I18N设计策略及一键翻译': {
      name: "I18N设计策略及一键翻译",
      color: "bg-green-500",
      icon: <Globe size={18} className="text-white" />
    },
    'AI智能设计系统': {
      name: "物流行业设计系统",
      color: "bg-purple-500",
      icon: <Layers size={18} className="text-white" />
    }
  }

  const navigationItems: NavigationItem[] = [
    { 
      href: '#OSB智能搜索', 
      icon: Search,
      label: { zh: t.queue.name, en: 'OneSearchBox' },
      color: 'bg-[rgba(65,97,253,1)]'
    },
    { 
      href: '#AI驱动的研发全链路赋能', 
      icon: Boxes,
      label: { zh: t.aiDev.name, en: 'AI-Driven R&D' },
      color: 'bg-blue-500'
    },
    { 
      href: '#I18N设计策略及一键翻译', 
      icon: Globe,
      label: { zh: t.bento.name, en: 'I18N Strategy' },
      color: 'bg-green-500'
    },
    { 
      href: '#AI智能设计系统', 
      icon: Layers,
      label: { zh: t.aiDesign.name, en: 'Design System' },
      color: 'bg-purple-500'
    }
  ]

  const renderIcon = (item: NavigationItem) => {
    const IconComponent = item.icon
    return <IconComponent size={18} className="text-white" />
  }

  return (
    <>
      {showPasscodeScreen ? (
        <PasscodeScreen onCorrectPasscode={handleCorrectPasscode} />
      ) : (
        <div className="min-h-screen w-full flex flex-col bg-background">
          {/* Mobile Header */}
          <header className="lg:hidden h-16 z-[60] flex items-center justify-between px-4 bg-background border-none">
            {/* Mobile menu button - left side */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-500 ease-in-out"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Language switcher - mobile */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="min-w-[48px] px-3 py-1.5 text-xs font-medium text-[#64748B] rounded-md border border-gray-200 hover:bg-gray-50 transition-all duration-500 ease-in-out bg-white shadow-sm backdrop-blur-sm flex items-center justify-center gap-2"
              aria-label={language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
            >
              <Globe className="h-3.5 w-3.5 text-[#64748B]" />
              <span className="block truncate">
                {language === 'en' ? '中文' : 'EN'}
              </span>
            </button>
          </header>

          {/* Desktop language switcher */}
          <div className="hidden lg:block fixed top-4 right-4 z-[60]">
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="min-w-[48px] px-3 py-1.5 text-xs font-medium text-[#64748B] rounded-md border border-gray-200 hover:bg-gray-50 transition-all duration-500 ease-in-out bg-white shadow-sm backdrop-blur-sm flex items-center justify-center gap-2"
              aria-label={language === 'en' ? 'Switch to Chinese' : 'Switch to English'}
            >
              <Globe className="h-3.5 w-3.5 text-[#64748B]" />
              <span className="block truncate">
                {language === 'en' ? '中文' : 'EN'}
              </span>
            </button>
          </div>

          {/* Desktop Sidebar */}
          <Sidebar scrollToSection={scrollToSection} />

          {/* Mobile navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && showHamburger && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="lg:hidden fixed top-0 left-0 right-0 z-[55] bg-white/80 backdrop-blur-sm shadow-sm"
              >
                <div className="flex flex-col p-4 pt-20 gap-2">
                  <button
                    onClick={() => {
                      scrollToSection("OSB智能搜索");
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                      "hover:bg-gray-100"
                    )}
                  >
                    <span className="flex-shrink-0">
                      <div className="w-6 h-6 flex items-center justify-center bg-[rgba(65,97,253,1)] rounded-full">
                        <Search size={14} className="text-white" />
                      </div>
                    </span>
                    <span className="text-xs font-medium text-[#64748B]">{t.queue.name}</span>
                  </button>

                  <button
                    onClick={() => {
                      scrollToSection("AI驱动的研发全链路赋能");
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                      "hover:bg-gray-100"
                    )}
                  >
                    <span className="flex-shrink-0">
                      <div className="w-6 h-6 flex items-center justify-center bg-blue-500 rounded-full">
                        <Boxes size={14} className="text-white" />
                      </div>
                    </span>
                    <span className="text-xs font-medium text-[#64748B]">{t.aiDev.name}</span>
                  </button>

                  <button
                    onClick={() => {
                      scrollToSection("I18N设计策略及一键翻译");
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                      "hover:bg-gray-100"
                    )}
                  >
                    <span className="flex-shrink-0">
                      <div className="w-6 h-6 flex items-center justify-center bg-green-500 rounded-full">
                        <Globe size={14} className="text-white" />
                      </div>
                    </span>
                    <span className="text-xs font-medium text-[#64748B]">{t.bento.name}</span>
                  </button>

                  <button
                    onClick={() => {
                      scrollToSection("AI智能设计系统");
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                      "hover:bg-gray-100"
                    )}
                  >
                    <span className="flex-shrink-0">
                      <div className="w-6 h-6 flex items-center justify-center bg-purple-500 rounded-full">
                        <Layers size={14} className="text-white" />
                      </div>
                    </span>
                    <span className="text-xs font-medium text-[#64748B]">{t.aiDesign.name}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <main className="flex-1 flex justify-center page-content">
            <div className="w-full max-w-[350px] md:max-w-[518px] px-4 pt-6 pb-12">
              <AnimatedContent contentKey={language}>
                <section id="home" className="mb-16 pb-8 border-b border-gray-100 mt-[5rem] md:mt-[10rem]">
                  <h1 className="text-xl md:text-2xl font-normal text-gray-700 mb-6 md:mb-8">
                    {t.greeting}
                  </h1>

                  <p className="text-2xl md:text-[28px] text-gray-500 mb-6 leading-relaxed">
                    {t.title1}<br />
                    {t.title2}
                  </p>
                  
                  <p className="text-sm md:text-base text-gray-500 mb-6 leading-relaxed">
                    {t.intro}
                  </p>

                  <p className="text-sm md:text-base text-gray-500 mb-6 leading-relaxed">
                    • {t.bulletPoint1}<br />
                    • {t.bulletPoint2}
                  </p>

                  <p className="text-sm md:text-base text-gray-500 mb-10 leading-relaxed whitespace-pre-line">
                    {t.conclusion}
                  </p>

                  <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                    <Button
                      variant="default"
                      className="w-full md:w-auto bg-black hover:bg-black/90 text-white rounded-md px-4 py-2 text-sm font-normal"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/assets/resume.pdf';
                        link.download = 'Sierra-Resume.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      {copied ? t.downloaded : t.downloadResume}
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-full md:w-auto text-black tracking-[0.2px] bg-white hover:bg-[#fafafa] px-4 py-[10px] text-sm font-semibold leading-5 rounded-lg transition-all duration-250 ease-[cubic-bezier(.427,.073,.105,.997)] shadow-[inset_0_0_1px_1px_#fff,0_0_0_1px_#00000008,0_2px_3px_#0000000f] bg-gradient-to-b from-[#f8f8f8] to-white hover:bg-gradient-to-b hover:from-[#f3f3f3] hover:to-white"
                      onClick={() => window.open("https://rainbow-cast-8df.notion.site/1cc3c5e9d28b8028a047dd2e70d206bf?pvs=4", "_blank")}
                    >
                      {t.checkResume}
                    </Button>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-xs text-gray-400 mb-6 font-normal">{t.thoughtsTitle}</h2>

                  <div className="space-y-6">
                    <article className="group relative">
                      <a href="https://rainbow-cast-8df.notion.site/AI-1d53c5e9d28b803b9da4dd9c88b0a9d5?pvs=4" target="_blank" rel="noopener noreferrer" className="block postemphasized">
                        <div className="flex items-center mb-2">
                          <h3 className="text-base text-gray-600 font-normal">
                            {t.articles.aiSearch.title}
                          </h3>
                          <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
                        </div>
                        <p className="text-gray-400 text-sm font-light leading-relaxed">
                          {t.articles.aiSearch.description}
                        </p>
                      </a>
                      <div className="floating-preview absolute -right-[300px] top-0 w-[300px]">
                        <div className="dark-border big-preview">
                          <img 
                            src={getImagePath("/ai智能查单.gif")}
                            alt="AI查单概念" 
                            className="image-103 w-full h-full object-cover" 
                            loading="lazy"
                            style={{
                              objectFit: 'cover',
                              aspectRatio: '16/9',
                            }}
                          />
                        </div>
                      </div>
                    </article>

                    <article className="group relative">
                      <a href="https://rainbow-cast-8df.notion.site/Design-Collaborative-Wicked-Problem-Cone-1d53c5e9d28b806f945ec792ec21625e?pvs=4" target="_blank" rel="noopener noreferrer" className="block">
                        <h3 className="text-base text-gray-600 mb-2 font-normal flex items-center postemphasized">
                          {t.articles.wickedProblem.title}
                          <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
                        </h3>
                      </a>
                      <div className="floating-preview absolute -right-[300px] top-0 w-[300px]">
                        <div className="dark-border big-preview">
                          <img 
                            src={getImagePath("/wickedproblem.gif")}
                            alt="Wicked Problem" 
                            className="image-103 w-full h-full object-cover" 
                            loading="lazy"
                            style={{
                              objectFit: 'cover',
                              aspectRatio: '16/9',
                            }}
                          />
                        </div>
                      </div>
                    </article>

                    <article className="group relative">
                      <a href="https://rainbow-cast-8df.notion.site/1d53c5e9d28b803187d4eac8405e380b?pvs=4" target="_blank" rel="noopener noreferrer" className="block">
                        <h3 className="text-base text-gray-600 mb-2 font-normal flex items-center postemphasized">
                          {t.articles.dataDesign.title}
                          <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
                        </h3>
                      </a>
                      <div className="floating-preview absolute -right-[300px] top-0 w-[300px]">
                        <div className="dark-border big-preview">
                          <img 
                            src={getImagePath("/设计决策.jpeg")}
                            alt="数据驱动设计" 
                            className="image-103 w-full h-full object-cover" 
                            loading="lazy"
                            style={{
                              objectFit: 'cover',
                              aspectRatio: '16/9',
                            }}
                          />
                        </div>
                      </div>
                    </article>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-xs text-gray-400 mb-6 font-normal">{t.musicTitle}</h2>

                  <div className="space-y-6">
                    <article className="group relative">
                      <a 
                        href="#" 
                        className="block"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsMusicPlayerOpen(true);
                        }}
                      >
                        <h3 className="text-base text-gray-600 mb-2 font-normal flex items-center postemphasized">
                          {t.articles.music.title}
                          <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
                        </h3>
                      </a>
                    </article>
                  </div>
                </section>

                <MusicPlayerDialog
                  isOpen={isMusicPlayerOpen}
                  onClose={() => setIsMusicPlayerOpen(false)}
                  title="三十未满指南"
                />

                <section id="OSB智能搜索" className="py-16 border-t border-gray-100" ref={osbSectionRef}>
                  <div className="flex items-center gap-3 mb-4 project-header">
                    <div className="project-header-content z-[50] flex flex-wrap items-start gap-3 w-full">
                      <div className={`w-8 h-8 rounded-full ${projectDetails['OSB智能搜索'].color} flex items-center justify-center text-lg flex-shrink-0`}>
                        {projectDetails['OSB智能搜索'].icon}
                      </div>
                      {language === 'en' ? (
                        <div className="flex flex-col gap-2 flex-1 min-w-0">
                          <h2 className="text-lg font-medium">{t.queue.name}</h2>
                          <span className="text-sm text-gray-500 rounded-full bg-[rgba(10,206,172,0.1)] px-3 py-1 inline-block w-fit">{t.queue.tag}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <h2 className="text-lg font-medium">{t.queue.name}</h2>
                            <span className="text-sm text-gray-500 rounded-full bg-[rgba(10,206,172,0.1)] px-3 py-1 w-fit">{t.queue.tag}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex mb-6 project-date">
                    <span className="text-sm text-gray-400">2023.9.30 - 2025.3.31</span>
                  </div>

                  <div className="prose max-w-none mb-8 space-y-4">
                    <p className="text-base leading-relaxed tracking-normal">{t.queue.description1}</p>
                    <p className="text-base leading-relaxed tracking-normal">{t.queue.description2}</p>
                    <p className="text-base leading-relaxed tracking-normal">{t.queue.description3}</p>
                  </div>

                  <div className="relative w-full mb-8">
                    <div className="rounded-xl overflow-hidden bg-gray-100 lg:max-w-[813px] lg:-mx-[147.5px]">
                      <div className="w-full aspect-video relative">
                        <Image 
                          src={getImagePath("/osb重点内容介绍.gif")}
                          alt="OneSearchBox Key Features Demo"
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 813px"
                          quality={75}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a 
                      href="https://rainbow-cast-8df.notion.site/AI-OneSearchBox-1cd3c5e9d28b80fc81a5ebc16b78e79e?pvs=4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 flex items-center postemphasized font-medium"
                    >
                      {`${t.checkOut}`}
                      <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
                    </a>
                  </div>
                </section>

                <section id="AI驱动的研发全链路赋能" className="py-16 border-t border-gray-100">
                  <div className="flex items-center gap-3 mb-4 project-header">
                    <div className="project-header-content z-[50] flex flex-wrap items-start gap-3 w-full">
                      <div className={`w-8 h-8 rounded-full ${projectDetails['AI驱动的研发全链路赋能'].color} flex items-center justify-center text-lg flex-shrink-0`}>
                        {projectDetails['AI驱动的研发全链路赋能'].icon}
                      </div>
                      {language === 'en' ? (
                        <div className="flex flex-col gap-2 flex-1 min-w-0">
                          <h2 className="text-lg font-medium">{t.aiDev.name}</h2>
                          <span className="text-sm text-gray-500 rounded-full bg-[rgba(10,206,172,0.1)] px-3 py-1 inline-block w-fit">{t.aiDev.tag}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <h2 className="text-lg font-medium">{t.aiDev.name}</h2>
                            <span className="text-sm text-gray-500 rounded-full bg-[rgba(10,206,172,0.1)] px-3 py-1 w-fit">{t.aiDev.tag}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex mb-6 project-date">
                    <span className="text-sm text-gray-400">2024.6.1 - 2025.3.31</span>
                  </div>

                  <div className="prose max-w-none mb-8 space-y-4">
                    <p className="text-base leading-relaxed tracking-normal">{t.aiDev.description1}</p>
                    <p className="text-base leading-relaxed tracking-normal">{t.aiDev.description2}</p>
                    <p className="text-base leading-relaxed tracking-normal">{t.aiDev.description3}</p>
                  </div>

                  <div className="relative w-full mb-8">
                    <div className="rounded-xl overflow-hidden bg-gray-100 lg:max-w-[813px] lg:-mx-[147.5px]">
                      <div className="w-full aspect-video relative">
                        <Image 
                          src={getImagePath("/智能推荐模板.gif")}
                          alt="AI驱动的研发全链路赋能 Demo"
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 813px"
                          quality={75}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a 
                      href={language === 'zh' 
                        ? "https://rainbow-cast-8df.notion.site/AI-1cd3c5e9d28b800595bec10499e54058?pvs=74"
                        : "https://rainbow-cast-8df.notion.site/Phase-III-AI-Driven-R-D-Full-Chain-Enablement-1cd3c5e9d28b80d6adb6cd394bd7ea30"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 flex items-center postemphasized font-medium"
                    >
                      {`${t.checkOut}`}
                      <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
                    </a>
                  </div>
                </section>

                <section id="I18N设计策略及一键翻译" className="py-16 border-t border-gray-100">
                  <div className="flex items-center gap-3 mb-4 project-header">
                    <div className="project-header-content z-[50] flex flex-wrap items-start gap-3 w-full">
                      <div className={`w-8 h-8 rounded-full ${projectDetails['I18N设计策略及一键翻译'].color} flex items-center justify-center text-lg flex-shrink-0`}>
                        {projectDetails['I18N设计策略及一键翻译'].icon}
                      </div>
                      {language === 'en' ? (
                        <div className="flex flex-col gap-2 flex-1 min-w-0">
                          <h2 className="text-lg font-medium">{t.bento.name}</h2>
                          <span className="text-sm text-gray-500 rounded-full bg-[rgba(10,206,172,0.1)] px-3 py-1 inline-block w-fit">{t.bento.tag}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <h2 className="text-lg font-medium">{t.bento.name}</h2>
                            <span className="text-sm text-gray-500 rounded-full bg-[rgba(10,206,172,0.1)] px-3 py-1 w-fit">{t.bento.tag}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex mb-6 project-date">
                    <span className="text-sm text-gray-400">2022.9.31 - 2023.3.31</span>
                  </div>

                  <div className="prose max-w-none mb-8 space-y-4">
                    <p className="text-base leading-relaxed tracking-normal">{t.bento.description1}</p>
                    <p className="text-base leading-relaxed tracking-normal">{t.bento.description2}</p>
                    <p className="text-base leading-relaxed tracking-normal">{t.bento.description3}</p>
                  </div>

                  <div className="relative w-full mb-8">
                    <div className="rounded-xl overflow-hidden bg-gray-100 lg:max-w-[813px] lg:-mx-[147.5px]">
                      <div className="w-full aspect-video relative">
                        <Image 
                          src={getImagePath("/物流行业语料库.gif")}
                          alt="I18N Translation Demo"
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 813px"
                          quality={75}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a 
                      href={language === 'zh' 
                        ? "https://rainbow-cast-8df.notion.site/I18N-Ai-1cd3c5e9d28b80808d7acffcc6b5ffa0"
                        : "https://rainbow-cast-8df.notion.site/Phase-II-I18N-Internationalization-Design-Strategy-and-One-Click-Translation-1cd3c5e9d28b8012a773cf1f9e830d24"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 flex items-center postemphasized font-medium"
                    >
                      {`${t.checkOut}`}
                      <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
                    </a>
                  </div>
                </section>

                <section id="AI智能设计系统" className="py-16 border-t border-gray-100">
                  <div className="flex items-center gap-3 mb-4 project-header">
                    <div className="project-header-content z-[50] flex flex-wrap items-start gap-3 w-full">
                      <div className={`w-8 h-8 rounded-full ${projectDetails['AI智能设计系统'].color} flex items-center justify-center text-lg flex-shrink-0`}>
                        {projectDetails['AI智能设计系统'].icon}
                      </div>
                      {language === 'en' ? (
                        <div className="flex flex-col gap-2 flex-1 min-w-0">
                          <h2 className="text-lg font-medium">{t.aiDesign.name}</h2>
                          <span className="text-sm text-gray-500 rounded-full bg-[rgba(10,206,172,0.1)] px-3 py-1 inline-block w-fit">{t.aiDesign.tag}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <h2 className="text-lg font-medium">{t.aiDesign.name}</h2>
                            <span className="text-sm text-gray-500 rounded-full bg-[rgba(10,206,172,0.1)] px-3 py-1 w-fit">{t.aiDesign.tag}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex mb-6 project-date">
                    <span className="text-sm text-gray-400">2022.3.7 - 2025.3.31</span>
                  </div>

                  <div className="prose max-w-none mb-8 space-y-4">
                    <p className="text-base leading-relaxed tracking-normal">{t.aiDesign.description1}</p>
                    <p className="text-base leading-relaxed tracking-normal">{t.aiDesign.description2}</p>
                    <p className="text-base leading-relaxed tracking-normal">{t.aiDesign.description3}</p>
                  </div>

                  <div className="relative w-full mb-8">
                    <div className="rounded-xl overflow-hidden bg-gray-100 lg:max-w-[813px] lg:-mx-[147.5px]">
                      <div className="w-full aspect-video relative">
                        <Image 
                          src={getImagePath("/设计系统架构（修复版）.gif")}
                          alt="Design System Architecture Demo"
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 813px"
                          quality={75}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative w-full mb-8">
                    <div className="rounded-xl overflow-hidden lg:max-w-[813px] lg:-mx-[147.5px]">
                      <div className="w-full relative">
                        <Image 
                          src={getImagePath("/dsm.svg")}
                          alt="Clear 3D Structure Demo"
                          width={813}
                          height={500}
                          className="w-full h-auto"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 813px"
                          quality={75}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a 
                      href={language === 'zh' 
                        ? "https://rainbow-cast-8df.notion.site/1ac3c5e9d28b802db381cc6fea71d02e?pvs=4"
                        : "https://rainbow-cast-8df.notion.site/Phase-I-Defining-a-Design-System-for-the-Logistics-Industry-1cd3c5e9d28b809784c2daa2a0ef75a8?pvs=4"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 flex items-center postemphasized font-medium"
                    >
                      {`${t.checkOut}`}
                      <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
                    </a>
                  </div>
                </section>

                <footer className="py-8 text-center text-xs text-gray-400">{t.copyright}</footer>
              </AnimatedContent>
            </div>
          </main>
        </div>
      )}
    </>
  )
}

