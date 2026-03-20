const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const fetcher = async (url: string) => {
  const res = await fetch(`${BASE_URL}${url}`);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  return res.json();
};

export const api = {
  get: (url: string) => fetcher(url),
  post: async (url: string, data: any) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
