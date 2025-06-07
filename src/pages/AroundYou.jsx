import { useSelector } from 'react-redux';

import SongCard from '../components/SongCard';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useGetTopCharts } from '../hooks/hooks';

const CountryTracks = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { topCharts, loading, country, error } = useGetTopCharts();

  if (loading) return <Loader title="Loading Songs around you..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around you <span className="font-black">{country}</span></h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {topCharts?.map((song, i) => (
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

export default CountryTracks;
