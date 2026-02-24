'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import installation from '../../public/images/installationmain.jpg';
import FAQ from '../components/FAQSection';
import hero from '../../public/images/hero-background.jpg';
import enjoy from '../../public/images/enjoy.jpg';
import {
  FaCheckCircle,
  FaArrowRight,
  FaGift as FaAward,
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
  FaRibbon,
  FaGem,
  FaRegSnowflake,
  FaBuilding,
  FaLeaf,
  FaSnowman,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeart,
  FaRocket
} from 'react-icons/fa';
import { GiSparkles, GiFruitTree, GiCrystalGrowth, GiChristmasTree } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';

const AboutUs = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('seasonal');
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
    setMounted(true);

    const loadData = async () => {
      try {
        const response = await fetch('/data.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();

    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  if (!data) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0B1120]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  const { hero } = data;

  // Function to handle phone call
  const handleCallClick = (e) => {
    e.preventDefault();
    if (data?.hero?.cta?.phone) {
      const phoneNumber = data.hero.cta.phone.replace(/[^\d+]/g, '');
      window.location.href = `tel:${phoneNumber}`;
    } else {
      window.location.href = '/contact';
    }
  };

  // Founder information
  const founder = {
    name: 'Ethen',
    role: 'Owner, Christmas Lights Over Columbus',
    quote: "Hi, I'm Ethen, owner of Christmas Lights Over Columbus. We help families across Central Ohio create beautiful, welcoming holiday displays without the stress of ladders or tangled lights.",
    expertise: 'Serving Central Ohio families',
    philosophy: 'Making holiday memories stress-free',
    company: 'Christmas Lights Over Columbus',
    tagline: 'Installing Christmas lights. Serving your family.',
    location: 'Central Ohio'
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

  // CTA Content
  const cta = {
    title: 'Ready to Transform Your Home Into a Holiday Wonderland?',
    description: 'Join hundreds of satisfied Central Ohio families who trust us to make their holiday lighting stress-free and spectacular. Get your free, no-obligation quote today!',
    buttons: {
      primary: 'Call Us Now: (614) 301-7100',
      secondary: 'Get Free Quote'
    },
    features: [
      { icon: FaClock, text: 'Free Estimates' },
      { icon: FaShieldAlt, text: 'Fully Insured' },
      { icon: FaStar, text: '5-Star Service' }
    ]
  };

  return (
    <main className="overflow-x-hidden w-full">

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center w-full overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <div className="absolute inset-0">
          <div
            className="relative w-full h-full transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.05)`,
            }}
          >
            <Image
              src="/images/hero-background2.jpg"
              alt="About Christmas Lights Over Columbus"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={100}
            />
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/90 via-[#0B1120]/80 to-[#0B1120]/90"></div>
        </div>

        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-amber-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-red-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-orange-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Particle grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Scroll overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent transition-opacity duration-300"
          style={{ opacity: scrollProgress }}
        ></div>

        {/* Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="max-w-4xl mx-auto text-center">

            {/* About Us Badge with animation */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-red-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
              <HiOutlineSparkles className="w-4 h-4 text-amber-400" />
              <span className="text-white/90 text-sm font-medium tracking-wider">ABOUT US</span>
            </div>

            {/* Main Heading with animations */}
            <h1 className="font-montserrat font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              <span className="block animate-title-slide-up">
                Get to Know{' '}
              </span>
              <span className="block relative animate-title-slide-up animation-delay-200">
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-red-400 bg-[length:200%_200%] animate-gradient-x">
                    Your Lighting Team
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-red-400/30 blur-3xl -z-10 scale-150"></span>
                </span>
              </span>
            </h1>

            {/* Description with animation */}
            <p className="text-xl sm:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-up animation-delay-400">
              {hero?.subtitle || "We're your neighbors in Central Ohio dedicated to making your holiday season magical and stress-free."}
            </p>

            {/* CTA Buttons with animations */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up animation-delay-600">
              <Link
                href="/contact"
                className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-400 to-red-500 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <HiOutlineSparkles className="w-5 h-5" />
                  <span>Meet Our Team</span>
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-amber-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </Link>

              <Link
                href="#story"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
              >
                <span className="flex items-center gap-2">
                  <span>Our Story</span>
                </span>
              </Link>
            </div>

            {/* Trust badges with animation */}
            {hero?.trustBadges && hero.trustBadges.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm animate-fade-up animation-delay-800">
                {hero.trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300">
                    {badge.icon === 'shield' && <FaShieldAlt className="text-amber-400" />}
                    {badge.icon === 'clock' && <FaClock className="text-amber-400" />}
                    {badge.icon === 'medal' && <FaMedal className="text-amber-400" />}
                    {badge.icon === 'star' && <FaStar className="text-amber-400" />}
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>


      </section>

      {/* Founder Section with ID for anchor link */}
      <section id="story" className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(245,158,11,0.1) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="relative order-2 lg:order-1 text-center lg:text-left">
                <div className="relative z-10">
                  {/* Section badge - reduced bottom margin */}
                  <div className="flex justify-center lg:justify-start mb-2 animate-fade-up">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-red-500/10 backdrop-blur-sm border border-amber-200/30 rounded-full px-4 py-1.5">
                      <FaAward className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-amber-700 text-xs font-medium tracking-wider">INSTALLING CHRISTMAS LIGHTS</span>
                    </div>
                  </div>

                  {/* Main heading - reduced top margin and adjusted spacing */}
                  <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight animate-title-slide-up">
                    <span className="block">Serving your</span>
                    <span className="block relative -mt-1">
                      <span className="relative inline-block">
                        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500 bg-[length:200%_200%] animate-gradient-x">
                          family
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-red-400/20 blur-3xl -z-10 scale-150"></span>
                      </span>
                    </span>
                  </h2>

                  {/* Content with adjusted top spacing */}
                  <div className="space-y-5 text-gray-600 leading-relaxed text-base sm:text-lg mt-4 animate-fade-up animation-delay-200">
                    <p className="text-lg sm:text-xl text-gray-700 italic">
                      <FaQuoteLeft className="inline-block w-4 h-4 text-amber-400 mr-1 opacity-50" />
                      {founder.quote}
                    </p>
                    <p>
                      From custom design and installation to takedown after the season, my team takes care of
                      everything so you can focus on what truly matters—making memories and enjoying time with
                      the people you love.
                    </p>

                    <div className="flex items-center justify-center lg:justify-start gap-3 pt-3 animate-fade-up animation-delay-400">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaGem className="text-amber-600 text-lg" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-gray-500">Mission</div>
                        <div className="text-base font-semibold text-gray-900">{founder.philosophy}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-amber-100 to-red-100 rounded-full blur-3xl opacity-50 -z-10"></div>
              </div>

              <div className="relative order-1 lg:order-2 animate-fade-up animation-delay-200">
                <div className="relative">
                  <div className="aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                    <Image
                      src="/images/aboutownerfamily.JPEG?t=1"
                      alt={founder.name}
                      className="w-full h-full object-cover"
                      width={800}
                      height={1000}
                      priority
                      unoptimized // Add this to bypass Next.js image optimization
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    />
                  </div>

                  {/* Experience badge */}
                  <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white/90 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-xl max-w-[200px] sm:max-w-xs hidden lg:block border border-amber-100">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                      <FaCalendarAlt className="text-amber-500 text-base sm:text-lg md:text-xl" />
                      <span className="text-xs sm:text-xs font-medium text-gray-600">Serving</span>
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{founder.expertise}</div>
                  </div>

                  {/* Decorative gradient */}
                  <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-br from-amber-500/10 to-red-500/10 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-12 xs:py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(245,158,11,0.2) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 xs:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div
              className={`transition-all duration-700 delay-900 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
            >
              <div className="bg-gradient-to-r from-amber-50 via-red-50 to-amber-50 rounded-xl xs:rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 text-center border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-red-200/20 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-200/20 to-red-200/20 rounded-tr-full"></div>

                {/* Animated orbs */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 -left-4 w-48 h-48 bg-amber-400 rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-blob"></div>
                  <div className="absolute bottom-0 -right-4 w-48 h-48 bg-red-400 rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                </div>

                <h3 className="font-montserrat font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4 transition-all duration-300 group-hover:text-gray-800 animate-title-slide-up">
                  {cta.title}
                </h3>
                <p className="text-gray-600 text-base xs:text-lg sm:text-xl md:text-2xl mb-6 max-w-2xl mx-auto leading-relaxed transition-all duration-300 group-hover:text-gray-700 animate-fade-up animation-delay-200">
                  {cta.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 xs:mb-8 animate-fade-up animation-delay-400">
                  {cta.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm border border-amber-100">
                      <feature.icon className="text-amber-500 text-xs sm:text-sm" />
                      <span className="text-xs sm:text-base text-gray-700 font-medium whitespace-nowrap">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* IMPROVED BUTTON SECTION */}
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 animate-fade-up animation-delay-600 max-w-xs mx-auto sm:max-w-none">
                  {/* Primary Button - Full width on mobile, auto on desktop */}
                  <button
                    className="group/btn relative w-full sm:w-auto px-5 py-3.5 sm:px-6 md:px-8 sm:py-3.5 bg-gradient-to-r from-amber-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden active:scale-[0.98] sm:active:scale-95"
                    aria-label={cta.buttons.primary}
                    onClick={() => window.location.href = 'tel:+16143017100'}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <FaPhoneAlt className="text-sm sm:text-sm" />
                      <span className="text-sm sm:text-base whitespace-nowrap">
                        {cta.buttons.primary}
                      </span>
                      <FaArrowRight className="text-xs sm:text-sm transition-all duration-300 group-hover/btn:translate-x-2" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                  </button>

                  {/* Secondary Button - Full width on mobile, auto on desktop */}
                  <Link
                    href="/contact"
                    className="group relative w-full sm:w-auto px-5 py-3.5 sm:px-6 md:px-8 sm:py-3.5 font-semibold text-gray-700 border-2 border-amber-200 hover:border-amber-300 rounded-xl transition-all duration-300 bg-white hover:bg-amber-50 active:scale-[0.98] sm:active:scale-95 text-center"
                    aria-label={cta.buttons.secondary}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-sm sm:text-base whitespace-nowrap">
                        {cta.buttons.secondary}
                      </span>
                      <FaArrowRight className="text-xs sm:text-sm transition-all duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>

                {/* Trust badge */}
                <div className="mt-5 xs:mt-6 text-xs xs:text-sm text-gray-500 flex flex-wrap items-center justify-center gap-2 animate-fade-up animation-delay-800">
                  <FaShieldAlt className="text-amber-500 flex-shrink-0" />
                  <span className="text-center">No commitment • Free consultation • 100% satisfaction guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes titleSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientX {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 10s infinite;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-title-slide-up {
          animation: titleSlideUp 0.8s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-fade-up {
          animation: fadeUp 0.6s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 3s ease infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-800 {
          animation-delay: 800ms;
        }

        .animation-delay-2000 {
          animation-delay: 2000ms;
        }

        .animation-delay-4000 {
          animation-delay: 4000ms;
        }

        .animation-delay-900 {
          animation-delay: 900ms;
        }

        @media (max-width: 640px) {
          h1, h2, h3 {
            line-height: 1.2 !important;
          }
          
          .text-xl {
            font-size: 1.125rem !important;
          }
        }
      `}</style>
    </main>
  );
};

export default AboutUs;