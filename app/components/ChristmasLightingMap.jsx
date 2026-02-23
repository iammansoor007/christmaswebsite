"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import fadedmap from "../../public/images/realmap.png";
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
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-xl xs:text-2xl font-montserrat font-extrabold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 xs:mb-4 leading-tight"
            >
              Areas We Are{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-amber-500 to-red-500 bg-clip-text text-transparent break-words text-center">
                  Proud Serving
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
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none" />

        {/* Animated Car with mobile positioning adjustment */}
        <div className="absolute z-20 left-0 h-full flex items-center">
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "4px" }}
            transition={{
              duration: 1,
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