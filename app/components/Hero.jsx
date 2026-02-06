'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaCheckCircle,
  FaPhoneAlt,
  FaArrowRight,
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
      }
    });

    // Mobile animations
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        defaults: { 
          ease: 'power3.out',
          duration: 0.9
        }
      });

      tl.from('.hero-badge', {
        y: 20,
        opacity: 0,
        duration: 0.8,
      })
      .from('.hero-title span', {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
      }, '-=0.4')
      .from('.hero-subtitle', {
        y: 25,
        opacity: 0,
        duration: 0.8,
      }, '-=0.3')
      .from('.hero-features li', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
      }, '-=0.2')
      .from('.cta-container', {
        y: 25,
        opacity: 0,
        duration: 0.9,
      }, '-=0.3')
      .from('.hero-image', {
        y: 40,
        opacity: 0,
        scale: 0.92,
        duration: 1,
      }, '-=0.4');
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
      className="relative min-h-[85vh] sm:min-h-screen flex items-center overflow-hidden px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-0"
    >
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
          <div ref={contentRef} className="hero-content w-full lg:w-1/2 text-center lg:text-left sm:flex sm:flex-col lg:flex-col sm:item-center sm:aligm-center flex flex-col items-center justify-center">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500/25 via-yellow-400/25 to-red-500/25 backdrop-blur-lg rounded-full border border-yellow-400/30 shadow-lg mb-4 sm:mb-6 mx-auto lg:mx-0 max-w-max overflow-hidden group">
              <GiSparkles className="text-sm sm:text-base text-yellow-300 animate-pulse" />
              <span className="text-white font-semibold text-xs sm:text-sm tracking-wider whitespace-nowrap">
                {hero.badge.text}
              </span>
            </div>

            {/* Title */}
            <h1 className="hero-title text-5xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-5 leading-tight">
              <span className="block bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
                {hero.title.part1}
              </span>
              <span className="block mt-1 sm:mt-2">
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-yellow-400 via-yellow-300 to-red-400 bg-clip-text text-transparent animate-gradient">
                    {hero.title.part2}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 to-red-400/40 blur-lg rounded -z-10 opacity-70 scale-105"></span>
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-sm xs:text-base sm:text-lg text-white/85 mb-5 sm:mb-7 leading-relaxed font-light max-w-full sm:max-w-md mx-auto lg:mx-0 px-1">
              {hero.subtitle}
            </p>

            {/* Features List - FIXED FOR MOBILE */}
            <ul className="hero-features space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              {hero.features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-start justify-center lg:justify-start gap-2.5 sm:gap-3 text-white/90 text-xs xs:text-sm sm:text-base group px-1"
                >
                  <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                    <FaCheckCircle className="text-green-400 text-sm sm:text-base group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-left leading-relaxed flex-1">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button - FIXED SIZE FOR ALL SCREENS */}
            <div ref={ctaRef} className="cta-container w-72  flex justify-center lg:justify-start">
              <div className="relative group w-full max-w-xs sm:max-w-sm md:max-w-md">
                <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-emerald-500/20 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-70 cta-glow transition-all duration-500 group-hover:opacity-90" />
                
                <a
                  href={`tel:${hero.cta.phone.replace(/[^0-9]/g, '')}`}
                  className="relative flex items-center justify-between gap-2 sm:gap-3 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:from-emerald-500 hover:via-green-500 hover:to-emerald-500 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-400/50 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3.5 w-full overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
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
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0 lg:max-w-none">
              <div className="absolute -inset-3 sm:-inset-4 md:-inset-5 rounded-xl sm:rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-red-300/20 to-yellow-400/30 blur-lg sm:blur-xl opacity-50 animate-pulse"></div>
              </div>
              
              <div 
                ref={treeImageRef}
                className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl border border-white/20 backdrop-blur-sm group cursor-pointer"
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

                <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400/90 via-yellow-400/80 to-red-500/90 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg backdrop-blur-md border border-white/30 whitespace-nowrap group-hover:scale-105 transition-transform duration-300">
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
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <a
          href={`tel:${hero.cta.phone.replace(/[^0-9]/g, '')}`}
          className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full shadow-lg animate-bounce border border-emerald-400/50 backdrop-blur-sm relative overflow-hidden group"
          aria-label="Call for quote"
        >
          <FaPhoneAlt className="text-lg" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </a>
      </div>

      <style jsx global>{`
        /* Gradient animation for title */
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease-in-out infinite;
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