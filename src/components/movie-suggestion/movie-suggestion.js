import React from "react";
import closeIcon from "../../shared/images/close-icon.png";
import "./movie-suggestion.scss";
import utils from "../../shared/utils";
import fullStarIcon from "../../shared/images/full-star-icon.png";
import {
  deleteMovieToWatchAction,
  saveMoviesToWatchOnLocalStorageAction,
} from "../../redux/actions/movies-to-watch-actions";
import { displaySnackbarAction } from "../../redux/actions/global-actions";
import { connect } from "react-redux";
import { setOnGoingAction } from "../../redux/actions/on-going-action-actions";
import { Link } from "react-router-dom";
import { MOVIE_DETAILS_ROUTE } from "../../shared/constants/routes";
import { SNACKBAR_SUCCESS_TYPE } from "../../shared/constants/variables";

class MovieSuggestion extends React.Component {
  getMovieGenre(movieGenres) {
    return movieGenres.map((genre) => <div key={genre.id}>{genre.name}</div>);
  }

  deleteMovieToWatch = (event) => {
    event.stopPropagation();
    event.preventDefault();

    this.props.setOnGoingAction({
      type: "DELETE",
      list: "movies-to-watch",
      movieId: this.props.movie.imdbId,
      callback: this.props.deleteMovieToWatchAction,
    });

    this.props.onToggleDeleteModal();
  };

  render() {
    return (
      <Link to={MOVIE_DETAILS_ROUTE + "/" + this.props.movie.imdbId}>
        <div className="movie-suggestion row">
          <div className="movie-suggestion__img">
            <img
              src={utils.getMoviePoster(this.props.movie.posterSrc)}
              alt={this.props.movie.title}
            />
          </div>

          <div className="movie-suggestion__info">
            <div className="movie-suggestion__text">
              <span className="movie-suggestion__text--title">
                {this.props.movie.title}
              </span>

              <div className="movie-suggestion__genres">
                {this.getMovieGenre(this.props.movie.genres)}
              </div>

              <div className="movie-suggestion__details">
                Année de sortie:
                <span className="movie-suggestion__text--bold">
                  {this.props.movie.releaseYear}
                </span>
              </div>
              <div className="movie-suggestion__details">
                De:
                <span className="movie-suggestion__text--bold">
                  {this.props.movie.director}
                </span>
              </div>
              <div className="movie-suggestion__details">
                Durée:
                <span className="movie-suggestion__text--bold">
                  {utils.getReadableRuntime(this.props.movie.runtime)}
                </span>
              </div>
              <div className="movie-suggestion__details">
                Note:
                <img
                  className="movie-suggestion__details--star-img"
                  src={fullStarIcon}
                  alt="star icon"
                />
                <span className="movie-suggestion__text--rating">
                  {this.props.movie.imdbRating}
                </span>
                <span className="movie-suggestion__text--bold">/ 10</span>
              </div>
            </div>
          </div>

          <div
            className="movie-suggestion__close"
            onClick={this.deleteMovieToWatch}
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
  deleteMovieToWatchAction: (movieToDeleteId) => {
    dispatch(deleteMovieToWatchAction(movieToDeleteId));
    dispatch(saveMoviesToWatchOnLocalStorageAction());
    dispatch(
      displaySnackbarAction({
        message: "Film supprimé avec succès.",
        type: SNACKBAR_SUCCESS_TYPE,
      })
    );
  },
  setOnGoingAction: (onGoingActionInfo) =>
    dispatch(setOnGoingAction(onGoingActionInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieSuggestion);
