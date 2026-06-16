function GenreFilter({
  genres,
  selectedGenre,
  onSelectGenre
}) {
  return (
    <div className="genre-filter">
      <button
        className={
          selectedGenre === null
            ? "active"
            : ""
        }
        onClick={() =>
          onSelectGenre(null)
        }
      >
        All
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          className={
            selectedGenre === genre.id
              ? "active"
              : ""
          }
          onClick={() =>
            onSelectGenre(genre.id)
          }
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;