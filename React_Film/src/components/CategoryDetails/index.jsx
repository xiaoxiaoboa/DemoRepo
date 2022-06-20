import { useEffect, useState } from "react"
import MoviesList from "../MoviesList"
import "./index.css"

export default function CategoryDetails() {
  const [moviesList, setMoviesList] = useState({})
  const imgPath = "https://image.tmdb.org/t/p/w500/"
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_REACT_TMDB_KEY
      }`
    )
    const data = await res.json()
    console.log(data)
    setMoviesList(data)
  }

  return (
    <div className="categorydetails">
      <div className="covertop">
        <img
          src={moviesList.results ? imgPath + moviesList.results[0].backdrop_path : ''}
          alt=""
          className="covertopImg"
        />
        <div className="coverdesc">
          <div className="coverdesctext">
            <h1>
              {Object.keys(moviesList).length < 1
                ? ""
                : moviesList.results[0].original_title}
            </h1>
            <p>
              {Object.keys(moviesList).length < 1
                ? ""
                : moviesList.results[0].overview}
            </p>
          </div>
        </div>
      </div>
      <MoviesList moviesList={moviesList.results} />
    </div>
  )
}
