// components/Footer.jsx
"use client";
import { useState, useEffect, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { BsPinterest, BsFillTelephoneFill } from "react-icons/bs";
import { SiTiktok } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [lightPositions, setLightPositions] = useState([]);
  const [data, setData] = useState(null);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data.json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Generate fewer lights for better performance on small screens
    const positions = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: Math.random() > 0.5 ? "#FFD700" : "#FF0000",
      animationDelay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 3}s`,
    }));
    setLightPositions(positions);
  }, []);

  if (!data) {
    return (
      <footer className="bg-dark-navy border-t border-holiday-red/30 relative overflow-hidden">
        <div className="flex items-center justify-center min-h-[150px]">
          <div className="text-white text-sm px-4">Loading footer...</div>
        </div>
      </footer>
    );
  }

  const { footer } = data;
  const {
    companyName,
    year = currentYear,
    tagline,
    contact,
    socialMedia,
    links,
    certifications,
  } = footer;

  const iconMap = {
    FaFacebookF: FaFacebookF,
    FaInstagram: FaInstagram,
    FaTwitter: FaTwitter,
    BsPinterest: BsPinterest,
    SiTiktok: SiTiktok,
  };

  return (
    <footer className="bg-dark-navy border-t border-holiday-red/30 relative overflow-hidden">
      {/* Background Pattern - Optimized for mobile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-navy via-dark-navy to-dark-navy/95"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-holiday-red/5 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-holiday-gold/5 via-transparent to-transparent"></div>

        {/* Christmas Lights - Hidden on very small screens for performance */}
        <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
          {lightPositions.length > 0 &&
            lightPositions.map((light) => (
              <div
                key={`light-${light.id}`}
                className="absolute rounded-full"
                style={{
                  left: light.left,
                  top: light.top,
                  width: "2px",
                  height: "2px",
                  background: `radial-gradient(circle, ${light.color} 40%, transparent 70%)`,
                  filter: "blur(0.5px)",
                  animationName: "twinkle",
                  animationDuration: light.duration,
                  animationIterationCount: "infinite",
                  animationDirection: "alternate",
                  animationTimingFunction: "ease-in-out",
                  animationDelay: light.animationDelay,
                }}
              />
            ))}
        </div>
      </div>

      {/* Main Container - Responsive padding from 300px up */}
      <div className="w-full mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 xs:gap-8 md:gap-10 lg:gap-12 mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          {/* Brand & Contact Column - Full width on mobile, adjusted on larger screens */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-5 xs:space-y-6 md:space-y-8">
            {/* Logo */}
            <div className="flex flex-col xs:flex-row xs:items-center gap-4 xs:gap-6">
              <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex items-center justify-center flex-shrink-0 mx-auto xs:mx-0">
                <Image
                  src="/images/mainlogo.png"
                  alt="Luminous Holiday Logo"
                  width={144}
                  height={144}
                  className="object-contain w-full h-full"
                  priority={false}
                  onError={(e) => {
                    const target = e.target;
                    target.onerror = null;
                    target.style.display = "none";
                    target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-dark-navy rounded-xl border border-holiday-gold/20">
                        <div class="text-center">
                          <div class="text-xl xs:text-2xl sm:text-3xl font-bold text-white">LH</div>
                          <div class="text-[10px] xs:text-xs sm:text-sm text-white/70">Logo</div>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>
            </div>

            {/* Contact Info - Responsive text sizes */}
            <div className="space-y-3 xs:space-y-4">
              <h3 className="text-white font-bold text-base xs:text-lg sm:text-xl md:text-2xl mb-2 xs:mb-3 md:mb-4">
                Get in Touch
              </h3>

              <div className="space-y-2 xs:space-y-3 md:space-y-4">
                <div className="flex items-start space-x-2 xs:space-x-3 md:space-x-4 text-white/80 group hover:text-white transition-colors duration-200">
                  <div className="relative flex-shrink-0 mt-1">
                    <BsFillTelephoneFill className="text-holiday-gold group-hover:text-holiday-gold-light text-sm xs:text-base md:text-lg" />
                    <div className="absolute -inset-1 bg-holiday-gold/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs xs:text-sm md:text-base group-hover:translate-x-1 transition-transform duration-200 block break-words">
                      {contact.phone}
                    </span>
                    <span className="text-[10px] xs:text-xs md:text-sm text-white/60">
                      {contact.hours}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-2 xs:space-x-3 md:space-x-4 text-white/80 group hover:text-white transition-colors duration-200">
                  <div className="relative flex-shrink-0 mt-1">
                    <FaEnvelope className="text-holiday-red group-hover:text-holiday-red-light text-sm xs:text-base md:text-lg" />
                    <div className="absolute -inset-1 bg-holiday-red/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs xs:text-sm md:text-base group-hover:translate-x-1 transition-transform duration-200 block break-words">
                      {contact.email}
                    </span>
                    <span className="text-[10px] xs:text-xs md:text-sm text-white/60">
                      {contact.support}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media - Responsive sizing */}
            <div className="pt-1 xs:pt-2">
              <h4 className="text-white font-semibold text-sm xs:text-base md:text-lg mb-2 xs:mb-3 md:mb-4">
                Follow Our Journey
              </h4>
              <div className="flex flex-wrap gap-2">
                {socialMedia.map((social) => {
                  const IconComponent = iconMap[social.icon] || FaFacebookF;
                  return (
                    <a
                      key={social.key}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-lg border border-holiday-gold/30 bg-dark-navy/50 backdrop-blur-sm text-holiday-gold hover:bg-gradient-to-r hover:from-holiday-red hover:via-holiday-gold hover:to-holiday-red hover:text-dark-navy transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-holiday-gold/20 text-xs xs:text-sm sm:text-base md:text-lg"
                      aria-label={social.label}
                    >
                      <IconComponent />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Links Columns - Responsive grid */}
          <div className="lg:col-span-5 xl:col-span-5 grid grid-cols-2 xs:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10">
            {Object.entries(links).map(([category, linkItems]) => (
              <div key={`category-${category}`} className={category === "Company" ? "col-span-2 xs:col-span-1" : ""}>
                <h4 className="text-white font-semibold text-sm xs:text-base sm:text-lg md:text-xl mb-2 xs:mb-3 md:mb-4 pb-2 xs:pb-3 border-b border-holiday-gold/20 relative">
                  <span className="block truncate">{category}</span>
                  <div className="absolute bottom-0 left-0 w-8 xs:w-10 md:w-12 h-0.5 bg-gradient-to-r from-holiday-red to-holiday-gold"></div>
                </h4>
                <ul className="space-y-1.5 xs:space-y-2 md:space-y-2.5 lg:space-y-3.5">
                  {linkItems.map((link) => (
                    <li key={`link-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-holiday-gold transition-all duration-200 flex items-center group text-[10px] xs:text-xs sm:text-sm md:text-base hover:pl-1 xs:hover:pl-2"
                      >
                        <span className="w-1 xs:w-1.5 h-0.5 bg-gradient-to-r from-holiday-red to-holiday-gold opacity-0 group-hover:opacity-100 mr-1 xs:mr-2 md:mr-3 transition-all duration-200 transform group-hover:scale-125"></span>
                        <span className="break-words">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar - Responsive layout */}
        <div className="pt-4 xs:pt-6 sm:pt-8 md:pt-10 lg:pt-12 border-t border-holiday-red/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 xs:gap-4 sm:gap-0">
            <div className="text-center sm:text-left">
              <p className="text-white/60 text-[10px] xs:text-xs sm:text-sm md:text-base">
                © {year} {companyName}. All rights reserved.
              </p>
              <p className="text-white/40 text-[8px] xs:text-[10px] sm:text-xs md:text-sm mt-0.5 xs:mt-1 md:mt-2 max-w-[250px] xs:max-w-none">
                {tagline}
              </p>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 text-[10px] xs:text-xs sm:text-sm md:text-base">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-holiday-gold transition-all duration-200 hover:scale-105 whitespace-nowrap px-1"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-white/60 hover:text-holiday-red transition-all duration-200 hover:scale-105 whitespace-nowrap px-1"
              >
                Terms
              </Link>
              <Link
                href="/sitemap"
                className="text-white/60 hover:text-holiday-gold transition-all duration-200 hover:scale-105 whitespace-nowrap px-1"
              >
                Sitemap
              </Link>
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-4 xs:mt-5 sm:mt-6 md:mt-8 text-center">
            <p className="text-white/40 text-[8px] xs:text-[10px] sm:text-xs md:text-sm px-2">
              {certifications}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* Custom breakpoint for 300px screens */
        @media (min-width: 300px) {
          .xs\\:px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .xs\\:text-sm {
            font-size: 0.875rem;
          }
          .xs\\:text-xs {
            font-size: 0.75rem;
          }
          .xs\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        /* Ultra-small screen adjustments */
        @media (max-width: 350px) {
          .grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
          }
          .text-\[10px\] {
            font-size: 9px;
          }
          .gap-2 {
            gap: 0.35rem;
          }
        }

        /* Large screen optimizations */
        @media (min-width: 1536px) {
          .container {
            max-width: 80rem;
          }
        }

        @media (min-width: 1920px) {
          .container {
            max-width: 90rem;
          }
        }

        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Optimize hover effects for mobile */
        @media (max-width: 768px) {
          a:hover,
          button:hover {
            filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.15));
          }
        }
      `}</style>
    </footer>
  );
};

export default memo(Footer);