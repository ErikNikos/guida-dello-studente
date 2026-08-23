'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-gray-100 animate-pulse rounded-2xl"></div>,
});

type Edificio = {
  id: string;
  nome: string;
  latitudine: number | null;
  longitudine: number | null;
  categoria: string;
};

// Traduzione delle categorie per i titoli delle sezioni
const ETICHETTE_CATEGORIE: Record<string, string> = {
  'didattica': '🏢 Edifici Didattici',
  'mensa': '🍽️ Mense e Ristorazione',
  'bar': '☕ Bar e Caffetterie',
  'sport': '🏟️ Strutture Sportive',
  'residenza': '🛏️ Residenze',
  'parcheggio': '🅿️ Parcheggi',
  'studio_esterno': '📚 Aree Studio Esterne'
};

export default function CampusExplorer({ edifici }: { edifici: Edificio[] }) {
  // Stato che memorizza le coordinate dell'edificio cliccato nella lista
  const [focusPosition, setFocusPosition] = useState<[number, number] | null>(null);

  // Raggruppa l'array di edifici per categoria
  const edificiRaggruppati = edifici.reduce((acc, edificio) => {
    const cat = edificio.categoria || 'didattica';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(edificio);
    return acc;
  }, {} as Record<string, Edificio[]>);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* Colonna Mappa (2/3 dello spazio su desktop) */}
      <div className="w-full lg:w-2/3">
        <Map edifici={edifici} focusPosition={focusPosition} />
      </div>

      {/* Colonna Lista Raggruppata (1/3 dello spazio, con scrollbar interna) */}
      <div className="w-full lg:w-1/3 h-[600px] overflow-y-auto pr-2">
        {Object.entries(edificiRaggruppati).map(([categoria, lista]) => (
          <div key={categoria} className="mb-6">
            <h3 className="text-lg font-extrabold text-blue-900 mb-3 border-b-2 border-blue-100 pb-1">
              {ETICHETTE_CATEGORIE[categoria] || categoria.toUpperCase()}
            </h3>
            
            <ul className="space-y-2">
              {lista.map(edificio => (
                <li key={edificio.id}>
                  <button
                    onClick={() => {
                      if (edificio.latitudine && edificio.longitudine) {
                        setFocusPosition([edificio.latitudine, edificio.longitudine]);
                      }
                    }}
                    disabled={!edificio.latitudine}
                    className="w-full text-left p-3 rounded-xl bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transition-all flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-sm font-semibold text-gray-700">{edificio.nome}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
    </div>
  );
}