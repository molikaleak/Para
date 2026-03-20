import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchState {
  query: string;
  location: string;
  category: string;
  recentSearches: string[];
  setQuery: (q: string) => void;
  setFilters: (filters: { location?: string; category?: string }) => void;
  addRecentSearch: (q: string) => void;
  clearFilters: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      query: '',
      location: '',
      category: '',
      recentSearches: [],
      setQuery: (query) => set({ query }),
      setFilters: (filters) => {
        console.log('Setting filters:', filters);
        set((state) => ({ ...state, ...filters }));
      },
      addRecentSearch: (q) => set((state) => ({
        recentSearches: [q, ...state.recentSearches.filter((s) => s !== q)].slice(0, 5)
      })),
      clearFilters: () => {
        console.log('Clearing filters');
        set({ location: '', category: '' });
      },
    }),
    {
      name: 'para-search-storage',
    }
  )
);
