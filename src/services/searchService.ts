import { api } from './api';

export interface SearchParams {
  q?: string;
  location?: string;
  category?: string;
  stockStatus?: string;
}

export const searchService = {
  searchItems: ({ q, location, category, stockStatus }: SearchParams) => {
    let url = '/items?';
    if (q) url += `q=${q}&`;
    if (location) url += `location_like=${location}&`;
    if (category) url += `category=${category}&`;
    
    if (stockStatus) {
      if (stockStatus === 'Out of Stock') url += 'stock=0&';
      if (stockStatus === 'Low Stock') url += 'stock_lte=10&stock_gt=0&';
      if (stockStatus === 'Available') url += 'stock_gt=0&';
    }
    
    return api.get(url);
  },
  getItem: (id: string) => {
    return api.get(`/items/${id}`);
  }
};
