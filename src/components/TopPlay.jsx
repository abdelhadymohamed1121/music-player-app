import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

import { playPause, setActiveSong } from '../store/features/playerSlice';

import 'swiper/css';
import TopChartCard from './TopChartCard.jsx';
import { useGetTopCharts } from '../hooks/hooks.js';

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });
  const { topCharts } = useGetTopCharts();
  

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, data, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-100 mb-6 flex-1 xl:max-w-[400px] max-w-full flex flex-col"
    >
      <div className="w-full hidden xl:flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 xl:mt-0 flex flex-col gap-1">
          {topCharts &&
            topCharts
              .slice(0, 4)
              .map((song, i) => (
                <TopChartCard
                  key={song.id}
                  song={song}
                  i={i}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  handlePauseClick={handlePauseClick}
                  handlePlayClick={() => handlePlayClick(song, topCharts, i)}
                />
              ))}
        </div>
      </div>

      <div className="w-full xl:hidden flex flex-col mt-5">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          className="mt-4"
        >
          {topCharts?.slice(0, 10).map((song) => (
            <SwiperSlide
              key={song?.id}
              style={{ width: '25%', height: 'auto', maxWidth: '150px' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link
                to={
                  song.relationships.artists.data[0]
                    ? `/artists/${song.relationships.artists.data[0].id}`
                    : ''
                }
              >
                <img
                  src={song?.attributes?.artwork?.url}
                  alt="Name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
