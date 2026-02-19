// components/ModernServicesSection.jsx
"use client";
import { useRef, useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaPhoneAlt,
  FaQuoteRight,
  FaCalendarCheck,
  FaSnowflake,
} from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";
import { getServicesData } from "../services/dataService";

const ModernServicesSection = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop");

  // Simple intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 300) setScreenSize("xs-300");
      else if (width < 400) setScreenSize("xs");
      else if (width < 640) setScreenSize("sm");
      else if (width < 768) setScreenSize("md");
      else if (width < 1024) setScreenSize("lg");
      else setScreenSize("xl");
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const servicesData = getServicesData();
  const { badge, title, subtitle, items: services } = servicesData;

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 min-w-[280px]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #e5e7eb 2px, transparent 2px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-1 transition-all duration-700 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
        >
          {/* Badge */}
          <div
            className={`inline-flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 px-3 py-1.5 bg-gradient-to-r from-red-600/10 via-amber-500/10 to-red-600/10 rounded-full shadow-sm mb-4 xs:mb-5 sm:mb-6 border border-amber-500/30 w-fit mx-auto transition-all duration-700 delay-100 ${isVisible ? "animate-fadeInScale" : "opacity-0 scale-95"}`}
          >
            <GiSparkles className="text-xs xs:text-sm sm:text-base text-amber-500 flex-shrink-0" />
            <span className="text-xs xs:text-sm sm:text-sm font-medium text-gray-800 uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] xs:max-w-[250px] sm:max-w-none">
              {badge}
            </span>
          </div>

          {/* Title */}
          <h2
            className={`font-montserrat font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 xs:mb-4 leading-tight transition-all duration-700 delay-200 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
          >
            <span className="block text-center">
              {title.prefix}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent break-words text-center">
                  {title.text}
                </span>
                <svg
                  className="absolute -bottom-1.5 xs:-bottom-2 left-0 w-full h-2 xs:h-2.5 text-gray-200"
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
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className={`text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-2 xs:px-3 sm:px-4 leading-relaxed text-center transition-all duration-700 delay-300 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
          >
            {subtitle}
          </p>

          {/* Decorative divider */}
          <div className="mt-4 xs:mt-5 sm:mt-6 h-0.5 xs:h-1 w-20 xs:w-28 sm:w-36 md:w-40 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>

        {/* Services Grid - Fixed card sizing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const delay = 400 + index * 150;
            return (
              <div
                key={index}
                className={`relative group w-full transition-all duration-700 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-8"}`}
                style={{
                  animationDelay: `${delay}ms`,
                  animationFillMode: "both",
                }}
              >
                {/* Card Container - Fixed height based on screen size */}
                <div className={`
                  flex flex-col lg:flex-row h-full bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group-hover:-translate-y-1
                  ${screenSize === "xs-300" ? "min-h-[400px]" : ""}
                  ${screenSize === "xs" ? "min-h-[420px]" : ""}
                  ${screenSize === "sm" ? "min-h-[440px]" : ""}
                  ${screenSize === "md" ? "min-h-[460px]" : ""}
                  ${screenSize === "lg" ? "min-h-[480px]" : ""}
                  ${screenSize === "xl" ? "min-h-[500px]" : ""}
                `}>
                  {/* Image Section - Fixed height on mobile/tablet, full height on desktop */}
                  <div className={`
                    relative overflow-hidden
                    ${screenSize === "xs-300" ? "h-[140px]" : ""}
                    ${screenSize === "xs" ? "h-[150px]" : ""}
                    ${screenSize === "sm" ? "h-[160px]" : ""}
                    ${screenSize === "md" ? "h-[170px]" : ""}
                    ${screenSize === "lg" ? "lg:w-2/5 lg:h-auto" : ""}
                    ${screenSize === "xl" ? "xl:w-2/5 xl:h-auto" : ""}
                  `}>
                    <img
                      src={`/images/demo${index + 1}.jpeg`}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Image Badge */}
                    <div
                      className="absolute bottom-2 xs:bottom-3 left-2 xs:left-3 px-2 xs:px-2.5 py-0.5 xs:py-1 rounded-full text-white text-[10px] xs:text-xs font-medium shadow-md backdrop-blur-sm z-10"
                      style={{ backgroundColor: `${service.color}CC` }}
                    >
                      {service.stat}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-3 xs:p-4 sm:p-5 flex flex-col relative">
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -left-2 xs:-left-3 z-20">
                      <div
                        className={`
                          rounded-lg xs:rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:rotate-12
                          ${screenSize === "xs-300" ? "w-7 h-7 text-xs" : ""}
                          ${screenSize === "xs" ? "w-8 h-8 text-xs" : ""}
                          ${screenSize === "sm" ? "w-9 h-9 text-sm" : ""}
                          ${screenSize === "md" ? "w-10 h-10 text-sm" : ""}
                          ${screenSize === "lg" ? "lg:w-11 lg:h-11 lg:text-base" : ""}
                          ${screenSize === "xl" ? "xl:w-12 xl:h-12 xl:text-base" : ""}
                        `}
                        style={{
                          backgroundColor: service.color,
                          color: "white",
                        }}
                      >
                        <span className="font-bold">
                          {service.number}
                        </span>
                      </div>
                    </div>

                    {/* Accent Border Top */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
                      style={{ backgroundColor: service.color }}
                    />

                    {/* Header with Icon */}
                    <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3 mt-2">
                      <div
                        className={`
                          rounded-lg xs:rounded-xl flex items-center justify-center shadow-md flex-shrink-0 transition-all duration-300 group-hover:scale-110
                          ${screenSize === "xs-300" ? "w-8 h-8 text-base" : ""}
                          ${screenSize === "xs" ? "w-9 h-9 text-lg" : ""}
                          ${screenSize === "sm" ? "w-10 h-10 text-xl" : ""}
                          ${screenSize === "md" ? "w-11 h-11 text-xl" : ""}
                          ${screenSize === "lg" ? "lg:w-12 lg:h-12 lg:text-2xl" : ""}
                          ${screenSize === "xl" ? "xl:w-14 xl:h-14 xl:text-3xl" : ""}
                        `}
                        style={{
                          backgroundColor: `${service.color}15`,
                          color: service.color,
                        }}
                      >
                        <IconComponent />
                      </div>
                      <h3 className={`
                        font-bold text-gray-900 leading-tight flex-1
                        ${screenSize === "xs-300" ? "text-sm" : ""}
                        ${screenSize === "xs" ? "text-base" : ""}
                        ${screenSize === "sm" ? "text-lg" : ""}
                        ${screenSize === "md" ? "text-xl" : ""}
                        ${screenSize === "lg" ? "lg:text-2xl" : ""}
                        ${screenSize === "xl" ? "xl:text-3xl" : ""}
                      `}>
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className={`
                      text-gray-600 mb-2 xs:mb-3 leading-relaxed line-clamp-2
                      ${screenSize === "xs-300" ? "text-[10px]" : ""}
                      ${screenSize === "xs" ? "text-xs" : ""}
                      ${screenSize === "sm" ? "text-sm" : ""}
                      ${screenSize === "md" ? "text-sm" : ""}
                      ${screenSize === "lg" ? "lg:text-base" : ""}
                      ${screenSize === "xl" ? "xl:text-base" : ""}
                    `}>
                      {service.description}
                    </p>

                    {/* Features List - Compact */}
                    <div className="space-y-1 xs:space-y-1.5 mb-3 xs:mb-4 flex-grow">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-1.5 xs:gap-2 transition-all duration-300 hover:translate-x-1"
                        >
                          <div
                            className={`
                              flex-shrink-0 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110
                              ${screenSize === "xs-300" ? "w-3 h-3" : ""}
                              ${screenSize === "xs" ? "w-3.5 h-3.5" : ""}
                              ${screenSize === "sm" ? "w-4 h-4" : ""}
                              ${screenSize === "md" ? "w-4 h-4" : ""}
                              ${screenSize === "lg" ? "lg:w-5 lg:h-5" : ""}
                              ${screenSize === "xl" ? "xl:w-5 xl:h-5" : ""}
                            `}
                            style={{ backgroundColor: `${service.color}15` }}
                          >
                            <FaCheckCircle
                              style={{ color: service.color }}
                              className={`
                                transition-all duration-300 group-hover:rotate-12
                                ${screenSize === "xs-300" ? "text-[8px]" : ""}
                                ${screenSize === "xs" ? "text-[10px]" : ""}
                                ${screenSize === "sm" ? "text-xs" : ""}
                                ${screenSize === "md" ? "text-xs" : ""}
                                ${screenSize === "lg" ? "lg:text-sm" : ""}
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

                    {/* CTA Button */}
                    <button
                      className={`
                        group relative text-white font-semibold rounded-lg xs:rounded-xl hover:shadow-md transition-all duration-300 overflow-hidden w-full text-center active:scale-95 mt-auto
                        ${screenSize === "xs-300" ? "px-2 py-1.5 text-[10px]" : ""}
                        ${screenSize === "xs" ? "px-3 py-2 text-xs" : ""}
                        ${screenSize === "sm" ? "px-4 py-2.5 text-sm" : ""}
                        ${screenSize === "md" ? "px-5 py-3 text-sm" : ""}
                        ${screenSize === "lg" ? "lg:px-6 lg:py-3 lg:text-base" : ""}
                        ${screenSize === "xl" ? "xl:px-6 xl:py-3.5 xl:text-base" : ""}
                      `}
                      style={{
                        background: `linear-gradient(135deg, ${service.color}, ${service.color}CC)`,
                      }}
                      aria-label={`View details for ${service.title}`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1 xs:gap-1.5">
                        <span>View Details</span>
                        <FaArrowRight className="transition-all duration-300 group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </button>

                    {/* Decorative Corner */}
                    <div
                      className="absolute -bottom-4 -right-4 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full opacity-10 group-hover:opacity-15 transition-all duration-500 group-hover:scale-125"
                      style={{ backgroundColor: service.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`hidden lg:block mt-12 md:mt-16 lg:mt-20 text-center transition-all duration-700 delay-1000 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
        >
          <button className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-sm md:text-base">
            View All Services
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.5s ease-out forwards;
        }

        /* Base responsive text clamping */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
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

        /* Prevent image distortion */
        img {
          backface-visibility: hidden;
          image-rendering: -webkit-optimize-contrast;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Better text rendering */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Reduce motion preferences */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ModernServicesSection;