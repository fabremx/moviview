import React from "react";
import editIcon from "../../shared/images/edit-icon.png";
import closeIcon from "../../shared/images/close-icon.png";
import rating5Icon from "../../shared/images/rating-3.png";
import "./movie-rating.scss";
import utils from "../../shared/utils";
import { deleteWatchedMovieAction } from "../../actions/watched-movies-actions";
import { connect } from "react-redux";

class MovieRating extends React.Component {
  deleteWatchedMovie = () => {
    this.props.deleteWatchedMovieAction(this.props.movie.imdbId);
  };

  render() {
    return (
      <div className="movie-watched row">
        <div className="movie-watched__img">
          <img
            src={utils.getMoviePoster(this.props.movie.posterSrc)}
            alt={this.props.movie.title}
          />
        </div>

        <div className="movie-watched__info">
          <div className="details-header">
            <div className="details-header__title">
              {this.props.movie.title}

              <span className="details-header__title--year">
                ({this.props.movie.releaseYear})
              </span>
            </div>

            <div className="details-header__director">
              De {this.props.movie.director}
            </div>
          </div>

          <div className="movie-watched__rating">
            <img src={rating5Icon} alt="perfect icon" />

            <span className="movie-watched__rating--comment">
              Bof, je me suis ennuyé..
            </span>
          </div>
        </div>

        <img
          className="movie-watched__close-img"
          src={closeIcon}
          alt="close icon"
          onClick={this.deleteWatchedMovie}
        />

        <div className="movie-watched__edition">
          <img src={editIcon} alt="edit icon" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  deleteWatchedMovieAction: movieToDeleteId =>
    dispatch(deleteWatchedMovieAction(movieToDeleteId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieRating);
