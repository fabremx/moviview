import React from "react";
import closeIcon from "../../shared/images/close-icon.png";
import "./media-to-watch-card.scss";
import utils from "../../shared/utils";
import fullStarIcon from "../../shared/images/full-star-icon.png";
import {Link} from "react-router-dom";
import {ROUTES} from "../../shared/constants/routes";
import {useModal} from "../../hooks/useModal";
import {useMedia} from "../../hooks/useMedia";
import {SNACKBAR_TYPE} from "../../shared/constants/variables";
import {useSnackbar} from "../../hooks/useSnackbar";

export const MediaToWatchCard = ({media}) => {
    const {displaySnackbar} = useSnackbar()
    const {displayModal} = useModal()
    const {removeMediaToWatch} = useMedia()

    const getMediaGenre = (genres) => {
        return genres.map((genre) => <div key={genre.id}>{genre.name}</div>);
    }

    const onDelete = (event) => {
        event.preventDefault()

        displayModal(() => {
            removeMediaToWatch(media.id)
            displaySnackbar(SNACKBAR_TYPE.SUCCESS, "Film ou série supprimé(e) avec succès.")
        })
    }

    return (
        <Link to={ROUTES.MEDIA_DETAILS + "/" + media.id}>
            <div className="movie-suggestion row">
                <div className="movie-suggestion__img">
                    <img
                        src={utils.getMediaPoster(media.posterSrc)}
                        alt={media.title}
                    />
                </div>

                <div className="movie-suggestion__info">
                    <div className="movie-suggestion__text">
                        <span className="movie-suggestion__text--title">
                            {media.title}
                        </span>

                        <div className="movie-suggestion__genres">
                            {getMediaGenre(media.genres)}
                        </div>

                        <div className="movie-suggestion__details">
                            Année de sortie:
                            <span className="movie-suggestion__text--bold">
                                {media.releaseYear}
                            </span>
                        </div>

                        <div className="movie-suggestion__details">
                            De:
                            <span className="movie-suggestion__text--bold">
                                {media.director}
                            </span>
                        </div>

                        <div className="movie-suggestion__details">
                            Durée:
                            <span className="movie-suggestion__text--bold">
                                {utils.getReadableRuntime(media.runtime)}
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
                                {media.rating}
                            </span>

                            <span className="movie-suggestion__text--bold">/ 10</span>
                        </div>
                    </div>
                </div>

                <div
                    className="movie-suggestion__close"
                    onClick={onDelete}
                >
                    <img src={closeIcon} alt="close icon"/>
                </div>
            </div>
        </Link>
    )
}
