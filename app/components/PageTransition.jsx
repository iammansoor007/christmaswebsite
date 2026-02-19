'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99], // custom easing for a smooth, bouncy feel
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -10,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// Optional overlay curtain effect
const overlayVariants = {
  initial: { scaleY: 0 },
  animate: { scaleY: 0 },
  exit: {
    scaleY: 1,
    transition: { duration: 0.4, ease: [0.6, 0.05, 0.01, 0.99] },
  },
};

const PageTransition = ({ children }) => {
  const pathname = usePathname();
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    setIsFirstMount(false);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {/* AnimatePresence detects when the child with a unique key leaves/enters */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Optional overlay that wipes during exit */}
      <AnimatePresence>
        {!isFirstMount && (
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-gradient-to-b from-holiday-red/20 to-holiday-gold/20 backdrop-blur-sm pointer-events-none z-50 origin-top"
            style={{ zIndex: 9999 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PageTransition;