'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-gray-100 animate-pulse rounded-2xl"></div>,
});

type Aula = { id: string; nome: string; piano: number; };
type Edificio = {
  id: string; nome: string; latitudine: number | null; longitudine: number | null;
  categoria: string; aule: Aula[];
};

const ETICHETTE_CATEGORIE: Record<string, string> = {
  'didattica': '🏢 Edifici Didattici', 'mensa': '🍽️ Mense e Ristorazione',
  'bar': '☕ Bar e Caffetterie', 'sport': '🏟️ Strutture Sportive',
  'residenza': '🛏️ Residenze', 'parcheggio': '🅿️ Parcheggi',
  'studio_esterno': '📚 Aree Studio Esterne'
};

export default function CampusExplorer({ edifici }: { edifici: Edificio[] }) {
  const [focusPosition, setFocusPosition] = useState<[number, number] | null>(null);
  const [activeTab, setActiveTab] = useState<'edifici' | 'aule'>('edifici');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtro in tempo reale
  const query = searchTerm.toLowerCase();

  const edificiRaggruppati = useMemo(() => {
    return edifici
      .filter(e => e.nome.toLowerCase().includes(query) || (e.categoria && e.categoria.toLowerCase().includes(query)))
      .reduce((acc, edificio) => {
        const cat = edificio.categoria || 'didattica';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(edificio);
        return acc;
      }, {} as Record<string, Edificio[]>);
  }, [edifici, query]);

  const auleRaggruppatePerPiano = useMemo(() => {
    const pianiPossibili = [4, 3, 2, 1, 0, -1, -2];
    return pianiPossibili.map(piano => {
      const auleDelPiano = edifici.flatMap(edificio => 
        (edificio.aule || [])
          .filter(aula => Number(aula.piano) === piano && aula.nome.toLowerCase().includes(query))
          .map(aula => ({ ...aula, edificio }))
      );
      return { piano, aule: auleDelPiano };
    }).filter(gruppo => gruppo.aule.length > 0);
  }, [edifici, query]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-2/3">
        <Map edifici={edifici} focusPosition={focusPosition} />
      </div>

      <div className="w-full lg:w-1/3 h-[600px] flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        
        {/* Barra di Ricerca Globale */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <input 
            type="text" 
            placeholder={activeTab === 'edifici' ? "Cerca edificio o servizio..." : "Cerca nome aula..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          />
        </div>

        {/* Switcher Tab */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button 
            onClick={() => setActiveTab('edifici')}
            className={`flex-1 py-3 text-sm font-bold text-center transition-colors ${activeTab === 'edifici' ? 'text-blue-700 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          >
            Mappa Strutture
          </button>
          <button 
            onClick={() => setActiveTab('aule')}
            className={`flex-1 py-3 text-sm font-bold text-center transition-colors ${activeTab === 'aule' ? 'text-blue-700 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          >
            Ricerca Aule
          </button>
        </div>

        {/* Contenuto Scrollabile */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'edifici' && (
            <div>
              {Object.keys(edificiRaggruppati).length === 0 && <p className="text-gray-500 text-sm text-center mt-4">Nessun risultato trovato.</p>}
              {Object.entries(edificiRaggruppati).map(([categoria, lista]) => (
                <div key={categoria} className="mb-6">
                  <h3 className="text-sm font-extrabold text-blue-900 mb-3 border-b border-gray-100 pb-2">
                    {ETICHETTE_CATEGORIE[categoria] || categoria.toUpperCase()}
                  </h3>
                  <ul className="space-y-2">
                    {lista.map(edificio => (
                      <li key={edificio.id}>
                        <button
                          onClick={() => {
                            if (edificio.latitudine && edificio.longitudine) setFocusPosition([edificio.latitudine, edificio.longitudine]);
                          }}
                          disabled={!edificio.latitudine}
                          className="w-full text-left p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-sm font-semibold text-gray-800">{edificio.nome}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'aule' && (
            <div>
              {auleRaggruppatePerPiano.length === 0 && <p className="text-gray-500 text-sm text-center mt-4">Nessun risultato trovato.</p>}
              {auleRaggruppatePerPiano.map(gruppo => (
                <div key={gruppo.piano} className="mb-6">
                   <h3 className="text-sm font-extrabold text-blue-900 mb-3 border-b border-gray-100 pb-2 flex items-center gap-2">
                    <span>🛗</span> Piano {gruppo.piano === 0 ? '0 (Terra)' : gruppo.piano}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {gruppo.aule.map(aula => (
                      <button
                        key={aula.id}
                        onClick={() => {
                          if (aula.edificio.latitudine && aula.edificio.longitudine) setFocusPosition([aula.edificio.latitudine, aula.edificio.longitudine]);
                        }}
                        disabled={!aula.edificio.latitudine}
                        className="text-left p-2 rounded-lg bg-gray-50 border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all disabled:opacity-50 group"
                      >
                        <div className="text-sm font-bold text-gray-800">{aula.nome}</div>
                        <div className="text-[10px] text-gray-500 truncate group-hover:text-blue-600">
                          {aula.edificio.nome}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}