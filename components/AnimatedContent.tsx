"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ReactNode } from "react"
import { useLanguage } from '../context/LanguageContext'; // adjust path as needed

interface AnimatedContentProps {
  children: ReactNode
  contentKey: string
}

export default function AnimatedContent({ children, contentKey }: AnimatedContentProps) {
  const { language } = useLanguage(); // or however you access the current language

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={contentKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
      <div className="label-right-edge">
        {language === 'en'
          ? 'ego kills design, ego kills learning'
          : '自负扼杀设计，自负扼杀学习'}
      </div>
    </AnimatePresence>
  )
} 