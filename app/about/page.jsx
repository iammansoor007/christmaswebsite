'use client'
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {
  FaStar,
  FaTree,
  FaHome,
  FaSnowman,
  FaRegSnowflake,
  FaRegLightbulb,
  FaUsers,
  FaRibbon,
  FaGift,
  FaCandyCane,
  FaRegGem,
  FaRegHeart,
  FaArrowRight,
  FaPlay,
  FaShieldAlt,
  FaClock,
  FaMedal,
  FaCheckCircle,
  FaQuoteRight,
  FaRegStar,
  FaAward,
  FaRegSmile,
  FaRegCalendarCheck,
  FaRegClock,
  FaRegMap,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { GiChristmasTree, GiCandles, GiSparkles, GiCrystalShine } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { BsSnow2 } from 'react-icons/bs';
import { MdOutlineNightlight, MdOutlineCelebration } from 'react-icons/md';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeStory, setActiveStory] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Refs for animations
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const statsRef = useRef(null);
  const journeyRef = useRef(null);
  const parallaxRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    // Mouse parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.from('.about-hero-title', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        },
        y: 100,
        opacity: 0,
        duration: 1.5
      });

      // Parallax elements
      gsap.to('.parallax-snowflake-1', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 200,
        rotate: 180,
        opacity: 0.3
      });

      gsap.to('.parallax-snowflake-2', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: -150,
        rotate: -120,
        opacity: 0.2
      });

      // Story section animations
      gsap.from('.story-card', {
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 1
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.2
      });

      // Values section - 3D flip cards
      gsap.utils.toArray('.value-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 1
          },
          rotationY: 90,
          opacity: 0,
          transformOrigin: 'center center',
          delay: i * 0.1
        });
      });

      // Stats counter animation
      gsap.utils.toArray('.stat-number').forEach((stat) => {
        ScrollTrigger.create({
          trigger: stat,
          start: 'top 80%',
          onEnter: () => {
            const target = stat;
            const value = target.getAttribute('data-target');
            gsap.to(target, {
              innerHTML: value,
              duration: 2,
              snap: { innerHTML: 1 },
              ease: 'power2.out'
            });
          }
        });
      });

      // Journey timeline
      gsap.from('.journey-item', {
        scrollTrigger: {
          trigger: journeyRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 1
        },
        x: -100,
        opacity: 0,
        stagger: 0.3
      });

      // Marquee scroll
      gsap.to('.marquee-content', {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Team section reveal
      gsap.from('.team-member', {
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 1
        },
        y: 100,
        opacity: 0,
        stagger: 0.2
      });

      // Parallax background
      gsap.to('.parallax-bg', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 200,
        scale: 1.2
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  // Story data
  const stories = [
    {
      year: '2015',
      title: 'The First Light',
      description: 'Started with a single ladder and a dream to make holidays brighter. Our first installation was a small bungalow that sparked a movement.',
      icon: <FaRegLightbulb className="text-4xl" />,
      color: 'from-amber-400 to-yellow-500'
    },
    {
      year: '2018',
      title: 'Expanding Horizons',
      description: 'Grew to serve over 100 homes, introducing commercial-grade LED technology and custom design services.',
      icon: <FaTree className="text-4xl" />,
      color: 'from-green-400 to-emerald-500'
    },
    {
      year: '2020',
      title: 'Innovation Era',
      description: 'Launched permanent lighting solutions, allowing homes to celebrate every season with programmable displays.',
      icon: <GiSparkles className="text-4xl" />,
      color: 'from-blue-400 to-purple-500'
    },
    {
      year: '2024',
      title: 'Lighting Excellence',
      description: 'Now a team of 50+ experts, serving 500+ happy clients with award-winning designs and unmatched service.',
      icon: <FaAward className="text-4xl" />,
      color: 'from-red-400 to-pink-500'
    }
  ];

  // Values data
  const values = [
    {
      title: 'Craftsmanship',
      description: 'Every installation is a masterpiece, meticulously planned and executed with precision.',
      icon: <GiCrystalShine />,
      color: 'from-amber-400 to-orange-500',
      stats: '100% Quality Guaranteed'
    },
    {
      title: 'Innovation',
      description: 'Pushing boundaries with smart lighting technology and sustainable solutions.',
      icon: <FaRegLightbulb />,
      color: 'from-blue-400 to-cyan-500',
      stats: '15+ Patents Pending'
    },
    {
      title: 'Community',
      description: 'Bringing neighborhoods together through the magic of holiday lighting.',
      icon: <FaUsers />,
      color: 'from-green-400 to-emerald-500',
      stats: '50+ Community Events'
    },
    {
      title: 'Excellence',
      description: 'Award-winning service that exceeds expectations every single time.',
      icon: <FaMedal />,
      color: 'from-purple-400 to-pink-500',
      stats: '4.9★ Average Rating'
    }
  ];

  // Team data
  const team = [
    {
      name: 'James Chen',
      role: 'Founder & Creative Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces',
      expertise: 'Lighting Design',
      years: '10+ years',
      quote: 'Lighting is not just illumination; it\'s emotion.',
      social: ['twitter', 'linkedin']
    },
    {
      name: 'Sarah Williams',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=faces',
      expertise: 'Creative Direction',
      years: '8+ years',
      quote: 'Every home tells a story through light.',
      social: ['instagram', 'pinterest']
    },
    {
      name: 'Michael Torres',
      role: 'Technical Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
      expertise: 'Smart Systems',
      years: '12+ years',
      quote: 'Innovation meets tradition in every installation.',
      social: ['github', 'twitter']
    },
    {
      name: 'Emily Parker',
      role: 'Client Experience',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces',
      expertise: 'Customer Success',
      years: '6+ years',
      quote: 'Creating magical moments for families is our passion.',
      social: ['linkedin', 'instagram']
    }
  ];

  // Stats data
  const stats = [
    { number: '500+', label: 'Happy Clients', icon: <FaRegSmile />, suffix: 'families' },
    { number: '15+', label: 'Years Excellence', icon: <FaRegCalendarCheck />, suffix: 'years' },
    { number: '24/7', label: 'Support Available', icon: <FaRegClock />, suffix: 'coverage' },
    { number: '50+', label: 'Cities Served', icon: <FaRegMap />, suffix: 'locations' }
  ];

  // Achievements data
  const achievements = [
    {
      title: 'Best Holiday Lighting',
      year: '2023',
      organization: 'International Lighting Association',
      icon: <FaAward />
    },
    {
      title: 'Customer Excellence Award',
      year: '2022, 2023',
      organization: 'Better Business Bureau',
      icon: <FaMedal />
    },
    {
      title: 'Innovation in Design',
      year: '2024',
      organization: 'Home & Garden Awards',
      icon: <GiSparkles />
    }
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-white/20 border-t-red-500 rounded-full animate-spin"></div>
          <GiChristmasTree className="absolute inset-0 m-auto text-3xl text-green-400 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <main className="relative bg-gradient-to-b from-[#0A0F1E] via-[#1A1F30] to-[#0A0F1E] text-white overflow-hidden">

      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          >
            {i % 3 === 0 ? <BsSnow2 className="text-white/10 text-xl" /> :
              i % 3 === 1 ? <FaRegSnowflake className="text-white/10 text-xl" /> :
                <GiSparkles className="text-white/10 text-xl" />}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div className="parallax-bg absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513889961551-628c1e5c2f8b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0F1E]/50 to-[#0A0F1E]"></div>
        </div>

        {/* Animated Snowflakes */}
        <div className="parallax-snowflake-1 absolute top-20 left-20 text-white/20">
          <GiChristmasTree className="text-9xl transform -rotate-12" />
        </div>
        <div className="parallax-snowflake-2 absolute bottom-20 right-20 text-white/20">
          <FaSnowman className="text-9xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="about-hero-title">
            <span className="inline-block px-6 py-2 mb-8 text-sm tracking-wider text-red-300 uppercase border border-red-500/30 rounded-full backdrop-blur-sm bg-white/5">
              ✦ Our Story ✦
            </span>

            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">
              <span className="block text-white/90 mb-4">Illuminating</span>
              <span className="block relative">
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-amber-300 via-red-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                    Holidays
                  </span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent"></span>
                </span>
                <span className="block text-4xl md:text-5xl mt-6 text-white/70 font-light">
                  Since 2015
                </span>
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-12 leading-relaxed">
              From a single ladder to transforming hundreds of homes into winter wonderlands,
              our passion for lighting has grown into an award-winning craft that brings joy to communities.
            </p>

            <div className="flex items-center justify-center gap-6">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-amber-500 rounded-full overflow-hidden">
                <span className="relative z-10 flex items-center gap-2 font-semibold">
                  <FaPlay className="text-sm" />
                  Watch Our Story
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden">
                      <img src={`https://i.pravatar.cc/40?img=${i}`} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-white/60">Join 500+ happy families</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs tracking-wider text-white/40 uppercase">Discover Our Journey</span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/40 rounded-full animate-scroll"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="text-5xl text-red-400/30 group-hover:text-red-400/50 transition-colors duration-500">
                    {stat.icon}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-red-500/0 group-hover:border-red-500/30 rounded-full transition-all duration-500 scale-0 group-hover:scale-150"></div>
                  </div>
                </div>
                <div className="stat-number text-4xl md:text-5xl font-bold mb-2" data-target={stat.number}>
                  0
                </div>
                <div className="text-sm uppercase tracking-wider text-white/40 mb-1">{stat.label}</div>
                <div className="text-xs text-red-400/60">{stat.suffix}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section ref={storyRef} className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 mb-6 text-sm bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              ✦ The Journey ✦
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              From{' '}
              <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
                Spark
              </span>{' '}
              to{' '}
              <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                Brilliance
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-white/60 text-lg">
              Every great story begins with a single light. Here's how we've grown and evolved over the years.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>

            {stories.map((story, index) => (
              <div
                key={index}
                className={`story-card relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center mb-20 last:mb-0`}
              >
                <div className="flex-1 md:w-1/2 p-8">
                  <div className={`bg-gradient-to-br ${story.color} p-8 rounded-3xl backdrop-blur-sm bg-opacity-10 border border-white/10 hover:scale-105 transition-transform duration-500`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-red-400">
                        {story.icon}
                      </div>
                      <div>
                        <div className="text-3xl font-black text-white/90">{story.year}</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{story.title}</h3>
                    <p className="text-white/70 leading-relaxed">{story.description}</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-red-500 to-amber-500 z-10 shadow-xl my-4 md:my-0">
                  <div className="absolute inset-0 rounded-full animate-ping bg-red-500/50"></div>
                  <span className="relative text-xl font-black">{index + 1}</span>
                </div>

                <div className="flex-1 md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section with 3D Cards */}
      <section ref={valuesRef} className="relative py-32 perspective-1000">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 mb-6 text-sm bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              ✦ Our Core ✦
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Values That{' '}
              <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
                Illuminate
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-white/60 text-lg">
              The principles that guide every installation, every design, and every interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card group relative h-80 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border border-white/10 p-8 flex flex-col items-center text-center backface-hidden transition-all duration-500 group-hover:opacity-0">
                  <div className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-4xl text-white`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
                </div>

                {/* Back of Card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden rotateY-180 transition-all duration-500 group-hover:rotateY-0`}>
                  <div className="text-4xl mb-4">✨</div>
                  <h4 className="text-xl font-bold mb-4">Did You Know?</h4>
                  <p className="text-white/90 text-sm leading-relaxed mb-6">{value.stats}</p>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <FaCheckCircle className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Marquee */}
      <section ref={marqueeRef} className="relative py-20 overflow-hidden">
        <div className="marquee-content flex whitespace-nowrap">
          {[...achievements, ...achievements].map((achievement, index) => (
            <div key={index} className="inline-flex items-center gap-8 mx-8">
              <div className="flex items-center gap-4">
                <div className="text-4xl text-red-400">{achievement.icon}</div>
                <div>
                  <div className="text-xl font-bold">{achievement.title}</div>
                  <div className="text-sm text-white/40">{achievement.year} • {achievement.organization}</div>
                </div>
              </div>
              <div className="w-1 h-12 bg-gradient-to-b from-transparent via-red-400 to-transparent"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 mb-6 text-sm bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              ✦ The Dream Team ✦
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Masters of{' '}
              <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
                Light
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-white/60 text-lg">
              Meet the creative minds and technical experts behind every magical installation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="team-member group relative">
                <div className="relative overflow-hidden rounded-3xl mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Hover Quote */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white/90 text-sm italic">"{member.quote}"</p>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-red-400 text-sm mb-2">{member.role}</p>
                  <div className="flex items-center justify-center gap-4 text-xs text-white/40">
                    <span>{member.expertise}</span>
                    <span>•</span>
                    <span>{member.years}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {member.social.map((platform, i) => (
                    <button key={i} className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
                      <span className="text-xs">{platform[0].toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Visualization */}
      <section ref={journeyRef} className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 mb-6 text-sm bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                ✦ Our Impact ✦
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Lighting Up{' '}
                <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
                  Communities
                </span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-12">
                Beyond just installations, we're creating moments of joy that bring families and neighborhoods together.
                Every light tells a story, and every display creates memories that last a lifetime.
              </p>

              <div className="space-y-6">
                {[
                  { label: 'Homes Transformed', value: '500+', progress: 85 },
                  { label: 'Customer Satisfaction', value: '4.9/5', progress: 98 },
                  { label: 'Cities Served', value: '50+', progress: 75 }
                ].map((item, index) => (
                  <div key={index} className="journey-item">
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">{item.label}</span>
                      <span className="text-red-400 font-bold">{item.value}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-red-400 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Interactive Map Visualization */}
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-amber-500/10 rounded-full animate-pulse"></div>

                {/* Service Areas */}
                {[
                  { top: '30%', left: '40%', size: '60px', delay: '0s' },
                  { top: '50%', left: '60%', size: '80px', delay: '1s' },
                  { top: '70%', left: '30%', size: '70px', delay: '2s' },
                  { top: '20%', left: '70%', size: '50px', delay: '3s' }
                ].map((area, index) => (
                  <div
                    key={index}
                    className="absolute rounded-full bg-gradient-to-r from-red-400/20 to-amber-400/20 animate-ping"
                    style={{
                      top: area.top,
                      left: area.left,
                      width: area.size,
                      height: area.size,
                      animationDelay: area.delay
                    }}
                  ></div>
                ))}

                {/* Center Point */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center">
                      <FaMapMarkerAlt className="text-3xl text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-full animate-ping bg-red-500/50"></div>
                  </div>
                </div>
              </div>

              <p className="text-center mt-8 text-white/40 text-sm">
                Expanding our service area to bring light to more communities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1513889961551-628c1e5c2f8b?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-[#0A0F1E]"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Ready to Create Your{' '}
            <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
              Holiday Story?
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/60 text-lg mb-12">
            Join hundreds of happy families who've trusted us to make their holidays magical.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-red-500 to-amber-500 rounded-full overflow-hidden">
              <span className="relative z-10 flex items-center gap-3 text-lg font-semibold">
                Get Your Free Quote
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            <button className="group px-10 py-5 border border-white/20 rounded-full hover:border-red-500/50 transition-colors">
              <span className="flex items-center gap-3 text-lg">
                <FaPlay className="text-sm" />
                Watch Our Showreel
              </span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2 text-white/40">
                <FaStar className="text-yellow-400" />
                <span className="text-sm">Industry Award {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -50px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }

        .animate-float-particle {
          animation: float-particle 15s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotateY-180 {
          transform: rotateY(180deg);
        }

        .group:hover .rotateY-180 {
          transform: rotateY(0deg);
        }

        .marquee-content {
          display: inline-flex;
          will-change: transform;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #0A0F1E;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f59e0b, #ef4444);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #fbbf24, #dc2626);
        }
      `}</style>
    </main>
  );
};

export default AboutUs;