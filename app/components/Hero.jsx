'use client'
import React, { useState, useEffect } from 'react';
import { 
  FaCheckCircle,
  FaPhoneAlt,
  FaArrowRight,
  FaGem
} from 'react-icons/fa';
import { GiSparkles, GiStarFormation } from 'react-icons/gi';
import AnimatedLights from './AnimatedLights';
import staticData from '../../public/data.json';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { hero } = staticData;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center overflow-hidden px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-0">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/hero-background2.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-dark-navy/50 via-dark-navy/90 to-dark-navy/60" />
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-500/15 via-transparent to-transparent" />
      </div>

      <AnimatedLights />

      {/* Main Content */}
      <div className="container mx-auto relative z-30 max-w-7xl w-full px-0 sm:px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
          
          {/* Left Content */}
          <div className="hero-content w-full lg:w-1/2 text-center lg:text-left sm:flex sm:flex-col lg:flex-col sm:item-center sm:aligm-center flex flex-col items-center justify-center animate-fade-in-left">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500/25 via-yellow-400/25 to-red-500/25 backdrop-blur-lg rounded-full border border-yellow-400/30 shadow-lg mb-4 sm:mb-6 mx-auto lg:mx-0 max-w-max overflow-hidden group animate-slide-down">
              <GiSparkles className="text-sm sm:text-base text-yellow-300 animate-pulse" />
              <span className="text-white font-semibold text-xs sm:text-sm tracking-wider whitespace-nowrap">
                {hero.badge.text}
              </span>
            </div>

            {/* Title */}
            <h1 className="hero-title text-5xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-5 leading-tight">
              <span className="block bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent animate-fade-in-up">
                {hero.title.part1}
              </span>
              <span className="block mt-1 sm:mt-2 animate-fade-in-up animation-delay-100">
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-yellow-400 via-yellow-300 to-red-400 bg-clip-text text-transparent animate-gradient">
                    {hero.title.part2}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 to-red-400/40 blur-lg rounded -z-10 opacity-70 scale-105"></span>
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-sm xs:text-base sm:text-lg text-white/85 mb-5 sm:mb-7 leading-relaxed font-light max-w-full sm:max-w-md mx-auto lg:mx-0 px-1 animate-fade-in-up animation-delay-200">
              {hero.subtitle}
            </p>

            {/* Features List */}
            <ul className="hero-features space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              {hero.features.map((feature, index) => (
                <li 
                  key={index} 
                  className={`flex items-start justify-center lg:justify-start gap-2.5 sm:gap-3 text-white/90 text-xs xs:text-sm sm:text-base group px-1 animate-fade-in-left animation-delay-${300 + (index * 100)}`}
                >
                  <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                    <FaCheckCircle className="text-green-400 text-sm sm:text-base group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-left leading-relaxed flex-1">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button - FIXED ANIMATION */}
            <div className="cta-container w-72 flex justify-center lg:justify-start animate-scale-in animation-delay-700">
              <div className="relative group w-full max-w-xs sm:max-w-sm md:max-w-md">
                <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-emerald-500/20 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                
                <a
                  href={`tel:${hero.cta.phone.replace(/[^0-9]/g, '')}`}
                  className="relative flex items-center justify-between gap-2 sm:gap-3 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:from-emerald-500 hover:via-green-500 hover:to-emerald-500 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-400/50 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3.5 w-full overflow-hidden hover-lift"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  
                  <FaPhoneAlt className="text-base sm:text-lg relative z-10 flex-shrink-0" />
                  <div className="text-center relative z-10 flex-1 min-w-0 px-1 sm:px-2">
                    <div className="text-[10px] xs:text-xs sm:text-sm font-semibold opacity-90 tracking-wide truncate mb-0.5">
                      {hero.cta.subtext}
                    </div>
                    <div className="text-base sm:text-lg md:text-xl font-bold tracking-tight truncate">
                      {hero.cta.phone}
                    </div>
                  </div>
                  <FaArrowRight className="text-sm sm:text-base relative z-10 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hero-image w-full lg:w-1/2 relative mt-6 sm:mt-8 lg:mt-0">
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0 lg:max-w-none animate-fade-in-right">
              <div className="absolute -inset-3 sm:-inset-4 md:-inset-5 rounded-xl sm:rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-red-300/20 to-yellow-400/30 blur-lg sm:blur-xl opacity-50 animate-pulse"></div>
              </div>
              
              <div 
                className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl border border-white/20 backdrop-blur-sm group cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
                }}
              >
                <div className="aspect-[3/4] sm:aspect-[4/5] md:aspect-[5/6] relative overflow-hidden">
                  <img 
                    src="/images/rightimage.jpg" 
                    alt="Beautiful Christmas Tree with professional holiday lighting"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                </div>

                <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400/90 via-yellow-400/80 to-red-500/90 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg backdrop-blur-md border border-white/30 whitespace-nowrap group-hover:scale-105 transition-transform duration-300 animate-slide-up">
                  <span className="font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
                    <FaGem className="text-xs sm:text-sm" />
                    <span>{hero.imageBadge}</span>
                    <GiStarFormation className="text-xs sm:text-sm" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating CTA */}
      <div className="fixed bottom-4 right-4 z-50 lg:hidden animate-bounce-slow">
        <a
          href={`tel:${hero.cta.phone.replace(/[^0-9]/g, '')}`}
          className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full shadow-lg border border-emerald-400/50 backdrop-blur-sm relative overflow-hidden group pulse-button"
          aria-label="Call for quote"
        >
          <FaPhoneAlt className="text-lg" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </a>
      </div>

      <style jsx global>{`
        /* Animation keyframes - Clean and professional */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(15px) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes pulseSoft {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(52, 211, 153, 0);
          }
        }
        
        @keyframes gradient {
          0%, 100% { 
            background-position: 0% 50%; 
          }
          50% { 
            background-position: 100% 50%; 
          }
        }
        
        /* Animation classes */
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-left {
          animation: fadeInLeft 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-down {
          animation: slideDown 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-up {
          animation: slideUp 0.5s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }
        
        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease-in-out infinite;
        }
        
        /* Animation delays */
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-700 {
          animation-delay: 700ms;
        }
        
        /* CTA specific animations */
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-3px);
        }
        
        .pulse-button {
          animation: pulseSoft 2s infinite;
        }
        
        /* Stagger animation for list items */
        .hero-features li:nth-child(1) { animation-delay: 300ms; }
        .hero-features li:nth-child(2) { animation-delay: 400ms; }
        .hero-features li:nth-child(3) { animation-delay: 500ms; }
        .hero-features li:nth-child(4) { animation-delay: 600ms; }

        /* Mobile animations */
        @media (max-width: 767px) {
          .hero-content {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
          }
          
          .hero-image {
            animation: fadeInUp 0.6s ease-out 0.2s forwards;
            opacity: 0;
          }
          
          .cta-container {
            animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards;
            opacity: 0;
          }
        }

        /* Extra small screens (below 375px) */
        @media (max-width: 374px) {
          .hero-title {
            font-size: 1.75rem !important;
            line-height: 1.2 !important;
          }
          
          .hero-subtitle {
            font-size: 0.875rem !important;
            line-height: 1.4 !important;
          }
          
          .hero-features li {
            font-size: 0.8125rem !important;
            gap: 0.5rem !important;
            align-items: flex-start !important;
          }
          
          .hero-features li span {
            line-height: 1.3 !important;
          }
          
          .cta-container {
            max-width: 280px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          
          .cta-container a {
            padding: 0.5rem 0.75rem !important;
            gap: 0.5rem !important;
            min-height: 24px !important;
          }
          
          .cta-container a div:first-child {
            font-size: 0.6875rem !important;
          }
          
          .cta-container a div:last-child {
            font-size: 0.9375rem !important;
          }
          
          .hero-image {
            max-width: 260px !important;
          }
        }

        /* Very small screens (below 320px) */
        @media (max-width: 319px) {
          .hero-title {
            font-size: 1.5rem !important;
            line-height: 1.15 !important;
          }
          
          .hero-subtitle {
            font-size: 0.8125rem !important;
          }
          
          .hero-features li {
            font-size: 0.75rem !important;
            gap: 0.375rem !important;
          }
          
          .hero-badge {
            padding: 0.375rem 0.75rem !important;
          }
          
          .hero-badge span {
            font-size: 0.75rem !important;
          }
          
          .cta-container {
            max-width: 260px !important;
          }
          
          .cta-container a {
            padding: 0.5rem 0.625rem !important;
            gap: 0.375rem !important;
            min-height: 44px !important;
          }
          
          .cta-container a div:last-child {
            font-size: 0.875rem !important;
          }
          
          .hero-image {
            max-width: 240px !important;
          }
          
          .fixed.bottom-4.right-4 a {
            width: 2.75rem !important;
            height: 2.75rem !important;
          }
        }

        /* Fix list items alignment on mobile */
        @media (max-width: 767px) {
          .hero-features li {
            text-align: left !important;
            justify-content: flex-start !important;
            align-items: flex-start !important;
            margin-left: auto !important;
            margin-right: auto !important;
            max-width: 320px !important;
          }
          
          .hero-features li span {
            flex: 1 !important;
            min-width: 0 !important;
          }
          
          /* Center everything but keep text left-aligned */
          .hero-features {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
        }

        /* Desktop: left-align list items */
        @media (min-width: 1024px) {
          .hero-features li {
            justify-content: flex-start !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            max-width: none !important;
          }
        }

        /* Ensure CTA doesn't overflow */
        .cta-container a {
          min-width: 0 !important;
          overflow: hidden !important;
        }
        
        .cta-container a > * {
          flex-shrink: 0 !important;
        }
        
        .cta-container a div {
          flex: 1 !important;
          min-width: 0 !important;
        }

        /* Improve touch targets */
        @media (max-width: 767px) {
          
          
          .hero-badge {
            min-height: 36px !important;
          }
          
          .cta-container a {
            touch-action: manipulation !important;
          }
        }

        /* Remove hover effects on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .group-hover\\:scale-110,
          .group-hover\\:scale-105,
          .group-hover\\:translate-x-1,
          .group-hover\\:translate-x-\\[100\\%\\] {
            transform: none !important;
          }
          
          .hover-lift:hover {
            transform: none !important;
          }
        }

        /* Fix container padding on very small screens */
        @media (max-width: 639px) {
          section {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
          }
        }

        /* Landscape mode adjustments */
        @media (max-height: 600px) and (orientation: landscape) {
          .hero-features {
            display: none !important;
          }
          
          .hero-subtitle {
            margin-bottom: 1rem !important;
          }
          
          .cta-container {
            margin-bottom: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;