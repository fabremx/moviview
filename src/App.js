import React from "react";
import "./App.scss";
import {Route} from "react-router-dom";
import {WatchedMediaPage} from "./pages/watched-media/watched-media";
import {MediaToWatchPage} from "./pages/media-to-watch/media-to-watch";
import {MediaDetailsPage} from "./pages/media-details/media-details";
import {ROUTES} from "./shared/constants/routes";
import {Snackbar} from "./components/snackbar/snackbar";
import {ModalDelete} from "./components/modal-delete/modal-delete";

export const App = () => {
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
