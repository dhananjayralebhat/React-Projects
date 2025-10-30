import React from 'react';

function MovieCard({
  movieObj,
  posterPath,
  name,
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
  watchlist = [],
}) {
  // Check if movie is already in the watchlist
  const doesContain = (movie) => {
    return watchlist.some(item => item.id === movie.id);
  };

  return (
    <div
      className="h-[40vh] w-[200vh] bg-center bg-cover overflow-hidden flex flex-col justify-center items-end"
      style ={{
        backgroundImage: `url(https://api.themoviedb.org/3/tv/popular?api_key=c0718dd0199e8cf7fdc8ec876df064dd&language=en-US&page=1)`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemoveFromWatchlist(movieObj)}
          className="m-4 flex justify-center items-center h-8 w-8 rounded-lg bg-gray-900/60 text-white"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => handleAddToWatchlist(movieObj)}
          className="m-4 flex justify-center items-center h-8 w-8 rounded-lg bg-gray-900/60 text-white"
        >
          &#128525;
        </div>
      )}

      <div className="text-white text-xl w-full p-2 text-center bg-gray-900/60">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
