'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaStar, 
  FaCheckCircle,
  FaPhoneAlt,
  FaArrowRight,
  FaSnowflake,
  FaGem
} from 'react-icons/fa';
import { GiSparkles, GiStarFormation } from 'react-icons/gi';

import AnimatedLights from './AnimatedLights';
import staticData from '../../public/data.json';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const treeImageRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const { hero } = staticData;

  // GSAP animations
  useGSAP(() => {
    if (!isMounted) return;
    
    const mm = gsap.matchMedia();
    
    mm.add({
      "(min-width: 768px)": () => {
        gsap.set([treeImageRef.current, contentRef.current, ctaRef.current], {
          willChange: 'transform, opacity'
        });

        const tl = gsap.timeline({
          defaults: { 
            ease: 'power3.out',
            duration: 1.2
          }
        });

        tl.from(contentRef.current, {
          x: -60,
          opacity: 0,
          duration: 1.4,
        })
        .from(treeImageRef.current, {
          x: 60,
          opacity: 0,
          scale: 0.85,
          rotationY: 5,
          duration: 1.4,
        }, '-=1')
        .from('.hero-title span', {
          y: 50,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
        }, '-=0.8')
        .from('.hero-subtitle', {
          y: 30,
          opacity: 0,
          duration: 0.9,
        }, '-=0.6')
        .from('.hero-features li', {
          x: -25,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
        }, '-=0.5')
        .from('.hero-badge', {
          scale: 0,
          opacity: 0,
          rotation: -10,
          duration: 0.8,
        }, '-=0.4')
        .from('.cta-container', {
          y: 25,
          opacity: 0,
          duration: 0.9,
        }, '-=0.3')
        .from('.hero-stats > *', {
          y: 20,
          opacity: 0,
          stagger: 0.12,
          duration: 0.6,
        }, '-=0.2');

        if (treeImageRef.current) {
          gsap.to(treeImageRef.current, {
            y: -25,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          onUpdate: (self) => {
            const progress = self.progress;
            
            if (treeImageRef.current) {
              gsap.to(treeImageRef.current, {
                y: -progress * 25,
                scale: 1 - progress * 0.04,
                rotationY: progress * 2,
                duration: 0.1,
              });
            }
            
            if (contentRef.current) {
              gsap.to(contentRef.current, {
                y: -progress * 15,
                duration: 0.1,
              });
            }
          },
        });
      },
      "(max-width: 767px)": () => {
        const tl = gsap.timeline({
          defaults: { 
            ease: 'power3.out',
            duration: 0.9
          }
        });

        tl.from('.hero-content > *', {
          y: 25,
          opacity: 0,
          stagger: 0.12,
        })
        .from('.hero-image', {
          y: 40,
          opacity: 0,
          scale: 0.92,
          duration: 1,
        }, '-=0.6');
      }
    });

    if (ctaRef.current) {
      gsap.to(ctaRef.current, {
        scale: 1.04,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
      
      gsap.to('.cta-glow', {
        opacity: 0.6,
        scale: 1.1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    gsap.to('.floating-sparkle', {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: 'none',
    });

    return () => mm.revert();
  }, { scope: heroRef, dependencies: [isMounted] });

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] sm:min-h-screen flex items-center overflow-hidden px-3 xs:px-4 sm:px-6 py-6 sm:py-0 bg-dark-navy"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/hero-background.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-dark-navy/95 via-dark-navy/90 to-dark-navy/85" />
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-500/15 via-transparent to-transparent" />
      </div>

      <AnimatedLights />

      {/* Main Content */}
      <div className="container mx-auto relative z-30 max-w-7xl w-full px-0 sm:px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-16">
          
          {/* Left Content */}
          <div ref={contentRef} className="hero-content lg:w-1/2 w-full text-center lg:text-left px-2 sm:px-0">
            {/* Badge - Centered on mobile */}
            <div className="hero-badge inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-gradient-to-r from-red-500/25 via-yellow-400/25 to-red-500/25 backdrop-blur-lg rounded-full border border-yellow-400/30 shadow-lg mb-4 sm:mb-6 mx-auto lg:mx-0 max-w-max overflow-hidden group">
              <div className="relative">
                <GiSparkles className="text-xs xs:text-sm sm:text-base text-yellow-300 animate-pulse" />
              </div>
              <span className="text-white font-semibold text-xs xs:text-sm tracking-wider whitespace-nowrap">
                {hero.badge.text}
              </span>
              <div className="relative">
                <GiSparkles className="text-xs xs:text-sm sm:text-base text-yellow-300 animate-pulse delay-300" />
              </div>
            </div>

            {/* Title */}
            <h1 className="hero-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-5 leading-snug sm:leading-tight tracking-tight">
              <span className="inline-block bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
                {hero.title.part1}
              </span>
              <span className="block mt-1 xs:mt-2">
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-yellow-400 via-yellow-300 to-red-400 bg-clip-text text-transparent">
                    {hero.title.part2}
                  </span>
                  <svg className="absolute -bottom-1 xs:-bottom-2 left-0 w-full h-1.5 xs:h-2 text-yellow-400/20" viewBox="0 0 100 10">
                    <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-sm xs:text-base sm:text-lg md:text-xl text-white/85 mb-5 sm:mb-7 md:mb-8 leading-relaxed font-light max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg mx-auto lg:mx-0">
              {hero.subtitle}
            </p>

            {/* Features List */}
            <ul className="hero-features space-y-2 xs:space-y-3 sm:space-y-4 mb-5 sm:mb-7 md:mb-8 lg:mb-10 px-2 xs:px-0">
              {hero.features.map((feature, index) => (
                <li key={index} className="flex items-start justify-center lg:justify-start gap-2.5 xs:gap-3 text-white/90 text-xs xs:text-sm sm:text-base group">
                  <div className="relative flex-shrink-0 mt-0.5 sm:mt-0">
                    <FaCheckCircle className="text-green-400 text-sm xs:text-base sm:text-lg group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="whitespace-normal leading-relaxed text-left max-w-[85%] xs:max-w-none">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div ref={ctaRef} className="cta-container mb-6 sm:mb-8 md:mb-10 flex justify-center lg:justify-start">
              <div className="relative group w-full max-w-xs xs:max-w-sm sm:max-w-md">
                <div className="absolute -inset-3 xs:-inset-4 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-70 cta-glow transition-all duration-500 group-hover:opacity-90" />
                
                <a
                  href={`tel:${hero.cta.phone.replace(/[^0-9]/g, '')}`}
                  className="relative flex items-center justify-center gap-2 xs:gap-3 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:from-emerald-500 hover:via-green-500 hover:to-emerald-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-emerald-400/50 backdrop-blur-sm px-4 xs:px-5 sm:px-6 py-3 xs:py-4 w-full overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  <FaPhoneAlt className="text-base xs:text-lg sm:text-xl relative z-10 flex-shrink-0" />
                  <div className="text-left relative z-10 flex-1 min-w-0">
                    <div className="text-[10px] xs:text-xs sm:text-sm font-semibold opacity-90 tracking-wide truncate">
                      {hero.cta.subtext}
                    </div>
                    <div className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold tracking-tight truncate">
                      {hero.cta.phone}
                    </div>
                  </div>
                  <FaArrowRight className="text-sm xs:text-base sm:text-lg relative z-10 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hero-image lg:w-1/2 w-full relative mt-4 sm:mt-6 md:mt-8 lg:mt-0 px-2 xs:px-0">
            <div className="relative max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:max-w-none">
              <div className="absolute -inset-4 xs:-inset-5 sm:-inset-6 rounded-2xl xs:rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-red-300/20 to-yellow-400/30 blur-xl opacity-50 animate-pulse"></div>
              </div>
              
              <div 
                ref={treeImageRef}
                className="relative rounded-xl xs:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-2xl border-2 border-white/20 backdrop-blur-sm group cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
                }}
              >
                <div className="aspect-[3/4] sm:aspect-[4/5] md:aspect-[5/6] relative overflow-hidden">
                  <img 
                    src="/images/rightimage.jpg" 
                    alt="Beautiful Christmas Tree with professional holiday lighting"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="eager"
                  />
                </div>

                <div className="absolute bottom-3 xs:bottom-4 sm:bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400/90 via-yellow-400/80 to-red-500/90 text-white px-3 xs:px-4 py-1.5 xs:py-2 rounded-full shadow-lg backdrop-blur-md border border-white/30 whitespace-nowrap group-hover:scale-105 transition-transform duration-300">
                  <span className="font-bold text-xs xs:text-sm flex items-center gap-1.5 xs:gap-2">
                    <FaGem className="text-xs xs:text-sm" />
                    <span>{hero.imageBadge}</span>
                    <GiStarFormation className="text-xs xs:text-sm" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating CTA - Very Small Screen */}
      <div className="fixed bottom-3 right-3 z-50 lg:hidden">
        <a
          href={`tel:${hero.cta.phone.replace(/[^0-9]/g, '')}`}
          className="flex items-center justify-center w-12 h-12 xs:w-14 xs:h-14 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full shadow-xl animate-bounce border-2 border-emerald-400/50 backdrop-blur-sm relative overflow-hidden group"
          aria-label="Call for quote"
        >
          <FaPhoneAlt className="text-lg xs:text-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </a>
      </div>

      <style jsx global>{`
        /* Ultra small screens (300px - 479px) */
        @media (max-width: 479px) {
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
            gap: 0.75rem !important;
          }
          
          .hero-features li span {
            max-width: 85% !important;
          }
          
          .cta-container a {
            padding: 0.75rem 1rem !important;
            gap: 0.75rem !important;
          }
          
          .cta-container a div:first-child {
            font-size: 0.75rem !important;
          }
          
          .cta-container a div:last-child {
            font-size: 1rem !important;
          }
        }
        
        /* Very small screens (300px - 379px) */
        @media (max-width: 379px) {
          .hero-title {
            font-size: 1.5rem !important;
            line-height: 1.15 !important;
          }
          
          .hero-subtitle {
            font-size: 0.8125rem !important;
            max-width: 16rem !important;
          }
          
          .hero-features li {
            font-size: 0.75rem !important;
            gap: 0.625rem !important;
          }
          
          .hero-features li span {
            max-width: 80% !important;
          }
          
          .hero-badge {
            padding: 0.5rem 0.75rem !important;
          }
          
          .hero-badge span {
            font-size: 0.75rem !important;
          }
          
          .cta-container {
            max-width: 260px !important;
          }
          
          .cta-container a {
            min-width: auto !important;
            padding: 0.625rem 0.875rem !important;
            gap: 0.5rem !important;
          }
          
          .cta-container a div:last-child {
            font-size: 0.9375rem !important;
          }
          
          .hero-image {
            max-width: 260px !important;
          }
        }
        
        /* Extremely small screens (300px and below) */
        @media (max-width: 319px) {
          .hero-title {
            font-size: 1.375rem !important;
            line-height: 1.1 !important;
          }
          
          .hero-subtitle {
            font-size: 0.75rem !important;
            max-width: 14rem !important;
          }
          
          .hero-features {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          
          .hero-features li {
            font-size: 0.6875rem !important;
            gap: 0.5rem !important;
          }
          
          .hero-features li span {
            max-width: 75% !important;
          }
          
          .hero-badge {
            padding: 0.375rem 0.625rem !important;
          }
          
          .hero-badge span {
            font-size: 0.6875rem !important;
          }
          
          .cta-container {
            max-width: 240px !important;
          }
          
          .cta-container a {
            padding: 0.5rem 0.75rem !important;
            gap: 0.375rem !important;
          }
          
          .cta-container a div:first-child {
            font-size: 0.6875rem !important;
          }
          
          .cta-container a div:last-child {
            font-size: 0.875rem !important;
          }
          
          .fa-phone-alt, .fa-arrow-right {
            font-size: 0.875rem !important;
          }
          
          .hero-image {
            max-width: 240px !important;
          }
        }
        
        @media (max-width: 299px) {
          .hero-title {
            font-size: 1.25rem !important;
          }
          
          .hero-subtitle {
            font-size: 0.6875rem !important;
            max-width: 12rem !important;
          }
          
          .hero-features li {
            font-size: 0.625rem !important;
          }
          
          .cta-container {
            max-width: 220px !important;
          }
          
          .cta-container a {
            padding: 0.5rem 0.625rem !important;
            gap: 0.375rem !important;
          }
          
          .cta-container a div:last-child {
            font-size: 0.8125rem !important;
          }
          
          .hero-image {
            max-width: 220px !important;
          }
          
          /* Mobile floating CTA */
          .fixed.bottom-3.right-3 {
            bottom: 2rem !important;
            right: 2rem !important;
          }
          
          .fixed.bottom-3.right-3 a {
            width: 2.5rem !important;
            height: 2.5rem !important;
          }
          
          .fixed.bottom-3.right-3 a svg {
            font-size: 1rem !important;
          }
        }
        
        /* Ensure proper spacing on very small screens */
        @media (max-width: 479px) {
          section {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
          }
          
          .container {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          
          .hero-image {
            margin-top: 1rem !important;
          }
        }
        
        /* Center everything on mobile */
        @media (max-width: 1023px) {
          .hero-content {
            text-align: center !important;
          }
          
          .hero-features li {
            justify-content: center !important;
          }
          
          .hero-badge {
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
        
        /* Only left-align on desktop */
        @media (min-width: 1024px) {
          .hero-content {
            text-align: left !important;
          }
          
          .hero-features li {
            justify-content: flex-start !important;
          }
          
          .hero-badge {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
        
        /* Prevent text overflow and maintain readability */
        .hero-title span,
        .hero-subtitle,
        .hero-features li span,
        .cta-container a div {
          word-break: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }
        
        /* Improve touch targets for mobile */
        @media (max-width: 767px) {
          .hero-features li,
          .cta-container a {
            min-height: 44px; /* Minimum touch target size */
          }
          
          .hero-badge {
            min-height: 36px;
          }
        }
        
        /* Keep animations smooth on mobile */
        @media (hover: none) {
          .cta-container a:hover,
          .hero-image:hover img,
          .hero-features li:hover {
            transform: none !important;
          }
        }
        
        /* Ensure images don't overflow */
        img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </section>
  );
};

export default Hero;