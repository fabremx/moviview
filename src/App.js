import React, {useEffect} from "react";
import "./App.scss";
import {Route} from "react-router-dom";
import {WatchedMediaPage} from "./pages/watched-media/watched-media";
import {MediaToWatchPage} from "./pages/media-to-watch/media-to-watch";
import {MediaDetailsPage} from "./pages/media-details/media-details";
import {ROUTES} from "./shared/constants/routes";
import {Snackbar} from "./components/snackbar/snackbar";
import {ModalDelete} from "./components/modal-delete/modal-delete";
import {VERSION} from "./version";

export const App = () => {
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        if (!searchParams.has('v')) {
            window.location.href = `${window.location.href}?v=${VERSION}`
        }
    }, []);

    return (
        <div>
            <Snackbar />
            <ModalDelete />

            <Route exact path={ROUTES.MEDIA_TO_WATCH} component={MediaToWatchPage}/>
            <Route path={ROUTES.WATCHED_MEDIA} component={WatchedMediaPage}/>
            <Route
                path={ROUTES.MEDIA_DETAILS + "/:id"}
                component={MediaDetailsPage}
            />
        </div>
    )
}
