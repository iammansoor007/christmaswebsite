// components/ChristmasLightingSection.jsx
'use client'
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getServicesData } from "../services/dataService";
import { FaCheckCircle, FaStar, FaShieldAlt, FaTools, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ChristmasLightingSection = () => {
  const boxRef = useRef(null);
  const isInView = useInView(boxRef, { once: true, margin: "-50px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const [isClient, setIsClient] = useState(false);

  // Get data from services
  const servicesData = getServicesData();
  
  // Use local images from public/images directory
  const images = [
    '/images/demo1.jpeg',
    '/images/demo2.jpeg', 
    '/images/demo3.jpeg'
  ];

  // Modern color palette
  const colors = {
    primary: {
      red: '#E63946',
      gold: '#F4A261',
      emerald: '#2A9D8F',
      navy: '#1D3557'
    },
    gradient: 'linear-gradient(135deg, #E63946 0%, #F4A261 50%, #2A9D8F 100%)',
    background: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)'
  };

  // Features data with icons - IMPROVED
  const features = [
    {
      title: "Warrantied Product & Service",
      description: "Full coverage on all materials and installation work",
      icon: FaShieldAlt,
      color: colors.primary.red,
      bgColor: 'linear-gradient(135deg, rgba(230, 57, 70, 0.08) 0%, rgba(244, 162, 97, 0.04) 100%)',
      borderColor: 'rgba(230, 57, 70, 0.2)'
    },
    {
      title: "48-Hour Maintenance",
      description: "Free maintenance within 48 hours of installation",
      icon: FaTools,
      color: colors.primary.gold,
      bgColor: 'linear-gradient(135deg, rgba(244, 162, 97, 0.08) 0%, rgba(42, 157, 143, 0.04) 100%)',
      borderColor: 'rgba(244, 162, 97, 0.2)'
    },
    {
      title: "Professional Installation",
      description: "Licensed, insured, certified technicians",
      icon: FaCheckCircle,
      color: colors.primary.emerald,
      bgColor: 'linear-gradient(135deg, rgba(42, 157, 143, 0.08) 0%, rgba(29, 53, 87, 0.04) 100%)',
      borderColor: 'rgba(42, 157, 143, 0.2)'
    }
  ];

  // Check screen size
  useEffect(() => {
    setIsClient(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 300) setScreenSize('xs-300');
      else if (width < 400) setScreenSize('xs');
      else if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else if (width < 1024) setScreenSize('lg');
      else setScreenSize('xl');
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-slide - optimized for mobile
  useEffect(() => {
    if (images.length === 0 || !isClient) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, screenSize === 'xs-300' ? 7000 : screenSize === 'xs' ? 6000 : 5000);
    
    return () => clearInterval(interval);
  }, [images.length, isClient, screenSize]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 15) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    setTouchStart(null);
  };

  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  // Responsive typography classes
  const getHeadingSize = () => {
    if (screenSize === 'xs-300') return {
      main: "text-2xl",
      expert: "text-lg",
      body: "text-xs",
      button: "text-xs"
    };
    if (screenSize === 'xs') return {
      main: "text-3xl",
      expert: "text-xl",
      body: "text-sm",
      button: "text-sm"
    };
    if (screenSize === 'sm') return {
      main: "text-4xl",
      expert: "text-2xl",
      body: "text-base",
      button: "text-base"
    };
    if (screenSize === 'md') return {
      main: "text-5xl",
      expert: "text-3xl",
      body: "text-lg",
      button: "text-base"
    };
    return {
      main: "text-6xl",
      expert: "text-4xl",
      body: "text-lg",
      button: "text-base"
    };
  };

  const headingSizes = getHeadingSize();

  return (
    <section className="relative w-full min-w-[280px] overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Container with responsive padding */}
      <div className={`px-2.5 xs-300:px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 xs-300:py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24`}>
        
        {/* Modern background elements - scaled for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Geometric pattern - lighter on mobile */}
          <div className="absolute inset-0 opacity-[0.005] xs-300:opacity-[0.01] xs:opacity-[0.02] sm:opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231D3557' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: screenSize === 'xs-300' ? '100px 100px' : '80px 80px'
            }} />
          </div>
          
          {/* Gradient orbs - scaled for mobile */}
          <div className="absolute top-0 left-0 w-24 h-24 xs-300:w-32 xs-300:h-32 xs:w-48 xs:h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-red-500/5 via-transparent to-transparent rounded-full blur-xl xs-300:blur-xl xs:blur-2xl sm:blur-3xl -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-24 h-24 xs-300:w-32 xs-300:h-32 xs:w-48 xs:h-48 sm:w-64 sm:h-64 bg-gradient-to-tl from-emerald-500/5 via-transparent to-transparent rounded-full blur-xl xs-300:blur-xl xs:blur-2xl sm:blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* REVERSED LAYOUT: Text first on mobile/tablet, image left on desktop */}
          <div className="flex flex-col lg:flex-row gap-4 xs-300:gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center lg:items-start">
            
            {/* TEXT COLUMN - First on mobile/tablet, Right on desktop */}
            <div className="w-full lg:w-1/2 text-center lg:text-left lg:order-2">
              <div className="pt-2 xs-300:pt-4 xs:pt-6 lg:pt-0">
                
                {/* Badge - Centered on mobile, left on desktop */}
                <div className={`inline-flex items-center gap-1 xs-300:gap-1.5 xs:gap-2 px-2.5 xs-300:px-3 xs:px-4 py-1 xs-300:py-1.5 xs:py-2 rounded-full 
                  bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-emerald-500/10 backdrop-blur-sm 
                  border border-amber-500/20 mb-4 xs-300:mb-6 xs:mb-6 sm:mb-8 max-w-full`}>
                  <div className={`${screenSize === 'xs-300' ? 'w-1 h-1' : 'w-1.5 h-1.5'} rounded-full bg-gradient-to-r from-rose-500 to-amber-500 animate-pulse`} />
                  <span className={`${screenSize === 'xs-300' ? 'text-[10px]' : headingSizes.body} font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis`}>
                    {servicesData.badge || "Premium Service"}
                  </span>
                </div>

                {/* Heading */}
                <div className="mb-6 xs-300:mb-8 xs:mb-8 sm:mb-10">
                  <h1 className={`font-bold text-slate-900 tracking-tight mb-3 xs-300:mb-4`}>
                    {/* Expert */}
                    <span className={`block ${headingSizes.expert} font-semibold text-slate-700 mb-1 xs-300:mb-2`}>
                      Expert
                    </span>
                    
                    {/* Holiday Lighting - Main gradient text */}
                    <span className="block leading-tight">
                      <span className="relative">
                        <span className={`relative z-10 bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent ${headingSizes.main}`}>
                          Holiday Lighting
                        </span>
                        {/* Modern underline */}
                        <svg className={`absolute ${screenSize === 'xs-300' ? '-bottom-1' : '-bottom-1.5'} left-0 w-full ${screenSize === 'xs-300' ? 'h-1' : 'h-1.5'}`} viewBox="0 0 100 4">
                          <path d="M0,2 Q25,0 50,2 T100,2" stroke="url(#underline-gradient)" strokeWidth={screenSize === 'xs-300' ? "1" : "1.5"} fill="none" />
                          <defs>
                            <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#E63946" />
                              <stop offset="50%" stopColor="#F4A261" />
                              <stop offset="100%" stopColor="#2A9D8F" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                    </span>
                  </h1>
                  
                  {/* Description */}
                  <p className={`${headingSizes.body} text-slate-600 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0`}>
                    Transform your home into a captivating holiday showcase with our expert lighting installation.
                    Professional service, premium quality, and unforgettable designs.
                  </p>
                </div>

                {/* Features Grid - IMPROVED STYLING */}
                <div className="mb-8 xs-300:mb-10 xs:mb-10 sm:mb-12">
                  <h3 className={`${screenSize === 'xs-300' ? 'text-base' : 'text-lg'} font-semibold text-slate-900 mb-4 xs-300:mb-6 text-center lg:text-left`}>
                    Why Choose Us
                  </h3>
                  <div className="grid gap-3 xs-300:gap-4 xs:gap-5 max-w-lg mx-auto lg:mx-0">
                    {features.map((feature, idx) => {
                      const IconComponent = feature.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: idx * 0.1,
                            duration: 0.4,
                            ease: "easeOut"
                          }}
                          whileHover={{ 
                            scale: screenSize.includes('xs') ? 1.01 : 1.02,
                            translateY: -2
                          }}
                          className="group relative overflow-hidden rounded-xl xs:rounded-2xl transition-all duration-300"
                        >
                          {/* Background with gradient */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl xs:rounded-2xl"
                            style={{ background: feature.bgColor }}
                          />
                          
                          {/* Card Content */}
                          <div 
                            className="relative p-4 xs-300:p-4 xs:p-5 rounded-xl xs:rounded-2xl transition-all duration-300 border group-hover:shadow-lg"
                            style={{
                              background: 'rgba(255, 255, 255, 0.9)',
                              backdropFilter: 'blur(10px)',
                              borderColor: feature.borderColor,
                              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
                            }}
                          >
                            <div className="flex items-start gap-3 xs-300:gap-4 xs:gap-5">
                              {/* Icon Container */}
                              <div className="relative flex-shrink-0">
                                <div className="relative z-10 p-2 xs-300:p-2.5 xs:p-3 rounded-lg xs:rounded-xl transition-all duration-300 group-hover:scale-110"
                                  style={{
                                    background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}08)`,
                                    border: `1px solid ${feature.color}30`,
                                    boxShadow: `0 4px 12px ${feature.color}15`
                                  }}>
                                  <IconComponent 
                                    className={`${screenSize === 'xs-300' ? 'w-4 h-4' : 'w-5 h-5'} xs:w-6 xs:h-6 transition-transform duration-300 group-hover:scale-110`} 
                                    style={{ color: feature.color }} 
                                  />
                                </div>
                                {/* Decorative element */}
                                <div className="absolute -inset-1 bg-gradient-to-br from-transparent via-transparent to-transparent rounded-lg xs:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  style={{
                                    background: `radial-gradient(circle at center, ${feature.color}10 0%, transparent 70%)`
                                  }}
                                />
                              </div>
                              
                              {/* Text Content */}
                              <div className="flex-1 min-w-0 text-left">
                                <h4 className={`${screenSize === 'xs-300' ? 'text-sm' : 'text-base'} xs:text-lg font-bold mb-1 xs-300:mb-1.5 xs:mb-2 text-slate-900 line-clamp-1 xs:line-clamp-2 group-hover:text-slate-950 transition-colors duration-200`}>
                                  {feature.title}
                                </h4>
                                <p className={`${screenSize === 'xs-300' ? 'text-xs' : 'text-sm'} xs:text-base text-slate-600 leading-relaxed line-clamp-2 xs:line-clamp-3 group-hover:text-slate-700 transition-colors duration-200`}>
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                            
                            {/* Hover indicator line */}
                            <div className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500 ease-out"
                              style={{ background: feature.color }} 
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA Section - IMPROVED BUTTON STYLING */}
                <div className="space-y-4 xs-300:space-y-6">
                  <div className="flex  xs-300:flex-row gap-2.5 xs-300:gap-3 xs:gap-4 justify-center lg:justify-start items-center">
                    {/* Primary CTA Button - Fixed dimensions and improved styling */}
                    <button className={`group relative font-bold rounded-lg xs:rounded-xl transition-all duration-300 overflow-hidden shadow-md xs:shadow-lg hover:shadow-xl 
                      ${screenSize === 'xs-300' ? 'px-5 py-2.5 text-xs w-[140px] h-[36px]' : ''}
                      ${screenSize === 'xs' ? 'px-6 py-3 text-sm w-[160px] h-[40px]' : ''}
                      ${screenSize === 'sm' ? 'px-7 py-3 text-base w-[180px] h-[44px]' : ''}
                      ${screenSize === 'md' ? 'px-8 py-3 text-base w-[200px] h-[48px]' : ''}
                      ${screenSize === 'lg' || screenSize === 'xl' ? 'px-8 py-3.5 text-base w-[210px] h-[52px]' : ''}
                      flex items-center justify-center`}
                      style={{ 
                        background: colors.gradient,
                        boxShadow: '0 4px 20px rgba(230, 57, 70, 0.25), 0 2px 4px rgba(230, 57, 70, 0.1)'
                      }}>
                      <span className="relative z-10 flex items-center justify-center gap-1.5 xs-300:gap-2 xs:gap-3 text-white font-semibold">
                        <span>Get Quote</span>
                        <svg className={`${screenSize === 'xs-300' ? 'w-3 h-3' : 'w-4 h-4'} xs:w-5 xs:h-5 group-hover:translate-x-0.5 xs-300:group-hover:translate-x-1 xs:group-hover:translate-x-1.5 transition-transform duration-300`} 
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                    </button>
                    
                    {/* Secondary Button */}
                    <button className={`group font-semibold rounded-lg xs:rounded-xl transition-all duration-300 hover:shadow-md flex items-center justify-center gap-1.5 xs-300:gap-2 xs:gap-3 bg-white border-2 border-amber-500/30 hover:border-amber-500/50
                      ${screenSize === 'xs-300' ? 'px-5 py-2.5 text-xs w-[140px] h-[36px]' : ''}
                      ${screenSize === 'xs' ? 'px-6 py-3 text-sm w-[160px] h-[40px]' : ''}
                      ${screenSize === 'sm' ? 'px-7 py-3 text-base w-[180px] h-[44px]' : ''}
                      ${screenSize === 'md' ? 'px-8 py-3 text-base w-[200px] h-[48px]' : ''}
                      ${screenSize === 'lg' || screenSize === 'xl' ? 'px-8 py-3.5 text-base w-[210px] h-[52px]' : ''}
                      hover:bg-gradient-to-r hover:from-amber-50/50 hover:via-white hover:to-amber-50/50`}>
                      <span className="text-slate-700">View Gallery</span>
                      <svg className={`${screenSize === 'xs-300' ? 'w-3 h-3' : 'w-4 h-4'} xs:w-5 xs:h-5 text-amber-600 group-hover:rotate-90 transition-transform duration-300`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      </svg>
                    </button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="pt-4 xs-300:pt-6 border-t border-slate-200">
                    <div className="flex flex-col xs-300:flex-row items-center gap-3 xs-300:gap-4 xs:gap-6 justify-center lg:justify-start">
                      <div className="flex -space-x-2.5 xs-300:-space-x-3 xs:-space-x-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className={`${screenSize === 'xs-300' ? 'w-6 h-6' : 'w-8 h-8'} xs:w-9 xs:w-10 xs:h-9 xs:h-10 rounded-full border-2 border-white flex items-center justify-center shadow-md xs:shadow-lg`}
                               style={{ background: colors.gradient }}>
                            <div className={`${screenSize === 'xs-300' ? 'w-4 h-4' : 'w-6 h-6'} xs:w-7 xs:w-8 xs:h-7 xs:h-8 rounded-full bg-white flex items-center justify-center`}>
                              <svg className={`${screenSize === 'xs-300' ? 'w-2 h-2' : 'w-3 h-3'} xs:w-3 xs:w-4 xs:h-3 xs:h-4`} style={{ background: colors.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center xs-300:text-left">
                        <p className={`${screenSize === 'xs-300' ? 'text-xs' : 'text-sm'} xs:text-base font-semibold text-slate-900 mb-0.5 xs-300:mb-1`}>
                          Trusted by <span className="text-amber-600">500+</span> Homes
                        </p>
                        <div className="flex items-center justify-center xs-300:justify-start gap-0.5 xs-300:gap-1 xs:gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={`${screenSize === 'xs-300' ? 'w-2.5 h-2.5' : 'w-3 h-3'} xs:w-3 xs:w-4 xs:h-3 xs:h-4 text-amber-500 fill-current`} />
                          ))}
                          <span className={`${screenSize === 'xs-300' ? 'text-[10px]' : 'text-xs'} xs:text-sm text-slate-600 ml-1 xs-300:ml-1.5 xs:ml-2`}>
                            4.9/5 (248 reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* IMAGE COLUMN - Second on mobile/tablet, Left on desktop */}
            <div className="w-full lg:w-1/2 lg:order-1">
              <div className="relative">
                {/* Modern image slider container */}
                <div className="relative overflow-hidden rounded-lg xs-300:rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-lg xs:shadow-xl sm:shadow-2xl border border-white/10 bg-gradient-to-br from-white to-slate-50">
                  <div
                    className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    {images.map((src, idx) => (
                      <div key={idx} className="w-full flex-shrink-0 relative group">
                        <div className="relative pb-[66.666%] xs-300:pb-[66.666%]">
                          <img
                            src={src}
                            alt={`Professional holiday lighting ${idx + 1}`}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                            loading="lazy"
                            sizes="(max-width: 300px) 280px, (max-width: 400px) 100vw, (max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            srcSet={`
                              ${src}?auto=format&fit=crop&w=280&q=80 280w,
                              ${src}?auto=format&fit=crop&w=400&q=80 400w,
                              ${src}?auto=format&fit=crop&w=600&q=80 600w,
                              ${src}?auto=format&fit=crop&w=800&q=80 800w
                            `}
                          />
                          {/* Modern overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Dots */}
                  {images.length > 0 && (
                    <div className={`absolute bottom-2 xs-300:bottom-3 xs:bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 xs-300:gap-2 xs:gap-3 
                      ${screenSize.includes('xs') ? 'bg-white/95 px-2.5 xs-300:px-3 xs:px-4 py-1.5 xs-300:py-2 xs:py-2.5 rounded-full shadow-md' : 'bg-white/90 backdrop-blur-lg px-4 py-2.5 rounded-full shadow-lg'}`}>
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className="relative group"
                          aria-label={`View image ${idx + 1}`}
                        >
                          <div className={`${screenSize === 'xs-300' ? 'w-1.5 h-1.5' : 'w-2 h-2'} xs:w-2.5 xs:h-2.5 rounded-full transition-all duration-300 ${
                            idx === currentIndex 
                              ? "scale-125" 
                              : "bg-slate-300 group-hover:bg-slate-400"
                          }`}
                          style={{
                            background: idx === currentIndex ? colors.gradient : undefined
                          }}>
                            {idx === currentIndex && (
                              <motion.div
                                layoutId="activeDot"
                                className="absolute inset-0 rounded-full"
                                style={{ background: colors.gradient }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className={`absolute top-1/2 -translate-y-1/2 left-1.5 xs-300:left-2 xs:left-3 sm:left-4 right-1.5 xs-300:right-2 xs:right-3 sm:right-4 flex justify-between pointer-events-none`}>
                    <button
                      onClick={goPrev}
                      className={`pointer-events-auto ${screenSize === 'xs-300' ? 'p-1.5' : 'p-2'} xs:p-2.5 bg-white/90 backdrop-blur-md xs:backdrop-blur-lg rounded-lg xs:rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 group border border-white/20`}
                      aria-label="Previous image"
                    >
                      <FaChevronLeft className={`${screenSize === 'xs-300' ? 'w-3 h-3' : 'w-4 h-4'} xs:w-4 xs:w-5 xs:h-4 xs:h-5 text-slate-700 group-hover:text-rose-600 transition-colors`} />
                    </button>
                    <button
                      onClick={goNext}
                      className={`pointer-events-auto ${screenSize === 'xs-300' ? 'p-1.5' : 'p-2'} xs:p-2.5 bg-white/90 backdrop-blur-md xs:backdrop-blur-lg rounded-lg xs:rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 group border border-white/20`}
                      aria-label="Next image"
                    >
                      <FaChevronRight className={`${screenSize === 'xs-300' ? 'w-3 h-3' : 'w-4 h-4'} xs:w-4 xs:w-5 xs:h-4 xs:h-5 text-slate-700 group-hover:text-emerald-600 transition-colors`} />
                    </button>
                  </div>

                  {/* Image Counter */}
                  {!screenSize.includes('xs') && (
                    <div className="absolute top-3 xs:top-4 sm:top-6 right-3 xs:right-4 sm:right-6 bg-white/90 backdrop-blur-lg rounded-full px-2.5 xs:px-3 py-1 xs:py-1.5 shadow-lg border border-white/20">
                      <span className="text-xs xs:text-sm font-semibold bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                        {currentIndex + 1} / {images.length}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info Card */}
                <motion.div
                  ref={boxRef}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2
                  }}
                  className={`mt-3 xs-300:mt-4 xs:mt-6 bg-gradient-to-br from-white to-slate-50/90 backdrop-blur-xl rounded-lg xs-300:rounded-xl xs:rounded-2xl shadow-lg xs:shadow-xl p-3 xs-300:p-4 xs:p-6 border border-white/20`}
                >
                  <div className="flex items-start gap-2.5 xs-300:gap-3 xs:gap-4">
                    <div className={`flex-shrink-0 ${screenSize === 'xs-300' ? 'p-1.5' : 'p-2'} xs:p-3 rounded-lg xs:rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20`}>
                      <FaCheckCircle className={`${screenSize === 'xs-300' ? 'w-3 h-3' : 'w-4 h-4'} xs:w-5 xs:w-6 xs:h-5 xs:h-6 text-emerald-600`} />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <h4 className={`${screenSize === 'xs-300' ? 'text-sm' : 'text-base'} xs:text-lg font-bold mb-0.5 xs-300:mb-1 xs:mb-2 text-slate-900 line-clamp-2`}>
                        Premium Maintenance Guarantee
                      </h4>
                      <p className={`${screenSize === 'xs-300' ? 'text-[10px]' : 'text-xs'} xs:text-sm xs:text-base text-slate-600 leading-relaxed line-clamp-3`}>
                        48-hour response for maintenance. Your display stays perfect all season.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-20 h-20 xs-300:w-24 xs-300:h-24 xs:w-32 xs:h-32 bg-gradient-to-br from-rose-500/5 to-transparent rounded-full -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-20 h-20 xs-300:w-24 xs-300:h-24 xs:w-32 xs:h-32 bg-gradient-to-tl from-emerald-500/5 to-transparent rounded-full translate-x-1/4 translate-y-1/4" />
    </section>
  );
};

export default ChristmasLightingSection;