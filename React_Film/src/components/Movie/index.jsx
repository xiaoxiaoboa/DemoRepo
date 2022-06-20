import React from 'react'
import FilmDetail from '../FilmDetail'
import MoviesList from "../MoviesList"

export default function Movie() {
  return (
    <div>
      <FilmDetail />
      <div className="recommendation">
        <p className="recommendationtext">You might also like</p>
        <MoviesList />
      </div>
    </div>
  )
}
