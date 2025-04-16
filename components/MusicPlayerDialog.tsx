import { Dialog } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { getImagePath } from "@/lib/utils"

interface MusicPlayerDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

const transition = {
  duration: 0.3,
  ease: [0.32, 0.72, 0, 1]
}

export function MusicPlayerDialog({
  isOpen,
  onClose,
  title
}: MusicPlayerDialogProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isExpanded, setIsExpanded] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={transition}
          className="fixed bottom-8 right-8 z-50"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <motion.div 
            className="backdrop-blur-[10%] bg-[rgba(255,255,255,0.58)] rounded-lg shadow-lg text-zinc-800 overflow-hidden"
            layout
            animate={{
              width: isExpanded ? 500 : 300,
            }}
            transition={transition}
          >
            <motion.div className="p-4" layout>
              <motion.div className="flex items-center w-full gap-4" layout>
                {/* Left Section: Album Art and Title - Always visible */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img 
                    src={getImagePath("/music-cover.png")}
                    alt="Album Art" 
                    className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-medium text-zinc-800 whitespace-nowrap truncate">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-500 whitespace-nowrap truncate">
                      sierrasun
                    </p>
                  </div>
                </div>

                {/* Collapsed Controls - Only show when not expanded */}
                {!isExpanded && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="text-gray-500 hover:text-zinc-800 transition-colors"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button 
                      onClick={handleClose}
                      className="text-gray-500 hover:text-zinc-800 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}

                {/* Expanded Controls - Only show when expanded */}
                {isExpanded && (
                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={togglePlay}
                      className="w-10 h-10 rounded-full bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors"
                      layout
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                    </motion.button>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <span className="text-sm text-gray-500">{formatTime(currentTime)}</span>
                        <span className="text-sm text-gray-500">/</span>
                        <span className="text-sm text-gray-500">{formatTime(duration)}</span>
                      </div>
                      <button 
                        onClick={handleClose}
                        className="text-gray-500 hover:text-zinc-800 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Progress Bar - Only show when expanded */}
              {isExpanded && (
                <motion.div 
                  className="mt-2"
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                >
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-zinc-800"
                  />
                </motion.div>
              )}

              {/* Hidden Audio Element */}
              <audio 
                ref={audioRef}
                src={getImagePath("/music/三十未满指南.mp3")}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="hidden"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 