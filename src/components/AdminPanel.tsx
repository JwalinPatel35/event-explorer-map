import { useState, useRef } from "react";
import { MapMarker, MapState, saveMapState } from "@/lib/map-store";
import { Upload, Trash2, Edit3, X, Check } from "lucide-react";

interface AdminPanelProps {
  mapState: MapState;
  setMapState: React.Dispatch<React.SetStateAction<MapState>>;
  onClose: () => void;
}

const AdminPanel = ({ mapState, setMapState, onClose }: AdminPanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<MapMarker>>({});

  const handleSvgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const updated = { ...mapState, svgUrl: url };
    setMapState(updated);
    saveMapState(updated);
  };

  const deleteMarker = (id: string) => {
    const updated = { ...mapState, markers: mapState.markers.filter((m) => m.id !== id) };
    setMapState(updated);
    saveMapState(updated);
  };

  const startEdit = (marker: MapMarker) => {
    setEditingId(marker.id);
    setEditForm({ title: marker.title, room: marker.room, description: marker.description, time: marker.time, category: marker.category });
  };

  const saveEdit = (id: string) => {
    const updated = {
      ...mapState,
      markers: mapState.markers.map((m) => (m.id === id ? { ...m, ...editForm } : m)),
    };
    setMapState(updated);
    saveMapState(updated);
    setEditingId(null);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 glass z-50 flex flex-col border-l border-primary/20 shadow-2xl">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h2 className="font-display text-lg text-primary neon-text">Admin Panel</h2>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 border-b border-border space-y-3">
        <h3 className="font-display text-xs text-muted-foreground uppercase tracking-wider">Map SVG</h3>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 bg-muted border border-dashed border-primary/30 rounded-lg py-3 text-sm text-primary hover:bg-primary/10 transition font-display"
        >
          <Upload className="w-4 h-4" />
          Upload New Map SVG
        </button>
        <input ref={fileInputRef} type="file" accept=".svg" onChange={handleSvgUpload} className="hidden" />
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        <h3 className="font-display text-xs text-muted-foreground uppercase tracking-wider">
          Markers ({mapState.markers.length})
        </h3>
        {mapState.markers.length === 0 && (
          <p className="text-sm text-muted-foreground italic">No markers yet. Click on the map to add one.</p>
        )}
        {mapState.markers.map((marker) => (
          <div key={marker.id} className="bg-muted rounded-lg p-3 space-y-2 border border-border">
            {editingId === marker.id ? (
              <div className="space-y-2">
                <input
                  className="w-full bg-background border border-border rounded px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={editForm.title || ""}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="Title"
                />
                <input
                  className="w-full bg-background border border-border rounded px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={editForm.room || ""}
                  onChange={(e) => setEditForm({ ...editForm, room: e.target.value })}
                  placeholder="Room"
                />
                <input
                  className="w-full bg-background border border-border rounded px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={editForm.time || ""}
                  onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                  placeholder="Time"
                />
                <input
                  className="w-full bg-background border border-border rounded px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={editForm.category || ""}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  placeholder="Category"
                />
                <textarea
                  className="w-full bg-background border border-border rounded px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  value={editForm.description || ""}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Description"
                  rows={2}
                />
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(marker.id)} className="flex items-center gap-1 text-xs text-primary hover:underline">
                    <Check className="w-3 h-3" /> Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="flex items-center gap-1 text-xs text-muted-foreground hover:underline">
                    <X className="w-3 h-3" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{marker.title}</h4>
                    {marker.room && <p className="text-xs text-muted-foreground">{marker.room}</p>}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => startEdit(marker)} className="p-1 text-muted-foreground hover:text-primary transition">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => deleteMarker(marker.id)} className="p-1 text-muted-foreground hover:text-destructive transition">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                {marker.time && <p className="text-xs text-accent">{marker.time}</p>}
                {marker.category && <p className="text-xs text-neon-purple">{marker.category}</p>}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
