import { genres } from '../assets/constants';
import Loader from '../components/Loader.jsx';
import Error from '../components/Error.jsx';
import SongCard from '../components/SongCard.jsx';
import { useGetSongsByGenre } from '../hooks/hooks.js';
import { useSelector, useDispatch } from 'react-redux';
import { selectGenreListId } from '../store/features/playerSlice';

const Discover = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { genreListId } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const { loading, songs, error } = useGetSongsByGenre(genreListId || 'POP');

  if (loading) return <Loader title="Loading songs..." />;
  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;;
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 pb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs &&songs.slice(0, 50).map((song, i) => (
          <SongCard
            key={song.id}
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

export default Discover;
