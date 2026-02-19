'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
            duration: 0.4,
            ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smoother feel
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: [0.43, 0.13, 0.23, 0.96]
        }
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 }
    },
};

export default function PageTransition({ children }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout="position" // Prevents layout shift during transitions
                style={{ width: '100%' }}
            >
                {/* Only apply itemVariants to content that should stagger */}
                <motion.div variants={itemVariants}>
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}