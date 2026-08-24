import { supabase } from '../lib/supabase';
import CampusExplorer from '../components/CampusExplorer';

export const revalidate = 0;

export default async function Home() {
  // Query relazionale: estrae tutti gli edifici e le aule a essi associate
  const { data: edifici, error } = await supabase
    .from('edifici')
    .select('*, aule(*)')
    .order('nome');

    console.log(JSON.stringify(edifici, null, 2));

  if (error) {
    return <div className="p-8 text-red-500 font-bold">Errore di connessione: {error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <header>
          <h1 className="text-4xl font-black text-blue-950 mb-2 tracking-tight">Campus UniCT</h1>
          <p className="text-gray-600 font-medium">Trova aule, aule studio e servizi in Cittadella</p>
        </header>
        
        <CampusExplorer edifici={edifici || []} />
      </div>
    </main>
  );
}