import { api } from './api';

export interface SearchParams {
  q?: string;
  location?: string;
  category?: string;
}

export const searchService = {
  searchItems: ({ q, location, category }: SearchParams) => {
    let url = '/items?';
    if (q) url += `q=${q}&`;
    if (location) url += `location_like=${location}&`;
    if (category) url += `category=${category}&`;
    return api.get(url);
  },
  getItem: (id: string) => {
    return api.get(`/items/${id}`);
  }
};
