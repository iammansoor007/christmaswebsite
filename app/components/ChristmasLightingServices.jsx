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
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 min-w-[300px]"
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
          className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 px-3 py-1.5 bg-gradient-to-r from-red-600/10 via-amber-500/10 to-red-600/10 rounded-full shadow-sm mb-4 xs:mb-5 sm:mb-6 border border-amber-500/30 w-fit mx-auto"
          >
            <GiSparkles className="text-xs xs:text-sm sm:text-base text-amber-500 flex-shrink-0" />
            <span className="text-xs xs:text-sm sm:text-sm font-medium text-gray-800 uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis max-w-[250px] xs:max-w-none">
              {badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 xs:mb-4 px-1 leading-tight"
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
            className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto px-3 xs:px-4 leading-relaxed text-center"
          >
            {subtitle}
          </motion.p>

          {/* Decorative divider */}
          <div className="mt-4 xs:mt-5 sm:mt-6 h-0.5 xs:h-1 w-24 xs:w-32 sm:w-40 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.15 }}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                {/* Card Container */}
                <div className="flex flex-col lg:flex-row h-full bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden min-h-[280px] xs:min-h-[320px] sm:min-h-[340px]">
                  
                  {/* Image Section */}
                  <div className="lg:w-2/5 relative min-h-[160px] xs:min-h-[180px] sm:min-h-[200px]">
                    <div className="relative h-full overflow-hidden">
                      <img 
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      
                      {/* Image Badge */}
                      <div 
                        className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full text-white text-xs xs:text-sm font-medium shadow-md backdrop-blur-sm"
                        style={{ backgroundColor: `${service.color}CC` }}
                      >
                        {service.stat}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-3/5 p-4 xs:p-5 sm:p-6 md:p-7 flex flex-col">
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 xs:-top-4 -left-3 xs:-left-4 z-20">
                      <div 
                        className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: service.color, color: 'white' }}
                      >
                        <span className="text-sm xs:text-base font-bold">{service.number}</span>
                      </div>
                    </div>

                    {/* Accent Border Top */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1.5"
                      style={{ backgroundColor: service.color }}
                    />

                    {/* Header with Icon */}
                    <div className="flex items-center gap-3 xs:gap-4 mb-4 xs:mb-5 mt-2">
                      <div 
                        className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                        style={{ 
                          backgroundColor: `${service.color}15`,
                          color: service.color
                        }}
                      >
                        <IconComponent className="text-xl xs:text-2xl" />
                      </div>
                      <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm xs:text-base sm:text-lg mb-4 xs:mb-5 leading-relaxed flex-grow line-clamp-3">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 xs:space-y-2.5 mb-5 xs:mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start xs:items-center gap-3">
                          <div 
                            className="flex-shrink-0 w-5 h-5 xs:w-6 xs:h-6 rounded-full flex items-center justify-center mt-0.5 xs:mt-0"
                            style={{ backgroundColor: `${service.color}15` }}
                          >
                            <FaCheckCircle style={{ color: service.color }} className="text-xs xs:text-sm" />
                          </div>
                          <span className="text-gray-700 text-sm xs:text-base flex-1">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button 
                      className="group relative px-5 xs:px-6 py-3 xs:py-3.5 text-white font-semibold rounded-xl hover:shadow-md transition-all duration-300 overflow-hidden self-start mt-auto w-full xs:w-auto text-center"
                      style={{ 
                        background: `linear-gradient(135deg, ${service.color}, ${service.color}CC)`
                      }}
                      aria-label={`View details for ${service.title}`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 xs:gap-2.5">
                        <span className="text-sm xs:text-base whitespace-nowrap">View Details</span>
                        <FaArrowRight className="text-sm xs:text-base group-hover:translate-x-0.5 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </button>

                    {/* Decorative Corner */}
                    <div 
                      className="absolute -bottom-4 -right-4 w-16 h-16 xs:w-20 xs:h-20 rounded-full opacity-10 group-hover:opacity-15 transition-opacity duration-500"
                      style={{ backgroundColor: service.color }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

       
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 639px) {
          .line-clamp-3 {
            display: -webkit-box; 
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
        
        @media (max-width: 479px) {
          /* Base font size adjustments for better readability */
          html {
            font-size: 16px;
          }
          
          /* Improve button tap targets */
          button {
            min-height: 48px;
            min-width: 48px;
          }
          
          /* Ensure text doesn't overflow */
          .text-ellipsis {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        
        @media (max-width: 379px) {
          /* Further adjustments for very small screens */
          .min-h-\[280px\] {
            min-height: 260px;
          }
          
          /* Increase text sizes for better readability */
          .text-2xl {
            font-size: 1.5rem;
          }
          
          .text-lg {
            font-size: 1.125rem;
          }
          
          .text-base {
            font-size: 1rem;
          }
        }
        
        @media (max-width: 319px) {
          /* Extra small screen optimizations */
          .min-h-\[280px\] {
            min-height: 240px;
          }
          
          .text-2xl {
            font-size: 1.375rem;
          }
          
          .text-lg {
            font-size: 1rem;
          }
          
          /* Center everything */
          .flex {
            justify-content: center;
          }
          
          /* Stack everything vertically */
          .flex-row {
            flex-direction: column;
            gap: 1rem;
          }
          
          /* Full width buttons */
          button {
            width: 100%;
          }
        }
        
        /* Prevent horizontal scroll */
        .min-w-\[300px\] {
          min-width: 300px;
        }
        
        /* Improve text rendering on all screens */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Image optimization */
        img {
          will-change: transform;
          backface-visibility: hidden;
        }
        
        /* Ensure text centering on smallest screens */
        @media (max-width: 319px) {
          .text-center {
            text-align: center !important;
          }
          
          .mx-auto {
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ModernServicesSection;