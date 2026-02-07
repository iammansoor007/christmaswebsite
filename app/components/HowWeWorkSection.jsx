// components/HowWeWorkSection.jsx
"use client";
import { useRef, useEffect, useState } from "react";
import { FaPhoneAlt, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { getHowWeWorkData } from "../services/dataService";

// Custom CheckCircle component
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

// Custom icon wrapper
const SafeIconComponent = ({ icon: Icon, color, className }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        className={`w-6 h-6 ${className} bg-gray-200 animate-pulse rounded`}
      />
    );
  }

  if (Icon.name === "FaCheckCircle" || Icon.displayName === "FaCheckCircle") {
    return <CheckCircleIcon color={color} className={className} />;
  }

  return <Icon className={className} style={{ color: color || undefined }} />;
};

const HowWeWorkSection = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [gradientPositions, setGradientPositions] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Get data
  const workData = getHowWeWorkData();
  const { badge, title, subtitle, steps, cta } = workData;

  // Intersection Observer
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

  // Detect screen size and generate positions only on client side
  useEffect(() => {
    setIsClient(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();

    // Generate gradient positions based on screen size
    const count = window.innerWidth < 768 ? 3 : 6;
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
          filter: "blur(40px)",
        }}
      />
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 min-w-[280px]"
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

      {/* Floating Accent Elements - Client-side only rendering */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {renderGradients()}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Modern Header */}
        <div
          className={`text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 px-1 transition-all duration-700 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
        >
          {/* Minimal Badge */}
          <div
            className={`inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-white rounded-full shadow-sm mb-4 xs:mb-5 sm:mb-6 border border-gray-100 transition-all duration-700 delay-100 ${isVisible ? "animate-fadeInScale" : "opacity-0 scale-95"}`}
          >
            <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0" />
            <span className="text-xs xs:text-sm font-medium text-gray-700 uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] xs:max-w-none">
              {badge}
            </span>
          </div>

          {/* Main Title */}
          <h2
            className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 xs:mb-4 leading-tight transition-all duration-700 delay-200 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
          >
            {title.prefix}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-amber-500 to-red-500 bg-clip-text text-transparent break-words text-center">
                {title.text}
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
          </h2>

          {/* Subtitle */}
          <p
            className={`text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-2 xs:px-3 leading-relaxed text-center transition-all duration-700 delay-300 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        </div>

        {/* Modern Steps - Responsive Layout */}
        <div className="relative">
          {/* Connection Line - Desktop Only */}
          {!isMobile && isClient && (
            <div className="absolute top-1/2 left-0 right-0 h-0.5 md:h-1 -translate-y-1/2 hidden md:block">
              <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 opacity-20" />
            </div>
          )}

          {/* Steps Container - Responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-6 lg:gap-8 xl:gap-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const delay = 400 + index * 150;
              return (
                <div
                  key={index}
                  className={`relative group transition-all duration-700 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-8"}`}
                  style={{
                    animationDelay: `${delay}ms`,
                    animationFillMode: "both",
                  }}
                >
                  {/* Step Number Badge - Floating */}
                  <div className="absolute -top-3 xs:-top-4 left-1/2 -translate-x-1/2 z-20">
                    <div
                      className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg xs:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                      style={{ backgroundColor: step.color, color: "white" }}
                    >
                      <span className="text-sm xs:text-base font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Modern White Card - Responsive height */}
                  <div className="relative h-full bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-6 lg:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden min-h-[320px] xs:min-h-[340px] sm:min-h-[360px] md:min-h-[380px] group-hover:-translate-y-1">
                    {/* Accent Border Top */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 xs:h-1.5 transition-all duration-300 group-hover:h-2"
                      style={{ backgroundColor: step.color }}
                    />

                    {/* Icon - Use SafeIconComponent */}
                    <div className="flex justify-center mb-4 xs:mb-5 sm:mb-6">
                      <div
                        className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl xs:rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                        style={{
                          backgroundColor: `${step.color}15`,
                          color: step.color,
                        }}
                      >
                        <SafeIconComponent
                          icon={IconComponent}
                          color={step.color}
                          className="text-lg xs:text-xl sm:text-2xl"
                        />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 xs:mb-4 text-center leading-tight transition-all duration-300 group-hover:text-gray-800">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-gray-600 text-xs xs:text-sm sm:text-base md:text-base mb-4 xs:mb-5 sm:mb-6 leading-relaxed text-center line-clamp-3 md:line-clamp-4 transition-all duration-300 group-hover:text-gray-700">
                      {step.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 xs:space-y-2.5 sm:space-y-3 flex-grow">
                      {step.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start xs:items-center gap-2 xs:gap-3 transition-all duration-300 hover:translate-x-1"
                        >
                          <div
                            className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mt-0.5 xs:mt-0 transition-all duration-300 group-hover:scale-110"
                            style={{ backgroundColor: `${step.color}15` }}
                          >
                            <CheckCircleIcon
                              color={step.color}
                              className="text-xs xs:text-sm transition-all duration-300 group-hover:rotate-12"
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
                      className="absolute -bottom-4 -right-4 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-125"
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
                </div>
              );
            })}
          </div>
        </div>

        {/* Modern CTA - Responsive */}
        <div
          className={`mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-20 transition-all duration-700 delay-900 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
        >
          <div className="bg-gradient-to-r from-emerald-50 via-amber-50 to-red-50 rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-8 md:p-10 lg:p-12 text-center border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 xs:mb-4 transition-all duration-300 group-hover:text-gray-800">
              {cta.title}
            </h3>
            <p className="text-gray-600 text-sm xs:text-base sm:text-lg md:text-xl mb-6 xs:mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-300 group-hover:text-gray-700">
              {cta.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center">
              <button
                className="group/btn relative px-5 xs:px-6 sm:px-8 md:px-10 py-3 xs:py-3.5 sm:py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg xs:rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden w-full sm:w-auto text-center active:scale-95"
                aria-label={cta.buttons.primary}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 xs:gap-3">
                  <FaPhoneAlt className="text-sm xs:text-base" />
                  <span className="text-sm xs:text-base sm:text-lg whitespace-nowrap">
                    {cta.buttons.primary}
                  </span>
                  <FaArrowRight className="text-sm xs:text-base transition-all duration-300 group-hover/btn:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </button>

              <button
                className="px-5 xs:px-6 sm:px-8 md:px-10 py-3 xs:py-3.5 sm:py-4 font-semibold text-gray-700 hover:text-gray-900 border-2 border-gray-300 hover:border-gray-400 rounded-lg xs:rounded-xl transition-all duration-300 bg-white hover:bg-gray-50 w-full sm:w-auto text-center active:scale-95"
                aria-label={cta.buttons.secondary}
              >
                <span className="flex items-center justify-center gap-2 xs:gap-3">
                  <FaCalendarAlt className="text-sm xs:text-base" />
                  <span className="text-sm xs:text-base sm:text-lg whitespace-nowrap">
                    {cta.buttons.secondary}
                  </span>
                </span>
              </button>
            </div>
          </div>
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

          .md\:p-6 {
            padding: 1.25rem;
          }

          .md\:text-2xl {
            font-size: 1.5rem;
          }

          .md\:text-base {
            font-size: 1rem;
          }

          .md\:text-sm {
            font-size: 0.9375rem;
          }

          .md\:line-clamp-4 {
            -webkit-line-clamp: 4;
          }

          .md\:hidden {
            display: none;
          }
        }

        /* Tablet landscape (1024px - 1279px) */
        @media (min-width: 1024px) and (max-width: 1279px) {
          .lg\:gap-8 {
            gap: 1.5rem;
          }

          .lg\:p-8 {
            padding: 1.5rem;
          }

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

        /* Fix for iOS Safari */
        @supports (-webkit-touch-callout: none) {
          .min-h-\[320px\] {
            min-height: -webkit-fill-available;
          }
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

export default HowWeWorkSection;
