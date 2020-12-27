import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
  const { coloumns, sortColoumn, onSort, data, onLike, onDelete } = props;
  return (
    <table className="table">
      <TableHeader
        coloumns={coloumns}
        sortColoumn={sortColoumn}
        onSort={onSort}
      />
      <TableBody
        data={data}
        onLike={onLike}
        onDelete={onDelete}
        coloumns={coloumns}
      />
    </table>
  );
};

export default Table;
