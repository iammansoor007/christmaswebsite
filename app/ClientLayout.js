'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import GlobalLoader from './components/GlobalLoader';
import SmoothScroll from './components/SmoothScroll';
import QuickQuote from './components/QuickQuote';

export default function ClientLayout({ children }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {/* ENHANCED SNOWFALL EFFECT - FULL VERSION */}
            {isClient && (
                <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10 overflow-hidden">
                    {/* Extra small snowflakes - most numerous */}
                    {Array.from({ length: 80 }).map((_, i) => (
                        <div
                            key={`xs-${i}`}
                            className="absolute top-[-5px] text-white/30"
                            style={{
                                left: `${Math.random() * 100}%`,
                                width: "2px",
                                height: "2px",
                                animation: `snowfall ${5 + (i % 4)}s linear ${i % 2}s infinite`,
                                opacity: 0.3 + (Math.random() * 0.4),
                            }}
                        >
                            <div className="w-full h-full bg-white rounded-full" />
                        </div>
                    ))}

                    {/* Small fast snowflakes */}
                    {Array.from({ length: 60 }).map((_, i) => (
                        <div
                            key={`small-${i}`}
                            className="absolute top-[-10px] text-white/40"
                            style={{
                                left: `${Math.random() * 100}%`,
                                width: "3px",
                                height: "3px",
                                animation: `snowfall ${8 + (i % 5)}s linear ${i % 3}s infinite`,
                                opacity: 0.4 + (Math.random() * 0.4),
                            }}
                        >
                            <div className="w-full h-full bg-white rounded-full" />
                        </div>
                    ))}

                    {/* Medium snowflakes */}
                    {Array.from({ length: 45 }).map((_, i) => (
                        <div
                            key={`medium-${i}`}
                            className="absolute top-[-20px] text-white/60"
                            style={{
                                left: `${Math.random() * 100}%`,
                                width: "6px",
                                height: "6px",
                                animation: `snowfall ${12 + (i % 8)}s linear ${i % 4}s infinite`,
                                opacity: 0.5 + (Math.random() * 0.4),
                            }}
                        >
                            <div className="w-full h-full bg-white rounded-full" />
                        </div>
                    ))}

                    {/* Large slow snowflakes */}
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div
                            key={`large-${i}`}
                            className="absolute top-[-30px] text-white/70"
                            style={{
                                left: `${Math.random() * 100}%`,
                                width: "8px",
                                height: "8px",
                                animation: `snowfall ${20 + (i % 10)}s linear ${i % 6}s infinite`,
                                opacity: 0.6 + (Math.random() * 0.3),
                            }}
                        >
                            <div className="w-full h-full bg-white rounded-full" />
                        </div>
                    ))}

                    {/* Extra large, slowest snowflakes with sway effect */}
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div
                            key={`xl-${i}`}
                            className="absolute top-[-40px] text-white/80"
                            style={{
                                left: `${Math.random() * 100}%`,
                                width: "12px",
                                height: "12px",
                                animation: `snowfall-sway ${25 + (i % 15)}s linear ${i % 8}s infinite`,
                                opacity: 0.7 + (Math.random() * 0.3),
                            }}
                        >
                            <div className="w-full h-full bg-white rounded-full" />
                        </div>
                    ))}

                    {/* Decorative snowflake crystals - special shapes */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={`crystal-${i}`}
                            className="absolute top-[-50px] text-white/40"
                            style={{
                                left: `${10 + i * 12}%`,
                                width: "16px",
                                height: "16px",
                                animation: `snowfall-spin ${30 + (i % 10)}s linear ${i % 10}s infinite`,
                            }}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="w-full h-full"
                                fill="currentColor"
                            >
                                <path d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zm9-9a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm-18 0a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm13.07-5.071a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM7.05 17.364a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zm9.9 0a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707zM7.05 6.636a1 1 0 0 1 0-1.414l.707-.707a1 1 0 1 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0zm12.02 5.657a1 1 0 0 1 0 1.414l-2.828 2.828a1 1 0 0 1-1.414-1.414l2.828-2.828a1 1 0 0 1 1.414 0zm-8.486 8.486a1 1 0 0 1 0 1.414l-2.828 2.828a1 1 0 0 1-1.414-1.414l2.828-2.828a1 1 0 0 1 1.414 0zm0-16.97a1 1 0 0 1 1.414 0l2.828 2.828a1 1 0 0 1-1.414 1.414L8.485 5.171a1 1 0 0 1 0-1.414zm8.486 8.486a1 1 0 0 1 1.414 0l2.828 2.828a1 1 0 0 1-1.414 1.414l-2.828-2.828a1 1 0 0 1 0-1.414z" />
                            </svg>
                        </div>
                    ))}

                    {/* A few larger, decorative snowflakes that drift horizontally */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={`drift-${i}`}
                            className="absolute top-[-60px] text-white/30"
                            style={{
                                left: `${5 + i * 18}%`,
                                width: "20px",
                                height: "20px",
                                animation: `snowfall-drift ${40 + (i % 10)}s linear ${i % 12}s infinite`,
                            }}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="w-full h-full"
                                fill="currentColor"
                            >
                                <path d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zm9-9a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm-18 0a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm13.07-5.071a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM7.05 17.364a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zm9.9 0a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707zM7.05 6.636a1 1 0 0 1 0-1.414l.707-.707a1 1 0 1 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0zm12.02 5.657a1 1 0 0 1 0 1.414l-2.828 2.828a1 1 0 0 1-1.414-1.414l2.828-2.828a1 1 0 0 1 1.414 0zm-8.486 8.486a1 1 0 0 1 0 1.414l-2.828 2.828a1 1 0 0 1-1.414-1.414l2.828-2.828a1 1 0 0 1 1.414 0zm0-16.97a1 1 0 0 1 1.414 0l2.828 2.828a1 1 0 0 1-1.414 1.414L8.485 5.171a1 1 0 0 1 0-1.414zm8.486 8.486a1 1 0 0 1 1.414 0l2.828 2.828a1 1 0 0 1-1.414 1.414l-2.828-2.828a1 1 0 0 1 0-1.414z" />
                            </svg>
                        </div>
                    ))}
                </div>
            )}

            {/* Floating QuickQuote Button/Modal - stays fixed on all pages */}
            <QuickQuote />

            {/* Wrap content with SmoothScroll */}
            <SmoothScroll>
                <Navbar />
                <main>
                    <GlobalLoader>
                        <PageTransition>{children}</PageTransition>
                    </GlobalLoader>
                </main>
                <Footer />
            </SmoothScroll>

            {/* Enhanced snowfall animation styles */}
            <style jsx global>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-20px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(${() => Math.random() > 0.5 ? "30px" : "-30px"});
            opacity: 0;
          }
        }
        
        @keyframes snowfall-sway {
          0% {
            transform: translateY(-20px) translateX(0px);
            opacity: 0;
          }
          20% {
            transform: translateY(20vh) translateX(10px);
            opacity: 0.7;
          }
          40% {
            transform: translateY(40vh) translateX(-15px);
            opacity: 0.8;
          }
          60% {
            transform: translateY(60vh) translateX(10px);
            opacity: 0.7;
          }
          80% {
            transform: translateY(80vh) translateX(-10px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(110vh) translateX(0px);
            opacity: 0;
          }
        }
        
        @keyframes snowfall-drift {
          0% {
            transform: translateY(-20px) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          20% {
            transform: translateY(20vh) translateX(20px) rotate(45deg);
            opacity: 0.6;
          }
          40% {
            transform: translateY(40vh) translateX(-20px) rotate(90deg);
            opacity: 0.7;
          }
          60% {
            transform: translateY(60vh) translateX(20px) rotate(135deg);
            opacity: 0.6;
          }
          80% {
            transform: translateY(80vh) translateX(-20px) rotate(180deg);
            opacity: 0.4;
          }
          100% {
            transform: translateY(110vh) translateX(0px) rotate(225deg);
            opacity: 0;
          }
        }
        
        @keyframes snowfall-spin {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          20% {
            transform: translateY(20vh) rotate(72deg);
            opacity: 0.5;
          }
          40% {
            transform: translateY(40vh) rotate(144deg);
            opacity: 0.6;
          }
          60% {
            transform: translateY(60vh) rotate(216deg);
            opacity: 0.5;
          }
          80% {
            transform: translateY(80vh) rotate(288deg);
            opacity: 0.3;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
        </>
    );
}