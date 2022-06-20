import "./index.css"
import vote from "../../utils/vote_average"
import { useNavigate } from "react-router-dom"

export default function MoviesList({ moviesList }) {
  const imgPath = "https://image.tmdb.org/t/p/w500/"
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate("/filmdetail",{
      state:{id}
    })
  }

  return (
    <div className="movies">
      {moviesList?.map(movie => (
        <div className="movieItem" key={movie.id}>
          <img
            src={imgPath + movie.poster_path}
            alt=""
            className="movieImg"
            onClick={() => handleClick(movie.id)}
          />
          <h3 className="movieName">{movie.original_title}</h3>
          <span className="movieStar">{vote(movie.vote_average)}</span>
        </div>
      ))}
    </div>
  )
}
