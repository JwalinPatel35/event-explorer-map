import { useState, useRef, useCallback } from "react";
import { MapMarker, MapState, generateId, saveMapState } from "@/lib/map-store";
import MarkerPin from "./MarkerPin";
import EventDialog from "./EventDialog";

interface MapViewerProps {
  mapState: MapState;
  setMapState: React.Dispatch<React.SetStateAction<MapState>>;
  isAdmin: boolean;
}

const MapViewer = ({ mapState, setMapState, isAdmin }: MapViewerProps) => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addingMarker, setAddingMarker] = useState(false);
  const [newMarkerPos, setNewMarkerPos] = useState<{ x: number; y: number } | null>(null);
  const [form, setForm] = useState({ title: "", room: "", description: "", time: "", category: "" });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMapClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isAdmin) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setNewMarkerPos({ x, y });
      setAddingMarker(true);
      setForm({ title: "", room: "", description: "", time: "", category: "" });
    },
    [isAdmin]
  );

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
    setDialogOpen(true);
  };

  const handleAddMarker = () => {
    if (!newMarkerPos || !form.title) return;
    const newMarker: MapMarker = {
      id: generateId(),
      x: newMarkerPos.x,
      y: newMarkerPos.y,
      ...form,
    };
    const updated = { ...mapState, markers: [...mapState.markers, newMarker] };
    setMapState(updated);
    saveMapState(updated);
    setAddingMarker(false);
    setNewMarkerPos(null);
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="relative w-full h-full cursor-crosshair overflow-hidden"
        onClick={handleMapClick}
      >
        <img
          src={mapState.svgUrl}
          alt="Campus Map"
          className="w-full h-full object-contain select-none"
          draggable={false}
        />
        {mapState.markers.map((marker) => (
          <MarkerPin
            key={marker.id}
            marker={marker}
            onClick={handleMarkerClick}
            isAdmin={isAdmin}
          />
        ))}
        {isAdmin && newMarkerPos && addingMarker && (
          <div
            className="absolute w-3 h-3 rounded-full bg-accent border-2 border-accent -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{ left: `${newMarkerPos.x}%`, top: `${newMarkerPos.y}%` }}
          />
        )}
      </div>

      {/* Add marker form overlay */}
      {isAdmin && addingMarker && newMarkerPos && (
        <div className="absolute top-4 right-4 z-20 glass rounded-xl p-5 w-80 space-y-3">
          <h3 className="font-display text-sm text-primary">Add Event Marker</h3>
          <input
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Event Title *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Room / Location"
            value={form.room}
            onChange={(e) => setForm({ ...form, room: e.target.value })}
          />
          <input
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Time (e.g. 10:00 AM - 12:00 PM)"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
          <input
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Category (e.g. Workshop, Talk)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <textarea
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            placeholder="Description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddMarker}
              disabled={!form.title}
              className="flex-1 bg-primary text-primary-foreground font-display text-xs py-2 rounded-lg hover:opacity-90 transition disabled:opacity-40"
            >
              Add Marker
            </button>
            <button
              onClick={() => { setAddingMarker(false); setNewMarkerPos(null); }}
              className="flex-1 bg-muted text-muted-foreground font-display text-xs py-2 rounded-lg hover:bg-border transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <EventDialog
        marker={selectedMarker}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default MapViewer;
