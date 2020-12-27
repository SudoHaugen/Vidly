export function genre_filter(genre, movies) {
  let result =
    genre && genre._id
      ? movies.filter((movie) => movie.genre.name === genre.name)
      : movies;
  return result;
}
