import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const TableSortable = props => {
  const { columns, rows, onSort, currentSortColumn } = props;
  return (
    <table className="table">
      <TableHeader
        headers={columns}
        currentSortColumn={currentSortColumn}
        onSort={onSort}
      />
      <TableBody rows={rows} columns={columns} />
    </table>
  );
};

export default TableSortable;
