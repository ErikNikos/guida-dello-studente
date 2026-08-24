'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [animateOut, setAnimateOut] = useState(false);
  const [renderContent, setRenderContent] = useState(false);

  useEffect(() => {
    // Dopo 1 secondo esatto, facciamo partire l'animazione di rimpicciolimento
    const timer1 = setTimeout(() => {
      setAnimateOut(true);
      setRenderContent(true);
    }, 1000);

    return () => clearTimeout(timer1);
  }, []);

  // Configurazione dei 4 riquadri della Home
  const menuItems = [
    { name: 'Orari', path: '/orari', icon: '🕒', color: 'bg-blue-600' },
    { name: 'Mappa', path: '/mappa', icon: '📍', color: 'bg-emerald-500' },
    { name: 'Bus', path: '/bus', icon: '🚌', color: 'bg-amber-500' },
    { name: 'Mensa', path: '/mensa', icon: '🍽️', color: 'bg-rose-500' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* HEADER / SPLASH SCREEN ANIMATA */}
      <header 
        className={`flex items-center justify-center bg-white w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-50
          ${animateOut ? 'h-24 rounded-b-3xl shadow-sm' : 'h-screen'}`
        }
      >
        {/* Contenitore Logo */}
        <div className={`flex items-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] 
          ${animateOut ? 'flex-row gap-3 scale-100 pt-8' : 'flex-col gap-5 scale-150'}`}
        >
          <div className="w-12 h-12 bg-blue-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
            U
          </div>
          <h1 className="font-black text-blue-900 text-3xl tracking-tight">
            UniCT <span className="text-blue-500">App</span>
          </h1>
        </div>
      </header>

      {/* GRIGLIA MENU (Appare sfumando quando la splash si ritira) */}
      {renderContent && (
        <div className={`flex-1 p-6 transition-opacity duration-1000 delay-300 ${animateOut ? 'opacity-100' : 'opacity-0'}`}>
          
          <div className="mb-8 mt-2">
            <h2 className="text-2xl font-extrabold text-gray-800">Ciao, Studente! 👋</h2>
            <p className="text-gray-500 font-medium">Cosa ti serve oggi in Cittadella?</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <div className={`${item.color} text-white rounded-[2rem] p-6 aspect-square flex flex-col items-start justify-between shadow-md transform transition-transform active:scale-95`}>
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                    <span className="text-3xl filter drop-shadow-sm">{item.icon}</span>
                  </div>
                  <span className="font-bold text-xl tracking-wide">{item.name}</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      )}
      
    </main>
  );
}