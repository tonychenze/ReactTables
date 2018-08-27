import React, { Component } from "react";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import MovieTable from "./MovieTable";
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
      currentGen: allGenres[0],
      currentSortColumn: { path: "title", order: "asc" }
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
      currentPage: 1,
      movies
    });
  };

  getEmptyList = () => {
    return <h3>No Items</h3>;
  };

  handleOnSort = currentSortColumn => {
    this.setState({
      currentSortColumn
    });
  };

  render() {
    if (this.state.movies.length === 0) {
      return this.getEmptyList();
    }

    const {
      pageSize,
      currentPage,
      movies,
      genres,
      currentSortColumn,
      currentGen
    } = this.state;

    const pagedMovies = paginate(movies, currentPage, pageSize);
    const sortedMovies = _.orderBy(
      pagedMovies,
      [currentSortColumn.path],
      [currentSortColumn.order]
    );
    return (
      <div className="row">
        <div className="col-2">
          <FilterMovies
            genres={genres}
            selectedGen={currentGen}
            onGenClick={this.handleGenClick}
          />
        </div>
        <div className="col">
          <MovieTable
            movies={sortedMovies}
            onLikeClicked={this.handleLike}
            onRemoveClicked={this.handleRemoveMovie}
            currentSortColumn={currentSortColumn}
            onSort={this.handleOnSort}
          />
          <Pagination
            itemsCount={this.state.movies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageItemClicked={this.handlePageClicked}
          />
        </div>
      </div>
    );
  }
}
