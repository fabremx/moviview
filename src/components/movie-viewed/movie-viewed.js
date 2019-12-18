import React from "react";
import editIcon from "../../shared/images/edit-icon.png";
import closeIcon from "../../shared/images/close-icon.png";
import "./movie-viewed.scss";

class MovieViewed extends React.Component {
  render() {
    return (
      <div className="movie-viewed row">
        <div className="movie-viewed__img">
          <img src={this.props.movie.Poster} alt={this.props.movie.title} />
        </div>

        <div className="movie-viewed__info">
          <div className="movie-viewed__text">
            <span className="movie-viewed__text--title">
              {this.props.movie.Title}
            </span>

            <p>
              Année de sortie:
              <span className="movie-viewed__text--bold">
                {this.props.movie.Year}
              </span>
              <br></br>
              De:
              <span className="movie-viewed__text--bold">
                {this.props.movie.Director}
              </span>
              <br></br>
              Genre:
              <span className="movie-viewed__text--bold">
                {this.props.movie.Genre}
              </span>
              <br></br>
              Durée:
              <span className="movie-viewed__text--bold">
                {this.props.movie.Runtime}
              </span>
            </p>
          </div>

          <div className="movie-viewed__rating">
            Rating
            <div className="movie-viewed__edition">
              <img src={editIcon} alt="edit icon" /> Editer la note
            </div>
          </div>
        </div>

        <img
          className="movie-viewed__close-img"
          src={closeIcon}
          alt="close icon"
        />
      </div>
    );
  }
}

export default MovieViewed;
