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
  const [screenSize, setScreenSize] = useState("desktop");
  const [gradientPositions, setGradientPositions] = useState([]);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);

      if (width < 300) setScreenSize("xs-300");
      else if (width < 400) setScreenSize("xs");
      else if (width < 640) setScreenSize("sm");
      else if (width < 768) setScreenSize("md");
      else if (width < 1024) setScreenSize("lg");
      else setScreenSize("xl");
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
              className="text-xl xs:text-2xl font-montserrat font-extrabold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 xs:mb-4 leading-tight"
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

          {/* Modern Steps - Responsive Layout with Fixed Card Sizing */}
          <div className="relative">
            {/* Connection Line - Desktop Only */}
            {!isMobile && (
              <div className="absolute top-1/2 left-0 right-0 h-0.5 md:h-1 -translate-y-1/2 hidden md:block">
                <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 opacity-20" />
              </div>
            )}

            {/* Steps Container - Responsive grid with fixed card heights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="relative group w-full"
                >
                  {/* Step Number Badge - Floating */}
                  <div className="absolute -top-3 xs:-top-4 left-1/2 -translate-x-1/2 z-20">
                    <div
                      className={`
                        rounded-lg xs:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm
                        ${screenSize === "xs-300" ? "w-7 h-7 text-xs" : ""}
                        ${screenSize === "xs" ? "w-8 h-8 text-xs" : ""}
                        ${screenSize === "sm" ? "w-9 h-9 text-sm" : ""}
                        ${screenSize === "md" ? "w-10 h-10 text-sm" : ""}
                        ${screenSize === "lg" ? "lg:w-11 lg:h-11 lg:text-base" : ""}
                        ${screenSize === "xl" ? "xl:w-12 xl:h-12 xl:text-base" : ""}
                      `}
                      style={{ backgroundColor: step.color, color: "white" }}
                    >
                      <span className="font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Modern White Card - Fixed height based on screen size */}
                  <div className={`
                    relative h-full bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col
                    ${screenSize === "xs-300" ? "min-h-[340px] p-3" : ""}
                    ${screenSize === "xs" ? "min-h-[360px] p-3.5" : ""}
                    ${screenSize === "sm" ? "min-h-[380px] p-4" : ""}
                    ${screenSize === "md" ? "min-h-[400px] p-4" : ""}
                    ${screenSize === "lg" ? "lg:min-h-[420px] lg:p-5" : ""}
                    ${screenSize === "xl" ? "xl:min-h-[440px] xl:p-6" : ""}
                  `}>
                    {/* Accent Border Top */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 xs:h-1.5"
                      style={{ backgroundColor: step.color }}
                    />

                    {/* Icon */}
                    <div className="flex justify-center mt-2 xs:mt-3 mb-2 xs:mb-3">
                      <div
                        className={`
                          rounded-xl xs:rounded-2xl flex items-center justify-center shadow-md
                          ${screenSize === "xs-300" ? "w-10 h-10 text-lg" : ""}
                          ${screenSize === "xs" ? "w-11 h-11 text-xl" : ""}
                          ${screenSize === "sm" ? "w-12 h-12 text-xl" : ""}
                          ${screenSize === "md" ? "w-14 h-14 text-2xl" : ""}
                          ${screenSize === "lg" ? "lg:w-16 lg:h-16 lg:text-2xl" : ""}
                          ${screenSize === "xl" ? "xl:w-16 xl:h-16 xl:text-3xl" : ""}
                        `}
                        style={{
                          backgroundColor: `${step.color}15`,
                          color: step.color,
                        }}
                      >
                        <step.icon />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className={`
                      font-bold text-gray-900 text-center leading-tight mb-2 xs:mb-3
                      ${screenSize === "xs-300" ? "text-base" : ""}
                      ${screenSize === "xs" ? "text-lg" : ""}
                      ${screenSize === "sm" ? "text-xl" : ""}
                      ${screenSize === "md" ? "text-xl" : ""}
                      ${screenSize === "lg" ? "lg:text-2xl" : ""}
                      ${screenSize === "xl" ? "xl:text-3xl" : ""}
                    `}>
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className={`
                      text-gray-600 leading-relaxed text-center line-clamp-3 mb-2 xs:mb-3 flex-grow
                      ${screenSize === "xs-300" ? "text-[10px]" : ""}
                      ${screenSize === "xs" ? "text-xs" : ""}
                      ${screenSize === "sm" ? "text-sm" : ""}
                      ${screenSize === "md" ? "text-sm" : ""}
                      ${screenSize === "lg" ? "lg:text-sm" : ""}
                      ${screenSize === "xl" ? "xl:text-base" : ""}
                    `}>
                      {step.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-1.5 xs:space-y-2 mt-auto pt-2 border-t border-gray-100">
                      {step.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-1.5 xs:gap-2"
                        >
                          <div
                            className={`
                              flex-shrink-0 rounded-full flex items-center justify-center mt-0.5
                              ${screenSize === "xs-300" ? "w-3 h-3" : ""}
                              ${screenSize === "xs" ? "w-3.5 h-3.5" : ""}
                              ${screenSize === "sm" ? "w-4 h-4" : ""}
                              ${screenSize === "md" ? "w-4 h-4" : ""}
                              ${screenSize === "lg" ? "lg:w-4 lg:h-4" : ""}
                              ${screenSize === "xl" ? "xl:w-5 xl:h-5" : ""}
                            `}
                            style={{ backgroundColor: `${step.color}15` }}
                          >
                            <FaCheckCircle
                              style={{ color: step.color }}
                              className={`
                                ${screenSize === "xs-300" ? "text-[8px]" : ""}
                                ${screenSize === "xs" ? "text-[10px]" : ""}
                                ${screenSize === "sm" ? "text-xs" : ""}
                                ${screenSize === "md" ? "text-xs" : ""}
                                ${screenSize === "lg" ? "lg:text-xs" : ""}
                                ${screenSize === "xl" ? "xl:text-sm" : ""}
                              `}
                            />
                          </div>
                          <span className={`
                            text-gray-700 flex-1 leading-relaxed
                            ${screenSize === "xs-300" ? "text-[10px]" : ""}
                            ${screenSize === "xs" ? "text-xs" : ""}
                            ${screenSize === "sm" ? "text-xs" : ""}
                            ${screenSize === "md" ? "text-sm" : ""}
                            ${screenSize === "lg" ? "lg:text-sm" : ""}
                            ${screenSize === "xl" ? "xl:text-base" : ""}
                          `}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Decorative Corner */}
                    <div
                      className="absolute -bottom-4 -right-4 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
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
                        className={`flex justify-center my-3 xs:my-4 ${isTablet && (index === 0 || index === 2) ? "md:hidden" : ""}`}
                      >
                        <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                          <FaArrowRight className="text-gray-400 text-[10px] xs:text-xs sm:text-sm" />
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

          /* Extra small screens (below 320px) */
          @media (max-width: 319px) {
            .min-w-\[280px\] {
              min-width: 280px;
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

      {/* Map Section with Car Animation - COMPLETELY UNCHANGED */}
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

        {/* Responsive Styles for map section - COMPLETELY UNCHANGED */}
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