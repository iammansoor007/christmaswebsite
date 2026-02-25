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
  FaPlay
} from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';
import { GiSparkles } from 'react-icons/gi';

// Import images
import galleryHero from '../../public/images/hero-background.jpg';
import gallery1 from '../../public/images/gallery1.jpg';
import gallery2 from '../../public/images/installationmain.jpg';
import gallery3 from '../../public/images/enjoy.jpg';

const Gallery = () => {
  // State
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // ADD THIS
  const [scrollProgress, setScrollProgress] = useState(0); // ADD THIS
  const heroRef = useRef(null);

  // Refs
  const topMarqueeRef = useRef(null);
  const bottomMarqueeRef = useRef(null);

  // Hero content - ADD THIS
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
    { id: 4, src: gallery1, title: 'German Village Townhomes', category: 'residential', location: 'Columbus' },
    { id: 5, src: gallery2, title: 'Polaris Office Complex', category: 'commercial', location: 'Westerville' },
    { id: 6, src: gallery3, title: 'New Albany Country Club', category: 'commercial', location: 'New Albany' },
    { id: 7, src: gallery1, title: 'Wedgewood Hills Residence', category: 'residential', location: 'Powell' },
    { id: 8, src: gallery2, title: 'Easton Town Center', category: 'commercial', location: 'Columbus' },
    { id: 9, src: gallery3, title: 'Hoover Reservoir Estate', category: 'residential', location: 'Westerville' },
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

  // Handle call click - ADD THIS
  const handleCallClick = () => {
    window.location.href = 'tel:+16143017100';
  };

  // Handle mouse move for parallax - ADD THIS
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { width, height, left, top } = heroRef.current.getBoundingClientRect();

        // Calculate mouse position relative to the hero section (values between -1 and 1)
        const x = (clientX - left - width / 2) / (width / 2);
        const y = (clientY - top - height / 2) / (height / 2);

        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle scroll for overlay - ADD THIS
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
      <section className="py-16 sm:py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`max-w-4xl mx-auto transition-all duration-700 delay-900 ${isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-4"}`}
          >
            <div className="bg-gradient-to-r from-emerald-50 via-amber-50 to-red-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 transition-all duration-300 group-hover:text-gray-800">
                {cta.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                {cta.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  className="group/btn relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden w-full sm:w-auto text-center active:scale-95"
                  aria-label={cta.buttons.primary}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'tel:+16143017100';
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaPhoneAlt className="text-sm" />
                    <span className="text-sm sm:text-base whitespace-nowrap">
                      {cta.buttons.primary}
                    </span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </button>

                <button
                  className="px-6 sm:px-8 py-3 sm:py-4 font-semibold text-gray-700 hover:text-gray-900 border-2 border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-300 bg-white hover:bg-gray-50 w-full sm:w-auto text-center active:scale-95"
                  aria-label={cta.buttons.secondary}
                  onClick={handleOpenModal}
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaCalendarAlt className="text-sm" />
                    <span className="text-sm sm:text-base whitespace-nowrap">
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
      `}</style>
    </main>
  );
};

export default Gallery;