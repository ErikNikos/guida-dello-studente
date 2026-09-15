import type { Metadata, Viewport } from 'next';
import { Montserrat, Poppins, Pacifico } from 'next/font/google';
import './globals.css';
import IosInstallPrompt from '../components/IosInstallPrompt';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });
const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'], variable: '--font-pacifico' });

export const viewport: Viewport = {
  themeColor: '#013C62',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'WeLove Ingegneria',
  description: 'App ufficiale WeLove Ingegneria',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'WeLove Ingegneria',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="it">
      <body className={`${poppins.variable} ${montserrat.variable} ${pacifico.variable} font-poppins bg-brand-light text-gray-800`}>
        <div className="min-h-screen flex flex-col pb-24">
          {children}
          <Footer />
        </div>
        <BottomNav />
        <IosInstallPrompt />
      </body>
    </html>
  );
}