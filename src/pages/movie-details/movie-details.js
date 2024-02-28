import React from "react";
import "./movie-details.scss";
import returnIcon from "../../shared/images/return-icon.png";
import fullStarIcon from "../../shared/images/full-star-icon.png";
import emptyStarIcon from "../../shared/images/empty-star-icon.png";
import plusIcon from "../../shared/images/plus-icon.png";
import validationIcon from "../../shared/images/validation-icon.png";
import loader from "../../shared/images/loader.gif";
import {Link} from "react-router-dom";
import {WATCHED_MOVIES_ROUTE} from "../../shared/constants/routes";
import {TMDB_URL_IMAGE} from "../../shared/api/urls";
import {connect} from "react-redux";
import utils from "../../shared/utils";
import {MAX_USER_RATING, SNACKBAR_SUCCESS_TYPE,} from "../../shared/constants/variables";
import {
    ADD_MOVIE_TO_WATCH,
    ADD_WATCHED_MOVIE,
    CHANGE_WATCHED_MOVIE_RATING,
    DELETE_MOVIE_TO_WATCH,
    DISPLAY_SNACKBAR,
    SAVE_MOVIES_TO_WATCH_ON_LOCAL_STORAGE,
    SAVE_WATCHED_MOVIES_ON_LOCAL_STORAGE,
} from "../../redux/actions";
import {repository} from "../../shared/repository";

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
            this.getMovieOrSerieDetails();
            return;
        }

        this.setState({
            movie: this.props.history.location.movie,
            selectedStar: this.props.history.location.movie.userRating,
            watchedMovie: true,
        });
    }

    async getMovieOrSerieDetails() {
        const id = this.props.match.params.id
        const isAMovie = await repository.isAMovie(id)

        const data = isAMovie
            ? await repository.getMovieDetails(id)
            : await repository.getSerieDetails(id)

        this.setState({movie: data});
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
        this.setState({selectedStar: starIndex + 1, hasUserRated: true});
    };

    addMovieToWatchList = () => {
        this.props.addMovieToWatchAction(this.state.movie);
        this.props.saveMoviesToWatchOnLocalStorageAction();
        this.props.displaySnackbar({
            message: "Film ajouté à la liste 'A voir' avec succès.",
            type: SNACKBAR_SUCCESS_TYPE,
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
                type: SNACKBAR_SUCCESS_TYPE,
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
                type: SNACKBAR_SUCCESS_TYPE,
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
                    className="full-star-icon"
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
                    className="empty-star-icon"
                    onClick={() => this.setUserRating(fullStarArray.length + index)}
                />
            ));

        return [...fullStarArray, ...emptyStarArray];
    }

    render() {
        if (!this.state.movie) {
            return (
                <div className="movie-details__loading">
                    <img src={loader} alt="loading"/>
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
                        <img src={returnIcon} alt="return icon"/>
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
                            <img src={fullStarIcon} alt="star icon"/>
                            <span className="movie-details__text--rating">
                {this.state.movie.rating}
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
                                    <Link to={WATCHED_MOVIES_ROUTE}>
                                        <div
                                            className="validation-rate-button button"
                                            onClick={this.submitMovieRating}
                                        >
                                            <img src={validationIcon} alt="button icon"/>
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
                    <Link to={WATCHED_MOVIES_ROUTE}>
                        <div
                            className="movie-details__button button"
                            onClick={this.addMovieToWatchList}
                        >
                            <img src={plusIcon} alt="button icon"/>
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
        dispatch({
            type: ADD_MOVIE_TO_WATCH,
            payload: movieToAdd,
        }),
    deleteMovieToWatch: (movieToDeleteId) =>
        dispatch({
            type: DELETE_MOVIE_TO_WATCH,
            payload: movieToDeleteId,
        }),
    addWatchedMovieAction: (movieToAdd) =>
        dispatch({
            type: ADD_WATCHED_MOVIE,
            payload: movieToAdd,
        }),
    changeMovieRatingAction: (movieInfo) =>
        dispatch({
            type: CHANGE_WATCHED_MOVIE_RATING,
            payload: movieInfo,
        }),
    saveWatchedMoviesOnLocalStorageAction: () =>
        dispatch({
            type: SAVE_WATCHED_MOVIES_ON_LOCAL_STORAGE,
            payload: null,
        }),
    saveMoviesToWatchOnLocalStorageAction: () =>
        dispatch({
            type: SAVE_MOVIES_TO_WATCH_ON_LOCAL_STORAGE,
            payload: null,
        }),
    displaySnackbar: (payload) =>
        dispatch({
            type: DISPLAY_SNACKBAR,
            payload,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage);
