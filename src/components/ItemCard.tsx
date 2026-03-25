import { ClipboardList, MapPin, Package, ArrowRight, Tag } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ItemCardProps {
  id: string;
  name: string;
  brand: string;
  model?: string;
  location: string;
  stock: number;
  status: string;
  image?: string;
  onClick: () => void;
}

const ItemCard = ({ id, name, brand, model, location, stock, status, image, onClick }: ItemCardProps) => {
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
      className="bg-surface-low rounded-xl border border-surface-high p-3 sm:p-4 flex flex-col gap-3 active:scale-[0.99] transition-transform cursor-pointer shadow-sm hover:border-primary/30"
    >
      {/* Header: Product Code */}
      <div className="flex justify-between items-center bg-surface-high/50 px-3 py-2 rounded-lg border border-surface-high">
        <span className="text-on-surface font-display font-medium text-sm whitespace-nowrap">
          <span className="text-on-surface-variant font-normal">Product Code: </span>
          <span className="font-bold">{id}</span>
        </span>
        <div className="flex gap-2 items-center">
          <div className={twMerge(
            "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
            getStatusColor()
          )}>
            {status}
          </div>
        </div>
      </div>
      
      {/* Main Info */}
      <div className="flex gap-3 sm:gap-4 items-start">
        {/* Photo */}
        <div className="w-20 h-20 sm:w-28 sm:h-28 bg-surface-high rounded-lg overflow-hidden flex-shrink-0 border border-surface-high/50 relative">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover object-center" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ClipboardList size={28} className="text-on-surface-variant/30" />
            </div>
          )}
        </div>
        
        {/* Description & Details */}
        <div className="flex flex-col flex-1 w-0 min-w-0 pr-1">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="font-bold font-display text-on-surface text-sm sm:text-base leading-snug line-clamp-2">
              {name}
            </h3>
            <ArrowRight size={16} className="text-on-surface-variant flex-shrink-0 mt-0.5 hidden sm:block" />
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-auto text-xs sm:text-sm">
             <div className="flex flex-col bg-surface-high/30 p-1.5 rounded">
               <span className="text-on-surface-variant/70 text-[10px] uppercase font-bold tracking-wider mb-0.5">Unit</span> 
               <span className="font-semibold text-on-surface">Pcs</span>
             </div>
             <div className="flex flex-col bg-surface-high/30 p-1.5 rounded items-start sm:items-end">
               <span className="text-on-surface-variant/70 text-[10px] uppercase font-bold tracking-wider mb-0.5 flex gap-1 items-center"><Package size={10} /> Qty</span> 
               <span className="font-bold text-primary text-sm sm:text-base leading-none">{stock}</span>
             </div>
             <div className="col-span-2 flex flex-col bg-surface-high/30 p-1.5 rounded mt-0.5 border-t border-surface-high/50 pt-1.5 pb-1">
               <span className="text-on-surface-variant/70 text-[10px] uppercase font-bold tracking-wider mb-0.5 flex gap-1 items-center"><Tag size={10} /> Brand & Model</span> 
               <span className="font-medium text-on-surface text-xs leading-tight line-clamp-1">{brand} {model && <span className="opacity-60 font-normal px-1">|</span>} {model}</span>
             </div>
             <div className="col-span-2 flex flex-col bg-surface-high/30 p-1.5 rounded mt-0.5 border-t border-surface-high/50 pt-1.5 pb-1">
               <span className="text-on-surface-variant/70 text-[10px] uppercase font-bold tracking-wider mb-0.5 flex gap-1 items-center"><MapPin size={10} /> Location</span> 
               <span className="font-medium text-on-surface text-xs leading-tight line-clamp-1">{location}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
