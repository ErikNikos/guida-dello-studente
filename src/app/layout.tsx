import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import IosInstallPrompt from '../components/IosInstallPrompt';
import BottomNav from '../components/BottomNav'; // <-- Importa la barra

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#1e3a8a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Campus UniCT',
  description: 'Mappa e orari della Cittadella Universitaria',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Campus UniCT',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={`${inter.className} bg-gray-50 pb-24`}> 
        {/* pb-24 evita che il contenuto delle pagine finisca dietro la barra fluttuante */}
        {children}
        <BottomNav /> {/* <-- Inserita qui */}
        <IosInstallPrompt />
      </body>
    </html>
  );
}