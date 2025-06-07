import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DetailsHeader from '../components/DetailsHeader';
import Error from '../components/Error';
import Loader from '../components/Loader';
import RelatedSongs from '../components/RelatedSongs';

import { setActiveSong, playPause } from '../store/features/playerSlice';
import { useGetSongDetails } from '../hooks/hooks.js';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {songDetails, relatedSongs, loading, error } = useGetSongDetails(songid);


  if (loading) return <Loader title="Searching song details" />;
  if (error) return <Error />;
  
  const songData = songDetails?.resources['shazam-songs'][songDetails?.data[0].id];

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song,data,i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        songData={songData}
      />

      <RelatedSongs
        data={relatedSongs}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />

    </div>
  );
};

export default SongDetails;
