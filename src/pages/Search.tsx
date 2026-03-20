
import useSWR from 'swr';
import { useSearchStore } from '../store/searchStore';
import { searchService } from '../services/searchService';
import ItemCard from '../components/ItemCard';
import FilterSheet from '../components/FilterSheet';
import ScanModal from '../components/ScanModal';
import { Search as SearchIcon, Camera, Filter, X, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

const Search = () => {
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);
  const location = useSearchStore((state) => state.location);
  const category = useSearchStore((state) => state.category);
  const addRecentSearch = useSearchStore((state) => state.addRecentSearch);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isScanOpen, setIsScanOpen] = useState(false);
  const navigate = useNavigate();

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      if (query) addRecentSearch(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: items, error, isLoading } = useSWR(
    ['/items', debouncedQuery, location, category],
    () => searchService.searchItems({ q: debouncedQuery, location, category })
  );

  return (
    <div className="p-6 max-w-lg mx-auto min-h-screen">
      <header className="flex items-center gap-4 mb-8 pt-4">
        <button 
          onClick={() => navigate('/')}
          className="w-12 h-12 rounded-full bg-surface-low flex items-center justify-center text-on-surface"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold font-display">Inventory Search</h1>
      </header>

      {/* Search Bar */}
      <div className="sticky top-4 z-40 mb-8">
        <div className="h-16 bg-surface-low border border-surface-high rounded-2xl flex items-center px-6 gap-4 shadow-xl shadow-black/20">
          <SearchIcon className="text-primary" size={24} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search SKUs, names, brands..."
            className="bg-transparent border-none outline-none text-on-surface text-lg flex-1 min-w-0"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1">
              <X size={18} className="text-on-surface-variant" />
            </button>
          )}
          <div className="flex items-center gap-3 border-l border-on-surface-variant/10 pl-3">
            <button 
              onClick={() => setIsScanOpen(true)}
              className="text-on-surface-variant active:text-primary transition-colors"
            >
              <Camera size={24} />
            </button>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className={clsx(
                "text-on-surface-variant active:text-primary transition-colors",
                (location || category) && "text-primary"
              )}
            >
              <Filter size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(location || category) && (
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
        </div>
      )}

      {/* Results */}
      <div className="space-y-6">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-64 bg-surface-low rounded-3xl animate-pulse" />
          ))
        ) : error ? (
          <div className="py-12 text-center text-error">
            Failed to load results. Try checking your connection.
          </div>
        ) : items?.length > 0 ? (
          items.map((item: any) => (
            <ItemCard 
              key={item.id} 
              {...item} 
              onClick={() => navigate(`/item/${item.id}`)}
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

      <FilterSheet 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
      />

      <ScanModal 
        isOpen={isScanOpen} 
        onClose={() => setIsScanOpen(false)} 
      />
    </div>
  );
};

export default Search;
