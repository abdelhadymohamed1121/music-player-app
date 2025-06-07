import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import DetailsHeader from '../components/DetailsHeader';
import Error from '../components/Error';
import Loader from '../components/Loader';
import RelatedSongs from '../components/RelatedSongs';
import { setActiveSong, playPause } from '../store/features/playerSlice';
import { useGetArtistDetails } from '../hooks/hooks.js';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { artistData, loading, error } = useGetArtistDetails(artistId);

  if (loading) return <Loader title="Loading artist details..." />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, data, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData?.data[0]} />

      <RelatedSongs
        data={artistData?.data[0].views['top-songs']?.data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;
