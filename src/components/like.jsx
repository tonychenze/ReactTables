import React, { Component } from "react";
class Like extends Component {
  render() {
    const { item } = this.props;
    if (item.like === true)
      return (
        <i
          className="fa fa-heart"
          aria-hidden="true"
          onClick={() => this.props.onLike(item)}
        />
      );
    return (
      <i
        className="fa fa-heart-o"
        aria-hidden="true"
        onClick={() => this.props.onLike(item)}
      />
    );
  }
}

export default Like;
