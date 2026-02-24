"use client";
import { useRef, useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaQuoteRight,
  FaCalendarCheck,
  FaChair,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaHome,
  FaTree,
  FaClock,
  FaSpinner,
  FaCheckCircle
} from "react-icons/fa";
import { GiFruitTree } from "react-icons/gi";
import { getHowWeWorkData } from "../services/dataService";

// Icon mapping
const iconMap = {
  FaQuoteRight,
  FaCalendarCheck,
  FaChair
};

// Custom CheckCircle component
const CheckCircleIcon = ({ color, size = "text-sm", className = "" }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    className={`${size} ${className}`}
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: color || undefined }}
  >
    <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
  </svg>
);

// Safe icon component
const SafeIconComponent = ({ iconName, color, className }) => {
  const [isClient, setIsClient] = useState(false);
  const Icon = iconMap[iconName];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        className={`w-6 h-6 ${className} bg-gray-200 animate-pulse rounded`}
      />
    );
  }

  if (!Icon) {
    return (
      <div
        className={`w-6 h-6 ${className} bg-gray-300 rounded`}
      />
    );
  }

  return <Icon className={className} style={{ color: color || undefined }} />;
};

// Consultation Modal Component - Fixed Scrolling
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

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open - FIXED
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
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

  // Close on click outside
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Prevent scroll propagation - FIXED
  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;

      // If at the top and trying to scroll up, or at bottom and trying to scroll down
      if (
        (scrollTop === 0 && e.deltaY < 0) ||
        (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0)
      ) {
        e.preventDefault();
      } else {
        e.stopPropagation();
      }
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
        // Reset form after 3 seconds and close modal
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

  // Time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM',
    '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  // Service types
  const serviceTypes = [
    { value: 'seasonal', label: 'Seasonal Christmas Lighting' },
    { value: 'permanent', label: 'Permanent Lighting Installation' },
    { value: 'commercial', label: 'Commercial Property' },
    { value: 'consultation', label: 'General Consultation' }
  ];

  // How did you hear about us
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
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

      {/* Modal Container - Centered */}
      <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div
          ref={modalRef}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl transform transition-all pointer-events-auto max-h-[90vh] flex flex-col"
          onWheel={handleWheel}
        >
          {/* Close button - Fixed position relative to modal */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 shadow-md"
            aria-label="Close modal"
          >
            <FaTimes className="text-gray-600" />
          </button>

          {/* Success View */}
          {isSubmitted ? (
            <div className="p-8 text-center overflow-y-auto">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
              {/* Header - Fixed */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-t-3xl p-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <GiFruitTree className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Schedule Free Consultation</h3>
                    <p className="text-emerald-100 text-sm">Christmas Lights Over Columbus</p>
                  </div>
                </div>
              </div>

              {/* Scrollable Form Container - FIXED */}
              <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto overscroll-contain p-6"
                style={{ maxHeight: 'calc(90vh - 120px)' }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {/* Name */}
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone */}
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="(614) 555-0123"
                      />
                    </div>

                    {/* Address */}
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="123 Main St, Columbus, OH 43215"
                      />
                    </div>

                    {/* Service Type */}
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      >
                        {serviceTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaCalendarAlt className="inline mr-2 text-emerald-600" />
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaClock className="inline mr-2 text-emerald-600" />
                        Preferred Time *
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>

                    {/* How did you hear about us */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        How did you hear about us?
                      </label>
                      <select
                        name="hearAbout"
                        value={formData.hearAbout}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select an option</option>
                        {hearOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Details (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="Tell us about your vision for your holiday display..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
const HowWeWorkSection = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [gradientPositions, setGradientPositions] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get data
  const workData = getHowWeWorkData();
  const { badge, title, subtitle, steps, cta } = workData;

  // Intersection Observer
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

  // Detect screen size and generate positions only on client side
  useEffect(() => {
    setIsClient(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();

    // Generate gradient positions based on screen size
    const count = window.innerWidth < 768 ? 3 : 6;
    const positions = Array(count)
      .fill(null)
      .map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        width: Math.random() * 200 + 100,
        height: Math.random() * 200 + 100,
      }));

    setGradientPositions(positions);

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Render gradient positions only on client
  const renderGradients = () => {
    if (!isClient) return null;

    return gradientPositions.map((pos, i) => (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${pos.left}%`,
          top: `${pos.top}%`,
          width: `${pos.width}px`,
          height: `${pos.height}px`,
          background: `radial-gradient(circle, rgba(239, 68, 68, 0.03) 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />
    ));
  };

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 min-w-[280px]"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, #e5e7eb 2px, transparent 2px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Floating Accent Elements - Client-side only rendering */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {renderGradients()}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Modern Header */}
          <div
            className={`text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-1 transition-all duration-700 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
          >
            {/* Minimal Badge */}
            <div
              className={`inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-white rounded-full shadow-sm mb-3 xs:mb-4 sm:mb-5 md:mb-6 border border-gray-100 transition-all duration-700 delay-100 ${isVisible ? "animate-fadeInScale" : "opacity-0 scale-95"}`}
            >
              <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-xs xs:text-sm font-medium text-gray-700 uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] xs:max-w-none">
                {badge}
              </span>
            </div>

            {/* Main Title */}
            <h2
              className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 leading-tight transition-all duration-700 delay-200 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
            >
              {title.prefix}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-amber-500 to-red-500 bg-clip-text text-transparent break-words text-center">
                  {title.text}
                </span>
                <svg
                  className="absolute -bottom-1 xs:-bottom-1.5 sm:-bottom-2 left-0 w-full h-1.5 xs:h-2 sm:h-2.5 text-gray-200"
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
            </h2>

            {/* Subtitle */}
            <p
              className={`text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-2 xs:px-3 leading-relaxed text-center transition-all duration-700 delay-300 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          </div>

          {/* Modern Steps - Responsive Layout with Fixed Card Sizing */}
          <div className="relative">
            {/* Connection Line - Desktop Only */}
            {!isMobile && isClient && (
              <div className="absolute top-1/2 left-0 right-0 h-0.5 md:h-1 -translate-y-1/2 hidden md:block">
                <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 opacity-20" />
              </div>
            )}

            {/* Steps Container - Responsive grid with fixed card heights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {steps.map((step, index) => {
                const delay = 400 + index * 150;
                return (
                  <div
                    key={index}
                    className={`relative group transition-all duration-700 w-full ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-8"}`}
                    style={{
                      animationDelay: `${delay}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    {/* Step Number Badge - Floating */}
                    <div className="absolute -top-3 xs:-top-4 left-1/2 -translate-x-1/2 z-20">
                      <div
                        className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-lg xs:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                        style={{ backgroundColor: step.color, color: "white" }}
                      >
                        <span className="text-xs xs:text-sm sm:text-base font-bold">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Modern White Card - Fixed height for consistent sizing */}
                    <div className="relative h-full bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
                      {/* Accent Border Top */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 xs:h-1.5 transition-all duration-300 group-hover:h-2"
                        style={{ backgroundColor: step.color }}
                      />

                      {/* Icon - Centered */}
                      <div className="flex justify-center mt-2 xs:mt-3 mb-3 xs:mb-4">
                        <div
                          className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-xl xs:rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                          style={{
                            backgroundColor: `${step.color}15`,
                            color: step.color,
                          }}
                        >
                          <SafeIconComponent
                            iconName={step.icon}
                            color={step.color}
                            className="text-xl xs:text-2xl sm:text-3xl"
                          />
                        </div>
                      </div>

                      {/* Step Title */}
                      <h3 className="text-base xs:text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 text-center leading-tight transition-all duration-300 group-hover:text-gray-800">
                        {step.title}
                      </h3>

                      {/* Step Description - Fixed height with scrolling if needed */}
                      <div className="mb-3 xs:mb-4 flex-grow">
                        <p className="text-gray-600 text-xs xs:text-sm sm:text-sm md:text-base text-center leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Features List - Compact and consistent */}
                      <div className="space-y-1.5 xs:space-y-2 mt-auto pt-2 xs:pt-3 border-t border-gray-100">
                        {step.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-1.5 xs:gap-2 transition-all duration-300 hover:translate-x-1"
                          >
                            <div
                              className="flex-shrink-0 w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110"
                              style={{ backgroundColor: `${step.color}15` }}
                            >
                              <CheckCircleIcon
                                color={step.color}
                                className="text-xs transition-all duration-300 group-hover:rotate-12"
                              />
                            </div>
                            <span className="text-gray-700 text-xs xs:text-xs sm:text-sm flex-1 leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Decorative Corner */}
                      <div
                        className="absolute -bottom-4 -right-4 w-16 h-16 xs:w-20 xs:h-20 opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-125"
                        style={{ backgroundColor: step.color }}
                      />
                    </div>

                    {/* Arrow Connector - Mobile & Tablet Only */}
                    {(isMobile ||
                      (isTablet &&
                        index % 2 === 0 &&
                        index < steps.length - 1)) &&
                      index < steps.length - 1 && (
                        <div
                          className={`flex justify-center my-3 xs:my-4 ${isTablet && (index === 0 || index === 2) ? "md:hidden" : ""}`}
                        >
                          <div className="w-6 h-6 xs:w-7 xs:h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                            <FaArrowRight className="text-gray-400 text-xs xs:text-sm" />
                          </div>
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modern CTA - Responsive */}
          <div
            className={`mt-8 xs:mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-20 transition-all duration-700 delay-900 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
          >
            <div className="bg-gradient-to-r from-emerald-50 via-amber-50 to-red-50 rounded-xl xs:rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 text-center border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 transition-all duration-300 group-hover:text-gray-800">
                {cta.title}
              </h3>
              <p className="text-gray-600 text-xs xs:text-sm sm:text-base md:text-lg mb-4 xs:mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed transition-all duration-300 group-hover:text-gray-700">
                {cta.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-2 xs:gap-3 justify-center">
                <button
                  className="group/btn relative px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg xs:rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden w-full sm:w-auto text-center active:scale-95"
                  aria-label={cta.buttons.primary}
                  onClick={() => window.location.href = 'tel:+16143017100'}
                >
                  <span className="relative z-10 flex items-center justify-center gap-1.5 xs:gap-2">
                    <FaPhoneAlt className="text-xs xs:text-sm" />
                    <span className="text-xs xs:text-sm sm:text-base whitespace-nowrap">
                      {cta.buttons.primary}
                    </span>
                    <FaArrowRight className="text-xs xs:text-sm transition-all duration-300 group-hover/btn:translate-x-2" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </button>

                <button
                  className="px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-3.5 font-semibold text-gray-700 hover:text-gray-900 border-2 border-gray-300 hover:border-gray-400 rounded-lg xs:rounded-xl transition-all duration-300 bg-white hover:bg-gray-50 w-full sm:w-auto text-center active:scale-95"
                  aria-label={cta.buttons.secondary}
                  onClick={() => setIsModalOpen(true)} // Updated this line
                >
                  <span className="flex items-center justify-center gap-1.5 xs:gap-2">
                    <FaCalendarAlt className="text-xs xs:text-sm" />
                    <span className="text-xs xs:text-sm sm:text-base whitespace-nowrap">
                      {cta.buttons.secondary}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Animations - Same as your original */}
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

          /* Fix card heights for all screen sizes */
          @media (max-width: 319px) {
            .min-w-\\[280px\\] {
              min-width: 280px;
            }

            .text-xl {
              font-size: 1.25rem;
              line-height: 1.3;
            }

            .text-sm {
              font-size: 0.8125rem;
            }

            .text-xs {
              font-size: 0.75rem;
            }

            .space-y-2 > * + * {
              margin-top: 0.375rem;
            }
          }

          /* Small screens (320px - 479px) */
          @media (min-width: 320px) and (max-width: 479px) {
            .grid {
              gap: 0.75rem;
            }
          }

          /* Tablet portrait (768px - 1023px) */
          @media (min-width: 768px) and (max-width: 1023px) {
            .md\\:grid-cols-2 {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .md\\:hidden {
              display: none;
            }
          }

          /* Tablet landscape (1024px - 1279px) */
          @media (min-width: 1024px) and (max-width: 1279px) {
            .lg\\:gap-8 {
              gap: 1.5rem;
            }

            .lg\\:text-2xl {
              font-size: 1.5rem;
            }
          }

          /* Large desktop (1280px and above) */
          @media (min-width: 1280px) {
            .xl\\:gap-10 {
              gap: 2.5rem;
            }
          }

          /* Improve touch targets on mobile */
          @media (max-width: 767px) {
            button,
            [role="button"] {
              min-height: 44px;
              min-width: 44px;
            }
            
            /* Ensure cards don't stretch too much */
            .flex.flex-col {
              height: auto;
            }
          }

          /* Prevent image distortion */
          img {
            backface-visibility: hidden;
            image-rendering: -webkit-optimize-contrast;
          }

          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }

          /* Better text rendering */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Reduce motion preferences */
          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default HowWeWorkSection;