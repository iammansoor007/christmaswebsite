'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaClock,
  FaStar,
  FaHome,
  FaBuilding,
  FaTree,
  FaLightbulb,
  FaTools,
  FaBoxOpen,
  FaPhoneAlt,
  FaCalendarAlt,
  FaGem,
  FaRuler,
  FaPalette,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaSpinner,
  FaAward,
  FaQuoteLeft,
  FaTag
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';

// Consultation Modal Component
const ConsultationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: 'seasonal',
    preferredDate: '',
    preferredTime: '',
    message: '',
    hearAbout: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/schedule-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            serviceType: 'seasonal',
            preferredDate: '',
            preferredTime: '',
            message: '',
            hearAbout: ''
          });
          onClose();
        }, 3000);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM',
    '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const serviceTypes = [
    { value: 'seasonal', label: 'Seasonal Christmas Lighting' },
    { value: 'permanent', label: 'Permanent Lighting Installation' },
    { value: 'commercial', label: 'Commercial Property' },
    { value: 'consultation', label: 'General Consultation' }
  ];

  const hearOptions = [
    'Google Search',
    'Facebook',
    'Instagram',
    'Friend/Family Referral',
    'Previous Customer',
    'Other'
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden"
      onClick={handleBackdropClick}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity" />
      <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div
          ref={modalRef}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl transform transition-all pointer-events-auto max-h-[90vh] flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 shadow-md hover:rotate-90 transform transition-all"
          >
            <FaTimes className="text-gray-600" />
          </button>

          {isSubmitted ? (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <FaCheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Consultation Scheduled!
              </h3>
              <p className="text-gray-600">
                Thank you for scheduling a consultation. We'll contact you within 24 hours to confirm your appointment.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-t-3xl p-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <GiSparkles className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Schedule Free Consultation</h3>
                    <p className="text-emerald-100 text-sm">Christmas Lights Over Columbus</p>
                  </div>
                </div>
              </div>

              <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto overscroll-contain p-6"
                style={{ maxHeight: 'calc(90vh - 120px)' }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaUser className="inline mr-2 text-emerald-600" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaEnvelope className="inline mr-2 text-emerald-600" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaPhoneAlt className="inline mr-2 text-emerald-600" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="(614) 555-0123"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaHome className="inline mr-2 text-emerald-600" />
                        Service Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="123 Main St, Columbus, OH 43215"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaTree className="inline mr-2 text-emerald-600" />
                        Service Type *
                      </label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        {serviceTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <FaCalendarAlt className="inline mr-2 text-emerald-600" />
                          Date *
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <FaClock className="inline mr-2 text-emerald-600" />
                          Time *
                        </label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="">Select</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        How did you hear about us?
                      </label>
                      <select
                        name="hearAbout"
                        value={formData.hearAbout}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="">Select an option</option>
                        {hearOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Details (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Tell us about your vision for your holiday display..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <FaSpinner className="animate-spin" />
                        Scheduling...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <FaCalendarAlt />
                        Schedule Free Consultation
                      </span>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting, you agree to be contacted by Christmas Lights Over Columbus.
                  </p>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ServicesPage = () => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  const { services, howWeWork } = data;

  // CTA Content from howWeWork
  const cta = {
    title: howWeWork.cta.title,
    description: howWeWork.cta.description,
    buttons: {
      primary: howWeWork.cta.buttons.primary,
      secondary: howWeWork.cta.buttons.secondary
    },
    features: [
      { icon: FaClock, text: 'Free Estimates' },
      { icon: FaShieldAlt, text: 'Fully Insured' },
      { icon: FaStar, text: '5-Star Service' }
    ]
  };

  return (
    <main className="overflow-x-hidden w-full">

      {/* Hero Section - Fixed with services data */}
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
              alt="Services - Christmas Lights Over Columbus"
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
          <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-amber-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-red-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
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

            {/* Services Badge with animation */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
              <HiOutlineSparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-white/90 text-sm font-medium tracking-wider">{services.badge}</span>
            </div>

            {/* Main Heading with animations */}
            <h1 className="font-montserrat font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              <span className="block animate-title-slide-up">
                {services.title.prefix}{' '}
              </span>
              <span className="block relative animate-title-slide-up animation-delay-200">
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400 bg-[length:200%_200%] animate-gradient-x">
                    {services.title.text}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-amber-400/30 blur-3xl -z-10 scale-150"></span>
                </span>
              </span>
            </h1>

            {/* Description with animation - FIXED: using services.subtitle */}
            <p className="text-xl sm:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-up animation-delay-400">
              {services.subtitle}
            </p>

            {/* CTA Buttons with animations - FIXED: updated for services page */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up animation-delay-600">
              <Link
                href="/contact"
                className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-400 to-amber-500 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <HiOutlineSparkles className="w-5 h-5" />
                  <span>View All Services</span>
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </Link>

              <Link
                href="#services"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
              >
                <span className="flex items-center gap-2">
                  <span>Explore Services</span>
                </span>
              </Link>
            </div>

            {/* Trust badges with animation - FIXED: using services.trustIndicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm animate-fade-up animation-delay-800">
              <div className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300">
                <FaHome className="text-emerald-400" />
                <span>{services.trustIndicators.homesCount} Homes Lit</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300">
                <FaStar className="text-amber-400" />
                <span>{services.trustIndicators.rating} • {services.trustIndicators.reviewsCount}</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300">
                <FaShieldAlt className="text-red-400" />
                <span>Fully Insured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Sections - Alternating Left/Right Layout */}
      <section id="services" className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16,185,129,0.1) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">

            {/* Section Header */}
            <div className="text-center mb-12 animate-fade-up">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 backdrop-blur-sm border border-emerald-200/30 rounded-full px-4 py-1.5">
                <GiSparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-700 text-xs font-medium tracking-wider">PREMIUM SERVICES</span>
              </div>
              <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-gray-900 mt-4 mb-4">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500">Lighting Collection</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                {services.subtitle}
              </p>
            </div>

            {/* Alternating Service Cards */}
            {services.items.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center py-16 ${index !== 0 ? 'border-t border-gray-100' : ''}`}
              >
                {/* Content - alternating order */}
                <div className={`relative order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} text-center lg:text-left animate-fade-up`} style={{ animationDelay: `${400 + index * 150}ms` }}>
                  <div className="relative z-10">
                    {/* Section badge */}
                    <div className="flex justify-center lg:justify-start mb-4">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 backdrop-blur-sm border border-emerald-200/30 rounded-full px-4 py-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: service.color }}></div>
                        <span className="text-emerald-700 text-xs font-medium tracking-wider">{service.number}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight mb-4">
                      {service.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-center lg:justify-start">
                      <Link
                        href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <span>Learn More</span>
                        <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Stat Badge */}
                    <div className="mt-6 inline-flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                      <FaGem className="text-emerald-500" />
                      <span className="text-sm text-gray-600">{service.stat}</span>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                </div>

                {/* Image - alternating order */}
                <div className={`relative order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} animate-fade-up`} style={{ animationDelay: `${500 + index * 150}ms` }}>
                  <div className="relative">
                    <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                      <Image
                        src={service.image || "/images/placeholder.jpg"}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        width={800}
                        height={600}
                        priority={index === 0}
                        unoptimized
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>

                    {/* Color accent */}
                    <div
                      className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-30"
                      style={{ backgroundColor: service.color }}
                    ></div>

                    {/* Decorative gradient */}
                    <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-amber-500/10 rounded-full blur-3xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - EXACTLY as you provided from About page */}
      <section className="py-12 xs:py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16,185,129,0.2) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 xs:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div
              className={`transition-all duration-700 delay-900 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
            >
              <div className="bg-gradient-to-r from-emerald-50 via-amber-50 to-red-50 rounded-xl xs:rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 text-center border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-amber-200/20 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-200/20 to-red-200/20 rounded-tr-full"></div>

                {/* Animated orbs */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 -left-4 w-48 h-48 bg-emerald-400 rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-blob"></div>
                  <div className="absolute bottom-0 -right-4 w-48 h-48 bg-amber-400 rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
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
                    <div key={index} className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm border border-emerald-100">
                      <feature.icon className="text-emerald-500 text-xs sm:text-sm" />
                      <span className="text-xs sm:text-base text-gray-700 font-medium whitespace-nowrap">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Button Section */}
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 animate-fade-up animation-delay-600 max-w-xs mx-auto sm:max-w-none">
                  {/* Primary Button */}
                  <button
                    className="group/btn relative w-full sm:w-auto px-5 py-3.5 sm:px-6 md:px-8 sm:py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden active:scale-[0.98] sm:active:scale-95"
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

                  {/* Secondary Button */}
                  <button
                    className="group relative w-full sm:w-auto px-5 py-3.5 sm:px-6 md:px-8 sm:py-3.5 font-semibold text-gray-700 border-2 border-emerald-200 hover:border-emerald-300 rounded-xl transition-all duration-300 bg-white hover:bg-emerald-50 active:scale-[0.98] sm:active:scale-95 text-center"
                    aria-label={cta.buttons.secondary}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-sm sm:text-base whitespace-nowrap">
                        {cta.buttons.secondary}
                      </span>
                      <FaArrowRight className="text-xs sm:text-sm transition-all duration-300 group-hover:translate-x-1" />
                    </span>
                  </button>
                </div>

                {/* Trust badge */}
                <div className="mt-5 xs:mt-6 text-xs xs:text-sm text-gray-500 flex flex-wrap items-center justify-center gap-2 animate-fade-up animation-delay-800">
                  <FaShieldAlt className="text-emerald-500 flex-shrink-0" />
                  <span className="text-center">No commitment • Free consultation • 100% satisfaction guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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

export default ServicesPage;