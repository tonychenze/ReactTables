import React, { Component } from "react";

class MovieDetails extends Component {
  handleSave = () => {
    const { history } = this.props;
    history.push("/movies");
  };
  render() {
    const { match } = this.props;
    return (
      <div>
        <h1>movie {match.params.id}</h1>
        <button onClick={this.handleSave} className="btn btn-primary">
          Save
        </button>
      </div>
    );
  }
}

export default MovieDetails;
