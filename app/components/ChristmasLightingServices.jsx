"use client";
import { useRef, useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCheckCircle,
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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Icon mapping
  const iconMap = {
    FaHome: FaHome,
    FaBuilding: FaBuilding,
    FaTree: FaTree,
    FaStar: FaStar,
    FaSparkles: GiSparkles,
    FaHandSparkles: FaHandSparkles,
    FaLightbulb: FaLightbulb,
    FaMagic: FaMagic,
  };

  // Load data from CMS
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/cms/services-section");

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`,
          );
        }

        const jsonData = await response.json();
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

  // Color palette
  const colorPalette = {
    primary: {
      red: "#EF4444",
      blue: "#3B82F6",
      emerald: "#10B981",
      amber: "#F59E0B",
      purple: "#8B5CF6",
    },
    gradient: {
      redToAmber: "linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)",
      blueToPurple: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
      emeraldToBlue: "linear-gradient(135deg, #10B981 0%, #3B82F6 100%)",
      amberToRed: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
    },
  };

  // Use data or fallback
  const displayData = data || {
    badge: "Premium Services",
    title: { prefix: "Premium", text: "Christmas Lighting" },
    subtitle:
      "Professional holiday lighting installations that transform your property into a winter wonderland",
    services: [
      {
        title: "Residential Lighting",
        description:
          "Transform your home with beautiful Christmas lighting installations that create magical holiday memories for your family.",
        icon: "FaHome",
        color: colorPalette.primary.red,
        gradient: colorPalette.gradient.redToAmber,
        number: 1,
        stat: "50+ Homes",
        features: [
          "Custom Design",
          "LED Technology",
          "Professional Installation",
          "Maintenance",
        ],
        isActive: true,
      },
      {
        title: "Commercial Lighting",
        description:
          "Enhance your business with stunning commercial Christmas displays that attract customers and boost seasonal revenue.",
        icon: "FaBuilding",
        color: colorPalette.primary.blue,
        gradient: colorPalette.gradient.blueToPurple,
        number: 2,
        stat: "30+ Businesses",
        features: [
          "Large Scale Installations",
          "Energy Efficient",
          "Brand-Themed Designs",
          "ROI Analysis",
        ],
        isActive: true,
      },
      {
        title: "Tree Lighting",
        description:
          "Professional tree wrapping and lighting services for trees of all sizes, creating focal points in your landscape.",
        icon: "FaTree",
        color: colorPalette.primary.emerald,
        gradient: colorPalette.gradient.emeraldToBlue,
        number: 3,
        stat: "100+ Trees",
        features: [
          "Safe Installation",
          "Various Colors",
          "Weather Resistant",
          "Custom Patterns",
        ],
        isActive: true,
      },
      {
        title: "Premium Designs",
        description:
          "Custom Christmas lighting designs tailored to your property architecture and personal style preferences.",
        icon: "FaStar",
        color: colorPalette.primary.amber,
        gradient: colorPalette.gradient.amberToRed,
        number: 4,
        stat: "Custom",
        features: [
          "3D Visualization",
          "Personal Consultation",
          "Unique Patterns",
          "Seasonal Themes",
        ],
        isActive: true,
      },
    ],
    ctaButton: { text: "Explore All Services" },
  };

  const { badge, title, subtitle, services = [], ctaButton } = displayData;

  // Filter active services
  const activeServices = services
    .filter((service) => service.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (loading) {
    return (
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 w-64 bg-gray-200 rounded mb-6"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/5 to-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-to-b from-transparent via-gray-100/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/10 via-amber-500/10 to-red-500/10 rounded-full border border-amber-500/20 mb-6 animate-fade-in">
            <GiSparkles className="text-amber-500 animate-pulse" />
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              {badge || "Premium Services"}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            <span className="block">
              {title?.prefix || "Premium"}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent animate-gradient">
                  {title?.text || "Christmas Lighting"}
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 100 10"
                >
                  <path
                    d="M0,5 Q25,10 50,5 T100,5"
                    stroke="url(#underline-gradient)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <defs>
                    <linearGradient
                      id="underline-gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#EF4444" />
                      <stop offset="50%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle || "Transform your property with premium installations"}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {activeServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || FaHome;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Container */}
                <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Animated Background Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background:
                        service.gradient ||
                        `linear-gradient(135deg, ${service.color}20, ${service.color}40)`,
                    }}
                  />

                  {/* Card Content - Horizontal Layout */}
                  <div className="relative flex flex-col lg:flex-row h-full">
                    {/* Image/Icon Section */}
                    <div className="lg:w-2/5 relative overflow-hidden">
                      <div className="relative h-48 lg:h-full min-h-[200px] overflow-hidden">
                        {service.imageUrl ? (
                          <img
                            src={service.imageUrl}
                            alt={service.imageAlt || service.title}
                            className={`w-full h-full object-cover transform transition-transform duration-700 ${
                              isHovered ? "scale-110" : "scale-100"
                            }`}
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center p-8"
                            style={{
                              background: `linear-gradient(135deg, ${service.color}10, ${service.color}20)`,
                            }}
                          >
                            <div className="relative">
                              <div
                                className="absolute inset-0 blur-2xl opacity-20"
                                style={{ backgroundColor: service.color }}
                              />
                              <div
                                className="relative w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg"
                                style={{
                                  background: service.gradient || service.color,
                                }}
                              >
                                <IconComponent className="text-4xl text-white" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/30" />

                        {/* Service Number */}
                        <div className="absolute top-4 left-4">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg font-bold text-white"
                            style={{
                              background: service.gradient || service.color,
                            }}
                          >
                            {service.number || index + 1}
                          </div>
                        </div>

                        {/* Stat Badge */}
                        {service.stat && (
                          <div className="absolute bottom-4 left-4">
                            <div
                              className="px-3 py-1.5 rounded-full text-white text-sm font-semibold shadow-lg backdrop-blur-sm"
                              style={{
                                background: `linear-gradient(135deg, ${service.color}CC, ${service.color}99)`,
                              }}
                            >
                              {service.stat}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-3/5 p-6 sm:p-8 flex flex-col flex-1">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-md transform transition-transform duration-300 group-hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${service.color}15, ${service.color}5)`,
                            color: service.color,
                          }}
                        >
                          <IconComponent className="text-2xl" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                            {service.title}
                          </h3>
                          <div
                            className="h-1 w-12 rounded-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ backgroundColor: service.color }}
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                        {service.description}
                      </p>

                      {/* Features */}
                      {service.features && service.features.length > 0 && (
                        <div className="space-y-3 mb-8">
                          {service.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div
                                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110"
                                style={{
                                  backgroundColor: `${service.color}15`,
                                  color: service.color,
                                }}
                              >
                                <FaCheckCircle className="text-xs" />
                              </div>
                              <span className="text-gray-700 text-sm sm:text-base">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CTA Button */}
                      <div className="mt-auto">
                        <button
                          className="group relative px-6 py-3 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg w-full lg:w-auto"
                          style={{
                            background: service.gradient || service.color,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                          <span className="relative flex items-center justify-center gap-2">
                            <span>View Details</span>
                            <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: `0 0 60px 20px ${service.color}20`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <button
            className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-3">
              <span className="text-lg">
                {ctaButton?.text || "Explore All Services"}
              </span>
              <GiSparkles className="transform transition-all duration-300 group-hover:rotate-180 group-hover:scale-125" />
            </span>
          </button>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>Trusted by 100+ Clients</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Professional Installation</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span>Premium Quality Materials</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ModernServicesSection;
