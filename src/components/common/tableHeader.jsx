import React, { Component } from "react";
class TableHeader extends Component {
  raiseSort = path => {
    const currentSortHeader = { ...this.props.currentSortHeader };
    if (currentSortHeader.path === path) {
      currentSortHeader.order =
        currentSortHeader.order === "asc" ? "desc" : "asc";
    } else {
      currentSortHeader.path = path;
      currentSortHeader.order = "asc";
    }
    this.props.onSort(currentSortHeader);
  };

  render() {
    const { headers } = this.props;
    return (
      <thead className="thead-dark">
        <tr>
          {headers.map(header => (
            <th
              key={header.path || header.key}
              onClick={() => this.raiseSort(header.path)}
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
