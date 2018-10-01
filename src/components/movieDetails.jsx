import React from "react";
import From from "./common/form";
import Joi from "joi-browser";
import * as movieService from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
class MovieDetails extends From {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.any(),
    title: Joi.string()
      .label("Title")
      .required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const currentId = this.props.match.params.id;
    if (currentId === "new") return;
    let currentMoive = movieService.getMovie(currentId);
    if (!currentMoive) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapMoiveToData(currentMoive) });
  }

  mapMoiveToData = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  doSubmit = () => {
    const newMovie = this.state.data;
    movieService.saveMovie(newMovie);
    const { history } = this.props;
    history.push("/movies");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieDetails;
