import { api } from './api';

export interface SearchParams {
  q?: string;
  location?: string;
  category?: string;
  stockStatus?: string;
}

export const searchService = {
  searchItems: async ({ q, location, category, stockStatus }: SearchParams) => {
    let data = await api.get('/items');
    
    if (q) {
      const lowerQ = q.toLowerCase();
      data = data.filter((item: any) => 
        item.name?.toLowerCase().includes(lowerQ) || 
        item.id?.includes(lowerQ) || 
        item.brand?.toLowerCase().includes(lowerQ) ||
        item.model?.toLowerCase().includes(lowerQ)
      );
    }
    
    if (location) {
      data = data.filter((item: any) => item.location?.includes(location));
    }
    
    if (category) {
      data = data.filter((item: any) => item.category === category);
    }
    
    if (stockStatus) {
      data = data.filter((item: any) => {
        if (stockStatus === 'Out of Stock') return item.stock === 0;
        if (stockStatus === 'Low Stock') return item.stock > 0 && item.stock <= 10;
        if (stockStatus === 'Available') return item.stock > 0;
        return true;
      });
    }
    
    return data;
  },
  getItem: (id: string) => {
    return api.get(`/items/${id}`);
  }
};
