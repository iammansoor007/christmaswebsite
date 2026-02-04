'use client'
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaArrowRight,
  FaCheckCircle,
  FaPhoneAlt,
  FaChevronDown
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';

import { getFAQData } from '../services/dataService';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FAQSection = () => {
  const faqRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get data
  const faqData = getFAQData();
  
  const { badge, title: faqTitle, subtitle, phone, items: faqItems } = faqData;

  // Color palette from heading gradient
  const colors = {
    red: '#DC2626',      // from-red-600
    amber: '#F59E0B',    // amber-500
    emerald: '#059669'   // emerald-600
  };

  // Get sequential color based on index
  const getColorForIndex = (index) => {
    const colorArray = [colors.red, colors.amber, colors.emerald];
    return colorArray[index % colorArray.length];
  };

  // Fixed icon mapping to prevent hydration errors
  const getIconComponent = (iconName) => {
    const iconMap = {
      check: FaCheckCircle,
      phone: FaPhoneAlt,
      sparkles: GiSparkles,
      arrow: FaArrowRight,
      chevron: FaChevronDown
    };
    return iconMap[iconName] || FaCheckCircle;
  };

  useGSAP(() => {
    // Section entrance animation
    gsap.from('.faq-header', {
      scrollTrigger: {
        trigger: faqRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Stagger card animation
    gsap.from('.faq-item', {
      scrollTrigger: {
        trigger: '.faq-container',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });

  }, { scope: faqRef });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Prevent rendering until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-6 xs:py-8 sm:py-12 md:py-16 lg:py-20 min-w-[300px]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-sm xs:text-base text-gray-600">Loading FAQ...</div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={faqRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-6 xs:py-8 sm:py-12 md:py-16 lg:py-20 min-w-[300px]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, #e5e7eb 1.5px, transparent 1.5px)`,
          backgroundSize: '30px 30px'
        }} />
        <div className="absolute top-8 xs:top-10 sm:top-20 left-2 xs:left-5 sm:left-10 w-24 xs:w-32 sm:w-40 h-24 xs:h-32 sm:h-40 bg-gradient-to-r from-red-600/20 to-amber-500/20 rounded-full blur-2xl xs:blur-3xl" />
        <div className="absolute bottom-8 xs:bottom-10 sm:bottom-20 right-2 xs:right-5 sm:right-10 w-24 xs:w-32 sm:w-40 h-24 xs:h-32 sm:h-40 bg-gradient-to-r from-emerald-600/20 to-amber-500/20 rounded-full blur-2xl xs:blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="faq-header text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-3 py-1 xs:py-1.5 bg-gradient-to-r from-red-600/10 via-amber-500/10 to-emerald-600/10 rounded-full shadow-xs xs:shadow-sm mb-3 xs:mb-4 sm:mb-5 md:mb-6 border border-amber-500/30 max-w-full overflow-hidden">
            <GiSparkles className="text-[10px] xs:text-xs sm:text-sm md:text-base text-amber-500 flex-shrink-0" />
            <span className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-medium text-gray-800 uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis px-0.5 xs:px-1">
              {badge}
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 leading-snug xs:leading-tight px-1">
            Common{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent break-words">
                {faqTitle}
              </span>
              <svg className="absolute -bottom-0.5 xs:-bottom-1 sm:-bottom-1.5 left-0 w-full h-1 xs:h-1.5 sm:h-2 text-gray-200" viewBox="0 0 100 10">
                <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-1 xs:px-2 sm:px-4 leading-relaxed">
            {subtitle}{' '}
            <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="inline-flex items-center gap-0.5 xs:gap-1 text-amber-600 font-semibold hover:text-amber-700 transition-colors whitespace-nowrap">
              <FaPhoneAlt className="text-[10px] xs:text-xs sm:text-sm" />
              <span className="text-xs xs:text-sm sm:text-base">{phone}</span>
            </a>
          </p>

          {/* Decorative divider */}
          <div className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 h-0.5 xs:h-px w-12 xs:w-16 sm:w-20 md:w-24 lg:w-32 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>

        {/* FAQ Container */}
        <div className="faq-container space-y-2 xs:space-y-3 sm:space-y-4 mb-8 xs:mb-10 sm:mb-12 md:mb-16 px-1 xs:px-2">
          {faqItems.map((item, index) => {
            const itemColor = getColorForIndex(index);
            const IconComponent = getIconComponent(item.icon || 'check');
            
            return (
              <div
                key={index}
                className={`faq-item bg-white rounded-md xs:rounded-lg sm:rounded-xl shadow-sm xs:shadow-md hover:shadow-md xs:hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group ${
                  openIndex === index ? 'ring-1 xs:ring-2 ring-offset-1 xs:ring-offset-2' : ''
                }`}
                style={{
                  '--index': index,
                  '--color': itemColor,
                  '--ring-color': openIndex === index ? itemColor : 'transparent'
                }}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 flex items-start justify-between gap-2 xs:gap-3 sm:gap-4 transition-all duration-300 hover:bg-gray-50 min-h-[64px] xs:min-h-[72px] sm:min-h-[84px] md:min-h-[96px]"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-start gap-2 xs:gap-3 sm:gap-4 flex-1 min-w-0">
                    {/* Icon with color from palette */}
                    <div 
                      className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md xs:rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm xs:shadow-md flex-shrink-0 transition-transform duration-300 group-hover:scale-105 mt-0.5 xs:mt-0"
                      style={{ 
                        backgroundColor: `${itemColor}15`,
                        color: itemColor
                      }}
                    >
                      <div className="text-[12px] xs:text-base sm:text-lg md:text-xl">
                        <IconComponent />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0 overflow-hidden">
                      {/* Category badge */}
                      <div className="flex items-center flex-wrap gap-1 xs:gap-1.5 sm:gap-2 mb-1 xs:mb-1.5 sm:mb-2 md:mb-3">
                        <span 
                          className="text-[9px] xs:text-[10px] sm:text-xs font-medium px-1.5 xs:px-2 py-0.5 xs:py-0.5 sm:px-2.5 sm:py-1 rounded-full text-white shadow-xs xs:shadow-sm"
                          style={{ 
                            background: itemColor,
                            boxShadow: `0 1px 2px ${itemColor}40`
                          }}
                        >
                          {item.category}
                        </span>
                        <span className="hidden xs:inline text-[10px] xs:text-xs text-gray-500 font-medium">•</span>
                        <div className="flex items-center flex-wrap gap-0.5 xs:gap-1 sm:gap-1.5">
                          {item.features.slice(0, 2).map((feature, idx) => (
                            <span 
                              key={idx} 
                              className="text-[8px] xs:text-[9px] sm:text-xs px-1 xs:px-1.5 py-0.5 rounded"
                              style={{ 
                                color: itemColor,
                                backgroundColor: `${itemColor}10`,
                                border: `0.5px solid ${itemColor}20`
                              }}
                            >
                              {feature}
                            </span>
                          ))}
                          {item.features.length > 2 && (
                            <span 
                              className="text-[8px] xs:text-[9px] sm:text-xs px-1 xs:px-1.5 py-0.5 rounded"
                              style={{ 
                                color: itemColor,
                                backgroundColor: `${itemColor}10`,
                                border: `0.5px solid ${itemColor}20`
                              }}
                            >
                              +{item.features.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Question */}
                      <h3 className="text-[13px] xs:text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 leading-tight xs:leading-snug sm:leading-tight mb-0.5 xs:mb-1">
                        {item.question}
                      </h3>
                      
                      {/* Quick preview on hover - hidden on mobile */}
                      <div className="hidden sm:block">
                        <p className="text-gray-600 text-xs sm:text-sm line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.answer.substring(0, 80)}...
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chevron */}
                  <div className="flex-shrink-0 ml-0.5 xs:ml-1 sm:ml-2 mt-0 xs:mt-0.5 sm:mt-1">
                    <FaChevronDown 
                      className={`text-xs xs:text-sm sm:text-base md:text-lg transition-all duration-300 ${
                        openIndex === index ? 'rotate-180 transform' : ''
                      }`}
                      style={{ color: itemColor }}
                    />
                  </div>
                </button>
                
                {/* Answer with animation */}
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-[500px] xs:max-h-[400px] sm:max-h-[350px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 pb-2 xs:pb-3 sm:pb-4 md:pb-5 lg:pb-6 ml-6 xs:ml-8 sm:ml-10 md:ml-12 lg:ml-16">
                    {/* Answer text */}
                    <p className="text-gray-600 text-xs xs:text-sm sm:text-base leading-relaxed mb-2 xs:mb-3 sm:mb-4">
                      {item.answer}
                    </p>
                    
                    {/* Features grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-1.5 xs:gap-2 sm:gap-3 mb-2 xs:mb-3 sm:mb-4">
                      {item.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                          <div 
                            className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${itemColor}15` }}
                          >
                            <FaCheckCircle style={{ color: itemColor }} className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm" />
                          </div>
                          <span 
                            className="text-gray-700 text-[10px] xs:text-[11px] sm:text-sm font-medium"
                            style={{ color: itemColor }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Special offers for pricing category */}
                    {item.category === 'Pricing' && (
                      <div 
                        className="mt-2 xs:mt-3 sm:mt-4 inline-flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-md xs:rounded-lg sm:rounded-xl border"
                        style={{ 
                          background: `linear-gradient(135deg, ${colors.amber}15, ${colors.emerald}15)`,
                          borderColor: `${colors.amber}30`
                        }}
                      >
                        <GiSparkles style={{ color: colors.amber }} className="text-[9px] xs:text-[10px] sm:text-sm md:text-base" />
                        <span className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-semibold" style={{ color: colors.amber }}>
                          Early Bird Special: 25% off bookings before Nov 15
                        </span>
                      </div>
                    )}
                    
                    {/* CTA for service category */}
                    {item.category === 'Service Area' && (
                      <button 
                        className="mt-2 xs:mt-3 sm:mt-4 group relative px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2.5 text-white font-medium rounded-md xs:rounded-lg sm:rounded-xl hover:shadow-sm xs:hover:shadow-md transition-all duration-300 overflow-hidden inline-flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-[11px] xs:text-xs sm:text-sm"
                        style={{ 
                          background: `linear-gradient(135deg, ${colors.red}, ${colors.amber})`
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-0.5 xs:gap-1 sm:gap-1.5">
                          <span className="whitespace-nowrap">Check Availability</span>
                          <FaArrowRight className="text-[9px] xs:text-[10px] sm:text-sm group-hover:translate-x-0.5 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

   
      </div>

      <style jsx>{`
        .faq-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeIn 0.5s ease-out forwards;
          animation-delay: calc(var(--index) * 0.1s);
          opacity: 0;
          --ring-color: transparent;
        }
        
        .faq-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.1), 0 6px 8px -5px rgba(0, 0, 0, 0.04);
        }
        
        .faq-item[style*="--ring-color"] {
          box-shadow: 0 0 0 1px var(--ring-color);
        }
        
        @media (min-width: 400px) {
          .faq-item[style*="--ring-color"] {
            box-shadow: 0 0 0 2px var(--ring-color);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Touch-friendly tap targets - enhanced for small screens */
        button, 
        a[href^="tel:"] {
          min-height: 44px;
          min-width: 44px;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Line clamp for text overflow */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Improved touch feedback */
        @media (hover: none) and (pointer: coarse) {
          .faq-item:active {
            transform: scale(0.98);
          }
          
          .faq-item:hover {
            transform: none;
          }
          
          .group-hover\\:scale-105 {
            transform: none;
          }
          
          .group-hover\\:opacity-100 {
            opacity: 0;
          }
        }
        
        /* Extra small screen optimizations (300px - 400px) */
        @media (max-width: 400px) {
          .faq-header h2 {
            font-size: 18px;
            line-height: 1.3;
          }
          
          .faq-item h3 {
            font-size: 13px;
            line-height: 1.3;
          }
          
          .faq-item > button {
            padding: 8px;
            gap: 8px;
          }
          
          .faq-item .icon-container {
            width: 24px;
            height: 24px;
          }
          
          /* Reduce spacing for very small screens */
          .faq-container {
            padding-left: 0;
            padding-right: 0;
          }
        }
        
        /* Very small screens (under 350px) */
        @media (max-width: 350px) {
          .faq-header h2 {
            font-size: 17px;
          }
          
          .faq-item h3 {
            font-size: 12.5px;
          }
          
          .faq-item > button {
            padding: 6px;
            gap: 6px;
          }
          
          .faq-item .icon-container {
            width: 22px;
            height: 22px;
          }
          
          /* Adjust badge sizes */
          .faq-header .badge {
            font-size: 8px;
            padding: 2px 6px;
          }
          
          /* Stack features on very small screens */
          .faq-item .features-container {
            flex-wrap: wrap;
          }
        }
        
        /* Extra extra small (300px - 320px) */
        @media (max-width: 320px) {
          .faq-header h2 {
            font-size: 16px;
          }
          
          .faq-item h3 {
            font-size: 12px;
          }
          
          .faq-item .category-badge {
            font-size: 8px;
            padding: 2px 4px;
          }
          
          .faq-item .feature-tag {
            font-size: 7px;
            padding: 1px 3px;
          }
          
          /* Adjust padding for tight screens */
          section {
            padding-left: 8px;
            padding-right: 8px;
          }
        }
        
        /* Hide animation on very low-powered devices */
        @media (prefers-reduced-motion: reduce) {
          .faq-item,
          .faq-header {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
};

export default FAQSection;