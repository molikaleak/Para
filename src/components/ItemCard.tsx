
import { Bookmark, ClipboardList, MapPin } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ItemCardProps {
  id: string;
  name: string;
  brand: string;
  location: string;
  stock: number;
  status: string;
  image?: string;
  onClick: () => void;
}

const ItemCard = ({ name, brand, location, stock, status, image, onClick }: ItemCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'In Stock': return 'text-primary bg-primary/10';
      case 'Low Stock': return 'text-amber-400 bg-amber-400/10';
      case 'Out of Stock': return 'text-error bg-error/10';
      default: return 'text-on-surface-variant bg-surface-high';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-surface-low rounded-3xl overflow-hidden active:scale-[0.98] transition-all duration-300"
    >
      <div className="relative h-48 w-full bg-surface-high">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover opacity-80" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ClipboardList size={48} className="text-on-surface-variant/20" />
          </div>
        )}
        <div className={twMerge(
          "absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
          getStatusColor()
        )}>
          {status} ({stock})
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-primary text-[10px] font-bold tracking-widest uppercase block mb-1">
              {brand}
            </span>
            <h3 className="text-xl font-bold font-display text-on-surface leading-snug">
              {name}
            </h3>
          </div>
          <button className="w-10 h-10 rounded-full bg-surface-high flex items-center justify-center text-on-surface-variant active:text-primary">
            <Bookmark size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-6">
          <MapPin size={14} className="text-primary" />
          <span className="truncate">{location}</span>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            // Handle request
          }}
          className="w-full h-12 bg-surface-highest rounded-xl text-primary font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 group transition-all"
        >
          Request Item
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
