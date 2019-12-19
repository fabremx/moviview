import React from "react";
import "./App.scss";
import MoviesWatchedPage from "./pages/movies-watched/movies-watched";
import MovieToWatchPage from "./pages/movies-to-watch/movies-to-watch";
import { Route } from "react-router-dom";
import { HOME_ROUTE, MOVIES_TO_WATCH_ROUTE } from "./shared/constants/routes";

function App() {
  return (
    <div>
      <Route exact path={HOME_ROUTE} component={MoviesWatchedPage} />
      <Route path={MOVIES_TO_WATCH_ROUTE} component={MovieToWatchPage} />
    </div>
  );
}

export default App;
