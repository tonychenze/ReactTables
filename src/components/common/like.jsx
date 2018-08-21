import React, { Component } from "react";
class Like extends Component {
  //input liked -bool
  //output event
  render() {
    let heartClass = "fa fa-heart";
    if (!this.props.liked) heartClass += "-o";
    return (
      <i
        className={heartClass}
        aria-hidden="true"
        onClick={this.props.onLike}
        style={{ cursor: "pointer" }}
      />
    );
  }
  //render() {
  //     const { item } = this.props;
  //     if (item.like === true)
  //       return (
  //         <i
  //           className="fa fa-heart"
  //           aria-hidden="true"
  //           onClick={() => this.props.onLike(item)}
  //         />
  //       );
  //     return (
  //       <i
  //         className="fa fa-heart-o"
  //         aria-hidden="true"
  //         onClick={() => this.props.onLike(item)}
  //       />
  //     );
  //   }
}

export default Like;
