import { Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import GlobalLoader from './components/GlobalLoader';

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
        {/* GlobalLoader now only wraps the main content, not Navbar/Footer */}
        <Navbar />
        <main>
          <GlobalLoader>
            <PageTransition>{children}</PageTransition>
          </GlobalLoader>
        </main>
        <Footer />
      </body>
    </html>
  );
}