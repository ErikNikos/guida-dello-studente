'use client';

import { useState } from 'react';

export default function MensaPage() {
  const [activeTab, setActiveTab] = useState<'pranzo' | 'cena'>('pranzo');

  // Dati Mock per le tariffe ERSU
  const tariffe = [
    { fascia: 'Fascia 1', isee: '< 10.000€', prezzo: '1,50 €', colore: 'text-green-600', bg: 'bg-green-50' },
    { fascia: 'Fascia 2', isee: '< 20.000€', prezzo: '2,50 €', colore: 'text-amber-600', bg: 'bg-amber-50' },
    { fascia: 'Fascia 3', isee: '> 20.000€', prezzo: '3,50 €', colore: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  // Dati Mock per il Menu
  const menu = {
    pranzo: [
      { categoria: 'Primi', piatti: ['Pasta al forno', 'Risotto ai funghi', 'Pasta al pomodoro (Vegan)'] },
      { categoria: 'Secondi', piatti: ['Cotoletta di pollo', 'Hamburger di soia (Vegan)', 'Mozzarella'] },
      { categoria: 'Contorni', piatti: ['Patatine fritte', 'Insalata mista'] },
    ],
    cena: [
      { categoria: 'Primi', piatti: ['Minestrone di verdure', 'Pasta aglio, olio e peperoncino'] },
      { categoria: 'Secondi', piatti: ['Arrosto di vitello', 'Frittata di patate', 'Formaggio fresco'] },
      { categoria: 'Contorni', piatti: ['Spinaci saltati', 'Insalata mista'] },
    ]
  };

  const menuAttivo = menu[activeTab];

  return (
    <main className="min-h-screen bg-gray-50 p-4 lg:p-8 font-sans pb-24">
      <div className="max-w-xl mx-auto space-y-6">
        
        <header className="pt-2">
          <h1 className="text-3xl font-black text-blue-950 mb-1 tracking-tight">Mensa ERSU</h1>
          <p className="text-gray-600 font-medium text-sm">Cittadella Universitaria</p>
        </header>

        {/* Info e Orari */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center justify-around">
          <div className="text-center">
            <span className="block text-xl mb-1">☀️</span>
            <span className="block text-xs font-bold text-gray-500 uppercase">Pranzo</span>
            <span className="block text-sm font-black text-blue-900">12:15 - 14:45</span>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div className="text-center">
            <span className="block text-xl mb-1">🌙</span>
            <span className="block text-xs font-bold text-gray-500 uppercase">Cena</span>
            <span className="block text-sm font-black text-blue-900">19:00 - 21:00</span>
          </div>
        </div>

        {/* Tariffe ISEE */}
        <div>
          <h3 className="text-sm font-extrabold text-blue-900 mb-3 ml-2 uppercase tracking-wider">Tariffe Pasto</h3>
          <div className="grid grid-cols-3 gap-2">
            {tariffe.map((tariffa, idx) => (
              <div key={idx} className={`${tariffa.bg} rounded-2xl p-3 border border-white shadow-sm flex flex-col items-center text-center justify-center`}>
                <span className="text-[10px] font-bold text-gray-500 uppercase">{tariffa.fascia}</span>
                <span className="text-xs font-semibold text-gray-700 my-0.5">{tariffa.isee}</span>
                <span className={`text-lg font-black ${tariffa.colore}`}>{tariffa.prezzo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Menu del Giorno */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-extrabold text-blue-900 uppercase tracking-wider">Menu del Giorno</h3>
            
            {/* Switcher Pranzo/Cena compatto */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('pranzo')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'pranzo' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Pranzo
              </button>
              <button 
                onClick={() => setActiveTab('cena')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'cena' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Cena
              </button>
            </div>
          </div>
          
          <div className="space-y-5">
            {menuAttivo.map((sezione, idx) => (
              <div key={idx}>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide border-b border-gray-100 pb-1 mb-2">
                  {sezione.categoria}
                </h4>
                <ul className="space-y-2">
                  {sezione.piatti.map((piatto, pIdx) => (
                    <li key={pIdx} className="text-sm font-semibold text-gray-800 flex items-center before:content-['•'] before:text-blue-500 before:mr-2">
                      {piatto}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}