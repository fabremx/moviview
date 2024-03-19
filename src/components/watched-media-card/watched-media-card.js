import React from "react";
import closeIcon from "../../shared/images/close-icon.png";
import fullStarIcon from "../../shared/images/full-star-icon.png";
import emptyStarIcon from "../../shared/images/empty-star-icon.png";
import "./watched-media-card.scss";
import utils from "../../shared/utils";
import {Link} from "react-router-dom";
import {ROUTES} from "../../shared/constants/routes";
import {MAX_USER_RATING, SNACKBAR_TYPE,} from "../../shared/constants/variables";
import {useModal} from "../../hooks/useModal";
import {useMedia} from "../../hooks/useMedia";
import {useSnackbar} from "../../hooks/useSnackbar";

export const WatchedMediaCard = ({media}) => {
    const {displaySnackbar} = useSnackbar()
    const {displayModal} = useModal()
    const {removeWatchedMedia} = useMedia()

    const onDelete = (event) => {
        event.preventDefault()

        displayModal(() => {
            removeWatchedMedia(media.id)
            displaySnackbar(SNACKBAR_TYPE.SUCCESS, "Film ou série supprimé(e) avec succès.")
        })
    }

    const displayMediaRatingStars = (userRating) => {
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

    return (
        <Link
            to={{
                pathname: ROUTES.MEDIA_DETAILS + "/" + media.id,
                media: media,
            }}
        >
            <div className="movie-watched row">
                <div className="movie-watched__img">
                    <img
                        src={utils.getMediaPoster(media.posterSrc)}
                        alt={media.title}
                    />
                </div>

                <div className="movie-watched__info">
                    <div className="details-header">
                        <div className="details-header__title">
                            {media.title}

                            <span className="details-header__title--year">
                                ({media.releaseYear})
                            </span>
                        </div>

                        <div className="details-header__director">
                            De {media.director}
                        </div>
                    </div>

                    <div className="movie-watched__rating">
                        <div className="movie-watched__stars">
                            {displayMediaRatingStars(media.userRating)}
                        </div>

                        <span className="movie-watched__rating--comment">
                            {utils.displayRatingComment(media.userRating)}
                        </span>
                    </div>
                </div>

                <div
                    className="movie-watched__close"
                    onClick={onDelete}
                >
                    <img src={closeIcon} alt="close icon"/>
                </div>
            </div>
        </Link>
    )
}
