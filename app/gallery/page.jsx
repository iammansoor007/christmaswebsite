'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaArrowRight,
  FaShieldAlt,
  FaStar,
  FaClock,
  FaPhoneAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaPause,
  FaPlay,
  FaUser,
  FaEnvelope,
  FaHome,
  FaTree,
  FaCalendarAlt,
  FaSpinner,
  FaCheckCircle
} from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';
import { GiFruitTree } from 'react-icons/gi';

// Import images
import galleryHero from '../../public/images/hero-background.jpg';
import gallery1 from '../../public/images/gallery1.jpg';
import gallery2 from '../../public/images/gallery2.jpg';
import gallery3 from '../../public/images/gallery3.jpg';
import gallery4 from '../../public/images/gallery4.jpg';
import gallery5 from '../../public/images/gallery5.jpg';
import gallery6 from '../../public/images/gallery6.jpg';
import gallery7 from '../../public/images/gallery7.jpg';
import gallery8 from '../../public/images/gallery8.jpg';
import gallery9 from '../../public/images/gallery9.jpg';
import gallery10 from '../../public/images/gallery10.jpg';
import gallery11 from '../../public/images/gallery11.jpg';
import gallery12 from '../../public/images/gallery12.jpg';
import gallery13 from '../../public/images/gallery13.jpg';
import gallery14 from '../../public/images/gallery14.jpg';

