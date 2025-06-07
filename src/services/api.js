import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
    'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
  },
});

export const getTopCharts = async (countryCode = 'DZ') => {
  const response = await api.get(
    'https://shazam-core.p.rapidapi.com/v1/charts/world',
    {
      params: { country_code: countryCode },
    }
  );
  return response.data;
};

export const getSongsByGenre = async (genre, countryCode = 'DZ') => {
  const response = await api.get(
    `https://shazam-core.p.rapidapi.com/v1/charts/genre-world`,
    {
      params: { country_code: countryCode, genre_code: genre },
    }
  );
  return response.data;
};

export const getSongDetails = async (songId) => {
  const response = await api.get(
    `https://shazam-core.p.rapidapi.com/v2/tracks/details`,
    {
      params: { track_id: songId },
    }
  );
  return response.data;
};

export const getRelatedSongs = async (songId) => {
  const response = await api.get(
    `https://shazam-core.p.rapidapi.com/v1/tracks/related`,
    {
      params: { track_id: songId },
    }
  );
  return response.data;
};

export const getArtistDetails = async (artistId) => {
  const response = await api.get(
    `https://shazam-core.p.rapidapi.com/v2/artists/details`,
    {
      params: { artist_id: artistId },
    }
  );
  return response.data;
};

export const getSongsBySearch = async (searchTerm) => {
  console.log(searchTerm);
  const response = await api.get(
    `https://shazam-core.p.rapidapi.com/v1/search/multi`,
    {
      params: {
        offset: '0',
        search_type: 'SONGS_ARTISTS',
        query: searchTerm,
      },
    }
  );
  return response.data;
};

export const getCountryCode = async () => {
  const response = await axios.get('https://api.ipgeolocation.io/v2/ipgeo', {
    params: {
      apiKey: import.meta.env.VITE_GEOLOCATION_API_KEY,
    },
  });
  return response.data;
};
