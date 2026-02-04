'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from './Button'
import Image from 'next/image'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ]

  // Check if link is active
  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-navy/95 backdrop-blur-lg shadow-2xl shadow-holiday-gold/10 py-3'
          : 'bg-dark-navy/90 backdrop-blur-md py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 relative">
              <Image
                src="/images/mainlogo.png"
                alt="Luminous Holiday Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 80px, 96px"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 group ${
                  isActive(item.path)
                    ? 'text-holiday-gold'
                    : 'text-warm-white hover:text-holiday-gold'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive(item.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-holiday-red/10 to-holiday-gold/10 rounded-full border border-holiday-gold/30"></div>
                )}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-holiday-red/0 via-holiday-gold/0 to-holiday-green/0 group-hover:from-holiday-red/5 group-hover:via-holiday-gold/5 group-hover:to-holiday-green/5 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              </Link>
            ))}

            <div className="w-px h-6 bg-gradient-to-b from-transparent via-holiday-gold/50 to-transparent mx-2"></div>

            <Button 
              href="/contact"
              variant="primary"
              className="relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Free Quote
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-holiday-red via-holiday-gold to-holiday-green opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center group"       
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${isOpen ? '-rotate-45 -translate-y-2' : 'translate-y-1'}`}></div>

            <div className="absolute inset-0 rounded-full bg-holiday-gold/0 group-hover:bg-holiday-gold/10 transition-colors duration-300"></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-4 pb-6 border-t border-holiday-gold/20">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`relative px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group ${
                    isActive(item.path)
                      ? 'text-holiday-gold bg-gradient-to-r from-holiday-red/5 to-holiday-gold/5 border border-holiday-gold/20'
                      : 'text-warm-white hover:text-holiday-gold hover:bg-dark-navy/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {isActive(item.path) && (
                      <div className="w-2 h-2 rounded-full bg-holiday-gold animate-pulse"></div>
                    )}
                  </div>
                </Link>
              ))}

              <div className="pt-4 mt-2 border-t border-holiday-gold/20">
                <Button
                  href="/contact"
                  variant="primary"
                  className="w-full justify-center py-3 text-base"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">        
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get Free Quote
                  </span>
                </Button>

                <div className="mt-4 pt-4 border-t border-holiday-gold/10">
                  <div className="flex flex-col space-y-2 text-sm">
                    <a href="tel:+15551234567" className="flex items-center gap-2 text-warm-white/80 hover:text-holiday-gold transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">      
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      (555) 123-4567
                    </a>
                    <a href="mailto:info@luminousholiday.com" className="flex items-center gap-2 text-warm-white/80 hover:text-holiday-gold transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">      
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      info@luminousholiday.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-holiday-gold/50 to-transparent"></div>
    </nav>
  )
}

export default Navbar