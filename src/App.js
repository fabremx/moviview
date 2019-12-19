import React from "react";
import "./App.scss";
import { Route } from "react-router-dom";
import MoviesWatchedPage from "./pages/movies-watched/movies-watched";
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
      <Route exact path={HOME_ROUTE} component={MoviesWatchedPage} />
      <Route path={MOVIES_TO_WATCH_ROUTE} component={MovieToWatchPage} />
      <Route path={MOVIE_DETAILS_ROUTE} component={MovieDetailsPage} />
    </div>
  );
}

export default App;
