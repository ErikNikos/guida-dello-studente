import { supabase } from '../../lib/supabase';
import CampusExplorer from '../../components/CampusExplorer';

export const revalidate = 0;

export default async function MappaPage() {
  // Eseguiamo la query relazionale per edifici e aule (ora nel nuovo percorso)
  const { data: edifici, error } = await supabase
    .from('edifici')
    .select('*, aule(*)')
    .order('nome');

  if (error) {
    return <div className="p-8 text-red-500 font-bold">Errore di connessione: {error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-brand-light p-4 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-4">
        <header className="pt-2">
          <h1 className="text-3xl font-black font-montserrat text-brand-dark mb-1 tracking-tight">Esplora</h1>
          <p className="text-gray-600 font-medium text-sm">Trova aule e servizi in Cittadella</p>
        </header>
        
        <CampusExplorer edifici={edifici || []} />
      </div>
    </main>
  );
}