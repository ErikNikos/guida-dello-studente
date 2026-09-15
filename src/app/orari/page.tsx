'use client';

import { useState, useEffect } from 'react';
import { 
  fetchCorsiLaurea, 
  fetchCanaliByCorsoAndAnno, 
  fetchLezioniByCanale,
  CorsoLaurea,
  CanaleCorso,
  Lezione,
  getGiornoShort
} from '../../lib/orari-utils';

export default function OrariPage() {
  const [corso, setCorso] = useState<string>('');
  const [anno, setAnno] = useState<number>(1);
  const [canale, setCanale] = useState<string>('');
  const [giorno, setGiorno] = useState<number>(1); // 1 = Lunedì, 6 = Sabato

  const [corsi, setCorsi] = useState<CorsoLaurea[]>([]);
  const [canali, setCanali] = useState<CanaleCorso[]>([]);
  const [lezioni, setLezioni] = useState<Lezione[]>([]);

  // Get the selected course object to determine duration
  const selectedCorso = corsi.find(c => c.id === corso);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const giorniSettimana = [
    { id: 1, nome: 'Lun' },
    { id: 2, nome: 'Mar' },
    { id: 3, nome: 'Mer' },
    { id: 4, nome: 'Gio' },
    { id: 5, nome: 'Ven' },
    { id: 6, nome: 'Sab' },
  ];

  // Fetch initial data (corsi di laurea)
  useEffect(() => {
    const loadCorsi = async () => {
      try {
        setLoading(true);
        const data = await fetchCorsiLaurea();
        setCorsi(data);
        if (data.length > 0) {
          setCorso(data[0].id);
        }
      } catch (err) {
        setError('Errore nel caricamento dei corsi di laurea');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCorsi();
  }, []);

  // Fetch canali when corso and anno change
  useEffect(() => {
    const loadCanali = async () => {
      if (!corso) return;
      
      try {
        setLoading(true);
        const data = await fetchCanaliByCorsoAndAnno(corso, anno);
        setCanali(data);
        if (data.length > 0) {
          setCanale(data[0].id);
        } else {
          setCanale('');
        }
      } catch (err) {
        setError('Errore nel caricamento dei canali');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCanali();
  }, [corso, anno]);

  // Fetch lezioni when canale changes
  useEffect(() => {
    const loadLezioni = async () => {
      if (!canale) {
        setLezioni([]);
        return;
      }
      
      try {
        setLoading(true);
        const data = await fetchLezioniByCanale(canale);
        setLezioni(data);
      } catch (err) {
        setError('Errore nel caricamento delle lezioni');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadLezioni();
  }, [canale]);

  const handleCorsoChange = (corsoId: string) => {
    const newCorso = corsi.find(c => c.id === corsoId);
    setCorso(corsoId);
    // Reset to first year when course changes for consistency
    setAnno(1);
    setCanale('');
    setLezioni([]);
  };

  const handleAnnoChange = (annoValue: number) => {
    setAnno(annoValue);
    setCanale('');
    setLezioni([]);
  };

  const handleCanaleChange = (canaleId: string) => {
    setCanale(canaleId);
    setLezioni([]);
  };

  const getLezioniByGiorno = (giornoSettimana: number) => {
    return lezioni.filter(lezione => lezione.giorno_settimana === giornoSettimana);
  };

  const getLessonColor = (semestre: number) => {
    return semestre === 1 ? 'bg-blue-500' : 'bg-emerald-500';
  };

  if (error) {
    return (
      <main className="flex-1 bg-brand-light p-4 lg:p-8 font-sans">
        <div className="max-w-xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <span className="text-4xl mb-3 block">⚠️</span>
            <p className="text-red-600 font-bold">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-brand-light p-4 lg:p-8 font-sans pb-32">
      <div className="max-w-xl mx-auto space-y-6">
        
        <header className="pt-2">
          <h1 className="text-3xl font-black font-montserrat text-brand-dark mb-1 tracking-tight">Il tuo Orario</h1>
          <p className="text-gray-600 font-medium text-sm">Organizza la tua giornata in Cittadella</p>
        </header>

        {/* Selettori Corso, Anno e Canale */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Corso di Laurea</label>
            <select 
              value={corso}
              onChange={(e) => handleCorsoChange(e.target.value)}
              disabled={!!(loading || corsi.length === 0)}
              className="w-full mt-1 p-2 bg-brand-light border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {corsi.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1 mb-1 block">Anno di Corso</label>
            <div className="flex gap-2">
              {selectedCorso && Array.from({ length: selectedCorso.durata_anni }, (_, i) => i + 1).map((a) => (
                <button
                  key={a}
                  onClick={() => handleAnnoChange(a)}
                  disabled={!!loading}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-bold transition-all ${anno === a ? 'bg-brand-dark text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} disabled:opacity-50`}
                >
                  {a}° Anno
                </button>
              ))}
            </div>
          </div>

          {canali.length > 0 && (
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Canale</label>
              <select 
                value={canale}
                onChange={(e) => handleCanaleChange(e.target.value)}
                disabled={!!loading}
                className="w-full mt-1 p-2 bg-brand-light border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {canali.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.canale_cognomi}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Switcher Giorni della Settimana */}
        <div className="flex justify-between bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
          {giorniSettimana.map((g) => (
            <button
              key={g.id}
              onClick={() => setGiorno(g.id)}
              disabled={!!loading}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${giorno === g.id ? 'bg-blue-100 text-blue-700 font-black' : 'text-gray-400 font-semibold hover:bg-brand-light'} disabled:opacity-50`}
            >
              <span className="text-xs uppercase">{g.nome}</span>
            </button>
          ))}
        </div>

        {/* Timeline Lezioni */}
        <div className="space-y-4 pt-2">
          {loading ? (
            <div className="text-center py-10 bg-white rounded-3xl border border-gray-100">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-dark mx-auto mb-3"></div>
              <p className="text-gray-500 font-bold">Caricamento...</p>
            </div>
          ) : canali.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-gray-200">
              <span className="text-4xl mb-3 block">📚</span>
              <p className="text-gray-500 font-bold">Nessun canale disponibile per questo corso e anno</p>
            </div>
          ) : !canale ? (
            <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-gray-200">
              <span className="text-4xl mb-3 block">👆</span>
              <p className="text-gray-500 font-bold">Seleziona un canale per vedere l'orario</p>
            </div>
          ) : getLezioniByGiorno(giorno).length === 0 ? (
            <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-gray-200">
              <span className="text-4xl mb-3 block">🎉</span>
              <p className="text-gray-500 font-bold">Nessuna lezione oggi!</p>
            </div>
          ) : (
            getLezioniByGiorno(giorno).map((lezione) => (
              <div key={lezione.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex gap-4 relative overflow-hidden group">
                
                {/* Striscia colorata a sinistra */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getLessonColor(lezione.insegnamento.semestre)}`}></div>
                
                {/* Colonna Orario */}
                <div className="flex flex-col items-center justify-center min-w-[60px] border-r border-gray-100 pr-4">
                  <span className="text-lg font-black text-blue-950">{lezione.ora_inizio}</span>
                  <span className="text-xs font-bold text-gray-400 mt-1">{lezione.ora_fine}</span>
                </div>
                
                {/* Colonna Dettagli */}
                <div className="flex-1 py-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                      {lezione.insegnamento.semestre === 1 ? 'I Semestre' : 'II Semestre'}
                    </span>
                    <span className="text-xs font-bold text-blue-600">
                      {lezione.aula?.nome || 'Aula da definire'}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-gray-800 leading-tight mb-1">{lezione.insegnamento.nome}</h3>
                  <p className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                    👤 {lezione.insegnamento.docente_nome || 'Docente da definire'}
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