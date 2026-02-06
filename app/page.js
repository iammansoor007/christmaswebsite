'use client'

import { useState, useEffect } from 'react'
import Home from './components/Home'
import ProfessionalLoader from './components/Loader'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Simulate actual loading process
    const totalTime = 2500 // 2.5 seconds total
    
    // Wait for page to actually load
    const handleLoad = () => {
      // Minimum show time for branding effect
      setTimeout(() => {
        setIsLoading(false)
        // Wait for fade out animation
        setTimeout(() => setShowLoader(false), 500)
      }, totalTime)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => window.removeEventListener('load', handleLoad)
  }, [])

  if (!showLoader) {
    return <Home />
  }

  return (
    <>
      {showLoader && <ProfessionalLoader />}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Home />
      </div>
    </>
  )
}