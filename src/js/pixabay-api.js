import axios from 'axios';

const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY || '';
const PER_PAGE = 15;

const api = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: PIXABAY_API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
  },
});

function ensureApiKey() {
  if (!PIXABAY_API_KEY) {
    throw new Error('Missing VITE_PIXABAY_API_KEY environment variable');
  }
}

export async function getImagesByQuery(query, page = 1) {
  ensureApiKey();

  const response = await api.get('', {
    params: {
      q: query,
      page,
    },
  });

  return response.data;
}

export { PER_PAGE };
