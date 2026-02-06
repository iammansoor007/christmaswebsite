'use client'

import { useState, useEffect, useRef } from 'react'
import Home from './components/Home'
import ProfessionalLoader from './components/Loader'
import SmoothScroll from './components/SmoothScroll'
import dynamic from 'next/dynamic'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showLoader, setShowLoader] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const homeRef = useRef(null)

  useEffect(() => {
    setIsClient(true)
    
    // Function to handle loading completion
    const handleLoad = () => {
      const minimumLoadTime = 1500 // 1.5 seconds minimum for branding
      const startTime = Date.now()
      
      const finishLoading = () => {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, minimumLoadTime - elapsed)
        
        setTimeout(() => {
          setIsLoading(false)
          // Wait for fade out animation
          setTimeout(() => setShowLoader(false), 300)
        }, remaining)
      }

      // Check if page is already loaded
      if (document.readyState === 'complete') {
        finishLoading()
      } else {
        finishLoading()
        window.addEventListener('load', finishLoading)
        return () => window.removeEventListener('load', finishLoading)
      }
    }

    handleLoad()
  }, [])

  // Optimize: Only render Home component once
  useEffect(() => {
    if (!isLoading && homeRef.current) {
      // Initialize animations after load
      initializeAnimations()
    }
  }, [isLoading])

  const initializeAnimations = () => {
    // Lazy load animations
    if (typeof window !== 'undefined') {
      import('lenis').then(({ default: Lenis }) => {
        // Already initialized by SmoothScroll component
      })
    }
  }

  if (!isClient) {
    return <ProfessionalLoader />
  }

  return (
    <SmoothScroll>
      {showLoader && <ProfessionalLoader />}
      <div 
        ref={homeRef}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Home />
      </div>
    </SmoothScroll>
  )
}