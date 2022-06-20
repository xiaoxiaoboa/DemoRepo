import "./index.css"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import vote from "../../utils/vote_average"

export default function FilmDetail() {
  const {state: { id }} = useLocation()
  const [movieData, setMovieData] = useState({})
  const imgPath = "https://image.tmdb.org/t/p/w500/"
  useEffect(() => {
    getMovieDetail()
  }, [id])

  const getMovieDetail = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${
        import.meta.env.VITE_REACT_TMDB_KEY
      }&append_to_response=credits`
    )
    const data = await res.json()
    setMovieData(data)
  }

  return (
    <>
      <div className="introduce">
        <div className="cover">
          <img
            src={
              Object.keys(movieData).length > 0
                ? imgPath + movieData.poster_path
                : ""
            }
            alt=""
            className="coverImg"
          />
        </div>
        <div className="detail">
          <h1 className="filmname">{movieData.original_title}</h1>
          <p className="filmdesc">{movieData.tagline}</p>
          <div className="filmdetail">
            <div className="grage">
              {vote(movieData.vote_average)} {movieData.vote_average}
            </div>
            <p className="releasetime">
              {movieData.runtime}min / {movieData.release_date} /{" "}
              {movieData.spoken_languages
                ? movieData.spoken_languages[0].name
                : ""}
            </p>
          </div>
          <div className="filmtype">
            {movieData.genres?.map(obj => (
              <div className="filmtypeItem" key={obj.id}>
                <img
                  src="/images/action.png"
                  alt=""
                  className="filmtypeItemImg"
                />
                <p>{obj.name}</p>
              </div>
            ))}
          </div>
          <div className="overview">
            <h3>OverView</h3>
            {movieData.overview}
          </div>
          <div className="topcast">
            <h3>Top Cast</h3>
            <div className="casts">
              {movieData.credits?.cast
                ?.filter(obj => movieData.credits.cast?.indexOf(obj) < 6)
                .map(obj => (
                  <div className="cast" key={obj.id}>
                    <img
                      src={imgPath + `${obj.profile_path}`}
                      alt=""
                      className="castImg"
                    />
                    <span>{obj.name}</span>
                    <span>{obj.character} </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
