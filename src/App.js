import React from "react";
import "./App.scss";
import { Route } from "react-router-dom";
import WatchedMoviesPage from "./pages/watched-movies/watched-movies";
import MovieToWatchPage from "./pages/movies-to-watch/movies-to-watch";
import MovieDetailsPage from "./pages/movie-details/movie-details";
import {
  HOME_ROUTE,
  MOVIES_TO_WATCH_ROUTE,
  MOVIE_DETAILS_ROUTE
} from "./shared/constants/routes";

function App() {
  return (
    <div>
      <Route exact path={HOME_ROUTE} component={WatchedMoviesPage} />
      <Route path={MOVIES_TO_WATCH_ROUTE} component={MovieToWatchPage} />
      <Route path={MOVIE_DETAILS_ROUTE + "/:id"} component={MovieDetailsPage} />
    </div>
  );
}

export default App;
