import { Montserrat } from 'next/font/google';
import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Christmas Lighting',
  description: 'Professional lighting services',
};

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