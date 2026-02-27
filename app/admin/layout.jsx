// app/admin/layout.jsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '../../lib/supabase-client';
import {
    FaHome, FaServicestack, FaImage, FaQuestionCircle,
    FaSignOutAlt, FaBars, FaCog
} from 'react-icons/fa';

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, [pathname]);

    const checkUser = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session && pathname !== '/admin/login') {
                router.replace('/admin/login');
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error('Auth error:', error);
            router.replace('/admin/login');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace('/admin/login');
    };

    // Don't show layout on login page
    if (pathname === '/admin/login') {
        return children;
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading admin panel...</p>
                </div>
            </div>
        );
    }

    const menuItems = [
        { icon: FaHome, label: 'Dashboard', href: '/admin' },
        { icon: FaServicestack, label: 'Services', href: '/admin/services' },
        { icon: FaImage, label: 'Hero Section', href: '/admin/hero' },
        { icon: FaQuestionCircle, label: 'FAQ', href: '/admin/faq' },
        { icon: FaImage, label: 'Gallery', href: '/admin/gallery' },
        { icon: FaCog, label: 'Settings', href: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 bg-gray-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'
                }`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>CMS Admin</h1>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <FaBars />
                    </button>
                </div>

                <nav className="p-4">
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-colors mb-1 ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                                    }`}
                            >
                                <item.icon className="text-xl" />
                                {sidebarOpen && <span>{item.label}</span>}
                            </Link>
                        );
                    })}

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition-colors mt-8 w-full text-gray-300 hover:text-white"
                    >
                        <FaSignOutAlt className="text-xl" />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'
                }`}>
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}