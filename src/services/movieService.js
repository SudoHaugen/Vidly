/**@format */

const axios = require("axios").default;

export async function getMovies() {
  let movieList = await axios.get("http://localhost:3900/api/movies");

  return movieList.data;
}

export async function getMovieById(id) {
  let movie = await axios.get(`http://localhost:3900/api/movies/${id}`);

  if (movie.response === 200) {
    return movie.data;
  } else {
    return null;
  }
}

async function getMovieByName(movie) {
  let movieList = await axios.get("http://localhost:3900/api/movies");
  let searchResult = movieList.data.find((m) => {
    return m.title === movie.title;
  });

  return searchResult === undefined ? null : movie;
}

export async function saveMovie(movie) {
  const existingMovie = await getMovieByName(movie);

  if (existingMovie !== null) {
    console.log("Movie already exists in database");
    return null;
  }

  try {
    let response = await axios.post("http://localhost:3900/api/movies/", movie);
    console.log(response);
    if (response.status === 200) {
      console.log("Successfully registered movie in database");
      return movie;
    } else {
      console.log("Something went wrong...");
      return null;
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function deleteMovie(movie) {
  let response = await axios.delete(
    `http://localhost:3900/api/movies/${movie._id}`
  );

  if (response.status === 200) {
    console.log("Successfully registered movie in database");
    return getMovies();
  } else {
    console.log("Something went wrong...");
    return null;
  }
}
