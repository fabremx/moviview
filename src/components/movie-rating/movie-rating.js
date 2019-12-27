import React from "react";
import editIcon from "../../shared/images/edit-icon.png";
import closeIcon from "../../shared/images/close-icon.png";
import fullStarIcon from "../../shared/images/full-star-icon.png";
import emptyStarIcon from "../../shared/images/empty-star-icon.png";
import "./movie-rating.scss";
import utils from "../../shared/utils";
import { deleteWatchedMovieAction } from "../../actions/watched-movies-actions";
import { connect } from "react-redux";
import { setOnGoingAction } from "../../actions/on-going-action-actions";

class MovieRating extends React.Component {
  deleteWatchedMovie = () => {
    this.props.setOnGoingAction({
      type: "DELETE",
      list: "watched-movies",
      movieId: this.props.movie.imdbId,
      reducer: this.props.deleteWatchedMovieAction
    });

    this.props.onToggleDeleteModal();
  };

  displayMovieRatingStars(userRating) {
    const fullStarArray = Array(userRating)
      .fill(null)
      .map((_, i) => (
        <img src={fullStarIcon} alt="star icon" key={"full-star-" + i} />
      ));
    const emptyStarArray = Array(5 - userRating)
      .fill(null)
      .map((_, i) => (
        <img src={emptyStarIcon} alt="star icon" key={"empty-star-" + i} />
      ));

    return [...fullStarArray, ...emptyStarArray];
  }

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
            <div className="movie-watched__stars">
              {this.displayMovieRatingStars(this.props.movie.userRating)}
            </div>

            <span className="movie-watched__rating--comment">
              {utils.displayRatingComment(this.props.movie.userRating)}
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
    dispatch(deleteWatchedMovieAction(movieToDeleteId)),
  setOnGoingAction: onGoingActionInfo =>
    dispatch(setOnGoingAction(onGoingActionInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieRating);
