'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [animateOut, setAnimateOut] = useState(false);
  const [renderContent, setRenderContent] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimateOut(true);
      setRenderContent(true);
    }, 1000);
    return () => clearTimeout(timer1);
  }, []);

  const menuItems = [
    { name: 'Orari', path: '/orari', icon: '🕒', color: 'bg-brand-dark', image: '/bg-orari.jpg' },
    { name: 'Mappa', path: '/mappa', icon: '📍', color: 'bg-brand-dark', image: '/bg-mappa.jpg' },
    { name: 'Bus', path: '/bus', icon: '🚌', color: 'bg-brand-dark', image: '/bg-bus.jpg' },
    { name: 'Mensa', path: '/mensa', icon: '🍽️', color: 'bg-brand-dark', image: '/bg-mensa.jpg' },
  ];

  return (
    <main className="flex-1 bg-brand-light flex flex-col">
      <header 
        className={`flex items-center justify-center bg-brand-light w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-50
          ${animateOut ? 'h-24 rounded-b-3xl shadow-sm bg-white' : 'h-screen bg-brand-light'}`
        }
      >
        <div className={`flex items-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] 
          ${animateOut ? 'scale-100 pt-2' : 'scale-100'}`}
        >
          {animateOut ? (
            <Image src="/logo-orizzontale.png" alt="WeLove Ingegneria" width={400} height={150} priority className="object-contain" style={{ width: 'auto', height: '50px' }} />
          ) : (
            <div className="flex flex-col items-center gap-6">
              <Image src="/icon-192.png" alt="WeLove Ingegneria" width={400} height={400} priority className="object-contain drop-shadow-2xl" />
              <div className="text-center">
                <h1 className="text-3xl font-montserrat font-bold text-brand-dark">
                  Al servizio degli studenti
                </h1>
                <p className="text-2xl font-pacifico font-normal text-yellow-500 mt-1">
                  dal 2014
                </p>
              </div>
            </div>
          )}
        </div>
      </header>

      {renderContent && (
        <div className={`flex-1 p-6 transition-opacity duration-1000 delay-300 ${animateOut ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mb-8 mt-2">
            <h2 className="text-2xl font-montserrat font-extrabold text-brand-dark">Ciao, Studente! 👋</h2>
            <p className="text-gray-500 font-medium">Cosa ti serve oggi?</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <div className="relative rounded-[2rem] aspect-square shadow-md transform transition-transform active:scale-95 border border-brand-dark/20 overflow-hidden">
                  {/* Background Image */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="eager"
                  />
                  
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col items-start justify-between z-10">
                    <div className="bg-brand-light/10 p-3 rounded-2xl backdrop-blur-sm">
                      <span className="text-3xl filter drop-shadow-sm">{item.icon}</span>
                    </div>
                    <span className="font-montserrat font-bold text-xl tracking-wide text-brand-light">{item.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}