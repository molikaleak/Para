
import { useSearchStore } from '../store/searchStore';
import { X, Check } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterSheet = ({ isOpen, onClose }: FilterSheetProps) => {
  const location = useSearchStore((state) => state.location);
  const category = useSearchStore((state) => state.category);
  const setFilters = useSearchStore((state) => state.setFilters);
  const clearFilters = useSearchStore((state) => state.clearFilters);

  const locations = ['Zone A', 'Zone B', 'Zone C', 'Zone D'];
  const categories = ['Power Tools', 'Electrical', 'Structural', 'Safety', 'Plumbing'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center pointer-events-none">
      <div 
        className="absolute inset-0 bg-black/60 pointer-events-auto"
        onClick={onClose}
      />
      
      <div className="w-full max-w-lg bg-surface rounded-t-[2.5rem] p-8 pb-12 pointer-events-auto animate-in slide-in-from-bottom duration-300 shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.5)] relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-display">Filters</h2>
          <button onClick={onClose} className="p-2 bg-surface-low rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-8">
          {/* Location Selection */}
          <section>
            <label className="text-primary text-[10px] font-bold tracking-widest uppercase mb-4 block">
              Storage Location
            </label>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setFilters({ location: loc === location ? '' : loc })}
                  className={twMerge(
                    "px-4 py-3 rounded-xl font-bold text-sm transition-all border-none focus:outline-none",
                    loc === location ? "bg-primary text-on-primary" : "bg-surface-low text-on-surface-variant"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {loc === location && <Check size={14} />}
                    {loc}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Category Selection */}
          <section>
            <label className="text-primary text-[10px] font-bold tracking-widest uppercase mb-4 block">
              Item Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilters({ category: cat === category ? '' : cat })}
                  className={twMerge(
                    "px-4 py-3 rounded-xl font-bold text-sm transition-all border-none focus:outline-none",
                    cat === category ? "bg-primary text-on-primary" : "bg-surface-low text-on-surface-variant"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {cat === category && <Check size={14} />}
                    {cat}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="flex gap-4 mt-12">
          <button
            onClick={clearFilters}
            className="flex-1 h-16 rounded-2xl bg-surface-low text-on-surface font-bold transition-all active:scale-95"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-[2] h-16 rounded-2xl bg-primary text-on-primary font-bold transition-all active:scale-95"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSheet;
