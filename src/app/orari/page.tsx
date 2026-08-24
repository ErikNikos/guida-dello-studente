'use client';

import { useState } from 'react';

export default function OrariPage() {
  const [corso, setCorso] = useState('Ingegneria Informatica (L-8)');
  const [anno, setAnno] = useState(3);
  const [giorno, setGiorno] = useState(1); // 1 = Lunedì, 5 = Venerdì

  const giorniSettimana = [
    { id: 1, nome: 'Lun' },
    { id: 2, nome: 'Mar' },
    { id: 3, nome: 'Mer' },
    { id: 4, nome: 'Gio' },
    { id: 5, nome: 'Ven' },
  ];

  // Dati Mock strutturati come il nostro DB
  const lezioniDiOggi = [
    {
      id: 1,
      oraInizio: '08:00',
      oraFine: '10:00',
      materia: 'Sistemi Operativi',
      docente: 'Prof. S. Battiato',
      aula: 'Aula Magna',
      edificio: 'Edificio della Didattica',
      tipo: 'Lezione',
      colore: 'bg-blue-500',
    },
    {
      id: 2,
      oraInizio: '10:00',
      oraFine: '13:00',
      materia: 'Ingegneria del Software',
      docente: 'Prof.ssa C. Faro',
      aula: 'Aula D32',
      edificio: 'Plesso D',
      tipo: 'Lezione',
      colore: 'bg-emerald-500',
    },
    {
      id: 3,
      oraInizio: '15:00',
      oraFine: '17:00',
      materia: 'Basi di Dati',
      docente: 'Prof. D. F. Santamaria',
      aula: 'Aula D32',
      edificio: 'Plesso D',
      tipo: 'Laboratorio',
      colore: 'bg-purple-500',
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-4 lg:p-8 font-sans pb-24">
      <div className="max-w-xl mx-auto space-y-6">
        
        <header className="pt-2">
          <h1 className="text-3xl font-black text-blue-950 mb-1 tracking-tight">Il tuo Orario</h1>
          <p className="text-gray-600 font-medium text-sm">Organizza la tua giornata in Cittadella</p>
        </header>

        {/* Selettori Corso e Anno */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Corso di Laurea</label>
            <select 
              value={corso}
              onChange={(e) => setCorso(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Ingegneria Informatica (L-8)">Ingegneria Informatica (L-8)</option>
              <option value="Ingegneria Industriale (L-9)">Ingegneria Industriale (L-9)</option>
              <option value="Ingegneria Civile (L-7)">Ingegneria Civile (L-7)</option>
            </select>
          </div>
          
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1 mb-1 block">Anno di Corso</label>
            <div className="flex gap-2">
              {[1, 2, 3].map((a) => (
                <button
                  key={a}
                  onClick={() => setAnno(a)}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-bold transition-all ${anno === a ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {a}° Anno
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Switcher Giorni della Settimana */}
        <div className="flex justify-between bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
          {giorniSettimana.map((g) => (
            <button
              key={g.id}
              onClick={() => setGiorno(g.id)}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${giorno === g.id ? 'bg-blue-100 text-blue-700 font-black' : 'text-gray-400 font-semibold hover:bg-gray-50'}`}
            >
              <span className="text-xs uppercase">{g.nome}</span>
            </button>
          ))}
        </div>

        {/* Timeline Lezioni */}
        <div className="space-y-4 pt-2">
          {lezioniDiOggi.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-gray-200">
              <span className="text-4xl mb-3 block">🎉</span>
              <p className="text-gray-500 font-bold">Nessuna lezione oggi!</p>
            </div>
          ) : (
            lezioniDiOggi.map((lezione) => (
              <div key={lezione.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex gap-4 relative overflow-hidden group">
                
                {/* Striscia colorata a sinistra */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${lezione.colore}`}></div>
                
                {/* Colonna Orario */}
                <div className="flex flex-col items-center justify-center min-w-[60px] border-r border-gray-100 pr-4">
                  <span className="text-lg font-black text-blue-950">{lezione.oraInizio}</span>
                  <span className="text-xs font-bold text-gray-400 mt-1">{lezione.oraFine}</span>
                </div>
                
                {/* Colonna Dettagli */}
                <div className="flex-1 py-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                      {lezione.tipo}
                    </span>
                    <span className="text-xs font-bold text-blue-600">{lezione.aula}</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-gray-800 leading-tight mb-1">{lezione.materia}</h3>
                  <p className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                    👤 {lezione.docente}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}