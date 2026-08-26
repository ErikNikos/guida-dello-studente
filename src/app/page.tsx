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
    { name: 'Orari', path: '/orari', icon: '🕒', color: 'bg-brand-dark' },
    { name: 'Mappa', path: '/mappa', icon: '📍', color: 'bg-brand-dark' },
    { name: 'Bus', path: '/bus', icon: '🚌', color: 'bg-brand-dark' },
    { name: 'Mensa', path: '/mensa', icon: '🍽️', color: 'bg-brand-dark' },
  ];

  return (
    <main className="min-h-screen bg-brand-light flex flex-col">
      <header 
        className={`flex items-center justify-center bg-white w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-50
          ${animateOut ? 'h-24 rounded-b-3xl shadow-sm' : 'h-screen'}`
        }
      >
        <div className={`flex items-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] 
          ${animateOut ? 'scale-100 pt-8' : 'scale-125'}`}
        >
          {animateOut ? (
            <Image src="/logo-orizzontale.png" alt="WeLove Ingegneria" width={200} height={50} priority className="object-contain" />
          ) : (
            <Image src="/icon-192" alt="WeLove Ingegneria" width={140} height={140} priority className="object-contain drop-shadow-xl" />
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
                <div className={`${item.color} text-white rounded-[2rem] p-6 aspect-square flex flex-col items-start justify-between shadow-md transform transition-transform active:scale-95 border border-brand-dark/20`}>
                  <div className="bg-brand-light/10 p-3 rounded-2xl backdrop-blur-sm">
                    <span className="text-3xl filter drop-shadow-sm">{item.icon}</span>
                  </div>
                  <span className="font-montserrat font-bold text-xl tracking-wide text-brand-light">{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}