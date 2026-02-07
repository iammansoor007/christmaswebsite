"use client";
import { useState, useEffect, useRef } from "react";
import {
  FaCheckCircle,
  FaStar,
  FaShieldAlt,
  FaTools,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaBuilding,
  FaTree,
  FaHeart,
} from "react-icons/fa";

const ChristmasLightingSection = () => {
  const boxRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [screenSize, setScreenSize] = useState("desktop");
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modern color palette
  const colors = {
    primary: {
      red: "#E63946",
      gold: "#F4A261",
      emerald: "#2A9D8F",
      blue: "#1D3557",
    },
    gradient: "linear-gradient(135deg, #E63946 0%, #F4A261 50%, #2A9D8F 100%)",
    background: "linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)",
  };

  // Icon mapping for features
  const iconMap = {
    FaShieldAlt: FaShieldAlt,
    FaTools: FaTools,
    FaCheckCircle: FaCheckCircle,
    FaHome: FaHome,
    FaBuilding: FaBuilding,
    FaTree: FaTree,
    FaStar: FaStar,
    FaHeart: FaHeart,
  };

  // Load data from CMS API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log("Fetching data from /api/cms/services...");

        const response = await fetch("/api/cms/services");

        if (!response.ok) {
          console.error(`API error: ${response.status}`);
          // Use fallback data
          useFallbackData();
          return;
        }

        const jsonData = await response.json();
        console.log("Data received from API:", jsonData);
        setData(jsonData);
      } catch (err) {
        console.error("Error loading services data:", err);
        // Use fallback data
        useFallbackData();
      } finally {
        setLoading(false);
      }
    };

    // Fallback data function
    const useFallbackData = () => {
      console.log("Using fallback data");
      setData({
        badge: "LIMITED TIME: 25% OFF",
        title: {
          prefix: "Expert",
          text: "Holiday Lighting",
        },
        subtitle:
          "Transform your home with professional holiday lighting installations.",
        features: [
          {
            title: "Professional Installation",
            description:
              "Our certified technicians ensure perfect installation",
            icon: "FaTools",
            color: "#E63946",
          },
          {
            title: "Energy Efficient",
            description: "LED technology saves energy costs",
            icon: "FaShieldAlt",
            color: "#2A9D8F",
          },
        ],
        buttons: {
          primary: "Get Free Quote",
          secondary: "View Gallery",
        },
        trustIndicators: {
          homesCount: "500+",
          rating: "4.9",
          reviewsCount: "250+",
        },
        gallery: [
          {
            url: "/images/demo1.jpeg",
            alt: "Christmas lighting",
            order: 0,
            absoluteUrl: "/images/demo1.jpeg",
          },
          {
            url: "/images/demo2.jpeg",
            alt: "Holiday lighting",
            order: 1,
            absoluteUrl: "/images/demo2.jpeg",
          },
          {
            url: "/images/demo3.jpeg",
            alt: "Professional installation",
            order: 2,
            absoluteUrl: "/images/demo3.jpeg",
          },
        ],
      });
    };

    loadData();
  }, []);

  // Rest of your hooks remain the same...
  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-50px" },
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Check screen size
  useEffect(() => {
    setIsClient(true);
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

  // Auto-slide
  useEffect(() => {
    if (!data || !data.gallery || data.gallery.length === 0 || !isClient)
      return;

    const images = data.gallery;
    const interval = setInterval(
      () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      },
      screenSize === "xs-300" ? 7000 : screenSize === "xs" ? 6000 : 5000,
    );

    return () => clearInterval(interval);
  }, [data, isClient, screenSize]);

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 15) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    setTouchStart(null);
  };

  const goPrev = () => {
    if (!data || !data.gallery) return;
    setCurrentIndex(
      (prev) => (prev - 1 + data.gallery.length) % data.gallery.length,
    );
  };

  const goNext = () => {
    if (!data || !data.gallery) return;
    setCurrentIndex((prev) => (prev + 1) % data.gallery.length);
  };

  // Responsive typography
  const getHeadingSize = () => {
    if (screenSize === "xs-300")
      return {
        main: "text-2xl",
        expert: "text-lg",
        body: "text-xs",
        button: "text-xs",
      };
    if (screenSize === "xs")
      return {
        main: "text-3xl",
        expert: "text-xl",
        body: "text-sm",
        button: "text-sm",
      };
    if (screenSize === "sm")
      return {
        main: "text-4xl",
        expert: "text-2xl",
        body: "text-base",
        button: "text-base",
      };
    if (screenSize === "md")
      return {
        main: "text-5xl",
        expert: "text-3xl",
        body: "text-lg",
        button: "text-base",
      };
    return {
      main: "text-6xl",
      expert: "text-4xl",
      body: "text-lg",
      button: "text-base",
    };
  };

  const headingSizes = getHeadingSize();

  // Show loading state
  if (loading) {
    return (
      <section className="relative w-full min-w-[280px] overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-slate-700">Loading services...</div>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="relative w-full min-w-[280px] overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-slate-700">No data available</div>
        </div>
      </section>
    );
  }

  // Map features data
  const features = data.features.map((feature) => ({
    title: feature.title,
    description: feature.description,
    icon: iconMap[feature.icon] || FaCheckCircle,
    color: feature.color || colors.primary.red,
    bgColor:
      "linear-gradient(135deg, rgba(230, 57, 70, 0.08) 0%, rgba(244, 162, 97, 0.04) 100%)",
    borderColor: "rgba(230, 57, 70, 0.2)",
  }));

  // Get gallery images - use absoluteUrl if available
  const images = data.gallery || [];

  return (
    <section
      ref={boxRef}
      className="relative w-full min-w-[280px] overflow-hidden bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Container with responsive padding */}
      <div
        className={`xs-300:px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xs-300:py-8 xs:py-8 sm:py-8 md:py-10 lg:py-14 xl:py-18`}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Layout */}
          <div className="flex flex-col lg:flex-row gap-4 xs-300:gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center lg:items-start">
            {/* TEXT COLUMN */}
            <div className="w-full lg:w-1/2 text-center lg:text-left lg:order-2">
              <div className="pt-2 xs-300:pt-4 xs:pt-6 lg:pt-0">
                {/* Badge */}
                <div
                  className={`inline-flex items-center gap-1 xs-300:gap-1.5 xs:gap-2 px-2.5 xs-300:px-3 xs:px-4 py-1 xs-300:py-1.5 xs:py-2 rounded-full 
                  bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-emerald-500/10 backdrop-blur-sm 
                  border border-amber-500/20 mb-4 xs-300:mb-6 xs:mb-6 sm:mb-8 max-w-full animate-fade-in-up`}
                  style={{ animationDelay: "0.1s" }}
                >
                  <div
                    className={`${screenSize === "xs-300" ? "w-1 h-1" : "w-1.5 h-1.5"} rounded-full bg-gradient-to-r from-rose-500 to-amber-500 animate-pulse`}
                  />
                  <span
                    className={`${screenSize === "xs-300" ? "text-[10px]" : headingSizes.body} font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis`}
                  >
                    {data.badge || "LIMITED TIME: 25% OFF"}
                  </span>
                </div>

                {/* Heading */}
                <div className="xs-300:mb-8 xs:mb-8 sm:mb-10">
                  <h1
                    className={`font-bold text-slate-900 tracking-tight mb-3 xs-300:mb-4 animate-fade-in-up`}
                    style={{ animationDelay: "0.2s" }}
                  >
                    <span
                      className={`block ${headingSizes.expert} font-semibold text-slate-700 mb-1 xs-300:mb-2`}
                    >
                      {data.title?.prefix || "Expert"}
                    </span>
                    <span className="block leading-tight">
                      <span className="relative">
                        <span
                          className={`relative z-10 bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent ${headingSizes.main} animate-gradient-shift`}
                        >
                          {data.title?.text || "Holiday Lighting"}
                        </span>
                      </span>
                    </span>
                  </h1>
                  <p
                    className={`${headingSizes.body} text-slate-600 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0 animate-fade-in-up`}
                    style={{ animationDelay: "0.3s" }}
                  >
                    {data.subtitle ||
                      "Transform your home with professional holiday lighting installations."}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="mb-8 xs:mt-2 xs:mb-3 sm:mt-2 xs-300:mb-10 xs:mb-10 sm:mb-12">
                  <h3
                    className={`${screenSize === "xs-300" ? "text-base" : "text-lg"} font-semibold text-slate-900 mb-4 xs-300:mb-6 text-center lg:text-left animate-fade-in-up`}
                    style={{ animationDelay: "0.4s" }}
                  >
                    Why Choose Us
                  </h3>
                  <div className="grid gap-3 xs-300:gap-4 xs:gap-5 max-w-lg mx-auto lg:mx-0">
                    {features.map((feature, idx) => {
                      const IconComponent = feature.icon;
                      return (
                        <div
                          key={idx}
                          className="group relative overflow-hidden rounded-xl xs:rounded-2xl transition-all duration-300 animate-fade-in-up hover-lift"
                          style={{
                            animationDelay: `${0.5 + idx * 0.1}s`,
                            animationFillMode: "both",
                          }}
                        >
                          <div
                            className="relative p-4 xs-300:p-4 xs:p-5 rounded-xl xs:rounded-2xl transition-all duration-300 border group-hover:shadow-lg"
                            style={{
                              background: "rgba(255, 255, 255, 0.9)",
                              backdropFilter: "blur(10px)",
                              borderColor: feature.borderColor,
                              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            <div className="flex items-start gap-3 xs-300:gap-4 xs:gap-5">
                              <div className="relative flex-shrink-0">
                                <div
                                  className="relative z-10 p-2 xs-300:p-2.5 xs:p-3 rounded-lg xs:rounded-xl transition-all duration-300 group-hover:scale-110"
                                  style={{
                                    background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}08)`,
                                    border: `1px solid ${feature.color}30`,
                                    boxShadow: `0 4px 12px ${feature.color}15`,
                                  }}
                                >
                                  <IconComponent
                                    className={`${screenSize === "xs-300" ? "w-4 h-4" : "w-5 h-5"} xs:w-6 xs:h-6 transition-transform duration-300 group-hover:scale-110`}
                                    style={{ color: feature.color }}
                                  />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0 text-left">
                                <h4
                                  className={`${screenSize === "xs-300" ? "text-sm" : "text-base"} xs:text-lg font-bold mb-1 xs-300:mb-1.5 xs:mb-2 text-slate-900 line-clamp-1 xs:line-clamp-2 group-hover:text-slate-950 transition-colors duration-200`}
                                >
                                  {feature.title}
                                </h4>
                                <p
                                  className={`${screenSize === "xs-300" ? "text-xs" : "text-sm"} xs:text-base text-slate-600 leading-relaxed line-clamp-2 xs:line-clamp-3 group-hover:text-slate-700 transition-colors duration-200`}
                                >
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* IMAGE COLUMN */}
            <div className="w-full lg:w-1/2 lg:order-1">
              <div className="relative">
                {/* Image slider */}
                <div className="relative overflow-hidden rounded-lg xs-300:rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-lg xs:shadow-xl sm:shadow-2xl border border-white/10 bg-gradient-to-br from-white to-slate-50 animate-fade-in-up">
                  <div
                    className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    {images.map((image, idx) => (
                      <div
                        key={idx}
                        className="w-full flex-shrink-0 relative group"
                      >
                        <div className="relative pb-[66.666%] xs-300:pb-[66.666%]">
                          <img
                            src={
                              image.absoluteUrl ||
                              image.url ||
                              "/images/placeholder.jpg"
                            }
                            alt={image.alt || `Gallery image ${idx + 1}`}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/placeholder.jpg";
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Dots */}
                  {images.length > 0 && (
                    <div
                      className={`absolute bottom-2 xs-300:bottom-3 xs:bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 xs-300:gap-2 xs:gap-3 
                      ${screenSize.includes("xs") ? "bg-white/95 px-2.5 xs-300:px-3 xs:px-4 py-1.5 xs-300:py-2 xs:py-2.5 rounded-full shadow-md" : "bg-white/90 backdrop-blur-lg px-4 py-2.5 rounded-full shadow-lg"}`}
                    >
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className="relative group"
                          aria-label={`View image ${idx + 1}`}
                        >
                          <div
                            className={`${screenSize === "xs-300" ? "w-1.5 h-1.5" : "w-2 h-2"} xs:w-2.5 xs:h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "scale-125" : "bg-slate-300 group-hover:bg-slate-400"}`}
                            style={{
                              background:
                                idx === currentIndex
                                  ? colors.gradient
                                  : undefined,
                            }}
                          >
                            {idx === currentIndex && (
                              <div className="absolute inset-0 rounded-full animate-ping-slow opacity-75">
                                <div
                                  className="absolute inset-0 rounded-full"
                                  style={{ background: colors.gradient }}
                                />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 left-1.5 xs-300:left-2 xs:left-3 sm:left-4 right-1.5 xs-300:right-2 xs:right-3 sm:right-4 flex justify-between pointer-events-none`}
                  >
                    <button
                      onClick={goPrev}
                      className={`pointer-events-auto ${screenSize === "xs-300" ? "p-1.5" : "p-2"} xs:p-2.5 bg-white/90 backdrop-blur-md xs:backdrop-blur-lg rounded-lg xs:rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 group border border-white/20`}
                      aria-label="Previous image"
                    >
                      <FaChevronLeft
                        className={`${screenSize === "xs-300" ? "w-3 h-3" : "w-4 h-4"} xs:w-5 xs:h-5 text-slate-700 group-hover:text-rose-600 transition-colors`}
                      />
                    </button>
                    <button
                      onClick={goNext}
                      className={`pointer-events-auto ${screenSize === "xs-300" ? "p-1.5" : "p-2"} xs:p-2.5 bg-white/90 backdrop-blur-md xs:backdrop-blur-lg rounded-lg xs:rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 group border border-white/20`}
                      aria-label="Next image"
                    >
                      <FaChevronRight
                        className={`${screenSize === "xs-300" ? "w-3 h-3" : "w-4 h-4"} xs:w-5 xs:h-5 text-slate-700 group-hover:text-emerald-600 transition-colors`}
                      />
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex buttons xs-300:flex-row gap-2.5 xs-300:gap-3 xs:gap-4 mt-6 xs-300:mt-8 xs:mt-10 justify-center lg:justify-start items-center">
                  <button
                    className={`group relative font-bold rounded-lg xs:rounded-xl transition-all duration-300 overflow-hidden shadow-md xs:shadow-lg hover:shadow-xl animate-fade-in-up
                    ${screenSize === "xs-300" ? "px-5 py-2.5 text-xs w-[140px] h-[36px]" : ""}
                    ${screenSize === "xs" ? "px-6 py-3 text-sm w-[160px] h-[40px]" : ""}
                    ${screenSize === "sm" ? "px-7 py-3 text-base w-[180px] h-[44px]" : ""}
                    ${screenSize === "md" ? "px-8 py-3 text-base w-[200px] h-[48px]" : ""}
                    ${screenSize === "lg" || screenSize === "xl" ? "px-8 py-3.5 text-base w-[210px] h-[52px]" : ""}
                    flex items-center justify-center`}
                    style={{
                      background: colors.gradient,
                      boxShadow:
                        "0 4px 20px rgba(230, 57, 70, 0.25), 0 2px 4px rgba(230, 57, 70, 0.1)",
                      animationDelay: "0.6s",
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5 xs-300:gap-2 xs:gap-3 text-white font-semibold">
                      <span>{data.buttons?.primary || "Get Free Quote"}</span>
                      <svg
                        className={`${screenSize === "xs-300" ? "w-3 h-3" : "w-4 h-4"} xs:w-5 xs:h-5 group-hover:translate-x-0.5 xs-300:group-hover:translate-x-1 xs:group-hover:translate-x-1.5 transition-transform duration-300`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>

                  <button
                    className={`group font-semibold rounded-lg xs:rounded-xl transition-all duration-300 hover:shadow-md flex items-center justify-center gap-1.5 xs-300:gap-2 xs:gap-3 bg-white border-2 border-amber-500/30 hover:border-amber-500/50 animate-fade-in-up
                    ${screenSize === "xs-300" ? "px-5 py-2.5 text-xs w-[140px] h-[36px]" : ""}
                    ${screenSize === "xs" ? "px-6 py-3 text-sm w-[160px] h-[40px]" : ""}
                    ${screenSize === "sm" ? "px-7 py-3 text-base w-[180px] h-[44px]" : ""}
                    ${screenSize === "md" ? "px-8 py-3 text-base w-[200px] h-[48px]" : ""}
                    ${screenSize === "lg" || screenSize === "xl" ? "px-8 py-3.5 text-base w-[210px] h-[52px]" : ""}
                    hover:bg-gradient-to-r hover:from-amber-50/50 hover:via-white hover:to-amber-50/50`}
                    style={{ animationDelay: "0.7s" }}
                  >
                    <span className="text-slate-700">
                      {data.buttons?.secondary || "View Gallery"}
                    </span>
                    <svg
                      className={`${screenSize === "xs-300" ? "w-3 h-3" : "w-4 h-4"} xs:w-5 xs:h-5 text-amber-600 group-hover:rotate-90 transition-transform duration-300`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                      />
                    </svg>
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="pt-4 xs-300:pt-6 xs:pt-8 mt-6 xs-300:mt-8 xs:mt-10 border-t border-slate-200 animate-fade-in-up">
                  <div className="flex flex-col xs-300:flex-row items-center gap-3 xs-300:gap-4 xs:gap-6 justify-center lg:justify-start">
                    <div className="flex -space-x-2.5 xs-300:-space-x-3 xs:-space-x-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`${screenSize === "xs-300" ? "w-6 h-6" : "w-8 h-8"} xs:w-9 xs:h-9 rounded-full border-2 border-white flex items-center justify-center shadow-md xs:shadow-lg animate-bounce-slow`}
                          style={{
                            background: colors.gradient,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        >
                          <div
                            className={`${screenSize === "xs-300" ? "w-4 h-4" : "w-6 h-6"} xs:w-7 xs:h-7 rounded-full bg-white flex items-center justify-center`}
                          >
                            <svg
                              className={`${screenSize === "xs-300" ? "w-2 h-2" : "w-3 h-3"} xs:w-3 xs:h-3`}
                              style={{
                                background: colors.gradient,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                              }}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center xs-300:text-left">
                      <p
                        className={`${screenSize === "xs-300" ? "text-xs" : "text-sm"} xs:text-base font-semibold text-slate-900 mb-0.5 xs-300:mb-1`}
                      >
                        Trusted by{" "}
                        <span className="text-amber-600">
                          {data.trustIndicators?.homesCount || "500+"}
                        </span>{" "}
                        Homes
                      </p>
                      <div className="flex items-center justify-center xs-300:justify-start gap-0.5 xs-300:gap-1 xs:gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${screenSize === "xs-300" ? "w-2.5 h-2.5" : "w-3 h-3"} xs:w-3 xs:h-3 text-amber-500 fill-current animate-pulse`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                        <span
                          className={`${screenSize === "xs-300" ? "text-[10px]" : "text-xs"} xs:text-sm text-slate-600 ml-1 xs-300:ml-1.5 xs:ml-2`}
                        >
                          {data.trustIndicators?.rating || "4.9"} (
                          {data.trustIndicators?.reviewsCount || "250+"})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChristmasLightingSection;
