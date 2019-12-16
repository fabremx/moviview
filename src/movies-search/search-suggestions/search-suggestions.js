import React from "react";
import "./search-suggestions.scss";

class SearchSuggestions extends React.Component {
  render() {
    return (
      <div className="search-suggestion">
        <img
          className="search-suggestion__img"
          src={this.props.movie.Poster}
          alt={this.props.movie.title}
        />

        <div className="search-suggestion__info">
          <span className="search-suggestion__title">
            {this.props.movie.Title}
          </span>

          <span className="search-suggestion__release">
            Année de sortie: {this.props.movie.Year}
          </span>
        </div>
      </div>
    );
  }
}

export default SearchSuggestions;
