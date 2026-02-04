'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { BsPinterest, BsFillTelephoneFill } from 'react-icons/bs';
import { SiTiktok } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [lightPositions, setLightPositions] = useState([]);
  
  const footerLinks = {
    Services: [
      { label: 'Residential Lighting', href: '/services#residential' },
      { label: 'Commercial Lighting', href: '/services#commercial' },
      { label: 'Custom Designs', href: '/services#custom' },
      { label: 'Maintenance', href: '/services#maintenance' },
      { label: 'LED Upgrades', href: '/services#led' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Process', href: '/about#process' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Careers', href: '/careers' },
    ],
    Support: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Warranty', href: '/warranty' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  };

  const socialIcons = [
    { icon: <FaFacebookF />, label: 'Facebook', href: 'https://facebook.com', key: 'facebook' },
    { icon: <FaInstagram />, label: 'Instagram', href: 'https://instagram.com', key: 'instagram' },
    { icon: <FaTwitter />, label: 'Twitter', href: 'https://twitter.com', key: 'twitter' },
    { icon: <BsPinterest />, label: 'Pinterest', href: 'https://pinterest.com', key: 'pinterest' },
    { icon: <SiTiktok />, label: 'TikTok', href: 'https://tiktok.com', key: 'tiktok' },
  ];

  useEffect(() => {
    // Generate unique positions only on client side
    const positions = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: Math.random() > 0.5 ? '#FFD700' : '#FF0000',
      animationDelay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 3}s`
    }));
    setLightPositions(positions);
  }, []);

  return (
    <footer className="bg-dark-navy border-t border-holiday-red/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-navy via-dark-navy to-dark-navy/95"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-holiday-red/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-holiday-gold/10 via-transparent to-transparent"></div>
        
        {/* Subtle Christmas Lights - Fixed animation property conflict */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {lightPositions.length > 0 && lightPositions.map((light) => (
            <div
              key={`light-${light.id}`}
              className="absolute rounded-full"
              style={{
                left: light.left,
                top: light.top,
                width: '2px',
                height: '2px',
                background: `radial-gradient(circle, ${light.color} 40%, transparent 70%)`,
                filter: 'blur(0.5px)',
                animationName: 'twinkle',
                animationDuration: light.duration,
                animationIterationCount: 'infinite',
                animationDirection: 'alternate',
                animationTimingFunction: 'ease-in-out',
                animationDelay: light.animationDelay
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-3 xs:px-4 py-8 sm:py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8 sm:mb-12">
          
          {/* Brand & Contact Column */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            {/* Logo - Plain Image Only */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/mainlogo.png"
                  alt="Luminous Holiday Logo"
                  width={112}
                  height={112}
                  className="object-contain w-full h-full"
                  priority={false}
                  onError={(e) => {
                    const target = e.target;
                    target.onerror = null;
                    // Simple text fallback
                    target.style.display = 'none';
                    target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-dark-navy rounded-xl border border-holiday-gold/20">
                        <div class="text-center">
                          <div class="text-2xl font-bold text-white">LH</div>
                          <div class="text-xs text-white/70">Logo</div>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>
              
            </div>

            

            {/* Social Media */}
            <div className="pt-2 sm:pt-4">
              <h4 className="text-white font-semibold text-sm sm:text-base mb-2 sm:mb-3">Follow Us</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {socialIcons.map((social) => (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-holiday-gold/30 bg-dark-navy/50 backdrop-blur-sm text-holiday-gold hover:bg-gradient-to-r hover:from-holiday-red hover:via-holiday-gold hover:to-holiday-red hover:text-dark-navy transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-holiday-gold/20 text-sm sm:text-lg"
                    aria-label={social.label}
                  >
                    <span>{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="pt-2 sm:pt-4 space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3 text-white/80 group hover:text-white transition-colors duration-200">
                <div className="relative">
                  <BsFillTelephoneFill className="text-holiday-gold group-hover:text-holiday-gold-light text-sm sm:text-base" />
                  <div className="absolute -inset-1 bg-holiday-gold/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform duration-200 truncate">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-white/80 group hover:text-white transition-colors duration-200">
                <div className="relative">
                  <FaEnvelope className="text-holiday-red group-hover:text-holiday-red-light text-sm sm:text-base" />
                  <div className="absolute -inset-1 bg-holiday-red/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform duration-200 truncate">info@luminousholiday.com</span>
              </div>
            </div>
          </div>

          {/* Links Columns - Responsive grid */}
          <div className="lg:col-span-5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={`category-${category}`}>
                <h4 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4 pb-2 border-b border-holiday-gold/20 relative">
                  {category}
                  <div className="absolute bottom-0 left-0 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-holiday-red to-holiday-gold"></div>
                </h4>
                <ul className="space-y-1.5 sm:space-y-2.5">
                  {links.map((link) => (
                    <li key={`link-${link.label}`}>
                      <Link
                        href={link.href}  
                        className="text-white/70 hover:text-holiday-gold transition-all duration-200 flex items-center group text-xs sm:text-sm hover:pl-0.5 sm:hover:pl-1"
                      >
                        <span className="w-1.5 sm:w-2 h-0.5 bg-gradient-to-r from-holiday-red to-holiday-gold opacity-0 group-hover:opacity-100 mr-1.5 sm:mr-2 transition-all duration-200 transform group-hover:scale-125"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Map Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4 pb-2 border-b border-holiday-gold/20 relative">
              Our Location
              <div className="absolute bottom-0 left-0 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-holiday-gold to-holiday-red"></div>
            </h4>
            <div className="bg-dark-navy/60 backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden border border-holiday-gold/20 hover:border-holiday-red/40 transition-all duration-300 group shadow-lg">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img 
                  src="/images/map.jpg" 
                  alt="Luminous Holiday Location Map"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target;
                    target.onerror = null;
                    target.src = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/80 via-dark-navy/30 to-transparent"></div>
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
                  <div className="flex items-center space-x-2 text-white bg-dark-navy/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-holiday-gold/20">
                    <div className="relative flex-shrink-0">
                      <FaMapMarkerAlt className="text-holiday-gold text-sm sm:text-base" />
                      <div className="absolute -inset-1 bg-holiday-gold/10 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-xs sm:text-sm truncate">123 Holiday Lane</p>
                      <p className="text-white/70 text-xs truncate">North Pole, 12345</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-white/80 text-xs sm:text-sm">
                  Serving the greater metropolitan area with professional holiday lighting services.
                </p>
                <a 
                  href="https://maps.google.com/?q=123+Holiday+Lane+North+Pole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-2 sm:mt-3 text-holiday-gold hover:text-holiday-gold-light text-xs sm:text-sm font-medium group"
                >
                  <span className="relative">
                    Get Directions
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-holiday-gold to-holiday-red group-hover:w-full transition-all duration-300"></span>
                  </span>
                  <span className="ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform duration-200 transform group-hover:scale-125 text-xs sm:text-sm">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Enhanced for mobile */}
        <div className="pt-6 sm:pt-8 border-t border-holiday-red/20">
          <div className="flex flex-col xs:flex-row justify-between items-center space-y-3 xs:space-y-0">
            <div className="text-center xs:text-left">
              <p className="text-white/60 text-xs sm:text-sm">
                © {currentYear} Luminous Holiday Lighting. All rights reserved.
              </p>
              <p className="text-white/40 text-xs mt-0.5">
                Professional holiday lighting installation & design services
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center xs:justify-end items-center gap-3 sm:gap-6 text-xs sm:text-sm">
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
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        /* Responsive text sizes for ultra-small screens */
        @media (max-width: 360px) {
          .container {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          
          .text-xs {
            font-size: 0.65rem !important;
            line-height: 0.9rem !important;
          }
          
          .text-sm {
            font-size: 0.75rem !important;
            line-height: 1rem !important;
          }
        }
        
        @media (max-width: 300px) {
          .container {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
          }
          
          .text-xs {
            font-size: 0.6rem !important;
            line-height: 0.8rem !important;
          }
          
          .grid-cols-1 {
            grid-template-columns: 1fr !important;
          }
        }
        
        /* Add subtle glow to interactive elements */
        a:hover, button:hover {
          filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.2));
        }
        
        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </footer>
  );
};

export default Footer;