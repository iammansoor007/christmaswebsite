'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import CallToAction from '@/app/components/CallToAction';
import {
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaHome,
  FaTree,
  FaLightbulb,
  FaTools,
  FaBoxOpen,
  FaPhoneAlt,
  FaAward,
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';

const HERO_FALLBACK = '/images/hero-background2.jpg';
const GALLERY_FALLBACK = ['/images/gallery11.jpg', '/images/gallery12.jpg', '/images/gallery13.jpg'];
const FEATURE_ICONS = [FaHome, FaTree, FaLightbulb, FaTools, FaBoxOpen, FaShieldAlt];

export default function ServiceDetailClient({ service }) {
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };

    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setScrollProgress(Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5))));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const {
    title = 'Service',
    number = '',
    description = '',
    shortDescription = '',
    longDescription = '',
    image = '',
    color = '#10B981',
    features = [],
    detail = {},
  } = service || {};

  const heroTitleRaw = detail.heroTitle || title;
  const heroLines = heroTitleRaw
    .split('|')
    .map((line) => line.trim())
    .filter(Boolean);
  const heroLine1 = heroLines[0] || heroTitleRaw;
  const heroLine2 = heroLines[1] || '';
  const heroSubtitle = detail.heroSubtitle || description;
  const heroImage = detail.heroImage || image || HERO_FALLBACK;

  const overviewTitle = useMemo(() => {
    if (!title) return 'Service Overview';
    return `Complete ${title}`;
  }, [title]);

  const overviewText = longDescription || description || '';
  const offeringCards = (detail.sections || []).filter((s) => s?.title || s?.content);
  const whyHighlights = Array.isArray(features) ? features.filter(Boolean) : [];
  const galleryImages = (detail.gallery || []).filter(Boolean);
  const collageImages = [
    galleryImages[0] || GALLERY_FALLBACK[0],
    galleryImages[1] || GALLERY_FALLBACK[1],
    galleryImages[2] || GALLERY_FALLBACK[2],
  ];

  const badgeText = [number, title]
    .filter(Boolean)
    .join(' • ')
    .toUpperCase();

  return (
    <main className="overflow-x-hidden w-full bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center w-full overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="relative w-full h-full transition-transform duration-200 ease-out"
            style={{ transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px) scale(1.05)` }}
          >
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/15 via-gray-900/90 to-red-500/30"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 -right-4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        ></div>

        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent transition-opacity duration-300"
          style={{ opacity: scrollProgress }}
        ></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
              <HiOutlineSparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-white/90 text-sm font-medium tracking-wider">
                {badgeText || 'SERVICE'}
              </span>
            </div>

            <h1 className="font-montserrat font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              {heroLine2 ? (
                <>
                  <span className="block animate-title-slide-up">{heroLine1}</span>
                  <span className="block relative animate-title-slide-up animation-delay-200">
                    <span className="relative inline-block">
                      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400">
                        {heroLine2}
                      </span>
                    </span>
                  </span>
                </>
              ) : (
                <span className="block animate-title-slide-up text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400">
                  {heroLine1}
                </span>
              )}
            </h1>

            {heroSubtitle && (
              <p className="text-xl sm:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-up animation-delay-400">
                {heroSubtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up animation-delay-600">
              <a
                href="tel:+16143017100"
                className="relative overflow-hidden group inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[180px] cursor-pointer"
              >
                Get Your Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section id="details" className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 backdrop-blur-sm border border-emerald-200/30 rounded-full px-4 py-1.5 mb-4">
                  <GiSparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-700 text-xs font-medium tracking-wider">OVERVIEW</span>
                </div>

                <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
                  <span className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                    {overviewTitle}
                  </span>
                </h2>

                {overviewText && (
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">{overviewText}</p>
                )}
              </div>

              <div className="relative animate-fade-up animation-delay-200">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={image || heroImage || '/images/placeholder.jpg'}
                    alt={title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-30"
                  style={{ backgroundColor: color }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {offeringCards.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-2 mb-4">
                  <GiSparkles className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 text-sm font-semibold">WHAT WE OFFER</span>
                </div>
                <h2 className="font-montserrat font-bold text-4xl text-gray-900 mb-4">
                  {overviewTitle} Services
                </h2>
                <p className="text-gray-600 text-lg">
                  {shortDescription || description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offeringCards.map((feature, idx) => {
                  const Icon = FEATURE_ICONS[idx % FEATURE_ICONS.length];
                  return (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 lg:px-8 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-2 mb-4">
                  <FaAward className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 text-sm font-semibold">WHY CHOOSE US</span>
                </div>

                <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-gray-900 mb-6">
                  Professional Quality, Personal Service
                </h2>

                <p className="text-gray-600 text-base sm:text-lg mb-8">
                  {shortDescription || description}
                </p>

                {whyHighlights.length > 0 && (
                  <div className="space-y-4">
                    {whyHighlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <FaCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8">
                  <button
                    onClick={() => (window.location.href = 'tel:+16143017100')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-semibold rounded-lg hover:from-red-700 hover:to-yellow-600 transition-all text-sm sm:text-base"
                  >
                    Get Your Free Quote
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative order-1 lg:order-2 mb-8 lg:mb-0 min-h-[300px] sm:min-h-[400px] md:min-h-[450px]">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-[90%] sm:max-w-full">
                  <div className="aspect-[4/3] w-full">
                    <Image
                      src={collageImages[0]}
                      alt={`${title} gallery`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                <div className="absolute -bottom-4 sm:-bottom-8 -left-2 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-white">
                  <div className="relative w-full h-full">
                    <Image
                      src={collageImages[1]}
                      alt={`${title} gallery detail`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>

                <div className="absolute -top-4 sm:-top-8 -right-2 sm:-right-8 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-white">
                  <div className="relative w-full h-full">
                    <Image
                      src={collageImages[2]}
                      alt={`${title} gallery highlight`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>

                <div className="absolute top-1/2 -right-6 sm:-right-12 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-emerald-200/30 rounded-full blur-xl sm:blur-2xl"></div>
                <div className="absolute bottom-1/4 -left-6 sm:-left-12 w-20 sm:w-28 md:w-32 h-20 sm:h-28 md:h-32 bg-red-200/30 rounded-full blur-xl sm:blur-2xl"></div>

                <div className="absolute top-4 sm:top-6 md:top-8 lg:top-10 right-4 sm:right-6 md:right-8 lg:right-10 text-white">
                  <GiSparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-pulse" />
                </div>

                <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-12 sm:left-16 md:left-20 text-white">
                  <HiOutlineSparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse animation-delay-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="p-8">
        <CallToAction />
      </section>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1) }
          33% { transform: translate(30px,-50px) scale(1.1) }
          66% { transform: translate(-20px,20px) scale(0.9) }
        }
        @keyframes titleSlideUp {
          from { opacity: 0; transform: translateY(50px) }
          to { opacity: 1; transform: translateY(0) }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px) }
          to { opacity: 1; transform: translateY(0) }
        }
        .animate-blob { animation: blob 10s infinite }
        .animate-title-slide-up { animation: titleSlideUp 0.8s forwards; opacity: 0 }
        .animate-fade-up { animation: fadeUp 0.6s forwards; opacity: 0 }
        .animation-delay-200 { animation-delay: 200ms }
        .animation-delay-400 { animation-delay: 400ms }
        .animation-delay-600 { animation-delay: 600ms }
        .animation-delay-800 { animation-delay: 800ms }
        .animation-delay-2000 { animation-delay: 2000ms }
      `}</style>
    </main>
  );
}
