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

  const [favorite, setFavorite] =
    useState(false);

  const [movie, setMovie] =
    useState(null);

  function toggleFavorite() {
    if (favorite) {
      removeFavorite(movie.id);
      setFavorite(false);
    } else {
      addFavorite(movie);
      setFavorite(true);
    }
  }
  
  useEffect(() => {
    async function loadMovie() {
      const data =
        await getMovieDetails(id);

      setMovie(data);
      setFavorite(isFavorite(data.id));
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

            <button
              className="favorite-btn"
              onClick={toggleFavorite}
            >
              {favorite
                ? "❤️ Remove Favorite"
                : "🤍 Add Favorite"}
            </button>
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