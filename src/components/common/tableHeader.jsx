import React, { Component } from "react";
class TableHeader extends Component {
  raiseSort = path => {
    const currentSortColumn = { ...this.props.currentSortColumn };
    if (!path) return;
    if (currentSortColumn.path === path) {
      currentSortColumn.order =
        currentSortColumn.order === "asc" ? "desc" : "asc";
    } else {
      currentSortColumn.path = path;
      currentSortColumn.order = "asc";
    }
    this.props.onSort(currentSortColumn);
  };

  renderOrderIcon = column => {
    const { currentSortColumn } = this.props;
    if (currentSortColumn.path !== column.path || !column.path) return null;
    if (currentSortColumn.order === "asc")
      return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  render() {
    const { headers } = this.props;
    return (
      <thead className="thead-dark">
        <tr>
          {headers.map(header => (
            <th
              className="clickable"
              key={header.path || header.key}
              onClick={() => this.raiseSort(header.path)}
            >
              {header.label}
              {this.renderOrderIcon(header)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
