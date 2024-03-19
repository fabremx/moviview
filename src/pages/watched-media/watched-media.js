import React, {useEffect} from "react";
import "./watched-media.scss";
import {Header} from "../../components/header/header";
import {Footer} from "../../components/footer/footer";
import {WatchedMediaCard} from "../../components/watched-media-card/watched-media-card";
import {ROUTES} from "../../shared/constants/routes";
import {SLIDE_DIRECTION, useSlider} from "../../hooks/useSlider";
import {useMedia} from "../../hooks/useMedia";

export const WatchedMediaPage = () => {
    const {slideDirection} = useSlider()
    const {watchedMedia} = useMedia()

    useEffect(() => {
        if (slideDirection === SLIDE_DIRECTION.LEFT) {
            window.location.href = ROUTES.MEDIA_TO_WATCH
        }
    }, [slideDirection]);

    return (
        <div id="movie-watched-page">
            <Header/>

            <div className="watched-movies-container">
                <div className="watched-movies-container__title">Films vus</div>

                {!watchedMedia.length && (
                    <p className="watched-movies--no-movies">
                        Aucun film(s) vu(s) présent dans la liste
                    </p>
                )}

                {watchedMedia.map((media) => (
                    <WatchedMediaCard
                        media={media}
                        key={media.id}
                    />
                ))}
            </div>

            <Footer/>
        </div>
    );
}