const Gallery = () => {
  // State
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // ADD THIS
  const [isModalOpen, setIsModalOpen] = useState(false); // ADD THIS
  const [isSubmitted, setIsSubmitted] = useState(false); // ADD THIS
  const [isSubmitting, setIsSubmitting] = useState(false); // ADD THIS
  const [error, setError] = useState(''); // ADD THIS
  const heroRef = useRef(null);
  const modalRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const initialFocusRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    hearAbout: '',
    message: ''
  });

  // Service types
  const serviceTypes = [
    { value: 'residential', label: 'Residential Lighting' },
    { value: 'commercial', label: 'Commercial Lighting' },
    { value: 'event', label: 'Event Lighting' },
    { value: 'maintenance', label: 'Maintenance & Repair' }
  ];

  // Time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  // Hear about options
  const hearOptions = [
    'Google Search',
    'Facebook',
    'Instagram',
    'Friend/Family Referral',
    'Previous Customer',
    'Radio Ad',
    'Other'
  ];

  // Refs
  const topMarqueeRef = useRef(null);
  const bottomMarqueeRef = useRef(null);

  // Hero content
  const hero = {
    cta: {
      subtext: "Get My Free Quote"
    }
  };

  // Gallery images
  const galleryImages = [
    { id: 1, src: gallery1, title: 'Colonial Heights Estate', category: 'residential', location: 'Upper Arlington' },
    { id: 2, src: gallery2, title: 'Downtown Commercial Plaza', category: 'commercial', location: 'Columbus' },
    { id: 3, src: gallery3, title: 'Riverside Drive Mansion', category: 'residential', location: 'Dublin' },
    { id: 4, src: gallery4, title: 'German Village Townhomes', category: 'residential', location: 'Columbus' },
    { id: 5, src: gallery5, title: 'Polaris Office Complex', category: 'commercial', location: 'Westerville' },
    { id: 6, src: gallery6, title: 'New Albany Country Club', category: 'commercial', location: 'New Albany' },
    { id: 7, src: gallery7, title: 'Wedgewood Hills Residence', category: 'residential', location: 'Powell' },
    { id: 8, src: gallery8, title: 'Easton Town Center', category: 'commercial', location: 'Columbus' },
    { id: 9, src: gallery9, title: 'Hoover Reservoir Estate', category: 'residential', location: 'Westerville' },
    { id: 10, src: gallery10, title: 'Columbus City Hall', category: 'commercial', location: 'Columbus' },
    { id: 11, src: gallery11, title: 'Hilltop Apartments', category: 'residential', location: 'Hilliard' },
    { id: 12, src: gallery12, title: 'Riverside Plaza', category: 'commercial', location: 'Columbus' },
    { id: 13, src: gallery13, title: 'Westerville Community Center', category: 'commercial', location: 'Westerville' },
    { id: 14, src: gallery14, title: 'Dublin Library Renovation', category: 'residential', location: 'Dublin' },
  ];

  // Filters
  const filters = [
    { id: 'all', label: 'All Projects', count: galleryImages.length },
    { id: 'residential', label: 'Residential', count: galleryImages.filter(img => img.category === 'residential').length },
    { id: 'commercial', label: 'Commercial', count: galleryImages.filter(img => img.category === 'commercial').length }
  ];

  // Filtered images
  const filteredImages = activeFilter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter);

  // Create marquee array with 10x duplicates for absolutely seamless scrolling
  const marqueeImages = Array(10).fill(filteredImages).flat();

  // Navigation
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % filteredImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);

  // Handle call click
  const handleCallClick = () => {
    window.location.href = 'tel:+16143017100';
  };

  // Handle modal open
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSubmitted(false);
    setError('');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      serviceType: '',
      preferredDate: '',
      preferredTime: '',
      hearAbout: '',
      message: ''
    });
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);

      setIsSubmitted(true);

      // Auto close after success
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
      }, 3000);

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle wheel event for modal scrolling
  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.stopPropagation();
      }
    }
  };

  // Handle mouse move for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { width, height, left, top } = heroRef.current.getBoundingClientRect();

        const x = (clientX - left - width / 2) / (width / 2);
        const y = (clientY - top - height / 2) / (height / 2);

        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle scroll for overlay
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        const progress = Math.min(scrollY / (heroHeight * 0.5), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle visibility for CTA animation
  useEffect(() => {
    const handleVisibility = () => {
      const ctaSection = document.getElementById('cta-section');
      if (ctaSection) {
        const rect = ctaSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleVisibility);
    handleVisibility(); // Check initial visibility

    return () => window.removeEventListener('scroll', handleVisibility);
  }, []);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && isModalOpen) {
        handleCloseModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  // Focus first input when modal opens
  useEffect(() => {
    if (isModalOpen && initialFocusRef.current) {
      setTimeout(() => {
        initialFocusRef.current.focus();
      }, 100);
    }
  }, [isModalOpen]);

  // Effects
  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let interval;
    if (autoplay && !isHovering && filteredImages.length > 0) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % filteredImages.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [autoplay, isHovering, filteredImages.length]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeFilter]);

  if (!mounted) return null;

  // CTA Content
  const cta = {
    title: 'Ready to Create Your Own Masterpiece?',
    description: 'Let our expert team transform your property into a breathtaking holiday destination.',
    buttons: {
      primary: 'Call Us Now: (614) 301-7100',
      secondary: 'Request Consultation'
    },
    features: [
      { icon: FaClock, text: 'Free Estimates' },
      { icon: FaShieldAlt, text: 'Fully Insured' },
      { icon: FaStar, text: '5-Star Service' }
    ]
  };

  return (
    <main className="overflow-x-hidden w-full bg-white">

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
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/15 via-gray-900/90 to-red-500/30"></div>
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
              <span className="text-white/90 text-sm font-medium tracking-wider">OUR PORTFOLIO</span>
            </div>

            {/* Main Heading with animations */}
            <h1 className="font-montserrat font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              <span className="block animate-title-slide-up">
                HOLIDAY LIGHTING{' '}
              </span>
              <span className="block relative animate-title-slide-up animation-delay-200">
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-red-400 bg-[length:200%_200%] animate-gradient-x">
                    GALLERY
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-red-400/30 blur-3xl -z-10 scale-150"></span>
                </span>
              </span>
            </h1>

            {/* Description with animation */}
            <p className="text-xl sm:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-up animation-delay-400">
              Explore our collection of stunning residential and commercial transformations
            </p>

            {/* CTA Buttons with animations */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up animation-delay-600">
              <button
                onClick={handleCallClick}
                className="relative overflow-hidden group inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[180px] cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                  <HiOutlineSparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span>{hero.cta.subtext || "Get My Free Quote"}</span>
                  <FaArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-1.5 rounded-full font-medium transition-all duration-200 flex items-center gap-2 text-sm ${activeFilter === filter.id
                  ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <span>{filter.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFilter === filter.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-600'
                  }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Top Marquee - Moving Right */}
          <div
            className="relative mb-3"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex gap-2 py-2"
                style={{
                  animation: 'marqueeRight 80s linear infinite',
                  animationPlayState: isHovering ? 'paused' : 'running',
                  width: 'max-content'
                }}
              >
                {marqueeImages.map((image, index) => (
                  <div
                    key={`top-${index}`}
                    className="relative w-44 h-44 rounded-lg overflow-hidden shadow-sm cursor-pointer group flex-shrink-0"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      sizes="176px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <p className="text-white text-xs font-semibold truncate">{image.title}</p>
                        <p className="text-white/70 text-xs truncate">{image.location}</p>
                      </div>
                    </div>
                    <div className="absolute top-1 right-1 bg-black/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FaExpand className="text-white text-[8px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Carousel */}
          <div className="relative w-full max-w-4xl mx-auto my-3">
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden shadow-lg border-2 border-white">
              {filteredImages.length > 0 && (
                <Image
                  src={filteredImages[currentSlide]?.src}
                  alt={filteredImages[currentSlide]?.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1200px"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-amber-500 to-red-500 rounded-full text-[8px] text-white font-medium mb-1">
                  {filteredImages[currentSlide]?.category === 'residential' ? 'Residential' : 'Commercial'}
                </span>
                <h3 className="text-base md:text-lg font-bold text-white">
                  {filteredImages[currentSlide]?.title}
                </h3>
                <p className="text-white/70 text-xs">{filteredImages[currentSlide]?.location}</p>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-200"
              >
                <FaChevronLeft className="text-[10px]" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-200"
              >
                <FaChevronRight className="text-[10px]" />
              </button>

              <button
                onClick={() => setAutoplay(!autoplay)}
                className="absolute top-2 right-2 w-7 h-7 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200"
              >
                {autoplay ? <FaPause className="text-[8px]" /> : <FaPlay className="text-[8px]" />}
              </button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {filteredImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-200 ${index === currentSlide
                      ? 'w-5 h-1 bg-white rounded-full'
                      : 'w-1 h-1 bg-white/50 rounded-full hover:bg-white/80'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Marquee - Moving Left */}
          <div
            className="relative mt-3"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex gap-2 py-2"
                style={{
                  animation: 'marqueeLeft 80s linear infinite',
                  animationPlayState: isHovering ? 'paused' : 'running',
                  width: 'max-content'
                }}
              >
                {marqueeImages.map((image, index) => (
                  <div
                    key={`bottom-${index}`}
                    className="relative w-44 h-44 rounded-lg overflow-hidden shadow-sm cursor-pointer group flex-shrink-0"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      sizes="176px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <p className="text-white text-xs font-semibold truncate">{image.title}</p>
                        <p className="text-white/70 text-xs truncate">{image.location}</p>
                      </div>
                    </div>
                    <div className="absolute top-1 right-1 bg-black/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FaExpand className="text-white text-[8px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* Modern CTA - Responsive */}
      <section id="cta-section" className="p-8 -mt-12 sm:py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
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
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </button>

                <button
                  className="px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-3.5 font-semibold text-gray-700 hover:text-gray-900 border-2 border-gray-300 hover:border-gray-400 rounded-lg xs:rounded-xl transition-all duration-300 bg-white hover:bg-gray-50 w-full sm:w-auto text-center active:scale-95"
                  aria-label={cta.buttons.secondary}
                  onClick={() => setIsModalOpen(true)}
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
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-8 right-0 text-white/70 hover:text-white transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-base font-bold text-white">{selectedImage.title}</h3>
              <p className="text-white/70 text-xs">{selectedImage.location}</p>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-hidden">
          <div
            ref={modalRef}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl transform transition-all duration-300 max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
              aria-label="Close modal"
            >
              <FaTimes className="text-gray-600 w-4 h-4" />
            </button>

            {/* Success View */}
            {isSubmitted ? (
              <div className="p-8 text-center overflow-y-auto min-h-[300px] flex flex-col items-center justify-center">
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
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <GiFruitTree className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Schedule Free Consultation</h3>
                      <p className="text-emerald-100 text-sm">Christmas Lights Over Columbus</p>
                    </div>
                  </div>
                </div>

                {/* Scrollable Form Container */}
                <div
                  ref={scrollContainerRef}
                  className="flex-1 overflow-y-auto p-6"
                  onWheel={handleWheel}
                  style={{ maxHeight: 'calc(90vh - 120px)' }}
                >
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    {/* Form Fields - All fields now have visible text */}
                    <div className="space-y-5">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <FaUser className="inline mr-2 text-emerald-600" />
                          Full Name *
                        </label>
                        <input
                          ref={initialFocusRef}
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white placeholder-gray-400"
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <FaEnvelope className="inline mr-2 text-emerald-600" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white placeholder-gray-400"
                          placeholder="john@example.com"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <FaPhoneAlt className="inline mr-2 text-emerald-600" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white placeholder-gray-400"
                          placeholder="(614) 555-0123"
                        />
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <FaHome className="inline mr-2 text-emerald-600" />
                          Service Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white placeholder-gray-400"
                          placeholder="123 Main St, Columbus, OH 43215"
                        />
                      </div>

                      {/* Service Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <FaTree className="inline mr-2 text-emerald-600" />
                          Service Type *
                        </label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white"
                        >
                          <option value="">Select a service type</option>
                          {serviceTypes.map(type => (
                            <option key={type.value} value={type.value} className="text-gray-900">
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Preferred Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
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
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white"
                        />
                      </div>

                      {/* Preferred Time */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <FaClock className="inline mr-2 text-emerald-600" />
                          Preferred Time *
                        </label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white"
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time} className="text-gray-900">{time}</option>
                          ))}
                        </select>
                      </div>

                      {/* How did you hear about us */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          How did you hear about us?
                        </label>
                        <select
                          name="hearAbout"
                          value={formData.hearAbout}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white"
                        >
                          <option value="">Select an option</option>
                          {hearOptions.map(option => (
                            <option key={option} value={option} className="text-gray-900">{option}</option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Additional Details (Optional)
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="4"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white placeholder-gray-400 resize-none"
                          placeholder="Tell us about your vision for your holiday display..."
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-base"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <FaSpinner className="animate-spin w-4 h-4" />
                          Scheduling...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <FaCalendarAlt className="w-4 h-4" />
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
      )}

      <style jsx global>{`
        @keyframes marqueeRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeLeft {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
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
        @keyframes title-slide-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-title-slide-up {
          animation: title-slide-up 0.8s ease-out forwards;
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease-out forwards;
        }
      `}</style>
    </main>
  );
};

export default Gallery;