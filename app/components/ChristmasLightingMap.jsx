"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaMapMarkerAlt, 
  FaClock, 
  FaPhoneAlt, 
  FaCar, 
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaTree,
  FaShieldAlt,
  FaQuoteRight
} from 'react-icons/fa';

export default function VanMapSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [isMobile, setIsMobile] = useState(false);
  const [gradientPositions, setGradientPositions] = useState([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    // Generate gradient positions only on client side
    const count = window.innerWidth < 768 ? 2 : 4;
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

  const steps = [
    {
      number: "01",
      title: "Multiple Locations",
      description: "With strategically located stores across the region, we deliver premium service right at your doorstep—fast, reliable, and professional.",
      icon: FaMapMarkerAlt,
      color: "#EF4444", // red
      features: ["4+ store locations", "Local service teams", "Fast response times"]
    },
    {
      number: "02",
      title: "24/7 Availability",
      description: "Our dedicated team is available around the clock to handle your Christmas lighting needs, ensuring timely service whenever you need it.",
      icon: FaClock,
      color: "#F59E0B", // amber
      features: ["Always available", "Emergency services", "Flexible scheduling"]
    },
    {
      number: "03",
      title: "Fast Response",
      description: "We pride ourselves on quick response times with an average of 30 minutes from inquiry to on-site assessment for your lighting project.",
      icon: FaCar,
      color: "#10B981", // emerald
      features: ["30min avg response", "Quick assessments", "Rapid installation"]
    }
  ];

  return (
    <>
      <section 
        ref={containerRef}
        className="relative w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #e5e7eb 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Accent Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {gradientPositions.map((pos, i) => (
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
          ))}
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6 border border-gray-100"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                Premium Service Network
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
            >
              Fast Local{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-amber-500 to-red-500 bg-clip-text text-transparent">
                  Holiday Service
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
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Professional Christmas lighting service delivered right at your doorstep
            </motion.p>
          </motion.div>

          {/* Modern Steps - Horizontal on Desktop, Vertical on Mobile */}
          <div className="relative">
            {/* Connection Line - Desktop Only */}
            {!isMobile && (
              <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
                <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 opacity-20" />
              </div>
            )}

            {/* Steps Container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15 }}
                  whileHover={{ y: -8 }}
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

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ 
                          backgroundColor: `${step.color}15`,
                          color: step.color
                        }}
                      >
                        <step.icon className="text-2xl" />
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
                            <FaCheckCircle style={{ color: step.color }} className="text-sm" />
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
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Map Section with Car Animation */}
      <section className="relative w-full h-[500px] sm:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/map.jpg"
            alt="Service Area Map"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none" />

        {/* Animated Car */}
        <div className="absolute z-20 left-0 h-full flex items-center">
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "50px" }}
            transition={{ 
              duration: 1.2,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/images/car.png"
              alt="Service Vehicle"
              className="relative h-[300px] sm:h-[360px] lg:h-[420px] w-auto"
              style={{
                filter: "drop-shadow(10px 10px 20px rgba(0,0,0,0.2))"
              }}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}