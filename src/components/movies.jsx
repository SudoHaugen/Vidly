import React, { Component } from "react";
import "../fakeGenreService";
import _ from "lodash";

class Movie extends Component {
  renderCell = (item, coloumn) => {
    if (coloumn.content) return coloumn.content(item);

    return _.get(item, coloumn.path);
  };

  createKey = (item, coloumn) => {
    return item._id + (coloumn.path || coloumn.key);
  };

  render() {
    let { coloumns, movie } = this.props;

    return (
      <tr key={movie._id}>
        {coloumns.map((coloumn) => (
          <td key={this.createKey(movie, coloumn)}>
            {this.renderCell(movie, coloumn)}
          </td>
        ))}
      </tr>
    );
  }
}

export default Movie;
