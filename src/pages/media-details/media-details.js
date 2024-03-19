import React, {useEffect, useState} from "react";
import "./media-details.scss";
import returnIcon from "../../shared/images/return-icon.png";
import fullStarIcon from "../../shared/images/full-star-icon.png";
import emptyStarIcon from "../../shared/images/empty-star-icon.png";
import plusIcon from "../../shared/images/plus-icon.png";
import validationIcon from "../../shared/images/validation-icon.png";
import loader from "../../shared/images/loader.gif";
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import {ROUTES} from "../../shared/constants/routes";
import {TMDB_URL_IMAGE} from "../../shared/api/urls";
import utils from "../../shared/utils";
import {MAX_USER_RATING, MEDIA_TYPE, SNACKBAR_TYPE,} from "../../shared/constants/variables";
import {repository} from "../../shared/repository";
import {useMedia} from "../../hooks/useMedia";
import {useSnackbar} from "../../hooks/useSnackbar";

export const MediaDetailsPage = () => {
    const [media, setMedia] = useState(null)
    const [selectedStar, setSelectedStar] = useState(0)
    const [hasUserRated, setHasUserRated] = useState(false)

    const {
        getMediaFromLists,
        addMediaToWatch,
        addWatchedMedia,
        updateWatchedMediaRating,
        removeMediaToWatch,
        isMediaInLists,
        isWatchedMedia
    } = useMedia()
    const {displaySnackbar} = useSnackbar()
    const {id} = useParams();
    const history = useHistory()
    const location = useLocation();
    const mediaType = location?.state?.type

    useEffect(() => {
        const mediaFromLists = getMediaFromLists(id)
        if (mediaFromLists) {
            setSelectedStar(mediaFromLists.userRating ?? 0)
            setMedia(mediaFromLists)
            return
        }

        getMediaDetails();
        // eslint-disable-next-line
    }, []);

    const getMediaDetails = async () => {
        if (mediaType === MEDIA_TYPE.SERIES) {
            setMedia(await repository.getSerieDetails(id))
        } else if (mediaType === MEDIA_TYPE.MOVIES) {
            setMedia(await repository.getMovieDetails(id))
        } else {
            displaySnackbar(SNACKBAR_TYPE.ERROR, "Erreur - Media inconnu.")
        }
    }

    const setUserRating = (starIndex) => {
        setSelectedStar(starIndex + 1)
        setHasUserRated(true)
    };

    const addMediaToWatchList = () => {
        addMediaToWatch(media)
        displaySnackbar(SNACKBAR_TYPE.SUCCESS, "Film ou série ajouté à la liste 'A voir'.")
    };

    const submitMediaRating = () => {
        if (isWatchedMedia(id)) {
            updateWatchedMediaRating(id, selectedStar)
            displaySnackbar(SNACKBAR_TYPE.SUCCESS, "Note du film ou série mise à jour.")
            return
        }

        addWatchedMedia({ ...media, userRating: selectedStar })
        removeMediaToWatch(id)
        displaySnackbar(SNACKBAR_TYPE.SUCCESS, "Film ou série ajouté à la liste 'Vu'.")
    };

    const displayMediaRatingStars = () => {
        const fullStarArray = Array(selectedStar)
            .fill(null)
            .map((_, index) => (
                <img
                    src={fullStarIcon}
                    alt="star icon"
                    key={"full-star-" + index}
                    className="full-star-icon"
                    onClick={() => setUserRating(index)}
                />
            ));

        const emptyStarArray = Array(MAX_USER_RATING - selectedStar)
            .fill(null)
            .map((_, index) => (
                <img
                    src={emptyStarIcon}
                    alt="star icon"
                    key={"empty-star-" + index}
                    className="empty-star-icon"
                    onClick={() => setUserRating(fullStarArray.length + index)}
                />
            ));

        return [...fullStarArray, ...emptyStarArray];
    }

    if (!media) {
        return (
            <div className="movie-details__loading">
                <img src={loader} alt="loading"/>
                <p>Loading ...</p>
            </div>
        );
    }

    return (
        <div id="movie-details-page">
            {media.backgroundSrc && (
                <img
                    className="movie-details__background"
                    src={TMDB_URL_IMAGE + media.backgroundSrc}
                    alt={media.title}
                />
            )}

            <div className="movie-details__header">
                <div onClick={() => history.goBack()}>
                    <img src={returnIcon} alt="return icon"/>
                </div>
            </div>

            <div className="movie-details__info">
                <div className="movie-details__img">
                    <img
                        src={utils.getMediaPoster(media.posterSrc)}
                        alt={media.title}
                    />
                </div>

                <div className="movie-details__text">
                    <div className="movie-details__text--title">
                        {media.title}
                    </div>

                    <div className="movie-details__text__IMDBRating">
                        <img src={fullStarIcon} alt="star icon"/>
                        <span className="movie-details__text--rating">
                {media.rating}
              </span>
                        / 10 (Imdb)
                    </div>

                    <div className="movie-details__text__genre">
                        {media.genres.map((genre) => (
                            <div key={genre.id}>{genre.name}</div>
                        ))}
                    </div>

                    <p>
                        Année de sortie:
                        <span className="movie-details__text--bold">
                {media.releaseYear}
              </span>
                        <br></br>
                        De:
                        <span className="movie-details__text--bold">
                {media.director}
              </span>
                        <br></br>
                        Avec:
                        <span className="movie-details__text--bold">
                {media.actors}
              </span>
                        <br></br>
                        Pays:
                        <span className="movie-details__text--bold">
                {media.country}
              </span>
                        <br></br>
                        Durée:
                        <span className="movie-details__text--bold">
                {utils.getReadableRuntime(media.runtime)}
              </span>
                    </p>
                </div>
            </div>

            <div className="movie-details__rating">
                <h2>Votre note du film</h2>

                <div className="star-rating">
                    <div className="star-rating__rating">
                        {displayMediaRatingStars()}

                        {
                            // Display rating validation button when user choose a rate
                            selectedStar > 0 && hasUserRated && (
                                <Link to={ROUTES.WATCHED_MEDIA}>
                                    <div
                                        className="validation-rate-button button"
                                        onClick={submitMediaRating}
                                    >
                                        <img src={validationIcon} alt="button icon"/>
                                        <span className="button__label">VALIDER</span>
                                    </div>
                                </Link>
                            )
                        }
                    </div>

                    <div className="star-rating__comment">
                        <p>{utils.displayRatingComment(selectedStar)}</p>
                    </div>
                </div>
            </div>

            <div className="movie-details__synopsis">
                <h2>Résumé</h2>
                <p>{media.synopsis}</p>
            </div>

            {!isMediaInLists(id) && (
                <Link to={ROUTES.MEDIA_TO_WATCH}>
                    <div
                        className="movie-details__button button"
                        onClick={addMediaToWatchList}
                    >
                        <img src={plusIcon} alt="button icon"/>
                        <span className="button__label">AJOUTER A LA LISTE A VOIR</span>
                    </div>
                </Link>
            )}
        </div>
    );
}