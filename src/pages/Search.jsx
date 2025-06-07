import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import SearchCard from '../components/searchCard';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useGetSongsBySearch } from '../hooks/hooks';

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, loading, error } = useGetSongsBySearch(searchTerm);

  if (loading) return <Loader title={`Searching ${searchTerm}...`} />;
  if (error) return <Error />;

  const songs = data?.tracks?.hits.map((song) => song.track);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Showing results for <span className="font-black">{searchTerm}</span></h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SearchCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songs}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
