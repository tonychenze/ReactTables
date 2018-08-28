import React from "react";
const ListGroup = props => {
  const { items, nameProperty, idProperty, selectedItem, onItemClick } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          key={item[idProperty]}
          onClick={() => onItemClick(item)}
        >
          {item[nameProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  nameProperty: "name",
  idProperty: "_id"
};
export default ListGroup;
