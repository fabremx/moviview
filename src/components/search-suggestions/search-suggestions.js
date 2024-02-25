import React from "react";
import "./search-suggestions.scss";
import utils from "../../shared/utils";

class SearchSuggestions extends React.Component {
  displayOriginalTitle() {
    if (
      this.props.movie.original_name.toLowerCase() ===
      this.props.movie.name.toLowerCase()
    ) {
      return;
    }

    return (
      <span className="search-suggestion__title--original-title">
        ({this.props.movie.original_name})
      </span>
    );
  }

  getYearOf(date) {
    return date ? date.split("-")[0] : null;
  }

  render() {
    return (
      <div className="search-suggestion">
        <div className="search-suggestion__img">
          <img
            src={utils.getMoviePoster(this.props.movie.poster_path)}
            alt={this.props.movie.name}
          />
        </div>

        <div className="search-suggestion__info">
          <span className="search-suggestion__title">
            {this.props.movie.name} {this.displayOriginalTitle()}
          </span>

          <span className="search-suggestion__release">
            Année de sortie: {this.getYearOf(this.props.movie.first_air_date)}
          </span>
        </div>
      </div>
    );
  }
}

export default SearchSuggestions;
