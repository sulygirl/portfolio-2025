import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

interface PasscodeScreenProps {
  onCorrectPasscode: () => void;
}

export function PasscodeScreen({ onCorrectPasscode }: PasscodeScreenProps) {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === '1234') {
      onCorrectPasscode()
      // Store in localStorage so the user doesn't need to enter it again
      localStorage.setItem('websitePasscodeEntered', 'true')
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-white z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="max-w-md w-full px-6">
          <h1 className="text-2xl font-normal text-gray-700 mb-8 text-center">
            Welcome
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className={`w-full text-center text-lg ${error ? 'border-red-500' : ''}`}
              autoFocus
            />
            <Button 
              type="submit"
              className="w-full bg-black hover:bg-black/90 text-white"
            >
              Enter
            </Button>
            <AnimatePresence>
              {error && (
                <motion.p 
                  className="text-red-500 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Incorrect passcode
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 