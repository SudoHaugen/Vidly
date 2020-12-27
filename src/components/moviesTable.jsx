import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  coloumns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          isLiked={movie.like}
          onClick={() => {
            this.props.onLike(movie._id);
          }}
        />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            this.props.onDelete(movie._id);
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onLike, onDelete, onSort, sortColoumn } = this.props;

    return (
      <Table
        coloumns={this.coloumns}
        data={movies}
        onLike={onLike}
        onDelete={onDelete}
        onSort={onSort}
        sortColoumn={sortColoumn}
      ></Table>
    );
  }
}

export default MoviesTable;
