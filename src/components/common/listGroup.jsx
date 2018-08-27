import React from "react";

const ListGroup = props => {
  const { items, nameProperty, idProperty } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li className="list-item" key={item[idProperty]}>
          {item[nameProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
