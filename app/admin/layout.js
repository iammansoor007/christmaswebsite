import { Toaster } from 'react-hot-toast';

export const metadata = {
    title: 'CMS Admin | Christmas Lighting',
    description: 'Content Management System',
};

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-950 text-white" suppressHydrationWarning>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' },
                        success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
                        error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
                    }}
                />
                {children}
            </body>
        </html>
    );
}
