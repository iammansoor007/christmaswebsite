'use client';

import { useState, useEffect } from 'react';
import ProfessionalLoader from './Loader'; // adjust path if needed

export default function GlobalLoader({ children }) {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const minimumLoadTime = 1500; // 1.5 seconds – matches your branding duration
        const startTime = Date.now();

        const finishLoading = () => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, minimumLoadTime - elapsed);

            setTimeout(() => {
                setFadeOut(true); // start fade out
                // Wait for fade out animation (300ms) then remove loader from DOM
                setTimeout(() => setLoading(false), 300);
            }, remaining);
        };

        // If the page is already fully loaded, finish immediately (with minimum time)
        if (document.readyState === 'complete') {
            finishLoading();
        } else {
            window.addEventListener('load', finishLoading);
            return () => window.removeEventListener('load', finishLoading);
        }
    }, []);

    // When loading is false, the loader is gone – show the real app
    if (!loading) {
        return <>{children}</>;
    }

    // Show the loader with a fade‑out transition
    return (
        <div
            className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'
                }`}
        >
            <ProfessionalLoader />
        </div>
    );
}