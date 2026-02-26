'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import GlobalLoader from './components/GlobalLoader';
import SmoothScroll from './components/SmoothScroll';
import QuickQuote from './components/QuickQuote'; // ✅ Import QuickQuote

export default function ClientLayout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {/* Snowfall effect (same as before) */}
      {isClient && (
        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10 overflow-hidden">
          {/* ... all your snowflake code ... */}
        </div>
      )}

      {/* Add QuickQuote - it will appear on every page */}
      <QuickQuote />

      {/* Wrap EVERYTHING with SmoothScroll */}
      <SmoothScroll>
        <Navbar />
        <main>
          <GlobalLoader>
            <PageTransition>{children}</PageTransition>
          </GlobalLoader>
        </main>
        <Footer />
      </SmoothScroll>

      {/* Animation styles (same as before) */}
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
            transform: translateY(110vh)
              translateX(${Math.random() > 0.5 ? "20px" : "-20px"});
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}