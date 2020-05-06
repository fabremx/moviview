import React from "react";
import closeIcon from "../../shared/images/close-icon.png";
import fullStarIcon from "../../shared/images/full-star-icon.png";
import emptyStarIcon from "../../shared/images/empty-star-icon.png";
import "./movie-rating.scss";
import utils from "../../shared/utils";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MOVIE_DETAILS_ROUTE } from "../../shared/constants/routes";
import {
  MAX_USER_RATING,
  SNACKBAR_SUCCESS_TYPE,
} from "../../shared/constants/variables";
import {
  DISPLAY_SNACKBAR,
  SET_ON_GOING_ACTION,
  DELETE_WATCHED_MOVIE,
  SAVE_WATCHED_MOVIES_ON_LOCAL_STORAGE,
} from "../../redux/actions";

class MovieRating extends React.Component {
  deleteWatchedMovie = (event) => {
    event.stopPropagation();
    event.preventDefault();

    this.props.setOnGoingAction({
      type: "DELETE",
      list: "watched-movies",
      movieId: this.props.movie.imdbId,
      callback: this.props.deleteWatchedMovieAction,
    });

    this.props.onToggleDeleteModal();
  };

  displayMovieRatingStars(userRating) {
    const fullStarArray = Array(userRating)
      .fill(null)
      .map((_, i) => (
        <img
          src={fullStarIcon}
          alt="star icon"
          key={"full-star-" + i}
          className="full-star-icon"
        />
      ));

    const emptyStarArray = Array(MAX_USER_RATING - userRating)
      .fill(null)
      .map((_, i) => (
        <img
          src={emptyStarIcon}
          alt="star icon"
          key={"empty-star-" + i}
          className="empty-star-icon"
        />
      ));

    return [...fullStarArray, ...emptyStarArray];
  }

  render() {
    return (
      <Link
        to={{
          pathname: MOVIE_DETAILS_ROUTE + "/" + this.props.movie.imdbId,
          movie: this.props.movie,
        }}
      >
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
              <div className="movie-watched__stars">
                {this.displayMovieRatingStars(this.props.movie.userRating)}
              </div>

              <span className="movie-watched__rating--comment">
                {utils.displayRatingComment(this.props.movie.userRating)}
              </span>
            </div>
          </div>

          <div
            className="movie-watched__close"
            onClick={this.deleteWatchedMovie}
          >
            <img src={closeIcon} alt="close icon" />
          </div>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteWatchedMovieAction: (movieToDeleteId) => {
    dispatch({
      type: DELETE_WATCHED_MOVIE,
      payload: movieToDeleteId,
    });
    dispatch({
      type: SAVE_WATCHED_MOVIES_ON_LOCAL_STORAGE,
      payload: null,
    });
    dispatch({
      type: DISPLAY_SNACKBAR,
      payload: {
        message: "Film supprimé avec succès.",
        type: SNACKBAR_SUCCESS_TYPE,
      },
    });
  },
  setOnGoingAction: (onGoingActionInfo) =>
    dispatch({
      type: SET_ON_GOING_ACTION,
      payload: onGoingActionInfo,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieRating);
