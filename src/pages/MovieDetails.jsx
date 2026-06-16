import {
  useParams
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import {
  getMovieDetails
} from "../services/tmdb";

import {
  addFavorite,
  removeFavorite,
  isFavorite
} from "../utils/favorites";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] =
    useState(null);

  useEffect(() => {
    async function loadMovie() {
      const data =
        await getMovieDetails(id);

      setMovie(data);
    }

    loadMovie();
  }, [id]);

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  const backdrop =
    "https://image.tmdb.org/t/p/original" +
    movie.backdrop_path;

  const poster =
    "https://image.tmdb.org/t/p/w500" +
    movie.poster_path;

  return (
    <div>
      <div
        className="details-hero"
        style={{
          backgroundImage:
            `url(${backdrop})`
        }}
      >
        <div className="overlay">
          <img
            src={poster}
            alt={movie.title}
            className="details-poster"
          />

          <div>
            <h1>{movie.title}</h1>

            <p>
              ⭐ {movie.vote_average}
            </p>

            <p>
              📅 {movie.release_date}
            </p>

            <p>
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;