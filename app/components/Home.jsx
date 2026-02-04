'use client'
import Hero from '../components/Hero'
import ServiceCard from '../components/ServiceCard'
import GalleryGrid from '../components/GalleryGrid'
import CTASection from '../components/CTASection'
import ChristmasLightingSection from '../components/servicesection'
import ChristmasLightingServices from '../components/ChristmasLightingServices'
import HowWeWorkSection from '../components/HowWeWorkSection'
import RecentWorkMarquee from '../components/RecentWorkMarquee'
import ChristmasLightingMap from '../components/ChristmasLightingMap'
import Testimonials from '../components/TestimonialCard'
import FAQSection from '../components/FAQSection'
import { useEffect, useState } from 'react'

const Home = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {/* Enhanced snowfall effect */}
      {isClient && (
        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10 overflow-hidden">
          {/* Small fast snowflakes */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={`small-${i}`}
              className="absolute top-[-10px] text-white/40"
              style={{
                left: `${(i * 2) % 100}%`,
                width: '3px',
                height: '3px',
                animation: `snowfall ${8 + (i % 5)}s linear ${i % 3}s infinite`,
              }}
            >
              <div className="w-full h-full bg-white rounded-full" />
            </div>
          ))}
          
          {/* Medium snowflakes */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`medium-${i}`}
              className="absolute top-[-20px] text-white/60"
              style={{
                left: `${(i * 3.3) % 100}%`,
                width: '6px',
                height: '6px',
                animation: `snowfall ${12 + (i % 8)}s linear ${i % 4}s infinite`,
              }}
            >
              <div className="w-full h-full bg-white rounded-full" />
            </div>
          ))}
          
          {/* Large slow snowflakes with slight sway */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`large-${i}`}
              className="absolute top-[-30px] text-white/80"
              style={{
                left: `${(i * 6.6) % 100}%`,
                width: '8px',
                height: '8px',
                animation: `snowfall ${20 + (i % 10)}s linear ${i % 6}s infinite`,
              }}
            >
              <div className="w-full h-full bg-white rounded-full" />
            </div>
          ))}
          
          {/* Few decorative snowflakes */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`decorative-${i}`}
              className="absolute top-[-40px] text-white/30"
              style={{
                left: `${10 + (i * 20)}%`,
                width: '12px',
                height: '12px',
                animation: `snowfall ${25 + (i % 5)}s linear ${i % 8}s infinite`,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full"
                fill="currentColor"
              >
                <path d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zm9-9a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm-18 0a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm13.07-5.071a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM7.05 17.364a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zm9.9 0a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707zM7.05 6.636a1 1 0 0 1 0-1.414l.707-.707a1 1 0 1 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0zm12.02 5.657a1 1 0 0 1 0 1.414l-2.828 2.828a1 1 0 0 1-1.414-1.414l2.828-2.828a1 1 0 0 1 1.414 0zm-8.486 8.486a1 1 0 0 1 0 1.414l-2.828 2.828a1 1 0 0 1-1.414-1.414l2.828-2.828a1 1 0 0 1 1.414 0zm0-16.97a1 1 0 0 1 1.414 0l2.828 2.828a1 1 0 0 1-1.414 1.414L8.485 5.171a1 1 0 0 1 0-1.414zm8.486 8.486a1 1 0 0 1 1.414 0l2.828 2.828a1 1 0 0 1-1.414 1.414l-2.828-2.828a1 1 0 0 1 0-1.414z" />
              </svg>
            </div>
          ))}
        </div>
      )}

      <Hero />
      <ChristmasLightingSection />
      <ChristmasLightingServices />
      <HowWeWorkSection />
      <RecentWorkMarquee />
      <ChristmasLightingMap />
      <Testimonials />
      <FAQSection />
      <CTASection />

      {/* Enhanced snowfall animation styles */}
      <style jsx global>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-20px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(${Math.random() > 0.5 ? '20px' : '-20px'});
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

export default Home