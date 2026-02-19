// components/ModernServicesSection.jsx
"use client";
import { useRef, useEffect, useState } from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";
import { getServicesData } from "../services/dataService";

const ModernServicesSection = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const servicesData = getServicesData();
  const { badge, title, subtitle, items: services } = servicesData;

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24"
    >
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 22px 22px, #94a3b8 1.5px, transparent 1.5px)`,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Soft blobs */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-100 rounded-full opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-100 rounded-full opacity-25 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/10 via-amber-500/10 to-red-600/10 rounded-full border border-amber-500/30 mb-5">
            <GiSparkles className="text-amber-500 text-sm flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-gray-800 uppercase tracking-wide">
              {badge}
            </span>
          </div>

          <h2 className="font-montserrat font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4 leading-tight">
            <span className="block text-center">
              {title.prefix}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                  {title.text}
                </span>
                <svg
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-gray-200"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
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

          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="mt-5 h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const delay = 400 + index * 150;
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-8"
                  }`}
                style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
              >
                {/* Colored top bar */}
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: service.color }}
                />

                {/* Card body: image LEFT, content RIGHT */}
                <div className="flex flex-col sm:flex-row min-h-0">

                  {/* Image — full width on mobile, 40% on sm+ */}
                  <div className="relative sm:w-2/5 h-44 sm:h-auto overflow-hidden flex-shrink-0">
                    <img
                      src={`/images/demo${index + 1}.jpeg`}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    {/* Stat badge */}
                    <div
                      className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-white text-xs font-semibold shadow-md backdrop-blur-sm"
                      style={{ backgroundColor: `${service.color}CC` }}
                    >
                      {service.stat}
                    </div>
                  </div>

                  {/* Content — right side */}
                  <div className="flex-1 p-4 sm:p-5 flex flex-col gap-2.5 relative overflow-hidden">
                    {/* Accent line on left edge (desktop) */}
                    <div
                      className="absolute top-0 left-0 bottom-0 w-0.5 hidden sm:block"
                      style={{ backgroundColor: `${service.color}40` }}
                    />

                    {/* Icon + Title + Number */}
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${service.color}15`,
                          color: service.color,
                        }}
                      >
                        <IconComponent />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg leading-snug flex-1">
                        {service.title}
                      </h3>
                      <span
                        className="text-xl font-black opacity-10 leading-none flex-shrink-0"
                        style={{ color: service.color }}
                      >
                        {service.number}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {service.description}
                    </p>

                    {/* Divider */}
                    <div className="border-t border-gray-100" />

                    {/* Features */}
                    <ul className="space-y-1.5 flex-grow">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <FaCheckCircle
                            className="flex-shrink-0 text-xs"
                            style={{ color: service.color }}
                          />
                          <span className="text-gray-700 text-xs sm:text-sm font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      className="relative mt-auto w-full text-white font-semibold text-xs sm:text-sm px-3 py-2 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden active:scale-95"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}, ${service.color}CC)`,
                      }}
                      aria-label={`View details for ${service.title}`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1.5">
                        <span>View Details</span>
                        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </button>

                    {/* Decorative corner blob */}
                    <div
                      className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"
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
          className={`hidden lg:block mt-14 text-center transition-all duration-700 delay-1000 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"
            }`}
        >
          <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95">
            View All Services
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInUp    { animation: fadeInUp    0.6s ease-out forwards; }
        .animate-fadeInScale { animation: fadeInScale 0.5s ease-out forwards; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ModernServicesSection;