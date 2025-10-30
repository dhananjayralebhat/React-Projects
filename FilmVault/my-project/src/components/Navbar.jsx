import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-4'>
      <FontAwesomeIcon className='w-[50px]' icon={faFilm} />

      <Link to='/' className='text-blue-500 text-3xl font-bold'>Movies</Link>

      <Link to='/WatchList' className='text-blue-500 text-3xl font-bold'>Watchlist</Link>
    </div>
  )
}

export default Navbar
