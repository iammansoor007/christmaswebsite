'use client'

import { useEffect, useState } from 'react'

// Pre-defined positions to avoid hydration errors
const STAR_POSITIONS = [
  { top: 10, left: 20, duration: 2.1, delay: 0.3 },
  { top: 30, left: 85, duration: 2.8, delay: 0.8 },
  { top: 50, left: 45, duration: 1.9, delay: 1.2 },
  { top: 70, left: 15, duration: 2.5, delay: 0.5 },
  { top: 25, left: 65, duration: 2.2, delay: 1.5 },
  { top: 85, left: 35, duration: 1.7, delay: 0.9 },
  { top: 40, left: 90, duration: 2.9, delay: 0.2 },
  { top: 60, left: 10, duration: 2.4, delay: 1.1 },
  { top: 15, left: 55, duration: 2.6, delay: 0.7 },
  { top: 75, left: 75, duration: 2.0, delay: 1.3 },
  { top: 35, left: 30, duration: 2.3, delay: 0.4 },
  { top: 90, left: 60, duration: 2.7, delay: 1.0 },
]

export default function ProfessionalLoader() {
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const increment = prev > 90 ? 0.2 : prev > 70 ? 0.5 : 1
        return prev + increment
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  // Don't render during SSR to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#0d2b4b] to-[#0a192f]">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-[#2a4365]/50 animate-spin-slow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-[#38b2ac]" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 3L4 21h16L12 3zm0 4l2.5 6h-5L12 7zm0 6l2.5 6h-5L12 13z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-light text-white tracking-wider mt-6 mb-2">
            CHRISTMAS
            <span className="font-bold text-[#38b2ac] ml-2">LIGHTING</span>
          </h1>
          <p className="text-[#a0aec0] text-sm tracking-wider font-light">
            Professional Holiday Illumination
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#0d2b4b] to-[#0a192f]">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#38b2ac]/10 to-transparent animate-shimmer"></div>
        
        {/* Static stars */}
        {STAR_POSITIONS.map((star, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-[#38b2ac] rounded-full"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animation: `twinkle ${star.duration}s infinite`,
              animationDelay: `${star.delay}s`,
              opacity: 0.7
            }}
          />
        ))}
      </div>

      {/* Main loader container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Elegant circular loader */}
        <div className="relative mb-8">
          {/* Outer ring */}
          <div className="w-24 h-24 rounded-full border-2 border-[#2a4365]/50 relative">
            {/* Animated light dots */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#f56565] to-[#38b2ac] shadow-lg shadow-[#38b2ac]/40"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 45}deg) translate(44px) rotate(-${i * 45}deg)`,
                  animation: `lightOrbit 2s linear infinite`,
                  animationDelay: `${i * 0.25}s`
                }}
              />
            ))}
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <svg 
                  className="w-12 h-12 text-[#38b2ac] animate-pulse-slow" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3L4 21h16L12 3zm0 4l2.5 6h-5L12 7zm0 6l2.5 6h-5L12 13z"/>
                </svg>
                <div className="absolute inset-0 bg-[#38b2ac]/30 blur-md rounded-full -z-10"></div>
              </div>
            </div>
          </div>

          {/* Progress ring with brand colors */}
          <svg className="absolute inset-0 w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="46"
              stroke="url(#brandGradient)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="289"
              strokeDashoffset={289 - (progress / 100) * 289}
              className="transition-all duration-300 ease-out"
            />
            <defs>
              <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#03132a" /> {/* Dark Navy */}
                <stop offset="25%" stopColor="#f5ff3f" /> {/* Beach/Teal */}
                <stop offset="50%" stopColor="#007d34" /> {/* Holiday Green */}
                <stop offset="75%" stopColor="#940000" /> {/* Holiday Red */}
                <stop offset="100%" stopColor="#02132b" /> {/* Dark Navy */}
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Company branding */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-light text-white tracking-wider mb-2">
            CHRISTMAS
            <span className="font-bold text-[#38b2ac] ml-2">LIGHTING</span>
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#f56565]"></div>
            <div className="w-2 h-2 rounded-full bg-[#48bb78]"></div>
            <div className="w-2 h-2 rounded-full bg-[#38b2ac]"></div>
            <p className="text-[#a0aec0] text-sm tracking-wider font-light ml-2">
              Professional Illumination Services
            </p>
          </div>
        </div>

        {/* Progress bar with brand gradient */}
        <div className="w-48">
          <div className="h-1.5 bg-[#2a4365] rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-[#0a192f] via-[#38b2ac] via-40% to-[#f56565] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#38b2ac] font-medium">Loading</span>
            <span className="font-mono text-white bg-[#2a4365] px-2 py-1 rounded">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Status messages */}
        <div className="mt-6 h-6">
          <p className="text-[#a0aec0] text-sm tracking-wide animate-fade-in-out">
            {progress < 30 && "Initializing festive illumination..."}
            {progress >= 30 && progress < 70 && "Programming light sequences..."}
            {progress >= 70 && progress < 90 && "Finalizing visual display..."}
            {progress >= 90 && "Preparing holiday magic..."}
          </p>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <p className="text-[#2a4365] text-sm tracking-wider font-medium">
            Illuminating Holidays Since 2024
          </p>
        </div>
      </div>
    </div>
  )
}