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
    FaQuoteLeft
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';

const ConsultationModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '',
        serviceType: 'seasonal', preferredDate: '', preferredTime: '', message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const modalRef = useRef(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
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
            if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/schedule-consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', address: '', serviceType: 'seasonal', preferredDate: '', preferredTime: '', message: '' });
                    onClose();
                }, 3000);
            } else {
                setError('Something went wrong. Please try again.');
            }
        } catch (error) {
            setError('Network error. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
    const serviceTypes = [
        { value: 'seasonal', label: 'Seasonal Christmas Lighting' },
        { value: 'permanent', label: 'Permanent Lighting Installation' },
        { value: 'commercial', label: 'Commercial Property' },
        { value: 'consultation', label: 'General Consultation' }
    ];
    const hearOptions = ['Google Search', 'Facebook', 'Instagram', 'Friend/Family Referral', 'Previous Customer', 'Other'];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden" onClick={handleBackdropClick}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity" />
            <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
                <div ref={modalRef} className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl pointer-events-auto max-h-[90vh] flex flex-col">
                    <button onClick={onClose} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shadow-md hover:rotate-90">
                        <FaTimes className="text-gray-600" />
                    </button>

                    {isSubmitted ? (
                        <div className="p-8 text-center">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <FaCheckCircle className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Consultation Scheduled!</h3>
                            <p className="text-gray-600">We'll contact you within 24 hours.</p>
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

                            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {error && <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 text-sm">{error}</div>}

                                    <div className="space-y-4">
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                                            placeholder="Full Name *" />
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                                            placeholder="Email Address *" />
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                                            placeholder="Phone Number *" />
                                        <input type="text" name="address" value={formData.address} onChange={handleChange} required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                                            placeholder="Service Address *" />

                                        <select name="serviceType" value={formData.serviceType} onChange={handleChange} required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                                            {serviceTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                                        </select>

                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required
                                                min={new Date().toISOString().split('T')[0]}
                                                className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                                            <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} required
                                                className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                                                <option value="">Select</option>
                                                {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
                                            </select>
                                        </div>

                                        <select name="hearAbout" value={formData.hearAbout} onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                                            <option value="">How did you hear about us?</option>
                                            {hearOptions.map(option => <option key={option} value={option}>{option}</option>)}
                                        </select>

                                        <textarea name="message" value={formData.message} onChange={handleChange} rows="3"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                                            placeholder="Tell us about your vision..." />
                                    </div>

                                    <button type="submit" disabled={isSubmitting}
                                        className="w-full mt-6 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50">
                                        {isSubmitting ? <span className="flex items-center justify-center gap-2"><FaSpinner className="animate-spin" /> Scheduling...</span> :
                                            <span className="flex items-center justify-center gap-2"><FaCalendarAlt /> Schedule Free Consultation</span>}
                                    </button>
                                    <p className="text-xs text-gray-500 text-center mt-4">By submitting, you agree to be contacted.</p>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const ResidentialLightingPage = () => {
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
        number: "01",
        title: "Residential Christmas Lighting",
        description: "Coming home to a beautifully lit house makes the holidays even more special. We design and install custom residential displays tailored to your home and your style. From design to professional installation, we handle everything – so you can skip the ladders and tangled lights.",
        longDescription: "Our residential lighting service transforms your home into a stunning holiday showcase. We start with a consultation to understand your vision, then create a custom design that highlights your home's architectural features. Our team handles every aspect of the installation, using only commercial-grade LED lights that are 3x brighter than store-bought options. Throughout the season, we provide ongoing maintenance to ensure your display stays perfect. When the holidays end, we return to carefully remove and store everything at our facility.",
        features: [
            "Gutter and roofline lighting",
            "Tree and shrub lighting",
            "Custom Design and Warrantied Installation",
            "Removal and Storage Included",
            "Commercial-grade C9 LED bulbs",
            "3x brighter than store-bought options"
        ],
        process: [
            { step: "Consultation", description: "We meet with you to understand your vision and assess your property." },
            { step: "Design", description: "Our designers create a custom lighting plan tailored to your home." },
            { step: "Installation", description: "Our professional team installs your display safely and efficiently." },
            { step: "Maintenance", description: "We monitor and maintain your display throughout the season." },
            { step: "Removal", description: "After the holidays, we carefully remove and store everything." }
        ],
        image: "/images/residential-lighting.jpg",
        color: "#10B981",
        stat: "500+ Homes",
        benefits: [
            { icon: FaClock, text: "Stress-free - we do everything" },
            { icon: FaShieldAlt, text: "Fully insured and licensed" },
            { icon: FaGem, text: "Premium commercial-grade lights" },
            { icon: FaBoxOpen, text: "No storage required" }
        ]
    };

    return (
        <main className="overflow-x-hidden w-full bg-white">
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[80vh] flex items-center w-full overflow-hidden">
                <div className="absolute inset-0">
                    <div className="relative w-full h-full transition-transform duration-200 ease-out" style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.05)` }}>
                        <Image src="/images/residential-hero.jpg" alt="Residential Christmas Lighting" fill className="object-cover" priority />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/15 via-gray-900/90 to-red-500/30"></div>
                </div>

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-0 -right-4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`, backgroundSize: '50px 50px' }}></div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent transition-opacity duration-300" style={{ opacity: scrollProgress }}></div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
                            <HiOutlineSparkles className="w-4 h-4 text-emerald-400" />
                            <span className="text-white/90 text-sm font-medium tracking-wider">{service.number} • RESIDENTIAL</span>
                        </div>

                        <h1 className="font-montserrat font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
                            <span className="block animate-title-slide-up">Make Your Home</span>
                            <span className="block relative animate-title-slide-up animation-delay-200">
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400">
                                        The Star of the Neighborhood
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
                                        Complete Residential Lighting
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
                                    Every Detail Covered
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
                                Simple 5-Step Process
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
                                Ready to Transform Your Home?
                            </h3>
                            <p className="text-gray-600 text-base xs:text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
                                Get your free, no-obligation quote today and see the difference professional lighting makes.
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

export default ResidentialLightingPage;