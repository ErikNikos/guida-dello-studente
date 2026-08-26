import type { Metadata, Viewport } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import './globals.css';
import IosInstallPrompt from '../components/IosInstallPrompt';
import BottomNav from '../components/BottomNav';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });

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
      <body className={`${poppins.variable} ${montserrat.variable} font-poppins bg-brand-light pb-24 text-gray-800`}> 
        {children}
        <BottomNav />
        <IosInstallPrompt />
      </body>
    </html>
  );
}