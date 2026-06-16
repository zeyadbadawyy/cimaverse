import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const imageUrl =
    "https://image.tmdb.org/t/p/w500" +
    movie.poster_path;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-link"
    >
      <div className="movie-card">
        <img
          src={imageUrl}
          alt={movie.title}
          className="movie-poster-image"
        />

        <h3>{movie.title}</h3>

        <p>
          {movie.release_date?.slice(0, 4)}
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;