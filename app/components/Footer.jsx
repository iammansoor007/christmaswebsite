// components/Footer.jsx
"use client";
import { useState, useEffect, memo, React } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
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
    // Generate unique positions only on client side
    const positions = Array.from({ length: 15 }, (_, i) => ({
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
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-white">Loading footer...</div>
        </div>
      </footer>
    );
  }

  const { footer } = data;
  const {
    companyName,
    year,
    tagline,
    contact,
    socialMedia,
    links,
    location,
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
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-navy via-dark-navy to-dark-navy/95"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-holiday-red/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-holiday-gold/10 via-transparent to-transparent"></div>

        {/* Subtle Christmas Lights - Fixed animation property conflict */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      {/* UPDATED: Better padding for different screen sizes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-12 lg:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 mb-8 sm:mb-12 lg:mb-16">
          {/* Brand & Contact Column */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-6 lg:space-y-8">
            {/* Logo - Plain Image Only */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 flex items-center justify-center flex-shrink-0">
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
                    // Simple text fallback
                    target.style.display = "none";
                    target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-dark-navy rounded-xl border border-holiday-gold/20">
                        <div class="text-center">
                          <div class="text-2xl lg:text-3xl font-bold text-white">LH</div>
                          <div class="text-xs lg:text-sm text-white/70">Logo</div>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>
            </div>

            {/* Contact Info - Updated for larger screens */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg lg:text-xl mb-3 lg:mb-4">
                Get in Touch
              </h3>

              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center space-x-3 lg:space-x-4 text-white/80 group hover:text-white transition-colors duration-200">
                  <div className="relative flex-shrink-0">
                    <BsFillTelephoneFill className="text-holiday-gold group-hover:text-holiday-gold-light text-base lg:text-lg" />
                    <div className="absolute -inset-1 bg-holiday-gold/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <span className="text-sm lg:text-base group-hover:translate-x-1 transition-transform duration-200 block">
                      {contact.phone}
                    </span>
                    <span className="text-xs lg:text-sm text-white/60">
                      {contact.hours}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 lg:space-x-4 text-white/80 group hover:text-white transition-colors duration-200">
                  <div className="relative flex-shrink-0">
                    <FaEnvelope className="text-holiday-red group-hover:text-holiday-red-light text-base lg:text-lg" />
                    <div className="absolute -inset-1 bg-holiday-red/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <span className="text-sm lg:text-base group-hover:translate-x-1 transition-transform duration-200 block">
                      {contact.email}
                    </span>
                    <span className="text-xs lg:text-sm text-white/60">
                      {contact.support}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media - Updated for larger screens */}
            <div className="pt-2">
              <h4 className="text-white font-semibold text-base lg:text-lg mb-3 lg:mb-4">
                Follow Our Journey
              </h4>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {socialMedia.map((social) => {
                  const IconComponent = iconMap[social.icon] || FaFacebookF;
                  return (
                    <a
                      key={social.key}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg border border-holiday-gold/30 bg-dark-navy/50 backdrop-blur-sm text-holiday-gold hover:bg-gradient-to-r hover:from-holiday-red hover:via-holiday-gold hover:to-holiday-red hover:text-dark-navy transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-holiday-gold/20 text-lg lg:text-xl"
                      aria-label={social.label}
                    >
                      <span>
                        <IconComponent />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Links Columns - Updated grid with better spacing */}
          <div className="lg:col-span-5 xl:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
            {Object.entries(links).map(([category, linkItems]) => (
              <div key={`category-${category}`}>
                <h4 className="text-white font-semibold text-lg lg:text-xl mb-4 lg:mb-6 pb-3 border-b border-holiday-gold/20 relative">
                  {category}
                  <div className="absolute bottom-0 left-0 w-10 lg:w-12 h-0.5 bg-gradient-to-r from-holiday-red to-holiday-gold"></div>
                </h4>
                <ul className="space-y-2.5 lg:space-y-3.5">
                  {linkItems.map((link) => (
                    <li key={`link-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-holiday-gold transition-all duration-200 flex items-center group text-sm lg:text-base hover:pl-2"
                      >
                        <span className="w-2 h-0.5 bg-gradient-to-r from-holiday-red to-holiday-gold opacity-0 group-hover:opacity-100 mr-2 lg:mr-3 transition-all duration-200 transform group-hover:scale-125"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        
        </div>

        {/* Bottom Bar - Enhanced for all screens */}
        <div className="pt-8 lg:pt-12 border-t border-holiday-red/20">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-white/60 text-sm lg:text-base">
                © {year} {companyName}. All rights reserved.
              </p>
              <p className="text-white/40 text-xs lg:text-sm mt-1 lg:mt-2">
                {tagline}
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end items-center gap-4 lg:gap-6 text-sm lg:text-base">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-holiday-gold transition-all duration-200 hover:scale-105 whitespace-nowrap"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/60 hover:text-holiday-red transition-all duration-200 hover:scale-105 whitespace-nowrap"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-white/60 hover:text-holiday-gold transition-all duration-200 hover:scale-105 whitespace-nowrap"
              >
                Sitemap
              </Link>
            </div>
          </div>

          {/* Additional Info for Larger Screens */}
          <div className="mt-6 lg:mt-8 text-center">
            <p className="text-white/40 text-xs lg:text-sm">{certifications}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* Responsive improvements for ultra-large screens */
        @media (min-width: 1536px) {
          .max-w-7xl {
            max-width: 80rem !important;
          }
        }

        @media (min-width: 1920px) {
          .max-w-7xl {
            max-width: 90rem !important;
          }
        }

        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Add subtle glow to interactive elements */
        a:hover,
        button:hover {
          filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.2));
        }
      `}</style>
    </footer>
  );
};

export default memo(Footer);
