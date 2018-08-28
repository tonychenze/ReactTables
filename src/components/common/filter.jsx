import React, { Component } from "react";
class FilterMovies extends Component {
  state = {};
  render() {
    const { genres, selectedGen } = this.props;
    return (
      <ul className="list-group">
        {genres.map(gen => (
          <li
            className={
              gen === selectedGen ? "list-group-item active" : "list-group-item"
            }
            key={gen._id}
            onClick={() => this.props.onGenClick(gen)}
          >
            {gen.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default FilterMovies;
