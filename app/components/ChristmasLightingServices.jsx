"use client";
import { useRef, useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaPhoneAlt,
  FaQuoteRight,
  FaCalendarCheck,
  FaSnowflake,
  FaHome,
  FaBuilding,
  FaTree,
  FaStar,
  FaHandSparkles,
  FaLightbulb,
  FaMagic,
} from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";

const ModernServicesSection = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Icon mapping
  const iconMap = {
    FaHome: FaHome,
    FaBuilding: FaBuilding,
    FaTree: FaTree,
    FaSnowflake: FaSnowflake,
    FaStar: FaStar,
    FaSparkles: GiSparkles,
    FaHandSparkles: FaHandSparkles,
    FaLightbulb: FaLightbulb,
    FaMagic: FaMagic,
    FaCheckCircle: FaCheckCircle,
    FaPhoneAlt: FaPhoneAlt,
    FaQuoteRight: FaQuoteRight,
    FaCalendarCheck: FaCalendarCheck,
  };

  // Load data from CMS - ONLY from /api/cms/services-section
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(
          "Fetching services section data from /api/cms/services-section...",
        );

        const response = await fetch("/api/cms/services-section");

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`,
          );
        }

        const jsonData = await response.json();
        console.log("Data received successfully:", jsonData);
        setData(jsonData);
      } catch (err) {
        console.error("Error loading services data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Intersection observer
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

  if (loading) {
    return (
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading services...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-600">
            Error loading services: {error}
          </div>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-600">
            No services data available from /api/cms/services-section
          </div>
        </div>
      </section>
    );
  }

  const { badge, title, subtitle, services = [], ctaButton } = data;

  // Filter active services and sort by order
  const activeServices = services
    .filter((service) => service.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

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
            className={`text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 xs:mb-4 leading-tight transition-all duration-700 delay-200 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-6 lg:gap-8 xl:gap-10">
          {activeServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || FaHome;
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
                {/* Card Container */}
                <div className="flex flex-col lg:flex-row h-full bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden min-h-[300px] xs:min-h-[340px] sm:min-h-[360px] md:min-h-[380px] lg:min-h-[400px] group-hover:-translate-y-1">
                  {/* Image Section */}
                  <div className="lg:w-2/5 relative h-[180px] xs:h-[200px] sm:h-[220px] md:h-[200px] lg:h-full lg:min-h-[400px]">
                    <div className="relative h-full w-full overflow-hidden">
                      <img
                        src={service.imageUrl}
                        alt={service.imageAlt || service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/20" />

                      {/* Image Badge */}
                      {service.stat && (
                        <div
                          className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full text-white text-xs xs:text-sm font-medium shadow-md backdrop-blur-sm z-10 transition-all duration-300 group-hover:scale-105"
                          style={{ backgroundColor: `${service.color}CC` }}
                        >
                          {service.stat}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-3/5 p-3 xs:p-4 sm:p-5 md:p-5 lg:p-6 xl:p-7 flex flex-col flex-1">
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 xs:-top-4 -left-3 xs:-left-4 z-20">
                      <div
                        className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-lg xs:rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:rotate-12"
                        style={{
                          backgroundColor: service.color,
                          color: "white",
                        }}
                      >
                        <span className="text-xs xs:text-sm font-bold">
                          {service.number ||
                            (index + 1).toString().padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Accent Border Top */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 xs:h-1.5 transition-all duration-300 group-hover:h-2"
                      style={{ backgroundColor: service.color }}
                    />

                    {/* Header with Icon */}
                    <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4 sm:mb-5 mt-1 sm:mt-2">
                      <div
                        className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg xs:rounded-xl flex items-center justify-center shadow-md flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${service.color}15`,
                          color: service.color,
                        }}
                      >
                        <IconComponent className="text-lg xs:text-xl sm:text-2xl" />
                      </div>
                      <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight flex-1 transition-all duration-300 group-hover:translate-x-1">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs xs:text-sm sm:text-base md:text-lg mb-3 xs:mb-4 sm:mb-5 leading-relaxed flex-grow line-clamp-3 md:line-clamp-4 lg:line-clamp-3">
                      {service.description}
                    </p>

                    {/* Features List */}
                    {service.features && service.features.length > 0 && (
                      <div className="space-y-1.5 xs:space-y-2 sm:space-y-2.5 mb-4 xs:mb-5 sm:mb-6 flex-grow">
                        {service.features.slice(0, 4).map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-start xs:items-center gap-2 xs:gap-3 transition-all duration-300 hover:translate-x-1"
                          >
                            <div
                              className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mt-0.5 xs:mt-0 transition-all duration-300 group-hover:scale-110"
                              style={{ backgroundColor: `${service.color}15` }}
                            >
                              <FaCheckCircle
                                style={{ color: service.color }}
                                className="text-xs xs:text-sm transition-all duration-300 group-hover:rotate-12"
                              />
                            </div>
                            <span className="text-gray-700 text-xs xs:text-sm sm:text-base flex-1 leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA Button */}
                    <button
                      className="group relative px-3 xs:px-4 sm:px-5 md:px-6 py-2.5 xs:py-3 sm:py-3.5 text-white font-semibold rounded-lg xs:rounded-xl hover:shadow-md transition-all duration-300 overflow-hidden self-stretch lg:self-start mt-auto w-full text-center active:scale-95"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}, ${service.color}CC)`,
                      }}
                      aria-label={`View details for ${service.title}`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-2.5">
                        <span className="text-xs xs:text-sm sm:text-base whitespace-nowrap">
                          View Details
                        </span>
                        <FaArrowRight className="text-xs xs:text-sm sm:text-base transition-all duration-300 group-hover:translate-x-2" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </button>

                    {/* Decorative Corner */}
                    <div
                      className="absolute -bottom-4 -right-4 w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full opacity-10 group-hover:opacity-15 transition-all duration-500 group-hover:scale-125"
                      style={{ backgroundColor: service.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {activeServices.length > 0 && (
          <div
            className={`mt-12 md:mt-16 lg:mt-20 text-center transition-all duration-700 delay-1000 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
              {ctaButton?.text || "View All Services"}
            </button>
          </div>
        )}
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
      `}</style>
    </section>
  );
};

export default ModernServicesSection;
