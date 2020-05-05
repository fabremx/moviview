import React from "react";
import "./movie-details.scss";
import returnIcon from "../../shared/images/return-icon.png";
import fullStarIcon from "../../shared/images/full-star-icon.png";
import emptyStarIcon from "../../shared/images/empty-star-icon.png";
import plusIcon from "../../shared/images/plus-icon.png";
import validationIcon from "../../shared/images/validation-icon.png";
import loader from "../../shared/images/loader.gif";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../shared/constants/routes";
import {
  TMDB_URL_MOVIE_DETAILS,
  TMDB_URL_IMAGE,
  OMDB_URL,
} from "../../shared/api/urls";
import { TMDB_KEY } from "../../shared/api/keys";
import { Movie } from "../../shared/models/movie";

import { connect } from "react-redux";
import {
  addMovieToWatchAction,
  deleteMovieToWatchAction,
  saveMoviesToWatchOnLocalStorageAction,
} from "../../redux/actions/movies-to-watch-actions";
import {
  addWatchedMovieAction,
  changeMovieRatingAction,
  saveWatchedMoviesOnLocalStorageAction,
} from "../../redux/actions/watched-movies-actions";
import { displaySnackbarAction } from "../../redux/actions/global-actions";
import utils from "../../shared/utils";
import { MAX_USER_RATING } from "../../shared/constants/variables";

class MovieDetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: null,
      selectedStar: 0,
      hasUserRated: false,
      watchedMovie: false,
    };
  }

  componentDidMount() {
    if (!this.props.history.location.movie) {
      this.getMovieDetails();
      return;
    }

    this.setState({
      movie: this.props.history.location.movie,
      selectedStar: this.props.history.location.movie.userRating,
      watchedMovie: true,
    });
  }

  async getMovieDetailsFromTMDB(tmdb_id) {
    const response = await fetch(
      TMDB_URL_MOVIE_DETAILS + tmdb_id + "?language=fr&api_key=" + TMDB_KEY
    );

    return response.json();
  }

  async getMovieDetailsFromOMDB(imdb_id) {
    const response = await fetch(OMDB_URL + "?apikey=ded9768&i=" + imdb_id);

    return response.json();
  }

  async getMovieDetails() {
    const TMDB_movie = await this.getMovieDetailsFromTMDB(
      this.props.match.params.id
    );
    const OMDB_movie = await this.getMovieDetailsFromOMDB(TMDB_movie.imdb_id);

    const movie = new Movie(
      TMDB_movie.id,
      TMDB_movie.imdb_id,
      TMDB_movie.title,
      TMDB_movie.original_title,
      OMDB_movie.imdbRating,
      TMDB_movie.genres,
      TMDB_movie.backdrop_path,
      TMDB_movie.poster_path,
      OMDB_movie.Year,
      OMDB_movie.Director,
      OMDB_movie.Actors,
      OMDB_movie.Country,
      TMDB_movie.runtime,
      TMDB_movie.overview || OMDB_movie.Plot
    );

    this.setState({ movie: movie });
  }

  isMovieAlreadyInAList() {
    const isPresentOnWatchedMoviesList =
      this.props.watchedMovies.findIndex(
        (movie) => movie.imdbId === this.state.movie.imdbId
      ) >= 0;

    const isPresentOnMoviesToWatchList =
      this.props.moviesToWatch.findIndex(
        (movie) => movie.imdbId === this.state.movie.imdbId
      ) >= 0;

    return !!(isPresentOnWatchedMoviesList || isPresentOnMoviesToWatchList);
  }

  setUserRating = (starIndex) => {
    this.setState({ selectedStar: starIndex + 1, hasUserRated: true });
  };

  addMovieToWatchList = () => {
    this.props.addMovieToWatchAction(this.state.movie);
    this.props.saveMoviesToWatchOnLocalStorageAction();
    this.props.displaySnackbar({
      message: "Film ajouté à la liste 'A voir' avec succès.",
      type: "success",
    });
  };

  submitMovieRating = () => {
    if (this.state.watchedMovie) {
      this.props.changeMovieRatingAction({
        movie: this.state.movie,
        rating: this.state.selectedStar,
      });

      this.props.displaySnackbar({
        message: "La note du film à bien été changé.",
        type: "success",
      });
    } else {
      this.props.addWatchedMovieAction({
        movie: this.state.movie,
        rating: this.state.selectedStar,
      });

      this.props.deleteMovieToWatch(this.state.movie.imdbId);
      this.props.saveMoviesToWatchOnLocalStorageAction();
      this.props.displaySnackbar({
        message: "Film ajouté à la liste 'Vu' avec succès.",
        type: "success",
      });
    }

    this.props.saveWatchedMoviesOnLocalStorageAction();
  };

  goToPreviousPage = () => {
    this.props.history.goBack();
  };

  displayMovieRatingStars() {
    const fullStarArray = Array(this.state.selectedStar)
      .fill(null)
      .map((_, index) => (
        <img
          src={fullStarIcon}
          alt="star icon"
          key={"full-star-" + index}
          onClick={() => this.setUserRating(index)}
        />
      ));

    const emptyStarArray = Array(MAX_USER_RATING - this.state.selectedStar)
      .fill(null)
      .map((_, index) => (
        <img
          src={emptyStarIcon}
          alt="star icon"
          key={"empty-star-" + index}
          onClick={() => this.setUserRating(fullStarArray.length + index)}
        />
      ));

    return [...fullStarArray, ...emptyStarArray];
  }

  render() {
    if (!this.state.movie) {
      return (
        <div className="movie-details__loading">
          <img src={loader} alt="loading" />
          <p>Loading ...</p>
        </div>
      );
    }

    return (
      <div id="movie-details-page">
        {this.state.movie.backgroundSrc && (
          <img
            className="movie-details__background"
            src={TMDB_URL_IMAGE + this.state.movie.backgroundSrc}
            alt={this.state.movie.title}
          />
        )}

        <div className="movie-details__header">
          <div onClick={this.goToPreviousPage}>
            <img src={returnIcon} alt="return icon" />
          </div>
        </div>

        <div className="movie-details__info">
          <div className="movie-details__img">
            <img
              src={utils.getMoviePoster(this.state.movie.posterSrc)}
              alt={this.state.movie.title}
            />
          </div>

          <div className="movie-details__text">
            <div className="movie-details__text--title">
              {this.state.movie.title}
            </div>

            <div className="movie-details__text__IMDBRating">
              <img src={fullStarIcon} alt="star icon" />
              <span className="movie-details__text--rating">
                {this.state.movie.imdbRating}
              </span>
              / 10 (Imdb)
            </div>

            <div className="movie-details__text__genre">
              {this.state.movie.genres.map((genre) => (
                <div key={genre.id}>{genre.name}</div>
              ))}
            </div>

            <p>
              Année de sortie:
              <span className="movie-details__text--bold">
                {this.state.movie.releaseYear}
              </span>
              <br></br>
              De:
              <span className="movie-details__text--bold">
                {this.state.movie.director}
              </span>
              <br></br>
              Avec:
              <span className="movie-details__text--bold">
                {this.state.movie.actors}
              </span>
              <br></br>
              Pays:
              <span className="movie-details__text--bold">
                {this.state.movie.country}
              </span>
              <br></br>
              Durée:
              <span className="movie-details__text--bold">
                {utils.getReadableRuntime(this.state.movie.runtime)}
              </span>
            </p>
          </div>
        </div>

        <div className="movie-details__rating">
          <h2>Votre note du film</h2>

          <div className="star-rating">
            <div className="star-rating__rating">
              {this.displayMovieRatingStars()}

              {
                // Display rating validation button when user choose a rate
                this.state.selectedStar > 0 && this.state.hasUserRated && (
                  <Link to={HOME_ROUTE}>
                    <div className="button" onClick={this.submitMovieRating}>
                      <img src={validationIcon} alt="button icon" />
                      <span className="button__label">VALIDER</span>
                    </div>
                  </Link>
                )
              }
            </div>

            <div className="star-rating__comment">
              <p>{utils.displayRatingComment(this.state.selectedStar)}</p>
            </div>
          </div>
        </div>

        <div className="movie-details__synopsis">
          <h2>Résumé</h2>
          <p>{this.state.movie.synopsis}</p>
        </div>

        {!this.isMovieAlreadyInAList() && (
          <Link to={HOME_ROUTE}>
            <div
              className="movie-details__button button"
              onClick={this.addMovieToWatchList}
            >
              <img src={plusIcon} alt="button icon" />
              <span className="button__label">AJOUTER A LA LISTE A VOIR</span>
            </div>
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  addMovieToWatchAction: (movieToAdd) =>
    dispatch(addMovieToWatchAction(movieToAdd)),
  deleteMovieToWatch: (movieToDeleteId) =>
    dispatch(deleteMovieToWatchAction(movieToDeleteId)),
  addWatchedMovieAction: (movieToAdd) =>
    dispatch(addWatchedMovieAction(movieToAdd)),
  changeMovieRatingAction: (movieInfo) =>
    dispatch(changeMovieRatingAction(movieInfo)),
  saveWatchedMoviesOnLocalStorageAction: () =>
    dispatch(saveWatchedMoviesOnLocalStorageAction()),
  saveMoviesToWatchOnLocalStorageAction: () =>
    dispatch(saveMoviesToWatchOnLocalStorageAction()),
  displaySnackbar: (payload) => dispatch(displaySnackbarAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage);
