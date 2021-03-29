/**@format */

import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import config from "../config.json";
import httpService from "../services/httpService";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";
import authService from "../services/authService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 3,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null,
  };

  async componentDidMount() {
    const genres = [
      { _id: "", name: "All Genres" },
      await httpService.get(config.genresAPI),
    ];

    const movies = await httpService.get(config.moviesAPI).then((response) => {
      return response.data;
    });

    this.setState({ movies, genres: genres[1].data });
  }

  handleDelete = async (movie) => {
    try {
      await httpService.delete(config.moviesAPI + `/${movie._id}`);

      let movies = await httpService.get(config.moviesAPI);

      this.setState({ movies: movies.data });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  };

  /**
   *
   * @param movie
   * Event handler for like button
   * Finds the movie that has been liked and changes its state
   * Adds state: {liked} to movie
   */
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  /**
   * Finds movies to be displayed on each page of the movie search
   * Checks for input in search box
   */
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    /*Handles search inputs from search box or genre selection
     * Filtering movies based on title or genre and returns result
     */
    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    //Sorting the results based on users input (e.g. desc, asc, liked movies...)
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    //When search result is found pageSize will determin how many results per page will be displayed
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="content">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            {authService.getCurrentUser() && (
              <Link to={"/movies/new"}>
                <button type="button" className="btn btn-primary btn-sm">
                  New movie
                </button>
              </Link>
            )}
            <p>Showing {`${movies.length}`} movies in the database</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
