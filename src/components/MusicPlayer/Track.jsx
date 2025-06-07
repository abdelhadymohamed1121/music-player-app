import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => {
  let activeSongName = '';
  if (activeSong) {
    if(activeSong?.title){
      activeSongName = activeSong?.title;
    }else{
      activeSongName = activeSong?.attributes?.name;
    }
  }
  
  let activeSongAlbumName = '';
  if (activeSong) {
    if(activeSong?.subtitle){
      activeSongAlbumName = activeSong?.subtitle;
    }else{
      activeSongAlbumName = activeSong?.attributes?.albumName;
    }
  }

  return (
    <div className="flex-1 flex items-center justify-start">
      <div
        className={`${
          isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <img
          src={activeSong?.attributes?.artwork?.url.replace('{w}', '100').replace('{h}', '100')
            || activeSong?.images?.coverart
          }
          alt="cover art"
          className="rounded-full"
        />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">
          {activeSongName ? activeSongName : 'No active Song'}
        </p>
        <p className="truncate text-gray-300">
          {activeSongAlbumName ? activeSongAlbumName : 'No active Song'}
        </p>
      </div>
    </div>
  );
};
export default Track;
