export interface MapMarker {
  id: string;
  x: number; // percentage position on map
  y: number;
  title: string;
  room: string;
  description: string;
  time: string;
  category: string;
}

export interface MapState {
  svgUrl: string;
  markers: MapMarker[];
}

const STORAGE_KEY = 'techfest-map-data';

const DEFAULT_STATE: MapState = {
  svgUrl: '/map.svg',
  markers: [],
};

export function loadMapState(): MapState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_STATE;
}

export function saveMapState(state: MapState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
