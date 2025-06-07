import React from 'react';
import { useSelector } from 'react-redux';

import SongCard from '../components/SongCard.jsx';
import Loader from '../components/Loader.jsx';
import Error from '../components/Error.jsx';
import { useGetTopCharts } from '../hooks/hooks.js';

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { topCharts, loading, error } = useGetTopCharts();

  if (loading) return <Loader title="Loading Top Charts" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {topCharts.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={topCharts}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
