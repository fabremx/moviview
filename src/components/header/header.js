import React from "react";
import SearchSuggestions from "../search-suggestions/search-suggestions";
import searchIcon from "../../shared/images/search-icon.png";
import "./header.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { moviesList: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    fetch("http://www.omdbapi.com/?apikey=ded9768&s=" + event.target.value)
      .then(res => res.json())
      .then(
        response => {
          const moviesList =
            response.Response === "True" ? response.Search : [];

          this.setState({ moviesList });
          this.props.onSearchMovie(moviesList);
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
      <div className="search-suggestions-container">
        {autocompleteSuggestions}
      </div>
    );
  }

  render() {
    return (
      <div className="header">
        <span className="header__title">Moviview</span>

        <div className="header__input">
          <input
            type="text"
            placeholder="Search a movie..."
            value={this.state.value}
            onChange={this.handleChange}
          />
          <img src={searchIcon} alt="search icon" />
        </div>
      </div>
    );
  }
}

export default Header;
