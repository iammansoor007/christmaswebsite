"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import fadedmap from "../../public/images/fadedmap.png";
import {
  FaMapMarkerAlt,
  FaClock,
  FaCar,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

export default function VanMapSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const steps = [
    {
      number: "01",
      title: "Multiple Locations",
      description:
        "With strategically located stores across the region, we deliver premium service right at your doorstep—fast, reliable, and professional.",
      icon: FaMapMarkerAlt,
      color: "#EF4444",
      bg: "rgba(239,68,68,0.08)",
      features: ["4+ store locations", "Local service teams", "Fast response times"],
    },
    {
      number: "02",
      title: "24/7 Availability",
      description:
        "Our dedicated team is available around the clock to handle your Christmas lighting needs, ensuring timely service whenever you need it.",
      icon: FaClock,
      color: "#F59E0B",
      bg: "rgba(245,158,11,0.08)",
      features: ["Always available", "Emergency services", "Flexible scheduling"],
    },
    {
      number: "03",
      title: "Fast Response",
      description:
        "We pride ourselves on quick response times with an average of 30 minutes from inquiry to on-site assessment for your lighting project.",
      icon: FaCar,
      color: "#10B981",
      bg: "rgba(16,185,129,0.08)",
      features: ["30min avg response", "Quick assessments", "Rapid installation"],
    },
  ];

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24"
      >
        {/* Subtle dot background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 22px 22px, #94a3b8 1.5px, transparent 1.5px)`,
            backgroundSize: "44px 44px",
          }}
        />

        {/* Soft color blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-red-100 rounded-full opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-100 rounded-full opacity-30 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-5"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-widest">
                Premium Service Network
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-montserrat font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4 leading-tight"
            >
              Fast Local{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 bg-clip-text text-transparent">
                  Holiday Service
                </span>
                <svg
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-gray-200"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Professional Christmas lighting service delivered right at your doorstep
            </motion.p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + index * 0.15, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className="relative group flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Colored top bar */}
                <div className="h-1.5" style={{ backgroundColor: step.color }} />

                <div className="flex flex-col flex-1 p-5 sm:p-6 lg:p-8 pt-6 sm:pt-7">
                  {/* Step number + icon row */}
                  <div className="flex items-center justify-between mb-5">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-sm flex-shrink-0"
                      style={{ backgroundColor: step.bg, color: step.color }}
                    >
                      <step.icon />
                    </div>
                    {/* Number badge */}
                    <span
                      className="text-3xl sm:text-4xl font-black opacity-15 leading-none"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-gray-900 text-lg sm:text-xl lg:text-2xl mb-2 leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed mb-5 flex-grow">
                    {step.description}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-1" />

                  {/* Features */}
                  <ul className="mt-4 space-y-2.5">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <FaCheckCircle
                          className="flex-shrink-0 text-sm"
                          style={{ color: step.color }}
                        />
                        <span className="text-gray-700 text-sm sm:text-[15px] font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decorative corner blob */}
                <div
                  className="absolute -bottom-6 -right-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: step.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
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