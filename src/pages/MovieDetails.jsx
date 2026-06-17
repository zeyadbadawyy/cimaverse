import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import {
  getMovieDetails,
  getMovieVideos
} from "../services/tmdb";

import {
  addFavorite,
  removeFavorite,
  isFavorite
} from "../utils/favorites";



function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [favorite, setFavorite] =
    useState(false);

  const [movie, setMovie] =
    useState(null);

  const [trailer, setTrailer] =
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

      const videos =
        await getMovieVideos(id);

      const trailerVideo =
        videos.find(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube"
        );

      setMovie(data);
      setFavorite(isFavorite(data.id));

      if (trailerVideo) {
        setTrailer(trailerVideo.key);
      }
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
      <button
        className="close-btn"
        onClick={() => navigate(-1)}
      >
        ✕
      </button>
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
            <div>
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button
                    className="trailer-btn"
                  >
                    ▶ Watch Trailer
                  </button>
                </a>
              )}
            </div>
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