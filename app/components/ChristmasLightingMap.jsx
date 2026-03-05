"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import fadedmap from "../../public/images/realmap.jpeg";
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
  const mapSectionRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: false,
    margin: "-50px",
    amount: 0.3
  });

  // Track if map section is in view separately
  const isMapInView = useInView(mapSectionRef, {
    once: false,
    amount: 0.2
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop");
  const [gradientPositions, setGradientPositions] = useState([]);

  // Reset animation when map section leaves view
  useEffect(() => {
    if (!isMapInView) {
      setHasAnimated(false);
    }
  }, [isMapInView]);

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

  // Super black dust particles animation variants
  const dustVariants = {
    initial: (i) => ({
      x: -50,
      y: 0,
      opacity: 0,
      scale: 0,
    }),
    animate: (i) => ({
      x: [-50, 20, 60, 100],
      y: [-10, -20, -10, 5],
      opacity: [0, 0.9, 0.5, 0],
      scale: [0, 1.2, 0.6, 0],
      transition: {
        duration: 1.5,
        delay: 0.1 * i,
        ease: "easeOut",
        times: [0, 0.3, 0.7, 1],
      }
    })
  };

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-6 py-8 xs:py-10 sm:py-12 md:py-12 lg:py-14 min-w-[280px]"
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
            <h2 className="text-center font-montserrat text-4xl md:text-5xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                Areas We Are Proud Serving
              </span>
            </h2>

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

      {/* Map Section with Car Animation and Super Black Dust Effect */}
      <section
        ref={mapSectionRef}
        className="relative w-full h-[400px] xs:h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] overflow-hidden"
      >
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
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none" />

        {/* Animated Car with Super Black Dust Effect */}
        <div className="absolute z-20 left-0 h-full flex items-center">
          {/* Car */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={isMapInView ? { x: "4px" } : { x: "-100%" }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="relative"
          >
            <img
              src="/images/car2.png"
              alt="Service Vehicle"
              className="relative h-[250px] xs:h-[280px] sm:h-[300px] md:h-[340px] lg:h-[380px] xl:h-[420px] w-auto z-20"
              style={{
                filter: "drop-shadow(10px 10px 20px rgba(0,0,0,0.2))",
              }}
            />

            {/* Super Black Dust Particles - Only show during animation */}
            {isMapInView && (
              <>
                {/* Main super black dust cloud behind wheels */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.8, 0.3, 0], scale: [0, 1.2, 0.8, 0] }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="absolute -bottom-8 -right-16 w-48 h-32"
                >
                  <div className="absolute inset-0 bg-black-500 rounded-full blur-2xl opacity-80" />
                  <div className="absolute -left-4 -top-4 w-24 h-20 bg-black-500 rounded-full blur-xl opacity-60" />
                  <div className="absolute -right-4 bottom-0 w-20 h-16 bg-black-500 rounded-full blur-lg opacity-70" />
                </motion.div>

                {/* Rear wheel dust - extra black */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.9, 0.4, 0], scale: [0, 1.5, 0.8, 0] }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="absolute -bottom-6 -right-8 w-32 h-24"
                >
                  <div className="absolute inset-0 bg-black-500 rounded-full blur-xl opacity-90" />
                </motion.div>

                {/* Front wheel dust */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.7, 0.3, 0], scale: [0, 1.3, 0.6, 0] }}
                  transition={{ duration: 1.1, delay: 0.25 }}
                  className="absolute -bottom-4 right-12 w-24 h-20"
                >
                  <div className="absolute inset-0 bg-black rounded-full blur-lg opacity-80" />
                </motion.div>

                {/* Individual super black dust particles */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={dustVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute"
                    style={{
                      left: `${-30 - i * 8}px`,
                      bottom: `${5 + (i % 4) * 20}px`,
                    }}
                  >
                    <div
                      className="bg-black rounded-full"
                      style={{
                        width: `${6 + (i % 4) * 4}px`,
                        height: `${6 + (i % 4) * 4}px`,
                        opacity: 0.9,
                        filter: "blur(2px)",
                        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                      }}
                    />
                  </motion.div>
                ))}

                {/* Additional dense black particles */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={`dense-${i}`}
                    initial={{ x: -40, y: 0, opacity: 0 }}
                    animate={{
                      x: [-40, 10, 50, 90],
                      y: [0, -15, 5, 10],
                      opacity: [0, 0.8, 0.4, 0],
                      scale: [0, 1.4, 0.7, 0]
                    }}
                    transition={{ duration: 1.4, delay: 0.15 * i }}
                    className="absolute"
                    style={{
                      left: `${-20}px`,
                      bottom: `${15 + i * 12}px`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-4 h-4 bg-black rounded-full blur-sm opacity-90" />
                      <div className="absolute -inset-1 bg-black rounded-full blur-md opacity-40" />
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>

          {/* Super black dust trail behind the car */}
          {isMapInView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0.3, 0] }}
              transition={{ duration: 1.3, delay: 0.2 }}
              className="absolute left-1/2 bottom-8 pointer-events-none"
              style={{ transform: "translateX(-50%)" }}
            >
              <div className="relative">
                {/* Main trail */}
                <div className="absolute w-32 h-16 bg-black rounded-full blur-2xl opacity-60" />
                <div className="absolute w-24 h-12 bg-black rounded-full blur-xl opacity-70 -left-8 bottom-2" />
                <div className="absolute w-16 h-8 bg-black rounded-full blur-lg opacity-80 -left-16 bottom-4" />
                <div className="absolute w-12 h-6 bg-black rounded-full blur-md -left-24 bottom-6 opacity-60" />

                {/* Extra dark spots in trail */}
                <div className="absolute -left-8 bottom-4 w-8 h-8 bg-black rounded-full blur-md opacity-90" />
                <div className="absolute -left-16 bottom-2 w-10 h-10 bg-black rounded-full blur-lg opacity-70" />
                <div className="absolute -left-24 bottom-0 w-12 h-12 bg-black rounded-full blur-xl opacity-50" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Super black speed lines effect */}
        {isMapInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute z-15 left-0 top-1/2 transform -translate-y-1/2 pointer-events-none"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={`speed-${i}`}
                initial={{ x: -150, opacity: 0 }}
                animate={{
                  x: [-150, 250],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.08 * i,
                  ease: "linear",
                  times: [0, 0.3, 1]
                }}
                className="absolute"
                style={{
                  top: `${-25 + i * 18}px`,
                  left: "30px",
                }}
              >
                <div className="w-40 h-1 bg-gradient-to-r from-transparent via-black to-transparent opacity-40 blur-sm" />
                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-black to-transparent opacity-60 blur-none -mt-1 ml-4" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Ground dust effect */}
        {isMapInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.2, 0] }}
            transition={{ duration: 1.5, delay: 0.1 }}
            className="absolute bottom-0 left-20 right-0 h-16 pointer-events-none"
          >
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/30 to-transparent blur-xl" />
            <div className="absolute bottom-2 left-10 w-40 h-8 bg-black/20 rounded-full blur-2xl" />
          </motion.div>
        )}

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