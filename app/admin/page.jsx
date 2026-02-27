// app/admin/page.jsx
'use client';
import { useEffect } from 'react';

export default function AdminDashboard() {
    useEffect(() => {
        console.log('📊 Dashboard page mounted');
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="text-green-600 font-semibold">✅ Admin dashboard is working!</p>
                <p className="mt-2">Click on "Services" in the sidebar to manage your service cards.</p>
            </div>
        </div>
    );
}