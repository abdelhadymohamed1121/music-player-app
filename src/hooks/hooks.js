import { useState, useEffect } from 'react';
import {
  getTopCharts,
  getSongsByGenre,
  getSongsBySearch,
  getArtistDetails,
  getRelatedSongs,
  getSongDetails,
  getCountryCode,
} from '../services/api';

export const useGetTopCharts = () => {
  const [loading, setLoading] = useState(true);
  const [topCharts, setTopCharts] = useState([]);
  const [country, setCountry] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contryCode = await getCountryCode();
        setCountry(contryCode.location.country_code2);
        const data = await getTopCharts();
        setTopCharts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, []);
  return { loading, topCharts, country, error };
};

export const useGetSongsByGenre = (genre) => {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSongsByGenre(genre);
        setSongs(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, [genre]);

  return { loading, songs, error };
};

export const useGetSongsBySearch = (searchTerm) => {
  const [loading, setLoading] = useState(true);
  const [data, setSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSongsBySearch(searchTerm);
        setSongs(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    fetchData();
  }, [searchTerm]);

  return { loading, data, error };
};

export const useGetArtistDetails = (artist_id) => {
  const [loading, setLoading] = useState(true);
  const [artistData, setArtistData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArtistDetails(artist_id);
        setArtistData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, [artist_id]);

  return { loading, artistData, error };
};

export const useGetSongDetails = (song_id) => {
  const [loading, setLoading] = useState(true);
  const [songDetails, setSongDetails] = useState([]);
  const [relatedSongs, setRelatedSongs] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSongDetails(song_id);
        setSongDetails(data);
        const relatedData = await getRelatedSongs(data.data[0].id);
        setRelatedSongs(relatedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [song_id]);

  return { loading, songDetails, relatedSongs, error };
};
