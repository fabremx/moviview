import React from "react";
import "./movie-viewed.scss";

class MovieViewed extends React.Component {
  render() {
    return (
      <div className="movie-viewed">
        <img src={this.props.movie.Poster} alt={this.props.movie.title} />

        <div className="movie-viewed__info">
          <span className="movie-viewed__info--title">
            {this.props.movie.Title}
          </span>

          <p>
            Année de sortie:
            <span className="movie-viewed__info--bold">
              {this.props.movie.Year}
            </span>
            <br></br>
            De:
            <span className="movie-viewed__info--bold">
              {this.props.movie.Director}
            </span>
            <br></br>
            Genre:
            <span className="movie-viewed__info--bold">
              {this.props.movie.Genre}
            </span>
            <br></br>
            Durée:
            <span className="movie-viewed__info--bold">
              {this.props.movie.Runtime}
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default MovieViewed;
