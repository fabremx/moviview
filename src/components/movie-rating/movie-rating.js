import React from "react";
import editIcon from "../../shared/images/edit-icon.png";
import closeIcon from "../../shared/images/close-icon.png";
import rating5Icon from "../../shared/images/rating-3.png";
import imageNotAvailable from "../../shared/images/not-available.png";
import "./movie-rating.scss";

class MovieRating extends React.Component {
  getMoviePoster(imageSource) {
    return imageSource === "N/A" ? imageNotAvailable : imageSource;
  }

  render() {
    return (
      <div className="movie-watched row">
        <div className="movie-watched__img">
          <img
            src={this.getMoviePoster(this.props.movie.Poster)}
            alt={this.props.movie.title}
          />
        </div>

        <div className="movie-watched__info">
          <div className="movie-watched__text">
            <span className="movie-watched__text--title">
              {this.props.movie.Title}
            </span>

            <p>
              Année de sortie:
              <span className="movie-watched__text--bold">
                {this.props.movie.release_date}
              </span>
              <br></br>
              De:
              <span className="movie-watched__text--bold">
                {this.props.movie.Director}
              </span>
              <br></br>
              Genre:
              <span className="movie-watched__text--bold">
                {this.props.movie.Genre}
              </span>
              <br></br>
              Durée:
              <span className="movie-watched__text--bold">
                {this.props.movie.Runtime}
              </span>
            </p>
          </div>

          <div className="movie-watched__rating">
            <span className="movie-watched__rating--title">Note:</span>
            <img src={rating5Icon} alt="perfect icon" />
            <span className="movie-watched__rating--comment">
              Bof, je me suis ennuyé..
            </span>
            <div className="movie-watched__edition">
              <img src={editIcon} alt="edit icon" /> Editer la note
            </div>
          </div>
        </div>

        <img
          className="movie-watched__close-img"
          src={closeIcon}
          alt="close icon"
        />
      </div>
    );
  }
}

export default MovieRating;
