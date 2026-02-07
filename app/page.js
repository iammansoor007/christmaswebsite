// app/page.js - COMPLETE FIXED VERSION
"use client";

import { useState, useEffect, useRef } from "react";
import Home from "./components/Home";
import ProfessionalLoader from "./components/Loader";
import SmoothScroll from "./components/SmoothScroll";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const homeRef = useRef(null);

  useEffect(() => {
    setIsClient(true);

    // Prefetch hero data to ensure it's available
    const prefetchHeroData = async () => {
      try {
        await fetch("/api/cms/hero", { priority: "high" });
      } catch (error) {
        console.log("Prefetch failed, will load normally");
      }
    };

    // Function to handle loading completion
    const handleLoad = async () => {
      const minimumLoadTime = 1500; // 1.5 seconds minimum for branding
      const startTime = Date.now();

      const finishLoading = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minimumLoadTime - elapsed);

        setTimeout(() => {
          setIsLoading(false);
          // Wait for fade out animation
          setTimeout(() => setShowLoader(false), 300);
        }, remaining);
      };

      // Prefetch data
      await prefetchHeroData();

      // Check if page is already loaded
      if (document.readyState === "complete") {
        finishLoading();
      } else {
        finishLoading();
        window.addEventListener("load", finishLoading);
        return () => window.removeEventListener("load", finishLoading);
      }
    };

    handleLoad();
  }, []);

  // Initialize animations after load
  useEffect(() => {
    if (!isLoading && homeRef.current) {
      initializeAnimations();
    }
  }, [isLoading]);

  const initializeAnimations = () => {
    // Lazy load animations
    if (typeof window !== "undefined") {
      import("lenis").then(({ default: Lenis }) => {
        // Already initialized by SmoothScroll component
      });
    }
  };

  if (!isClient) {
    return <ProfessionalLoader />;
  }

  return (
    <SmoothScroll>
      {showLoader && <ProfessionalLoader />}
      <div
        ref={homeRef}
        className={`transition-opacity duration-300 ${isLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <Home />
      </div>
    </SmoothScroll>
  );
}
