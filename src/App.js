import React, { Component } from "react";
import "./App.css";
import { getGenres } from "./fakeGenreService";
import { getMovies } from "./fakeMovieService";
import NavBar from "./components/navbar";
import Pagination from "./components/common/pagination";
import { paginate } from "./utils/paginate";
import Filter from "./components/common/filter";
import { genre_filter } from "./utils/filterGenre";
import MoviesTable from "./components/moviesTable";
import _ from "lodash";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      currentPage: 1,
      pageSize: 3,
      activeGenre: null,
      sortColoumn: { path: "title", order: "asc" },
    };
  }

  handleSort = (sortColoumn) => {
    this.setState({ sortColoumn });
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All genres" }, ...getGenres()];

    this.setState({
      movies: this.makeMovieObjects(),
      genres,
      activeGenre: genres[0],
    });
  }

  handleLikeEvent = (_id) => {
    const movies = [...this.state.movies];

    movies.forEach((movie) => {
      if (movie._id === _id) {
        movie.like = !movie.like;
      }
    });
    this.setState({ movies });
  };

  handleDelete = (movieId) => {
    const movies = this.state.movies.filter((c) => c._id !== movieId);
    this.setState({ movies: movies });
  };

  makeMovieObjects = () => {
    let movie_list = [];

    getMovies().forEach((movie) => {
      movie_list.push({ ...movie, like: false });
    });
    return movie_list;
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreFilter = (genre) => {
    this.setState({ activeGenre: genre, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allmovies,
      activeGenre,
      sortColoumn,
    } = this.state;

    let filtered =
      activeGenre === null ? allmovies : genre_filter(activeGenre, allmovies);

    const sorted = _.orderBy(filtered, [sortColoumn.path], [sortColoumn.order]);

    let movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      currentPage,
      pageSize,
      genres,
      activeGenre,
      sortColoumn,
    } = this.state;
    const { totalCount, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <NavBar total={totalCount} />
        <div className="row">
          <div
            className="col-md-1"
            style={{ marginTop: "40px", marginLeft: "90px" }}
          >
            <Filter
              genres={genres}
              genreFilter={this.handleGenreFilter}
              selectedItem={activeGenre}
            />
          </div>
          <div className="col-md-6">
            <MoviesTable
              movies={movies}
              sortColoumn={sortColoumn}
              onLike={this.handleLikeEvent}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
