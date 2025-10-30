import React, { useEffect, useState } from 'react';
import genreids from '../utility/genre';

function Watchlist({ watchlist, setWatchList, handleRemoveFromWatchlist }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(['All Genres']);
  const [currGenre, setCurrGenre] = useState('All Genres'); // fixed casing

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (genre) => {  // added genre parameter
    setCurrGenre(genre);
  };

  const sortIncreasing = () => {
    let sortedIncreasing = [...watchlist].sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList(sortedIncreasing);
  };

  const sortDecreasing = () => {
    let sortedDecreasing = [...watchlist].sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList(sortedDecreasing);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = [...new Set(temp)];  // Use capital S for Set and spread to array
    setGenreList(['All Genres', ...temp]);
  }, [watchlist]);

  return (
    <>
      <div className='flex justify-center flex-wrap m-4'>
        {genreList.map((genre) => {
          return (
            <div
              key={genre}
              onClick={() => handleFilter(genre)}
              className={
                currGenre === genre
                  ? "flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold mx-4 cursor-pointer"
                  : "flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4 cursor-pointer"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      <div className='flex justify-center my-4'>
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder='Search Movies' // fixed typo
          className='h-[3rem] w-[18rem] bg-gray-200 outline-none px-4'
        />
      </div>

      <div className='overflow-hidden rounded-lg border border-gray-200 m-8'>
        <table className='w-full text-gray-500 text-center'>
          <thead className='border-b-2'>
            <tr>
              <th>Name</th>
              <th className='flex justify-center'>
                <div onClick={sortIncreasing} className='p-2 cursor-pointer'>
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div className='p-2'>Ratings</div>
                <div onClick={sortDecreasing} className='p-2 cursor-pointer'>
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {watchlist
              .filter((movieObj) => {
                if (currGenre === 'All Genres') {
                  return true;
                } else {
                  return genreids[movieObj.genre_ids[0]] === currGenre;
                }
              })
              .filter((movieObj) => {
                return movieObj.title.toLowerCase().includes(search.toLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr key={movieObj.id} className='border-b-2'>
                    <td className='flex items-center px-6 py-4'>
                      <img
                        className='h-[6rem] w-[10rem]'
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`} // fixed property name
                        alt={movieObj.title}
                      />
                      <div className='mx-10'>{movieObj.title}</div>
                    </td>

                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>

                    <td
                      onClick={() => handleRemoveFromWatchlist(movieObj)}
                      className='text-red-800 cursor-pointer'
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
