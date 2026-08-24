'use client';

import { useState, useEffect } from 'react';

export default function IosInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // 1. Rileva se il dispositivo è iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    
    // 2. Rileva se l'app è già installata (Standalone mode)
    const isStandalone = ('standalone' in window.navigator && window.navigator.standalone) || 
                         window.matchMedia('(display-mode: standalone)').matches;
    
    // 3. Controlla se l'utente ha già chiuso il banner in passato
    const hasDismissed = localStorage.getItem('dismissedIosPrompt');

    // Mostra il banner solo se è iOS, NON è installata, e NON è stata chiusa
    if (isIos && !isStandalone && !hasDismissed) {
      // Un piccolo delay rende l'animazione più fluida al primo caricamento
      setTimeout(() => setShowPrompt(true), 1500);
    }
  }, []);

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem('dismissedIosPrompt', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000] bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] rounded-t-2xl p-6 pb-8 transform transition-transform duration-500 ease-out animate-slide-up">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-extrabold text-blue-900">Installa l'App</h3>
        <button 
          onClick={dismissPrompt} 
          className="text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
        >
          ✕
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-5">
        Aggiungi la mappa alla tua schermata Home per un accesso rapido e a schermo intero.
      </p>
      
      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-800 flex flex-col gap-4 border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded shadow-sm border border-gray-100 text-blue-600">
            {/* Icona Condividi iOS */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </div>
          <p><strong>1.</strong> Tocca il tasto <strong>Condividi</strong> nella barra di Safari in basso.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded shadow-sm border border-gray-100 text-blue-600">
            {/* Icona Aggiungi a Schermata Home */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
          <p><strong>2.</strong> Scorri il menu e seleziona <strong>Aggiungi alla schermata Home</strong>.</p>
        </div>
      </div>
    </div>
  );
}