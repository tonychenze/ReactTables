import React, { Component } from "react";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import FilterMovies from "./common/filter";
import { paginate } from "../util/paginate";
export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.likeMovies = getMovies().map(m => {
      m.liked = false;
      return m;
    });
    let allGenres = [{ _id: "1", name: "All" }, ...getGenres()];
    this.state = {
      movies: this.likeMovies,
      pageSize: 4,
      currentPage: 1,
      genres: allGenres,
      currentGen: allGenres[0]
    };
  }

  handleRemoveMovie = movieID => {
    const newList = this.state.movies.filter(movie => movie._id !== movieID);
    this.setState({
      movies: newList
    });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  handlePageClicked = id => {
    this.setState({
      currentPage: id
    });
  };

  handleGenClick = gen => {
    let movies = this.likeMovies;
    if (gen._id !== "1") {
      movies = movies.filter(m => m.genre._id === gen._id);
    }

    this.setState({
      currentGen: gen,
      movies
    });
  };

  getTableHeader = () => {
    const headers = ["Title", "Genre", "Stock", "Rate", "Like", " "];
    return (
      <thead className="thead-dark">
        <tr>
          {headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
    );
  };

  getEmptyList = () => {
    return <h3>No Items</h3>;
  };

  getNonEmptyTable = () => {
    const { pageSize, currentPage, movies, genres, currentGen } = this.state;
    const pagedMovies = paginate(movies, currentPage, pageSize);
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <FilterMovies
              genres={genres}
              selectedGen={currentGen}
              onGenClick={this.handleGenClick}
            />
          </div>
          <div className="col">
            <table className="table">
              {this.getTableHeader()}
              <tbody>
                {pagedMovies.map(movie => (
                  <tr key={movie.title}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={movie.liked}
                        onLike={() => this.handleLike(movie)}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.handleRemoveMovie(movie._id)}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={this.state.movies.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageItemClicked={this.handlePageClicked}
            />
          </div>
        </div>
      </React.Fragment>
    );
  };

  getContents = () => {
    return this.state.movies.length === 0
      ? this.getEmptyList()
      : this.getNonEmptyTable();
  };

  render() {
    return <div>{this.getContents()}</div>;
  }
}
