import React, { Component } from "react";
import _ from "lodash";
class TableBody extends Component {
  getCellKey = (item, column) => {
    return column.path ? item._id + column.path : item._id + column.key;
  };

  renderCell = (item, column) => {
    const cellKey = this.getCellKey(item, column);
    if (column.content) return <td key={cellKey}>{column.content(item)}</td>;
    return <td key={cellKey}>{_.get(item, column.path)}</td>;
  };

  render() {
    const { rows, columns } = this.props;
    return (
      <tbody>
        {rows.map(item => (
          <tr key={item._id}>
            {columns.map(column => this.renderCell(item, column))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
