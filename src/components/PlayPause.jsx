import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) => {
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

  return isPlaying && activeSongName === songName ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  );
};

export default PlayPause;
