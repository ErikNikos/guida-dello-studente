'use client';

import { useState } from 'react';

export default function BusPage() {
  const [activeTab, setActiveTab] = useState<'brt1' | 'navetta'>('brt1');

  const trasporti = {
    brt1: {
      nome: 'BRT1',
      sottotitolo: 'Due Obelischi ⇄ Stesicoro',
      colore: 'bg-amber-500',
      frequenza: 'Ogni 10-15 min',
      orario: '06:00 - 23:30',
      fermate: [
        { nome: 'Parcheggio Due Obelischi', highlight: false },
        { nome: 'Cittadella (Ingresso Nord)', highlight: true, note: 'Poliambulatorio / CUS' },
        { nome: 'Cittadella (Viale A. Doria)', highlight: true, note: 'Ingresso Principale' },
        { nome: 'Viale Fleming', highlight: false },
        { nome: 'Piazza Stesicoro (Centro)', highlight: false }
      ]
    },
    navetta: {
      nome: 'Navetta FCE',
      sottotitolo: 'Metro Milo ⇄ Cittadella',
      colore: 'bg-rose-600',
      frequenza: 'Ogni 10 min',
      orario: '07:00 - 15:00', // Sincronizzato solitamente con le lezioni
      fermate: [
        { nome: 'Stazione Metro Milo', highlight: false },
        { nome: 'Viale A. Doria (Cittadella)', highlight: true, note: 'Ingegneria / Architettura' },
        { nome: 'Policlinico', highlight: true, note: 'Medicina' },
        { nome: 'Stazione Metro Milo', highlight: false }
      ]
    }
  };

  const lineaAttiva = trasporti[activeTab];

  return (
    <main className="min-h-screen bg-brand-light p-4 lg:p-8 font-sans">
      <div className="max-w-xl mx-auto space-y-6">
        
        <header className="pt-2">
          <h1 className="text-3xl font-black font-montserrat text-brand-dark mb-1 tracking-tight">Trasporti</h1>
          <p className="text-gray-600 font-medium text-sm">Collegamenti per la Cittadella</p>
        </header>

        {/* Switcher Tab */}
        <div className="flex bg-gray-200/60 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('brt1')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all shadow-sm ${activeTab === 'brt1' ? 'bg-white text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            🚌 BRT 1
          </button>
          <button 
            onClick={() => setActiveTab('navetta')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all shadow-sm ${activeTab === 'navetta' ? 'bg-white text-rose-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            🚇 Navetta Metro
          </button>
        </div>

        {/* Card Info Generali */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black font-montserrat text-brand-dark">{lineaAttiva.nome}</h2>
            <p className="text-gray-500 text-sm font-medium">{lineaAttiva.sottotitolo}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-brand-dark font-bold mb-1 justify-end">
              <span>⏱️</span> {lineaAttiva.frequenza}
            </div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
              {lineaAttiva.orario}
            </div>
          </div>
        </div>

        {/* Timeline Fermate */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-extrabold font-montserrat text-brand-dark mb-6 uppercase tracking-wider">Percorso Principale</h3>
          
          <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
            {lineaAttiva.fermate.map((fermata, idx) => (
              <div key={idx} className="relative pl-6">
                {/* Pallino sulla timeline */}
                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white ${fermata.highlight ? lineaAttiva.colore : 'bg-gray-300'}`}></div>
                
                <h4 className={`font-bold ${fermata.highlight ? 'text-gray-900' : 'text-gray-500'}`}>
                  {fermata.nome}
                </h4>
                {fermata.note && (
                  <p className="text-xs text-blue-600 font-medium mt-0.5">{fermata.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}