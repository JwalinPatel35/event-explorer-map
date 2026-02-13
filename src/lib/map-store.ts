export interface MapMarker {
  id: string;
  x: number;
  y: number;
  title: string;
  room: string;
  description: string;
  time: string;
  category: string;
}

export interface MapLayer {
  id: string;
  name: string;
  svgUrl: string;
  markers: MapMarker[];
}

export interface MapState {
  layers: MapLayer[];
  activeLayerId: string;
}

const STORAGE_KEY = 'techfest-map-data';

const DEFAULT_LAYER: MapLayer = {
  id: 'default',
  name: 'Main Map',
  svgUrl: '/map.svg',
  markers: [],
};

const DEFAULT_STATE: MapState = {
  layers: [DEFAULT_LAYER],
  activeLayerId: 'default',
};

export function loadMapState(): MapState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migration: old format had svgUrl + markers at top level
      if ('svgUrl' in parsed && !('layers' in parsed)) {
        const migrated: MapState = {
          layers: [{
            id: 'default',
            name: 'Main Map',
            svgUrl: parsed.svgUrl,
            markers: parsed.markers || [],
          }],
          activeLayerId: 'default',
        };
        saveMapState(migrated);
        return migrated;
      }
      return parsed;
    }
  } catch {}
  return DEFAULT_STATE;
}

export function saveMapState(state: MapState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getActiveLayer(state: MapState): MapLayer {
  return state.layers.find(l => l.id === state.activeLayerId) || state.layers[0];
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
