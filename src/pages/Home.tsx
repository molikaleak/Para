
import { useSearchStore } from '../store/searchStore';
import { useNavigate } from 'react-router-dom';
import { Search, ClipboardList } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import useSWR from 'swr';
import { searchService } from '../services/searchService';

const Home = () => {
  const { recentItems } = useSearchStore();
  const navigate = useNavigate();

  const { data: items, isLoading } = useSWR('/items/all', () => searchService.searchItems({}));

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <div className="p-6 max-w-lg md:max-w-5xl md:mx-0 md:pl-12 w-full mx-auto">
      <header className="mb-10 pt-10">
        <h1 className="text-4xl font-bold font-display text-on-surface mb-2">
          hello, Victor
        </h1>
      </header>

      {/* Main Search Bar */}
      <div 
        onClick={handleSearchClick}
        className="h-16 bg-surface-low rounded-2xl flex items-center px-6 gap-4 mb-10 transition-all active:scale-[0.98]"
      >
        <Search className="text-primary" size={24} />
        <span className="text-on-surface-variant text-lg flex-1 truncate">Search DBD...</span>
      </div>

      {/* Recently Viewed (Horizontal) */}
      <div className="mt-2 mb-8 border-b border-surface-high/50 pb-8">
        <h2 className="text-sm font-bold text-on-surface-variant mb-4 pl-1">Recently Viewed</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x pr-6 -mr-6 pl-1 pt-1 no-scrollbar">
          {recentItems && recentItems.length > 0 ? (
            recentItems.map((item: any) => (
              <div 
                key={item.id}
                onClick={() => navigate(`/item/${item.id}`)}
                className="w-28 flex-shrink-0 snap-start bg-surface-low rounded-xl border border-surface-high overflow-hidden active:scale-95 transition-transform cursor-pointer shadow-sm hover:border-primary/30"
              >
                <div className="h-24 bg-surface-high relative border-b border-surface-high/50">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ClipboardList size={20} className="text-on-surface-variant/30" />
                    </div>
                  )}
                </div>
                <div className="p-2.5 flex flex-col justify-between h-[4.5rem]">
                  <span className="text-[9px] font-bold text-primary uppercase block truncate">{item.brand}</span>
                  <span className="text-xs font-bold font-display text-on-surface leading-tight line-clamp-2 mt-0.5">{item.name}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-4 pl-1 text-on-surface-variant text-sm italic">
              No recent activity
            </div>
          )}
        </div>
      </div>

      {/* Default Full Inventory List */}
      <div className="mt-2">
        <div className="flex items-center justify-between mb-4 pl-1">
          <h2 className="text-sm font-bold text-on-surface-variant">All Inventory ({items?.length || 0})</h2>
        </div>
        
        <div className="flex flex-col gap-3 pb-8">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-28 sm:h-32 bg-surface-low rounded-xl animate-pulse flex items-stretch border border-surface-high/50">
                <div className="w-24 sm:w-32 bg-surface-high"></div>
                <div className="p-4 flex-1 space-y-3">
                  <div className="h-4 bg-surface-high rounded w-1/3"></div>
                  <div className="h-4 bg-surface-high rounded w-3/4"></div>
                </div>
              </div>
            ))
          ) : items && items.length > 0 ? (
            items.map((item: any) => (
              <ItemCard 
                key={item.id} 
                {...item} 
                onClick={() => {
                  useSearchStore.getState().addRecentItem(item);
                  navigate(`/item/${item.id}`);
                }}
              />
            ))
          ) : (
            <div className="py-8 text-center text-on-surface-variant border border-dashed border-surface-high rounded-xl">
              <p className="text-sm">No items found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
