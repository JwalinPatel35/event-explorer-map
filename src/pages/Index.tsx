import { useState } from "react";
import { loadMapState, MapState, getActiveLayer } from "@/lib/map-store";
import { saveMapState } from "@/lib/map-store";
import MapViewer from "@/components/MapViewer";
import AdminPanel from "@/components/AdminPanel";
import { Settings, Map, Layers } from "lucide-react";

const Index = () => {
  const [mapState, setMapState] = useState<MapState>(loadMapState);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLayers, setShowLayers] = useState(false);

  const switchLayer = (id: string) => {
    const updated = { ...mapState, activeLayerId: id };
    setMapState(updated);
    saveMapState(updated);
  };

  const activeLayer = getActiveLayer(mapState);

  return (
    <div className="flex flex-col h-screen bg-background grid-bg overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 glass border-b border-primary/10 z-30">
        <div className="flex items-center gap-3">
          <Map className="w-6 h-6 text-primary" />
          <h1 className="font-display text-lg font-bold tracking-wider text-primary neon-text">
            CAMPUS MAP
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Layer switcher - always visible */}
          <div className="relative">
            <button
              onClick={() => setShowLayers(!showLayers)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-display text-muted-foreground hover:text-primary border border-border rounded-lg hover:border-primary/30 transition"
            >
              <Layers className="w-4 h-4" />
              {activeLayer.name}
            </button>
            {showLayers && (
              <div className="absolute right-0 top-full mt-2 w-56 glass rounded-xl p-2 space-y-1 z-50 shadow-xl">
                <p className="px-2 py-1 text-[10px] font-display text-muted-foreground uppercase tracking-wider">Map Layers</p>
                {mapState.layers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => { switchLayer(layer.id); setShowLayers(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-display transition ${
                      layer.id === mapState.activeLayerId
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                    }`}
                  >
                    {layer.name}
                    <span className="block text-[10px] text-muted-foreground mt-0.5">
                      {layer.markers.length} marker{layer.markers.length !== 1 ? "s" : ""}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {!isAdmin ? (
            <button
              onClick={() => setIsAdmin(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-display text-muted-foreground hover:text-primary border border-border rounded-lg hover:border-primary/30 transition"
            >
              <Settings className="w-4 h-4" />
              Admin Mode
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-display text-accent">ADMIN MODE</span>
              <button
                onClick={() => setShowAdmin(!showAdmin)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-display text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition"
              >
                <Settings className="w-4 h-4" />
                Panel
              </button>
              <button
                onClick={() => { setIsAdmin(false); setShowAdmin(false); }}
                className="px-4 py-2 text-xs font-display text-muted-foreground border border-border rounded-lg hover:text-foreground transition"
              >
                Exit
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Map area */}
      <main className="flex-1 relative overflow-hidden">
        {isAdmin && !showAdmin && (
          <div className="absolute top-4 left-4 z-20 glass rounded-lg px-4 py-2">
            <p className="text-xs text-primary font-display">Click anywhere on the map to add a marker</p>
          </div>
        )}
        <MapViewer mapState={mapState} setMapState={setMapState} isAdmin={isAdmin} />
        {showAdmin && <AdminPanel mapState={mapState} setMapState={setMapState} onClose={() => setShowAdmin(false)} />}
      </main>
    </div>
  );
};

export default Index;
