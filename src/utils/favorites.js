const KEY = "cimaverse_favorites";

export function getFavorites() {
  return JSON.parse(
    localStorage.getItem(KEY) || "[]"
  );
}

export function addFavorite(movie) {
  const favorites = getFavorites();

  const exists = favorites.find(
    (item) => item.id === movie.id
  );

  if (!exists) {
    favorites.push(movie);

    localStorage.setItem(
      KEY,
      JSON.stringify(favorites)
    );
  }
}

export function removeFavorite(id) {
  const favorites = getFavorites();

  const updated = favorites.filter(
    (movie) => movie.id !== id
  );

  localStorage.setItem(
    KEY,
    JSON.stringify(updated)
  );
}

export function isFavorite(id) {
  return getFavorites().some(
    (movie) => movie.id === id
  );
}