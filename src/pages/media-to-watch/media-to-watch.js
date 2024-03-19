import React, {useEffect} from "react";
import "./media-to-watch.scss";
import {Header} from "../../components/header/header";
import {Footer} from "../../components/footer/footer";
import {MediaToWatchCard} from "../../components/media-to-watch-card/media-to-watch-card";
import {SLIDE_DIRECTION, useSlider} from "../../hooks/useSlider";
import {useMedia} from "../../hooks/useMedia";
import {ROUTES} from "../../shared/constants/routes";

export const MediaToWatchPage = () => {
    const {slideDirection} = useSlider()
    const {mediaToWatch} = useMedia()

    useEffect(() => {
        if (slideDirection === SLIDE_DIRECTION.RIGHT) {
            window.location.href = ROUTES.WATCHED_MEDIA
        }
    }, [slideDirection]);

    return (
        <div id="movies-to-watch-page">
            <Header/>

            <div className="movies-to-watch-container">
                <div className="movies-to-watch-container__title">Films à voir</div>

                {!mediaToWatch.length && (
                    <p className="movies-to-watch--no-movies">
                        Aucun film(s) à voir présent dans la liste
                    </p>
                )}

                {mediaToWatch.map((media) => (
                    <MediaToWatchCard
                        media={media}
                        key={media.id}
                    />
                ))}
            </div>

            <Footer/>
        </div>
    );
}
