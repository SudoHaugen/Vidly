import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColoumn = { ...this.props.sortColoumn };

    /**
     * Check if the sorting order is reversed. If the user preses the same sorting path as previously selected it will reverse the order
     * Otherwise set sorting order to ascending by default
     */
    if (sortColoumn.path === path) {
      sortColoumn.order = sortColoumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColoumn.path = path;
      sortColoumn.order = "asc";
    }

    this.props.onSort(sortColoumn);
  };

  renderSortIcon = (column) => {
    const { sortColoumn } = this.props;
    if (column.path !== sortColoumn.path) {
      return null;
    }
    if (sortColoumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.coloumns.map((coloumn) => {
            return (
              <th
                key={coloumn.path || coloumn.key}
                className="clickable"
                onClick={() => {
                  this.raiseSort(coloumn.path);
                }}
                scope="col"
              >
                {coloumn.label} {this.renderSortIcon(coloumn)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
