'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

type Aula = { id: string; nome: string; piano: number; };
type Edificio = {
  id: string; nome: string; latitudine: number | null; longitudine: number | null;
  categoria: string; aule: Aula[];
};

const getMarkerIcon = (categoria: string) => {
  let emoji = '🏢';
  switch (categoria) {
    case 'mensa': emoji = '🍽️'; break;
    case 'bar': emoji = '☕'; break;
    case 'sport': emoji = '🏟️'; break; 
    case 'residenza': emoji = '🛏️'; break;
    case 'parcheggio': emoji = '🅿️'; break;
    case 'studio_esterno': emoji = '📚'; break;
  }
  return L.divIcon({
    className: 'custom-emoji-marker',
    html: `<div style="font-size: 26px; filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.4));">${emoji}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

const userLocationIcon = L.divIcon({
  className: 'user-location',
  html: `<div style="background-color: #2563eb; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.4); animation: pulse 2s infinite;"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function MapController({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 18, { duration: 1.5 });
  }, [position, map]);
  return null;
}

// NUOVO: Pulsante per richiedere la posizione su click (Bypassa i blocchi iOS)
function LocateControl({ setUserPosition }: { setUserPosition: (pos: [number, number]) => void }) {
  const map = useMap();

  const handleLocate = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setUserPosition(coords);
          map.flyTo(coords, 17, { duration: 1 });
        },
        (error) => {
          alert("Impossibile ottenere la posizione. Verifica di aver dato i permessi al browser nelle Impostazioni del telefono.");
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  };

  return (
    <button
      onClick={handleLocate}
      className="absolute bottom-6 right-4 z-[400] bg-white p-3 rounded-full shadow-lg border border-gray-200 text-xl hover:bg-gray-50 flex items-center justify-center transition-transform active:scale-95"
      aria-label="Trova la mia posizione"
    >
      📍
    </button>
  );
}

export default function Map({ edifici, focusPosition }: { edifici: Edificio[], focusPosition: [number, number] | null }) {
  const center: [number, number] = [37.5255, 15.0743];
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div className="h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative z-0">
      <MapContainer center={center} zoom={16} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapController position={focusPosition} />
        
        {/* Inseriamo il bottone in sovrimpressione */}
        <LocateControl setUserPosition={setUserPosition} />

        {userPosition && (
          <Marker position={userPosition} icon={userLocationIcon}>
            <Popup><strong>Tu sei qui</strong></Popup>
          </Marker>
        )}

        {edifici.map((edificio) => {
          if (edificio.latitudine && edificio.longitudine) {
            return (
              <Marker key={edificio.id} position={[edificio.latitudine, edificio.longitudine]} icon={getMarkerIcon(edificio.categoria || 'didattica')}>
                <Popup>
                  <strong className="text-blue-900 text-base">{edificio.nome}</strong>
                  {edificio.aule && edificio.aule.length > 0 && (
                    <div className="mt-3 space-y-2 border-t pt-2">
                      {[4, 3, 2, 1, 0, -1, -2].map(piano => {
                        const aulePiano = edificio.aule.filter(a => Number(a.piano) === piano);
                        if (aulePiano.length === 0) return null;
                        
                        return (
                          <div key={piano} className="text-xs">
                            <span className="font-bold text-gray-700 bg-gray-100 px-1 py-0.5 rounded">
                              Piano {piano === 0 ? '0 (Terra)' : piano}
                            </span>
                            <div className="text-gray-600 mt-1">
                              {aulePiano.map(a => a.nome).join(' • ')}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
}