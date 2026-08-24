'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  // Nascondiamo la barra se siamo nella Home
  if (pathname === '/') return null;

  const navItems = [
    { name: 'Orari', path: '/orari', icon: '🕒' },
    { name: 'Mappa', path: '/mappa', icon: '📍' },
    { name: 'Bus', path: '/bus', icon: '🚌' },
    { name: 'Mensa', path: '/mensa', icon: '🍽️' },
  ];

  return (
    <div className="fixed bottom-6 left-4 right-4 z-[999] animate-slide-up">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl flex justify-around items-center px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <span className={`text-xl mb-0.5 ${isActive ? 'drop-shadow-sm' : 'grayscale opacity-80'}`}>
                {item.icon}
              </span>
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}