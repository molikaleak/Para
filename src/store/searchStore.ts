import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ItemData {
  id: string;
  name: string;
  brand: string;
  model?: string;
  location: string;
  stock: number;
  status: string;
  image?: string;
}

interface SearchState {
  query: string;
  location: string;
  category: string;
  stockStatus: string;
  recentSearches: string[];
  recentItems: ItemData[];
  setQuery: (q: string) => void;
  setCategory: (c: string) => void;
  setFilters: (filters: { location?: string; category?: string; stockStatus?: string }) => void;
  addRecentSearch: (q: string) => void;
  addRecentItem: (item: ItemData) => void;
  clearFilters: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      query: '',
      location: '',
      category: '',
      stockStatus: '',
      recentSearches: [],
      recentItems: [],
      setQuery: (query) => set({ query }),
      setCategory: (category) => set({ category }),
      setFilters: (filters) => {
        console.log('Setting filters:', filters);
        set((state) => ({ ...state, ...filters }));
      },
      addRecentSearch: (q) => set((state) => {
        if (!q.trim()) return state;
        return {
          recentSearches: [q, ...state.recentSearches.filter((s) => s !== q)].slice(0, 5)
        };
      }),
      addRecentItem: (item) => set((state) => ({
        recentItems: [item, ...state.recentItems.filter((i) => i.id !== item.id)].slice(0, 5)
      })),
      clearFilters: () => {
        console.log('Clearing filters');
        set({ location: '', category: '', stockStatus: '' });
      },
    }),
    {
      name: 'para-search-storage',
    }
  )
);
