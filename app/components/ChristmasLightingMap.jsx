"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import fadedmap from "../../public/images/fadedmap.png";
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
  FaQuoteRight,
} from "react-icons/fa";

export default function VanMapSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [gradientPositions, setGradientPositions] = useState([]);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();

    // Generate gradient positions only on client side
    const count = window.innerWidth < 768 ? 2 : 4;
    const positions = Array(count)
      .fill(null)
      .map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        width: Math.random() * 200 + 100,
        height: Math.random() * 200 + 100,
      }));

    setGradientPositions(positions);

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const steps = [
    {
      number: "01",
      title: "Multiple Locations",
      description:
        "With strategically located stores across the region, we deliver premium service right at your doorstep—fast, reliable, and professional.",
      icon: FaMapMarkerAlt,
      color: "#EF4444", // red
      features: [
        "4+ store locations",
        "Local service teams",
        "Fast response times",
      ],
    },
    {
      number: "02",
      title: "24/7 Availability",
      description:
        "Our dedicated team is available around the clock to handle your Christmas lighting needs, ensuring timely service whenever you need it.",
      icon: FaClock,
      color: "#F59E0B", // amber
      features: [
        "Always available",
        "Emergency services",
        "Flexible scheduling",
      ],
    },
    {
      number: "03",
      title: "Fast Response",
      description:
        "We pride ourselves on quick response times with an average of 30 minutes from inquiry to on-site assessment for your lighting project.",
      icon: FaCar,
      color: "#10B981", // emerald
      features: [
        "30min avg response",
        "Quick assessments",
        "Rapid installation",
      ],
    },
  ];

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 min-w-[280px]"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, #e5e7eb 2px, transparent 2px)`,
              backgroundSize: "40px 40px",
            }}
          />
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
                filter: "blur(40px)",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Modern Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 px-1"
          >
            {/* Minimal Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-white rounded-full shadow-sm mb-4 xs:mb-5 sm:mb-6 border border-gray-100"
            >
              <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-xs xs:text-sm font-medium text-gray-700 uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] xs:max-w-none">
                Premium Service Network
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 xs:mb-4 leading-tight"
            >
              Fast Local{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-amber-500 to-red-500 bg-clip-text text-transparent break-words text-center">
                  Holiday Service
                </span>
                <svg
                  className="absolute -bottom-1 xs:-bottom-1.5 sm:-bottom-2 left-0 w-full h-1.5 xs:h-2 sm:h-2.5 text-gray-200"
                  viewBox="0 0 100 10"
                >
                  <path
                    d="M0,5 Q25,0 50,5 T100,5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2 xs:px-3 leading-relaxed text-center"
            >
              Professional Christmas lighting service delivered right at your
              doorstep
            </motion.p>
          </motion.div>

          {/* Modern Steps - Responsive Layout */}
          <div className="relative">
            {/* Connection Line - Desktop Only */}
            {!isMobile && (
              <div className="absolute top-1/2 left-0 right-0 h-0.5 md:h-1 -translate-y-1/2 hidden md:block">
                <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 opacity-20" />
              </div>
            )}

            {/* Steps Container - Responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-6 lg:gap-8 xl:gap-10">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15 }}
                  whileHover={{ y: -6 }}
                  className="relative group"
                >
                  {/* Step Number Badge - Floating */}
                  <div className="absolute -top-3 xs:-top-4 left-1/2 -translate-x-1/2 z-20">
                    <div
                      className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg xs:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm"
                      style={{ backgroundColor: step.color, color: "white" }}
                    >
                      <span className="text-sm xs:text-base font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Modern White Card - Responsive height */}
                  <div className="relative h-full bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-6 lg:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden min-h-[320px] xs:min-h-[340px] sm:min-h-[360px] md:min-h-[380px]">
                    {/* Accent Border Top */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 xs:h-1.5"
                      style={{ backgroundColor: step.color }}
                    />

                    {/* Icon */}
                    <div className="flex justify-center mb-4 xs:mb-5 sm:mb-6">
                      <div
                        className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl xs:rounded-2xl flex items-center justify-center shadow-md"
                        style={{
                          backgroundColor: `${step.color}15`,
                          color: step.color,
                        }}
                      >
                        <step.icon className="text-lg xs:text-xl sm:text-2xl" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 xs:mb-4 text-center leading-tight">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-gray-600 text-xs xs:text-sm sm:text-base md:text-base mb-4 xs:mb-5 sm:mb-6 leading-relaxed text-center line-clamp-3 md:line-clamp-4">
                      {step.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 flex-grow">
                      {step.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start xs:items-center gap-2 xs:gap-3"
                        >
                          <div
                            className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mt-0.5 xs:mt-0"
                            style={{ backgroundColor: `${step.color}15` }}
                          >
                            <FaCheckCircle
                              style={{ color: step.color }}
                              className="text-xs xs:text-sm"
                            />
                          </div>
                          <span className="text-gray-700 text-xs xs:text-sm sm:text-base md:text-sm lg:text-base flex-1 leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Decorative Corner */}
                    <div
                      className="absolute -bottom-4 -right-4 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>

                  {/* Arrow Connector - Mobile & Tablet Only */}
                  {(isMobile ||
                    (isTablet &&
                      index % 2 === 0 &&
                      index < steps.length - 1)) &&
                    index < steps.length - 1 && (
                      <div
                        className={`flex justify-center my-4 xs:my-5 ${isTablet && (index === 0 || index === 2) ? "md:hidden" : ""}`}
                      >
                        <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                          <FaArrowRight className="text-gray-400 text-xs xs:text-sm" />
                        </div>
                      </div>
                    )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Styles for cards section */}
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

            .min-h-\[320px\] {
              min-height: 300px;
            }

            /* Improve text sizes */
            .text-xl {
              font-size: 1.25rem;
              line-height: 1.3;
            }

            .text-sm {
              font-size: 0.8125rem;
            }

            .text-xs {
              font-size: 0.75rem;
            }

            /* Better spacing */
            .space-y-2 > * + * {
              margin-top: 0.375rem;
            }
          }

          /* Small screens (320px - 479px) */
          @media (min-width: 320px) and (max-width: 479px) {
            .min-h-\[340px\] {
              min-height: 330px;
            }
          }

          /* Tablet portrait (768px - 1023px) */
          @media (min-width: 768px) and (max-width: 1023px) {
            .md\:min-h-\[380px\] {
              min-height: 370px;
            }

            .md\:grid-cols-2 {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            /* Adjust padding for tablet */
            .md\:p-6 {
              padding: 1.25rem;
            }

            /* Adjust text sizes for tablet */
            .md\:text-2xl {
              font-size: 1.5rem;
            }

            .md\:text-base {
              font-size: 1rem;
            }

            .md\:text-sm {
              font-size: 0.9375rem;
            }

            /* Tablet-specific line clamping */
            .md\:line-clamp-4 {
              -webkit-line-clamp: 4;
            }

            /* Hide every other arrow connector on tablet */
            .md\:hidden {
              display: none;
            }
          }

          /* Tablet landscape (1024px - 1279px) */
          @media (min-width: 1024px) and (max-width: 1279px) {
            .lg\:gap-8 {
              gap: 1.5rem;
            }

            /* Adjust padding */
            .lg\:p-8 {
              padding: 1.5rem;
            }

            /* Adjust text sizes */
            .lg\:text-3xl {
              font-size: 1.75rem;
            }

            .lg\:text-base {
              font-size: 1rem;
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

          /* Better text rendering */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
        `}</style>
      </section>

      {/* Map Section with Car Animation - Fixed Image */}
      <section className="relative w-full h-[400px] xs:h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] overflow-hidden">
        {/* Map Image using Next.js Image component */}
        <div className="absolute inset-0">
          <Image
            src={fadedmap}
            alt="Service Area Map"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none" />

        {/* Animated Car with mobile positioning adjustment */}
        <div className="absolute z-20 left-0 h-full flex items-center">
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "30px" }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/images/car2.png"
              alt="Service Vehicle"
              className="relative h-[250px] xs:h-[280px] sm:h-[300px] md:h-[340px] lg:h-[380px] xl:h-[420px] w-auto"
              style={{
                filter: "drop-shadow(10px 10px 20px rgba(0,0,0,0.2))",
              }}
            />
          </motion.div>
        </div>

        {/* Responsive Styles for map section */}
        <style jsx>{`
          /* Mobile van positioning adjustment */
          @media (max-width: 767px) {
            .absolute.z-20.left-0 {
              left: -10px !important;
            }

            .h-\[250px\] {
              height: 220px;
            }
          }

          /* Very small screens */
          @media (max-width: 379px) {
            .h-\[400px\] {
              height: 350px;
            }

            .absolute.z-20.left-0 {
              left: -15px !important;
            }

            .h-\[250px\] {
              height: 200px;
            }
          }

          /* Tablet adjustments */
          @media (min-width: 768px) and (max-width: 1023px) {
            .h-\[550px\] {
              height: 500px;
            }

            .h-\[340px\] {
              height: 300px;
            }
          }
        `}</style>
      </section>
    </>
  );
}