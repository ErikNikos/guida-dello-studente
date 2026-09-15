import { supabase } from './supabase';

export interface CorsoLaurea {
  id: string;
  nome: string;
  tipo_corso: string;
  durata_anni: number;
}

export interface CanaleCorso {
  id: string;
  corso_id: string;
  anno_corso: number;
  canale_cognomi: string;
}

export interface Lezione {
  id: string;
  giorno_settimana: number;
  ora_inizio: string;
  ora_fine: string;
  insegnamento: {
    nome: string;
    docente_nome: string | null;
    semestre: number;
    canale_corso_id: string;
  };
  aula: {
    nome: string;
  } | null;
}



export async function fetchCorsiLaurea(): Promise<CorsoLaurea[]> {
  const { data, error } = await supabase
    .from('corsi_laurea')
    .select('id, nome, tipo_corso, durata_anni')
    .order('nome');

  if (error) {
    console.error('Error fetching corsi laurea:', error);
    return [];
  }

  return data || [];
}

export async function fetchCanaliByCorso(corsoId: string): Promise<CanaleCorso[]> {
  const { data, error } = await supabase
    .from('canali_corso')
    .select('id, corso_id, anno_corso, canale_cognomi')
    .eq('corso_id', corsoId)
    .order('anno_corso');

  if (error) {
    console.error('Error fetching canali:', error);
    return [];
  }

  return data || [];
}

export async function fetchCanaliByCorsoAndAnno(corsoId: string, anno: number): Promise<CanaleCorso[]> {
  const { data, error } = await supabase
    .from('canali_corso')
    .select('id, corso_id, anno_corso, canale_cognomi')
    .eq('corso_id', corsoId)
    .eq('anno_corso', anno)
    .order('canale_cognomi');

  if (error) {
    console.error('Error fetching canali by year:', error);
    return [];
  }

  return data || [];
}

export async function fetchLezioniByCanale(canaleCorsoId: string): Promise<Lezione[]> {
  const { data, error } = await supabase
    .from('lezioni')
    .select(`
      id,
      giorno_settimana,
      ora_inizio,
      ora_fine,
      insegnamenti!inner(
        nome,
        docente_nome,
        semestre,
        canale_corso_id
      ),
      aule(nome)
    `)
    .eq('insegnamenti.canale_corso_id', canaleCorsoId)
    .order('giorno_settimana')
    .order('ora_inizio');

  if (error) {
    console.error('Error fetching lezioni:', error);
    return [];
  }

  return (data || []).map((lezione: any) => ({
    id: lezione.id,
    giorno_settimana: lezione.giorno_settimana,
    ora_inizio: lezione.ora_inizio,
    ora_fine: lezione.ora_fine,
    insegnamento: lezione.insegnamenti,
    aula: lezione.aule,
  }));
}

export function getGiornoNome(giornoSettimana: number): string {
  const giorni = [
    'Domenica',
    'Lunedì',
    'Martedì',
    'Mercoledì',
    'Giovedì',
    'Venerdì',
    'Sabato',
  ];
  return giorni[giornoSettimana] || 'Giorno non valido';
}

export function getGiornoShort(giornoSettimana: number): string {
  const giorni = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  return giorni[giornoSettimana] || '?';
}