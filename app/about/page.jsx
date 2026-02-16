'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import owner from '../../public/images/aboutownerfamily.jpg';
import installation from '../../public/images/installationmain.jpg';
import hero from '../../public/images/abouthero.jpg';
import enjoy from '../../public/images/enjoy.jpg';
import {
  FaCheckCircle,
  FaArrowRight,
  FaMedal,
  FaShieldAlt,
  FaClock,
  FaStar,
  FaUsers,
  FaTree,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaQuoteLeft,
  FaLightbulb,
  FaHome,
  FaTools,
  FaBoxOpen,
  FaTag,
  FaQuestionCircle,
  FaMinus,
  FaPlus,
  FaAward,
  FaRibbon,
  FaGem,
  FaRegSnowflake,
  FaBuilding,
  FaLeaf,
  FaSnowman
} from 'react-icons/fa';
import { GiSparkles, GiFruitTree, GiCrystalGrowth, GiChristmasTree } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';

// Add animation styles
const addAnimationStyles = () => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fade-up {
        animation: fadeUp 0.6s ease-out forwards;
        opacity: 0;
      }
      
      .animation-delay-200 {
        animation-delay: 0.2s;
      }
      
      .animation-delay-400 {
        animation-delay: 0.4s;
      }
      
      .animation-delay-600 {
        animation-delay: 0.6s;
      }
      
      .animation-delay-800 {
        animation-delay: 0.8s;
      }

      /* Mobile text size improvements */
      @media (max-width: 640px) {
        .mobile-text-base {
          font-size: 1rem !important;
        }
        .mobile-text-lg {
          font-size: 1.125rem !important;
        }
        .mobile-text-xl {
          font-size: 1.25rem !important;
        }
        .mobile-text-2xl {
          font-size: 1.5rem !important;
        }
        .mobile-text-3xl {
          font-size: 1.875rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

const AboutUs = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('seasonal');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    addAnimationStyles();
  }, []);

  if (!mounted) {
    return null;
  }

  // Company stats
  const stats = [
    { number: '500+', label: 'Homes Transformed', icon: FaTree },
    { number: '15+', label: 'Years Experience', icon: FaCalendarAlt },
    { number: '50+', label: 'Team Members', icon: FaUsers },
    { number: '4.9', label: 'Client Rating', icon: FaStar }
  ];

  // Core values
  const values = [
    {
      title: 'Quality First',
      description: 'We use only commercial-grade materials and professional installation techniques.',
      icon: FaMedal
    },
    {
      title: 'Reliability',
      description: 'On-time service with 48-hour maintenance guarantee throughout the season.',
      icon: FaClock
    },
    {
      title: 'Safety',
      description: 'Fully insured with $2M liability coverage and certified technicians.',
      icon: FaShieldAlt
    }
  ];

  // Process steps - fixed with proper image handling
  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We visit your property, discuss your vision, and provide a detailed quote.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
      imageAlt: 'Consultation meeting',
      isExternal: true
    },
    {
      step: '02',
      title: 'Installation',
      description: 'Our team handles everything from design to installation in 3-8 hours.',
      image: installation,
      imageAlt: 'Professional Christmas light installation',
      isExternal: false
    },
    {
      step: '03',
      title: 'Enjoy',
      description: 'We maintain your lights all season and handle takedown and storage.',
      image: enjoy,
      imageAlt: 'Family enjoying Christmas lights at home',
      isExternal: false
    }
  ];

  // Single founder
  const founder = {
    name: 'James Chen',
    role: 'Founder & Creative Director',
    quote: "I started this company because I believe every home deserves to shine during the holidays. We're not just installing lights — we're creating moments that families will remember for years.",
    expertise: '15+ years in lighting design',
    philosophy: 'Treat every property like it\'s our own'
  };

  // Services included
  const services = [
    { icon: FaLightbulb, text: 'Custom lighting design tailored to your home or business' },
    { icon: FaTree, text: 'All Christmas lights and décor provided and professionally installed' },
    { icon: FaTools, text: 'Ongoing maintenance throughout the holiday season' },
    { icon: FaBoxOpen, text: 'Full takedown after the season ends' },
    { icon: FaHome, text: 'All lights removed and stored at our facility — no storage required' }
  ];

  // FAQ items
  const faqItems = [
    {
      question: 'What services are included with professional Christmas light installation?',
      answer: '',
      list: [
        'Custom lighting design tailored to your home or business',
        'All Christmas lights and décor provided and professionally installed',
        'Ongoing maintenance throughout the holiday season',
        'Full takedown after the season ends',
        'All lights removed and stored at our facility — no storage required on your end'
      ],
      icon: FaQuestionCircle
    },
    {
      question: 'What kind of Lights do you install?',
      type: 'dual',
      icon: FaLightbulb,
      options: [
        {
          title: 'Seasonal Lighting',
          description: 'We install commercial-grade C9 LED bulbs. These lights are 3x brighter than anything you\'ll find at a big-box store, and every display is custom-fit to your home.',
          icon: GiSparkles
        },
        {
          title: 'Permanent Lighting',
          description: 'We install Invisilights permanent lighting systems that stay up year-round and can be customized for any holiday or occasion.',
          icon: FaHome
        }
      ]
    },
    {
      question: 'Am I Buying the Lights?',
      type: 'comparison',
      icon: FaTag,
      comparisons: [
        {
          title: 'Seasonal Lighting',
          answer: 'No. All seasonal lights and décor are leased and maintained by our team, so you never have to worry about repairs, storage, or climbing ladders. If anything needs attention during the season, we handle it.',
          icon: GiSparkles
        },
        {
          title: 'Permanent Lighting',
          answer: 'Yes. Permanent lighting systems are purchased and professionally installed on your home.',
          icon: FaHome
        }
      ]
    },
    {
      question: 'Do you install the lights I own?',
      answer: 'We don\'t — and here\'s why: we use professional-grade Christmas lighting on every project so we can guarantee quality, safety, and reliability all season long.',
      icon: FaTools,
      highlight: true
    },
    {
      question: 'Are any discounts available?',
      answer: 'Yes, we offer discounts for installations completed before November, as well as loyalty discounts for continuous years of service.',
      icon: FaTag,
      badge: 'Limited Time'
    }
  ];

  return (
    <main className=" overflow-x-hidden w-full">

      {/* Hero Section */}
      <section className="relative text-white min-h-[90vh] flex items-center w-full">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src={hero}
              alt="Professional lighting installation"
              fill
              className="object-cover opacity-30"
              priority
              sizes="100vw"
              quality={90}
            />
          </div>
          <div className="absolute inset-0 "></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-26 md:py-20 w-full">
          <div className="max-w-3xl mx-auto sm:mx-0 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-amber-400 mb-4 sm:mb-6 animate-fade-up">
              <GiSparkles className="w-4 h-4 sm:w-4 sm:h-4" />
              <span className="text-sm sm:text-xs md:text-sm tracking-wider uppercase">Professional lighting installation</span>
              <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
              <span className="text-sm sm:text-xs md:text-sm">Since 2015</span>
            </div>

            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-light mb-3 sm:mb-4 md:mb-6 leading-tight animate-fade-up animation-delay-200">
              Professional Holiday Lighting
              <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400 mt-1 sm:mt-2">
                Done Right.
              </span>
            </h1>

            <p className="text-lg sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto sm:mx-0 animate-fade-up animation-delay-400">
              We transform homes and businesses into stunning holiday displays.
              No ladders. No storage. No stress. Just beautiful lighting you can enjoy.
            </p>

            {/* CTA with exact styling from reference */}
            <div className="animate-fade-up animation-delay-800 w-full flex justify-center sm:justify-start px-0">
              <Link
                href="/contact"
                className="relative overflow-hidden group inline-flex items-center justify-center px-6 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-2.5 md:py-3 lg:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-sm md:text-base lg:text-lg w-auto min-w-[180px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-1.5 md:gap-2">
                  <HiOutlineSparkles className="w-5 h-5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                  <span>Get My Free Quote</span>
                  <FaArrowRight className="w-4 h-4 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-50 to-amber-50 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="text-xl sm:text-base md:text-xl text-red-600" />
                </div>
                <div className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-0.5 sm:mb-1">{stat.number}</div>
                <div className="text-sm sm:text-xs md:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section - Single Hero */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div className="relative order-2 lg:order-1 text-center lg:text-left">
              <div className="relative z-10">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 text-red-600 mb-3 sm:mb-4">
                  <FaAward className="text-lg sm:text-base md:text-lg" />
                  <span className="text-sm sm:text-xs md:text-sm font-medium tracking-wider uppercase">The Founder</span>
                </div>

                <h2 className="text-4xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-2 sm:mb-3 md:mb-4">
                  {founder.name}
                </h2>

                <p className="text-xl sm:text-lg md:text-xl text-red-600 font-medium mb-4 sm:mb-5 md:mb-6">
                  {founder.role}
                </p>

                <div className="space-y-4 sm:space-y-5 md:space-y-6 text-gray-600 leading-relaxed text-base sm:text-sm md:text-base">
                  <p className="text-lg sm:text-lg italic text-gray-700 border-l-4 border-red-600 pl-4 sm:pl-5 md:pl-6 text-center lg:text-left">
                    "{founder.quote}"
                  </p>
                  <p>
                    It started with a single house in 2015. James wanted to create something special for his family. The result was so beautiful that neighbors started asking if he could do theirs too.
                  </p>
                  <p>
                    Today, we've grown into a team of 50+ professionals serving hundreds of homes every holiday season. But our approach remains the same: treat every property like it's our own.
                  </p>

                  <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3 sm:pt-4">
                    <div className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaGem className="text-red-600 text-lg sm:text-base md:text-xl" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm sm:text-xs text-gray-500">Philosophy</div>
                      <div className="text-base sm:text-sm md:text-base font-medium text-gray-900">{founder.philosophy}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-red-100 to-amber-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                  <Image
                    src={owner}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                    width={800}
                    height={1000}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  />
                </div>

                {/* Experience badge - hidden on mobile */}
                <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-xl max-w-[200px] sm:max-w-xs hidden lg:block">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <FaCalendarAlt className="text-red-600 text-base sm:text-lg md:text-xl" />
                    <span className="text-xs sm:text-xs font-medium text-gray-600">Experience</span>
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{founder.expertise}</div>
                </div>

                {/* Decorative gradient */}
                <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-br from-red-500/10 to-amber-500/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Refined */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-red-600 mb-3 sm:mb-4">
              <FaRibbon className="w-5 h-5 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-xs md:text-sm font-medium tracking-wider uppercase">Why Choose Us</span>
            </div>
            <h2 className="text-4xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-3 sm:mb-4 md:mb-6">
              The Professional
              <span className="block font-bold mt-1 sm:mt-2">Difference</span>
            </h2>
            <p className="text-lg sm:text-base md:text-lg text-gray-600 px-4">
              We don't just hang lights — we create experiences with commercial-grade quality and white-glove service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center sm:text-left"
              >
                <div className="w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-red-50 to-amber-50 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0">
                  <value.icon className="text-xl sm:text-xl md:text-2xl text-red-600" />
                </div>
                <h3 className="text-xl sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-red-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-base sm:text-sm md:text-base text-gray-600 leading-relaxed">{value.description}</p>

                {/* Decorative line */}
                <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-gradient-to-r from-red-600 to-amber-600 mt-4 sm:mt-5 md:mt-6 opacity-0 group-hover:opacity-100 transition-opacity mx-auto sm:mx-0"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Fixed with proper image handling */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-red-600 mb-3 sm:mb-4">
              <FaClock className="w-5 h-5 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-xs md:text-sm font-medium tracking-wider uppercase">Simple Process</span>
            </div>
            <h2 className="text-4xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-3 sm:mb-4 md:mb-6">
              How It
              <span className="block font-bold mt-1 sm:mt-2">Works</span>
            </h2>
            <p className="text-lg sm:text-base md:text-lg text-gray-600">
              Three simple steps to a stunning holiday display
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {process.map((item, index) => (
              <div key={index} className="group relative text-center sm:text-left">
                <div className="relative h-56 sm:h-56 md:h-64 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 md:mb-6">
                  {item.isExternal ? (
                    // For external Unsplash URLs
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    // For imported local images
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  {/* Step number */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center">
                    <span className="text-sm sm:text-xs md:text-sm font-bold text-gray-900">{item.step}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-base sm:text-sm md:text-base text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Included Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h3 className="text-3xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-3 sm:mb-4">
                What's Included With
                <span className="block font-bold mt-1 sm:mt-2">Professional Installation</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-3 p-3 sm:p-4 md:p-5 bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all group text-left">
                  <div className="w-10 h-10 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-red-50 to-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1 group-hover:scale-110 transition-transform">
                    <service.icon className="text-base sm:text-sm text-red-600" />
                  </div>
                  <p className="text-base sm:text-sm md:text-base text-gray-700 leading-relaxed">{service.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lighting Types */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h3 className="text-3xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-3 sm:mb-4">
              What Kind of Lights Do
              <span className="block font-bold mt-1 sm:mt-2">We Install?</span>
            </h3>
          </div>

          {/* Tabs - responsive */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => setActiveTab('seasonal')}
              className={`px-4 sm:px-4 md:px-6 py-2.5 sm:py-2.5 md:py-3 rounded-lg font-medium transition-all text-base sm:text-sm md:text-base ${activeTab === 'seasonal'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Seasonal Lighting
            </button>
            <button
              onClick={() => setActiveTab('permanent')}
              className={`px-4 sm:px-4 md:px-6 py-2.5 sm:py-2.5 md:py-3 rounded-lg font-medium transition-all text-base sm:text-sm md:text-base ${activeTab === 'permanent'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Permanent Lighting
            </button>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100">
              {activeTab === 'seasonal' ? (
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8 text-center sm:text-left">
                  <div className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-100 to-amber-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <GiSparkles className="text-2xl sm:text-2xl md:text-3xl text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Commercial-Grade C9 LED Bulbs</h4>
                    <p className="text-base sm:text-sm md:text-base text-gray-600 leading-relaxed">
                      We install commercial-grade C9 LED bulbs. These lights are <span className="font-semibold text-red-600">3x brighter</span> than anything you'll find at a big-box store, and every display is custom-fit to your home.
                    </p>
                    <div className="mt-3 sm:mt-4 flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                      <FaCheckCircle className="text-green-500 text-sm sm:text-xs" />
                      <span className="text-sm sm:text-xs text-gray-600">Weather-resistant, energy-efficient, long-lasting</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8 text-center sm:text-left">
                  <div className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaHome className="text-2xl sm:text-2xl md:text-3xl text-gray-700" />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Invisilights Permanent Systems</h4>
                    <p className="text-base sm:text-sm md:text-base text-gray-600 leading-relaxed">
                      We install Invisilights permanent lighting systems that stay up year-round and can be customized for any holiday or occasion.
                    </p>
                    <div className="mt-3 sm:mt-4 flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                      <FaCheckCircle className="text-green-500 text-sm sm:text-xs" />
                      <span className="text-sm sm:text-xs text-gray-600">Year-round use, app-controlled, 16 million colors</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h3 className="text-3xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-3 sm:mb-4">
              Frequently Asked
              <span className="block font-bold mt-1 sm:mt-2">Questions</span>
            </h3>
            <p className="text-base sm:text-sm md:text-base text-gray-600">Everything you need to know about our service</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-4 sm:p-4 md:p-6 flex items-start justify-between gap-3 sm:gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3 sm:gap-3">
                    <div className="w-8 h-8 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-red-50 to-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="text-sm sm:text-xs md:text-sm text-red-600" />
                    </div>
                    <span className="text-base sm:text-sm md:text-base font-medium text-gray-900">{item.question}</span>
                  </div>
                  {openFaq === index ?
                    <FaMinus className="text-gray-400 flex-shrink-0 text-sm sm:text-xs" /> :
                    <FaPlus className="text-gray-400 flex-shrink-0 text-sm sm:text-xs" />
                  }
                </button>

                {openFaq === index && (
                  <div className="px-4 sm:px-4 md:px-6 pb-4 sm:pb-4 md:pb-6 pt-2 border-t border-gray-100">
                    {item.type === 'dual' ? (
                      <div className="space-y-3 sm:space-y-4">
                        {item.options.map((opt, i) => (
                          <div key={i} className="bg-gray-50 p-4 sm:p-4 rounded-lg">
                            <div className="flex items-center gap-2 sm:gap-2 mb-2 sm:mb-2">
                              <opt.icon className="text-red-600 text-base sm:text-sm" />
                              <h4 className="font-semibold text-gray-900 text-base sm:text-sm">{opt.title}</h4>
                            </div>
                            <p className="text-gray-600 text-sm sm:text-xs">{opt.description}</p>
                          </div>
                        ))}
                      </div>
                    ) : item.type === 'comparison' ? (
                      <div className="space-y-3 sm:space-y-4">
                        {item.comparisons.map((comp, i) => (
                          <div key={i} className="bg-gray-50 p-4 sm:p-4 rounded-lg">
                            <div className="flex items-center gap-2 sm:gap-2 mb-2 sm:mb-2">
                              <comp.icon className="text-red-600 text-base sm:text-sm" />
                              <h4 className="font-semibold text-gray-900 text-base sm:text-sm">{comp.title}</h4>
                            </div>
                            <p className="text-gray-600 text-sm sm:text-xs">{comp.answer}</p>
                          </div>
                        ))}
                      </div>
                    ) : item.list ? (
                      <ul className="space-y-2 sm:space-y-2">
                        {item.list.map((li, i) => (
                          <li key={i} className="flex items-start gap-2 sm:gap-2 text-sm sm:text-xs text-gray-600">
                            <FaCheckCircle className="text-green-500 text-xs sm:text-[10px] mt-0.5 flex-shrink-0" />
                            <span>{li}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className={`text-sm sm:text-xs leading-relaxed ${item.highlight ? 'bg-amber-50 p-4 sm:p-4 rounded-lg text-amber-800' : 'text-gray-600'}`}>
                        {item.answer}
                      </p>
                    )}

                    {item.badge && (
                      <span className="inline-block mt-3 sm:mt-3 px-3 sm:px-3 py-1 sm:py-1 bg-amber-100 text-amber-700 text-sm sm:text-xs font-medium rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global responsive styles */}
      <style jsx global>{`
        @media (max-width: 320px) {
          .container {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          h1 {
            font-size: 1.75rem;
          }
          h2 {
            font-size: 2rem;
          }
          .text-7xl {
            font-size: 2.25rem;
          }
        }
        
        @media (min-width: 321px) and (max-width: 375px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
        
        /* Ensure images don't overflow */
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* Smooth transitions */
        * {
          transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
      `}</style>
    </main>
  );
};

export default AboutUs;