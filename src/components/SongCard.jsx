import PlayPause from './PlayPause';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../store/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  let activeSongName = '';
  if (activeSong) {
    activeSongName = activeSong?.attributes?.name || activeSong?.title;
  }
  let songName = '';
  if(song?.title){
    songName = song?.title;
  }else{
    songName = song?.attributes?.name;
  }


  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center group-hover:flex ${
            activeSongName === songName
              ? 'flex bg-black opacity-70'
              : 'flex md:hidden'
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt="song_img"
          src={song.attributes.artwork.url}
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`songs/${song.id}`}>{song.attributes.name}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.relationships.artists.data[0]
                ? `/artists/${song.relationships.artists.data[0].id}`
                : '/'
            }
          >
            {song?.attributes.artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
