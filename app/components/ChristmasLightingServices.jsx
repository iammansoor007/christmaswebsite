// components/ModernServicesSection.jsx
'use client'
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaArrowRight,
  FaCheckCircle,
  FaPhoneAlt,
  FaQuoteRight,
  FaCalendarCheck,
  FaSnowflake
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import { getServicesData } from '../services/dataService';

const ModernServicesSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const servicesData = getServicesData();
  const { badge, title, subtitle, items: services } = servicesData;

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 min-w-[280px]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #e5e7eb 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-1"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 px-3 py-1.5 bg-gradient-to-r from-red-600/10 via-amber-500/10 to-red-600/10 rounded-full shadow-sm mb-4 xs:mb-5 sm:mb-6 border border-amber-500/30 w-fit mx-auto"
          >
            <GiSparkles className="text-xs xs:text-sm sm:text-base text-amber-500 flex-shrink-0" />
            <span className="text-xs xs:text-sm sm:text-sm font-medium text-gray-800 uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] xs:max-w-[250px] sm:max-w-none">
              {badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 xs:mb-4 leading-tight"
          >
            <span className="block text-center">
              {title.prefix}{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent break-words text-center">
                  {title.text}
                </span>
                <svg className="absolute -bottom-1.5 xs:-bottom-2 left-0 w-full h-2 xs:h-2.5 text-gray-200" viewBox="0 0 100 10">
                  <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </span>
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-2 xs:px-3 sm:px-4 leading-relaxed text-center"
          >
            {subtitle}
          </motion.p>

          {/* Decorative divider */}
          <div className="mt-4 xs:mt-5 sm:mt-6 h-0.5 xs:h-1 w-20 xs:w-28 sm:w-36 md:w-40 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </motion.div>

        {/* Services Grid - Updated responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-6 lg:gap-8 xl:gap-10">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.15 }}
                whileHover={{ y: -4 }}
                className="relative group w-full"
              >
                {/* Card Container - Responsive height and layout */}
                <div className="flex flex-col lg:flex-row h-full bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden min-h-[300px] xs:min-h-[340px] sm:min-h-[360px] md:min-h-[380px] lg:min-h-[400px]">
                  
                  {/* Image Section - Responsive height */}
                  <div className="lg:w-2/5 relative h-[180px] xs:h-[200px] sm:h-[220px] md:h-[200px] lg:h-full lg:min-h-[400px]">
                    <div className="relative h-full w-full overflow-hidden">
                      <img 
                        src={`/images/demo${index + 1}.jpeg`}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/20" />
                      
                      {/* Image Badge */}
                      <div 
                        className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full text-white text-xs xs:text-sm font-medium shadow-md backdrop-blur-sm z-10"
                        style={{ backgroundColor: `${service.color}CC` }}
                      >
                        {service.stat}
                      </div>
                    </div>
                  </div>

                  {/* Content Section - Responsive padding */}
                  <div className="lg:w-3/5 p-3 xs:p-4 sm:p-5 md:p-5 lg:p-6 xl:p-7 flex flex-col flex-1">
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 xs:-top-4 -left-3 xs:-left-4 z-20">
                      <div 
                        className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-lg xs:rounded-xl flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: service.color, color: 'white' }}
                      >
                        <span className="text-xs xs:text-sm font-bold">{service.number}</span>
                      </div>
                    </div>

                    {/* Accent Border Top */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 xs:h-1.5"
                      style={{ backgroundColor: service.color }}
                    />

                    {/* Header with Icon - Responsive layout */}
                    <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4 sm:mb-5 mt-1 sm:mt-2">
                      <div 
                        className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg xs:rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                        style={{ 
                          backgroundColor: `${service.color}15`,
                          color: service.color
                        }}
                      >
                        <IconComponent className="text-lg xs:text-xl sm:text-2xl" />
                      </div>
                      <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight flex-1">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description - Responsive text */}
                    <p className="text-gray-600 text-xs xs:text-sm sm:text-base md:text-lg mb-3 xs:mb-4 sm:mb-5 leading-relaxed flex-grow line-clamp-3 md:line-clamp-4 lg:line-clamp-3">
                      {service.description}
                    </p>

                    {/* Features List - Responsive spacing */}
                    <div className="space-y-1.5 xs:space-y-2 sm:space-y-2.5 mb-4 xs:mb-5 sm:mb-6 flex-grow">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start xs:items-center gap-2 xs:gap-3">
                          <div 
                            className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mt-0.5 xs:mt-0"
                            style={{ backgroundColor: `${service.color}15` }}
                          >
                            <FaCheckCircle style={{ color: service.color }} className="text-xs xs:text-sm" />
                          </div>
                          <span className="text-gray-700 text-xs xs:text-sm sm:text-base flex-1 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button - Responsive button */}
                    <button 
                      className="group relative px-3 xs:px-4 sm:px-5 md:px-6 py-2.5 xs:py-3 sm:py-3.5 text-white font-semibold rounded-lg xs:rounded-xl hover:shadow-md transition-all duration-300 overflow-hidden self-stretch lg:self-start mt-auto w-full text-center"
                      style={{ 
                        background: `linear-gradient(135deg, ${service.color}, ${service.color}CC)`
                      }}
                      aria-label={`View details for ${service.title}`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-2.5">
                        <span className="text-xs xs:text-sm sm:text-base whitespace-nowrap">View Details</span>
                        <FaArrowRight className="text-xs xs:text-sm sm:text-base group-hover:translate-x-0.5 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </button>

                    {/* Decorative Corner */}
                    <div 
                      className="absolute -bottom-4 -right-4 w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full opacity-10 group-hover:opacity-15 transition-opacity duration-500"
                      style={{ backgroundColor: service.color }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA - Only show on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="hidden lg:block mt-12 md:mt-16 lg:mt-20 text-center"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            View All Services
          </button>
        </motion.div>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        /* Base responsive text clamping */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Extra small screens (below 320px) */
        @media (max-width: 319px) {
          .min-w-\[280px\] {
            min-width: 280px;
          }
          
          .min-h-\[300px\] {
            min-height: 280px;
          }
          
          /* Improve text sizes */
          .text-2xl {
            font-size: 1.375rem;
            line-height: 1.2;
          }
          
          .text-base {
            font-size: 0.9375rem;
          }
          
          .text-xs {
            font-size: 0.75rem;
          }
          
          /* Stack everything properly */
          .flex-col {
            gap: 0.5rem;
          }
          
          /* Full width images */
          .h-\[180px\] {
            height: 160px;
          }
        }
        
        /* Small screens (320px - 479px) */
        @media (min-width: 320px) and (max-width: 479px) {
          .min-h-\[340px\] {
            min-height: 320px;
          }
        }
        
        /* Tablet portrait (768px - 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .md\:min-h-\[380px\] {
            min-height: 360px;
          }
          
          .md\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          
          /* Adjust image height for tablet */
          .md\:h-\[200px\] {
            height: 180px;
          }
          
          /* Reduce padding on tablet */
          .md\:p-5 {
            padding: 1rem;
          }
          
          /* Smaller text on tablet */
          .md\:text-2xl {
            font-size: 1.5rem;
          }
          
          .md\:text-lg {
            font-size: 1rem;
          }
        }
        
        /* Tablet landscape (1024px - 1279px) */
        @media (min-width: 1024px) and (max-width: 1279px) {
          .lg\:min-h-\[400px\] {
            min-height: 380px;
          }
          
          /* Adjust grid gap */
          .lg\:gap-8 {
            gap: 1.5rem;
          }
          
          /* Smaller padding */
          .lg\:p-6 {
            padding: 1.25rem;
          }
          
          /* Adjust image section */
          .lg\:w-2\/5 {
            width: 40%;
          }
          
          .lg\:w-3\/5 {
            width: 60%;
          }
          
          /* Smaller text */
          .lg\:text-3xl {
            font-size: 1.75rem;
          }
          
          .lg\:text-base {
            font-size: 1rem;
          }
        }
        
        /* Large desktop (1280px and above) */
        @media (min-width: 1280px) {
          .xl\:gap-10 {
            gap: 2.5rem;
          }
        }
        
        /* Improve touch targets on mobile */
        @media (max-width: 767px) {
          button, 
          [role="button"] {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* Prevent image distortion */
        img {
          will-change: transform;
          backface-visibility: hidden;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Better text rendering */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        
        /* Fix for very wide screens */
        @media (min-width: 1536px) {
          .max-w-7xl {
            max-width: 80rem;
          }
        }
        
        /* Fix for iOS Safari */
        @supports (-webkit-touch-callout: none) {
          .min-h-\[300px\] {
            min-height: -webkit-fill-available;
          }
        }
        
        /* Print styles */
        @media print {
          .group-hover\:scale-105 {
            transform: none !important;
          }
          
          .shadow-md, 
          .hover\:shadow-xl {
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ModernServicesSection;