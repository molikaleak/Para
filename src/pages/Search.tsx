
import useSWR from 'swr';
import { useSearchStore } from '../store/searchStore';
import { searchService } from '../services/searchService';
import ItemCard from '../components/ItemCard';
import FilterSheet from '../components/FilterSheet';
import { Search as SearchIcon, Filter, X, ChevronLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

const Search = () => {
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);
  const location = useSearchStore((state) => state.location);
  const category = useSearchStore((state) => state.category);
  const stockStatus = useSearchStore((state) => state.stockStatus);
  const recentSearches = useSearchStore((state) => state.recentSearches);
  const addRecentSearch = useSearchStore((state) => state.addRecentSearch);
  const addRecentItem = useSearchStore((state) => state.addRecentItem);
  const setCategory = useSearchStore((state) => state.setCategory);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      if (query.trim()) {
        addRecentSearch(query);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: items, error, isLoading } = useSWR(
    ['/items', debouncedQuery, location, category, stockStatus],
    () => searchService.searchItems({ q: debouncedQuery, location, category, stockStatus })
  );

  return (
    <div className="p-6 max-w-lg md:max-w-5xl md:mx-0 md:pl-12 min-h-screen w-full mx-auto">
      <header className="flex items-center gap-4 mb-8 pt-4">
        <button 
          onClick={() => navigate('/')}
          className="w-12 h-12 rounded-full bg-surface-low flex items-center justify-center text-on-surface"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold font-display truncate">DBD Search</h1>
      </header>

      {/* Search Bar */}
      <div className="sticky top-4 z-40 mb-8">
        <div className="h-16 bg-surface-low border border-surface-high rounded-2xl flex items-center px-4 sm:px-6 gap-3 sm:gap-4 shadow-xl shadow-black/20">
          <SearchIcon className="text-primary flex-shrink-0" size={24} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search DBD..."
            className="bg-transparent border-none outline-none text-on-surface text-base sm:text-lg flex-1 min-w-0"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1">
              <X size={18} className="text-on-surface-variant" />
            </button>
          )}
          <div className="flex items-center gap-3 border-l border-on-surface-variant/10 pl-3">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className={clsx(
                "text-on-surface-variant active:text-primary transition-colors",
                (location || category || stockStatus) && "text-primary"
              )}
            >
              <Filter size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(location || category || stockStatus) && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {location && (
            <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg text-primary text-xs font-bold whitespace-nowrap">
              LOC: {location}
            </div>
          )}
          {category && (
            <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg text-primary text-xs font-bold whitespace-nowrap">
              CAT: {category}
            </div>
          )}
          {stockStatus && (
            <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg text-primary text-xs font-bold whitespace-nowrap">
              STOCK: {stockStatus}
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {!query && !location && !category && !stockStatus ? (
        <div className="animate-in fade-in duration-300">
          <div className="space-y-0 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[1px] before:bg-surface-high">
            {recentSearches.length > 0 ? (
              recentSearches.map((q: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setQuery(q)}
                  className="w-full py-3 flex items-start gap-4 transition-all active:opacity-70 group"
                >
                  <div className="relative z-10 w-10 flex justify-center text-on-surface-variant group-hover:text-primary transition-colors mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div className="flex flex-col items-start min-w-0 border-b border-surface-high pb-3 flex-1 group-last:border-0">
                    <span className="text-on-surface font-semibold truncate w-full text-left">{q}</span>
                    <span className="text-on-surface-variant/60 text-[10px] uppercase font-bold tracking-wider">Recent Search</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="py-8 pl-12 border-b border-surface-high">
                <p className="text-on-surface-variant text-sm">No recent activity</p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-on-surface-variant mb-4 pl-1">Search by Category</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['Power Tools', 'Electrical', 'Safety', 'Measurement', 'Heavy Equipment', 'Hand Tools'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="bg-surface-low rounded-xl p-4 text-center text-on-surface font-semibold text-sm active:scale-[0.98] transition-all border border-transparent hover:border-surface-high"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-28 sm:h-32 bg-surface-low rounded-xl animate-pulse flex items-stretch border border-surface-high/50">
                <div className="w-24 sm:w-32 bg-surface-high"></div>
              </div>
            ))
          ) : error ? (
            <div className="py-12 text-center text-error">
              Failed to load results. Try checking your connection.
            </div>
          ) : items?.length > 0 ? (
            items.map((item: { id: string; name: string; brand: string; location: string; stock: number; status: string; image?: string }) => (
              <ItemCard 
                key={item.id} 
                {...item} 
                onClick={() => {
                  addRecentItem(item as any);
                  navigate(`/item/${item.id}`);
                }}
              />
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-surface-low rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchIcon size={32} className="text-on-surface-variant opacity-20" />
              </div>
              <h3 className="text-xl font-bold font-display opacity-40">No items found</h3>
              <p className="text-on-surface-variant">Try searching for different keywords or check filters.</p>
            </div>
          )}
        </div>
      )}

      <FilterSheet 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
      />
    </div>
  );
};

export default Search;
