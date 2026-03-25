
import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { searchService } from '../services/searchService';
import { ChevronLeft, MapPin, Info } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: item, isLoading, error } = useSWR(`/items/${id}`, () => searchService.getItem(id!));

  if (isLoading) return <div className="p-8 text-center animate-pulse">Loading Asset Details...</div>;
  if (error || !item) return <div className="p-8 text-center text-error">Asset not found.</div>;

  return (
    <div className="pb-20 md:pb-8 max-w-lg md:max-w-5xl md:mx-0 md:pl-12 bg-surface min-h-screen w-full mx-auto">
      {/* Hero Image Section */}
      <div className="relative h-[45vh] w-full bg-surface-high">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        
        <div className="absolute top-8 left-6 flex items-center gap-4 w-full">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-full glass flex items-center justify-center text-on-surface"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
            {item.brand} {item.model ? `| ${item.model}` : ''}
          </span>
          <h1 className="text-3xl font-bold font-display text-on-surface leading-tight">
            {item.name}
          </h1>
        </div>
      </div>

      <div className="p-8 space-y-10">
        {/* Quick Stats */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-surface-low rounded-3xl p-5 border-none">
            <span className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest block mb-2">Availability</span>
            <span className={twMerge(
              "text-lg font-bold font-display",
              item.stock > 0 ? "text-primary" : "text-error"
            )}>
              {item.stock} Units Available
            </span>
          </div>
          <div className="bg-surface-low rounded-3xl p-5 border-none">
            <span className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest block mb-2">Category</span>
            <span className="text-on-surface text-lg font-bold font-display">
              {item.category}
            </span>
          </div>
        </section>

        {/* Location Path */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-primary" />
            <h2 className="text-xl font-bold font-display">Storage Location</h2>
          </div>
          <div className="bg-surface-low rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1 h-full bg-primary" />
            <p className="text-on-surface text-lg font-medium leading-relaxed">
              {item.location}
            </p>
          </div>
        </section>

        {/* Specifications */}
        {item.specs && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Info size={18} className="text-primary" />
              <h2 className="text-xl font-bold font-display">Technical Specifications</h2>
            </div>
            <div className="space-y-3">
              {Object.entries(item.specs as Record<string, string>).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center bg-surface-low/50 p-4 rounded-xl">
                  <span className="text-on-surface-variant font-medium">{key}</span>
                  <span className="text-on-surface font-bold">{value}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
