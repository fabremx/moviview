import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import configureStore from "./redux/store";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

const watchedMovies = window.localStorage.getItem("watchedMovies");
const moviesToWatch = window.localStorage.getItem("moviesToWatch");

const INITIAL_STATE = {
  watchedMovies: watchedMovies ? JSON.parse(watchedMovies) : [],
  moviesToWatch: moviesToWatch ? JSON.parse(moviesToWatch) : [],
  onGoingAction: {},
};

ReactDOM.render(
  <Provider store={configureStore(INITIAL_STATE)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
