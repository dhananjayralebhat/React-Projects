import React from 'react'
import MovieCard from './MovieCard'
import {useEffect} from 'react'
import axios from 'axios'
import {useState} from 'react'
import Pagination from './pagination'


function Movies(handleAddToWatchlist, handleRemoveFromWatchlist, watchlist) {

    const [movies, setMovies] = useState([])
    const [pageNo, setPageNo] = useState(1)

    const handlePrev = ()=>{
        if(pageNo===1){
            setPageNo(pageNo)
        }else{
            setPageNo(pageNo-1)
        }
    }

    const handleForw = ()=>{
        setPageNo(pageNo+1)
    }

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=c0718dd0199e8cf7fdc8ec876df064dd&language=en-US&page=${pageNo}`).then(function(res){setMovies(res.data.results)})
    },[pageNo])
  return (
    <div>
      <div className='text-2xl m-5 font-bold text-center'>
        Trending Movies
      </div>

      <div className='flex-flex-row flex-wrap justify-around gap-8'>
       
       {movies.map((movieObj)=>{
        return <MovieCard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddToWatchlist={handleAddToWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} watchList={watchlist}/>
       })}

      </div>
      <Pagination pageNo={pageNo} handleForw={handleForw} handlePrev={handlePrev}/>
    </div>

  )
}

export default Movies

//'https://api.themoviedb.org/3/tv/popular?api_key=c0718dd0199e8cf7fdc8ec876df064dd&language=en-US&page=1'