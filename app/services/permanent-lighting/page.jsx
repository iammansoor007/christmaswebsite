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
    FaMobile,
    FaWifi,
    FaRegSun,
    FaRegMoon
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';

// Reuse the same ConsultationModal component
const ConsultationModal = ({ isOpen, onClose }) => {
    // Copy the same ConsultationModal from above, with serviceType default 'permanent'
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '',
        serviceType: 'permanent', preferredDate: '', preferredTime: '', message: ''
    });
    // ... rest of the modal code (same as above)
    // For brevity, I'm not repeating the full modal here, but you should copy it
};

const PermanentLightingPage = () => {
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollProgress, setScrollProgress] = useState(0);
    const heroRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        window.scrollTo(0, 0);

        const handleMouseMove = (e) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setMousePosition({ x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 });
            }
        };

        const handleScroll = () => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setScrollProgress(Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5))));
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('scroll', handleScroll); };
    }, []);

    if (!mounted) return null;

    const service = {
        number: "03",
        title: "Permanent Holiday Lighting",
        description: "Upgrade your home with permanent lighting you can enjoy all year long. Custom systems perfect for everyday curb appeal, holidays, game days, and special occasions — all controlled right from your phone.",
        longDescription: "Imagine being able to change your home's lighting for any occasion with the tap of a finger. Our permanent lighting systems use advanced LED technology that installs once and lasts for years. With millions of colors and endless customization options, you can create the perfect ambiance for Christmas, Halloween, game days, parties, or everyday elegance. The system is weatherproof, energy-efficient, and controlled entirely from your smartphone.",
        features: [
            "Fast and efficient installation",
            "Endless customization from your phone",
            "Durable and weather resistant",
            "Year-round curb appeal",
            "Millions of colors and effects",
            "Smart home compatible"
        ],
        process: [
            { step: "Consultation", description: "We discuss your vision and identify the best locations for lighting." },
            { step: "Design", description: "We create a custom layout that enhances your home's architecture." },
            { step: "Installation", description: "Our team professionally installs the permanent system." },
            { step: "Setup", description: "We help you set up your app and create your first lighting scenes." },
            { step: "Enjoy", description: "Control your lights year-round for any occasion." }
        ],
        image: "/images/permanent-lighting.jpg",
        color: "#F59E0B",
        stat: "Custom Designs",
        benefits: [
            { icon: FaMobile, text: "Control from your phone" },
            { icon: FaWifi, text: "WiFi enabled" },
            { icon: FaRegSun, text: "Weatherproof design" },
            { icon: FaGem, text: "Energy efficient LEDs" }
        ]
    };

    return (
        <main className="overflow-x-hidden w-full bg-white">
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[80vh] flex items-center w-full overflow-hidden">
                <div className="absolute inset-0">
                    <div className="relative w-full h-full transition-transform duration-200 ease-out" style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.05)` }}>
                        <Image src="/images/permanent-hero.jpg" alt="Permanent Holiday Lighting" fill className="object-cover" priority />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/15 via-gray-900/90 to-red-500/30"></div>
                </div>

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-0 -right-4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`, backgroundSize: '50px 50px' }}></div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" style={{ opacity: scrollProgress }}></div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
                            <HiOutlineSparkles className="w-4 h-4 text-emerald-400" />
                            <span className="text-white/90 text-sm font-medium tracking-wider">{service.number} • PERMANENT</span>
                        </div>

                        <h1 className="font-montserrat font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
                            <span className="block animate-title-slide-up">Light Up Every</span>
                            <span className="block relative animate-title-slide-up animation-delay-200">
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400">
                                        Occasion, All Year Long
                                    </span>
                                </span>
                            </span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-up animation-delay-400">
                            {service.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up animation-delay-600">
                            <button onClick={() => setIsModalOpen(true)}
                                className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-amber-400 to-red-500 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all w-full sm:w-auto">
                                <span className="relative z-10 flex items-center gap-2">
                                    <span>Get Your Free Quote</span>
                                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-amber-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                            </button>

                            <Link href="#details"
                                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full hover:bg-white/20 transition-all w-full sm:w-auto">
                                Learn More
                            </Link>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm animate-fade-up animation-delay-800">
                            <div className="flex items-center gap-2"><FaHome className="text-emerald-400" /> <span>{service.stat}</span></div>
                            <div className="flex items-center gap-2"><FaStar className="text-amber-400" /> <span>4.9/5 Rating</span></div>
                            <div className="flex items-center gap-2"><FaShieldAlt className="text-red-400" /> <span>Fully Insured</span></div>
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
                                        Set It Once, Enjoy Forever
                                    </span>
                                </h2>

                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">{service.longDescription}</p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {service.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <benefit.icon className="text-emerald-500 mt-1 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">{benefit.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <button onClick={() => setIsModalOpen(true)}
                                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-full hover:shadow-lg transition-all">
                                        Schedule Consultation
                                    </button>
                                    <Link href="/contact"
                                        className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>

                            <div className="relative animate-fade-up animation-delay-200">
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                                    <Image src={service.image || "/images/placeholder.jpg"} alt={service.title} width={800} height={600} className="w-full h-full object-cover" unoptimized />
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-30" style={{ backgroundColor: service.color }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 backdrop-blur-sm border border-emerald-200/30 rounded-full px-4 py-1.5">
                                <GiSparkles className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-emerald-700 text-xs font-medium tracking-wider">WHAT'S INCLUDED</span>
                            </div>
                            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-gray-900 mt-4 mb-4">
                                <span className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                                    Smart Lighting, Smart Investment
                                </span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {service.features.map((feature, idx) => (
                                <div key={idx} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                                    <FaCheckCircle className="text-emerald-500 text-xl mb-3" />
                                    <p className="text-gray-800 font-medium">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 backdrop-blur-sm border border-emerald-200/30 rounded-full px-4 py-1.5">
                            <GiSparkles className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-700 text-xs font-medium tracking-wider">OUR PROCESS</span>
                        </div>
                        <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-gray-900 mt-4 mb-4">
                            <span className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                                Simple Installation, Instant Transformation
                            </span>
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {service.process.map((step, idx) => (
                            <div key={idx} className="flex gap-6 mb-8">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {idx + 1}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.step}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 xs:py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4 xs:px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-emerald-50 via-amber-50 to-red-50 rounded-2xl p-8 text-center border border-emerald-100 shadow-lg">
                            <h3 className="font-montserrat font-extrabold text-2xl xs:text-3xl sm:text-4xl text-gray-900 mb-4">
                                Ready for Year-Round Magic?
                            </h3>
                            <p className="text-gray-600 text-base xs:text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
                                Get your free quote today and see how permanent lighting can transform your home.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button onClick={() => window.location.href = 'tel:+16143017100'}
                                    className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                                    Call Us: (614) 301-7100
                                </button>
                                <button onClick={() => setIsModalOpen(true)}
                                    className="px-6 py-3.5 font-semibold text-gray-700 border-2 border-emerald-200 hover:border-emerald-300 rounded-xl transition-all bg-white">
                                    Schedule Free Consultation
                                </button>
                            </div>

                            <div className="mt-5 text-xs text-gray-500 flex flex-wrap items-center justify-center gap-2">
                                <FaShieldAlt className="text-emerald-500" />
                                <span>No commitment • Free consultation • 100% satisfaction guaranteed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Back to Services Link */}
            <div className="container mx-auto px-4 py-8">
                <Link href="/#services" className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors">
                    <FaArrowRight className="rotate-180" />
                    <span>Back to All Services</span>
                </Link>
            </div>

            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <style jsx global>{`
        @keyframes blob { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-50px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.9)} }
        @keyframes titleSlideUp { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .animate-blob { animation: blob 10s infinite }
        .animate-title-slide-up { animation: titleSlideUp 0.8s forwards; opacity:0 }
        .animate-fade-up { animation: fadeUp 0.6s forwards; opacity:0 }
        .animation-delay-200 { animation-delay:200ms }
        .animation-delay-400 { animation-delay:400ms }
        .animation-delay-600 { animation-delay:600ms }
        .animation-delay-800 { animation-delay:800ms }
        .animation-delay-2000 { animation-delay:2000ms }
      `}</style>
        </main>
    );
};

export default PermanentLightingPage;