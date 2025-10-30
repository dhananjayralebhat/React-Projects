import { useEffect, useState } from "react"
import './App.css'
import Banner from './components/Banner'
import movies from "./components/movies"
import Navbar from "./components/Navbar"
import Watchlist from "./components/watchlist"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Movies from "./components/movies"

function App() {
  let [watchlist, setWatchList] = useState([])

  //function to add in watchlist

  let handleAddToWatchlist = (movieObj) => {
    let newWatchList = [...watchlist, movieObj]
    localStorage.setItems('moviesApp', JSON.stringify(newWatchList))
    setWatchList(newWatchList)
    console.log(newWatchList)
  }


  let handleRemoveFromWatchlist = (movieObj) => {
    let filteredWatchList = watchlist.filter((movie) => {
      return movie.id != movieObj.id
    })

    setWatchList(filteredWatchlist)
    localStorage.setItem('moviesApp', JSON.stringify(filteredWatchList))
    console.log(filteredWatchList)
  }

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem('moviesApp')
    if (!moviesFromLocalStorage) {
      return
    }
    setWatchList(JSON.parse(moviesFromLocalStorage))
  }, [])

  return (
    <>
      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route path='/' element={<> <Banner /> <Movies watchlist={watchlist} handleAddToWatchlist={handleAddToWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} /> </>} />

          <Route path='/Watchlist' element={<Watchlist eatchlist={watchlist} setWatchList={setWatchList} handleRemoveFromWatchlist={handleRemoveFromWatchlist} />} />

        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App