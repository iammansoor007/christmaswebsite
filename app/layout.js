import { Montserrat } from 'next/font/google';
import './globals.css';
import ClientLayout from './ClientLayout';
import connectDB from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';

export async function generateMetadata() {
  await connectDB();
  const settings = await SiteSettings.findOne();

  return {
    title: {
      default: settings?.seo?.siteTitle || 'Christmas Lighting Services | Luminous Holiday',
      template: `%s | ${settings?.seo?.siteTitle || 'Luminous Holiday'}`,
    },
    description: settings?.seo?.metaDescription || 'Professional holiday lighting installation & design services.',
    keywords: settings?.seo?.keywords || 'christmas lights, holiday lighting, installation',
    icons: {
      icon: settings?.favicon || '/favicon.ico',
    }
  };
}

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}