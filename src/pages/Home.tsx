import { useAuthStore } from '../store/authStore';
import { useSearchStore } from '../store/searchStore';
import { useNavigate } from 'react-router-dom';
import { Search, Camera, ArrowRight, History } from 'lucide-react';
import ScanModal from '../components/ScanModal';
import { useState } from 'react';

const Home = () => {
  const { user } = useAuthStore();
  const { recentSearches, setQuery } = useSearchStore();
  const [isScanOpen, setIsScanOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <header className="mb-10 pt-10">
        <h1 className="text-4xl font-bold font-display text-on-surface mb-2">
          Hello, {user?.name.split(' ')[0]}
        </h1>
        <p className="text-on-surface-variant text-lg">Find materials quickly</p>
      </header>

      {/* Main Search Bar */}
      <div 
        onClick={handleSearchClick}
        className="h-16 bg-surface-low rounded-2xl flex items-center px-6 gap-4 mb-10 transition-all active:scale-[0.98]"
      >
        <Search className="text-primary" size={24} />
        <span className="text-on-surface-variant text-lg flex-1">Search inventory...</span>
        <div className="flex items-center gap-3 border-l border-on-surface-variant/10 pl-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsScanOpen(true);
            }}
            className="text-on-surface-variant active:text-primary transition-colors pr-2"
          >
            <Camera size={24} />
          </button>
        </div>
      </div>

      {/* Warehouse Insight Card */}
      <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6 mb-10 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-all duration-700" />
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <label className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase block">
            Live Warehouse Insight
          </label>
        </div>
        <h3 className="text-xl font-bold font-display text-on-surface mb-3 leading-tight">
          System detected SKU updates for all structural materials in Sector 7-B.
        </h3>
        <button 
          onClick={() => navigate('/insights')}
          className="flex items-center gap-2 text-primary font-bold text-sm mt-4 group-hover:gap-3 transition-all active:scale-95"
        >
          View All for Today <ArrowRight size={16} />
        </button>
      </div>

      {/* Recent Searches */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-display">Recent Searches</h2>
          <button className="text-primary text-sm font-bold">Clear All</button>
        </div>
        
        <div className="space-y-3">
          {recentSearches.length > 0 ? (
            recentSearches.map((q: string, i: number) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(q);
                  navigate('/search');
                }}
                className="w-full h-16 bg-surface-low/50 rounded-2xl px-6 flex items-center gap-4 transition-all active:scale-[0.98] border-none"
              >
                <div className="w-10 h-10 rounded-full bg-surface-high flex items-center justify-center">
                  <History size={18} className="text-on-surface-variant" />
                </div>
                <span className="text-on-surface font-medium">{q}</span>
                <ArrowRight size={18} className="ml-auto text-on-surface-variant/30" />
              </button>
            ))
          ) : (
            <div className="py-12 text-center bg-surface-low/30 rounded-3xl">
              <p className="text-on-surface-variant italic">No recent activity</p>
            </div>
          )}
        </div>
      </div>

      <ScanModal 
        isOpen={isScanOpen} 
        onClose={() => setIsScanOpen(false)} 
      />
    </div>
  );
};

export default Home;
