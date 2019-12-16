import React from "react";
import SearchSuggestions from "./search-suggestions/search-suggestions";
import "./movies-search.scss";

class MoviesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { moviesList: [], searchValue: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value });

    fetch("http://www.omdbapi.com/?apikey=ded9768&s=" + event.target.value)
      .then(res => res.json())
      .then(
        response => {
          const moviesList =
            response.Response === "True" ? response.Search : [];

          this.setState({ moviesList });
        },
        error => {
          console.log(error);
        }
      );
  }

  getSearchAutocompleteBlock() {
    if (!this.state.moviesList.length) {
      return;
    }

    const autocompleteSuggestions = this.state.moviesList.map(movie => (
      <SearchSuggestions movie={movie} key={movie.imdbID} />
    ));

    return (
      <div className="movie-search__autocomplete-suggestions">
        {autocompleteSuggestions}
      </div>
    );
  }

  render() {
    return (
      <div className="movie-search-container">
        <input
          type="text"
          placeholder="Search a movie..."
          value={this.state.value}
          onChange={this.handleChange}
        />

        {this.getSearchAutocompleteBlock()}
      </div>
    );
  }
}

export default MoviesSearch;
