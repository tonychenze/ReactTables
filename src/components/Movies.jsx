import React, { Component } from "react";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import MovieTable from "./MovieTable";
import FilterMovies from "./common/filter";
import { paginate } from "../util/paginate";
// import ListGroup from "./common/listGroup";

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pageSize: 4,
      currentPage: 1,
      genres: [],
      currentSortColumn: { path: "title", order: "asc" }
    };
  }

  componentDidMount() {
    const likeMovies = getMovies().map(m => {
      m.liked = false;
      return m;
    });
    const allGenres = [{ _id: "1", name: "All" }, ...getGenres()];
    this.setState({
      genres: allGenres,
      movies: likeMovies
    });
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
    this.setState({
      currentGen: gen,
      currentPage: 1
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

  getFilteredMovies = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentSortColumn,
      currentGen
    } = this.state;

    let filteredMovies = allMovies;
    if (currentGen && currentGen._id !== "1") {
      filteredMovies = allMovies.filter(m => m.genre._id === currentGen._id);
    }

    const pagedMovies = paginate(filteredMovies, currentPage, pageSize);
    const sortedMovies = _.orderBy(
      pagedMovies,
      [currentSortColumn.path],
      [currentSortColumn.order]
    );
    return {
      sortedMovies: sortedMovies,
      filteredLength: filteredMovies.length
    };
  };

  render() {
    if (this.state.movies.length === 0) {
      return this.getEmptyList();
    }

    const {
      pageSize,
      currentPage,
      genres,
      currentSortColumn,
      currentGen
    } = this.state;
    const { sortedMovies, filteredLength: count } = this.getFilteredMovies();
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
            currentSortColumn={currentSortColumn}
            onSort={this.handleOnSort}
            onRemoveClicked={this.handleRemoveMovie}
            onLikeClicked={this.handleLike}
          />
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageItemClicked={this.handlePageClicked}
          />
        </div>
      </div>
    );
  }
}
