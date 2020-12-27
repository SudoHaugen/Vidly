import React, { Component } from "react";
import Movie from "../movies";

class TableBody extends Component {
  render() {
    const { data, onLike, onDelete, coloumns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <Movie
            key={item._id}
            movie={item}
            onLike={onLike}
            onDelete={onDelete}
            coloumns={coloumns}
          />
        ))}
      </tbody>
    );
  }
}

export default TableBody;
