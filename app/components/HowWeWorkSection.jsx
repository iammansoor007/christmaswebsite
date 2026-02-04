// components/HowWeWorkSection.jsx
'use client'
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FaPhoneAlt, 
  FaCalendarAlt, 
  FaArrowRight
} from 'react-icons/fa';
import { getHowWeWorkData } from '../services/dataService';

// Custom CheckCircle component to avoid hydration mismatch
const CheckCircleIcon = ({ color, size = "text-sm", className = "" }) => (
  <svg 
    stroke="currentColor" 
    fill="currentColor" 
    strokeWidth="0" 
    viewBox="0 0 512 512" 
    className={`${size} ${className}`}
    height="1em" 
    width="1em" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: color || undefined }}
  >
    <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
  </svg>
);

// Custom icon wrapper to prevent hydration issues
const SafeIconComponent = ({ icon: Icon, color, className }) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <div className={`w-6 h-6 ${className} bg-gray-200 animate-pulse rounded`} />;
  }
  
  // For FaCheckCircle specifically, use our custom component
  if (Icon.name === 'FaCheckCircle' || Icon.displayName === 'FaCheckCircle') {
    return <CheckCircleIcon color={color} className={className} />;
  }
  
  return <Icon className={className} style={{ color: color || undefined }} />;
};

const HowWeWorkSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [isMobile, setIsMobile] = useState(false);
  const [gradientPositions, setGradientPositions] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Get data
  const workData = getHowWeWorkData();
  const { badge, title, subtitle, steps, cta } = workData;

  // Detect mobile and generate positions only on client side
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    // Generate gradient positions
    const count = window.innerWidth < 768 ? 3 : 6;
    const positions = Array(count).fill(null).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 200 + 100,
      height: Math.random() * 200 + 100,
    }));
    
    setGradientPositions(positions);
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Render gradient positions only on client
  const renderGradients = () => {
    if (!isClient) return null;
    
    return gradientPositions.map((pos, i) => (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${pos.left}%`,
          top: `${pos.top}%`,
          width: `${pos.width}px`,
          height: `${pos.height}px`,
          background: `radial-gradient(circle, rgba(239, 68, 68, 0.03) 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />
    ));
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white px-3 min-[320px]:px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-28"
      style={{ minWidth: '300px' }}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #e5e7eb 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Accent Elements - Client-side only rendering */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {renderGradients()}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          {/* Minimal Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">
              {badge}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-2xl min-[350px]:text-2.5xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight tracking-tight"
          >
            {title.prefix}{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-amber-500 to-red-500 bg-clip-text text-transparent">
                {title.text}
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-gray-200" viewBox="0 0 100 10">
                <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-lg xs:text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        </motion.div>

        {/* Modern Steps - Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Connection Line - Desktop Only */}
          {!isMobile && isClient && (
            <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
              <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 opacity-20" />
            </div>
          )}

          {/* Steps Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15 }}
                  whileHover={isClient ? { y: -8 } : {}}
                  className="relative group"
                >
                  {/* Step Number Badge - Floating */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-sm"
                      style={{ backgroundColor: step.color, color: 'white' }}
                    >
                      <span className="text-lg font-bold">{step.number}</span>
                    </div>
                  </div>

                  {/* Modern White Card */}
                  <div className="relative h-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                    {/* Accent Border Top */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1.5"
                      style={{ backgroundColor: step.color }}
                    />

                    {/* Icon - Use SafeIconComponent */}
                    <div className="flex justify-center mb-6">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ 
                          backgroundColor: `${step.color}15`,
                          color: step.color
                        }}
                      >
                        <SafeIconComponent 
                          icon={IconComponent} 
                          color={step.color}
                          className="text-2xl"
                        />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed text-center">
                      {step.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div 
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${step.color}15` }}
                          >
                            <CheckCircleIcon color={step.color} />
                          </div>
                          <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Decorative Corner */}
                    <div 
                      className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>

                  {/* Arrow Connector - Mobile Only */}
                  {isMobile && index < steps.length - 1 && (
                    <div className="flex justify-center my-6">
                      <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                        <FaArrowRight className="text-gray-400" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Modern CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-16 sm:mt-20"
        >
          <div className="bg-gradient-to-r from-emerald-50 via-amber-50 to-red-50 rounded-3xl p-8 sm:p-12 text-center border border-gray-100 shadow-xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {cta.title}
            </h3>
            <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              {cta.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <FaPhoneAlt className="text-lg" />
                  <span className="text-base sm:text-lg">{cta.buttons.primary}</span>
                  <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
              
              <button className="px-8 py-4 font-semibold text-gray-700 hover:text-gray-900 border-2 border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-300 bg-white">
                <span className="flex items-center justify-center gap-3">
                  <FaCalendarAlt className="text-lg" />
                  <span className="text-base sm:text-lg">{cta.buttons.secondary}</span>
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 319px) {
          .container {
            padding-left: 0.375rem !important;
            padding-right: 0.375rem !important;
          }
          
          .step-card {
            padding: 0.75rem !important;
          }
        }
        
        @media (min-width: 320px) and (max-width: 349px) {
          .text-2\.5xl {
            font-size: 1.625rem;
            line-height: 2rem;
          }
        }
        
        @media (min-width: 350px) and (max-width: 399px) {
          .text-2\.5xl {
            font-size: 1.75rem;
            line-height: 2.125rem;
          }
        }
        
        /* Touch-friendly tap targets */
        @media (max-width: 767px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </section>
  );
};

export default HowWeWorkSection;