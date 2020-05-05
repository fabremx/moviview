import React from "react";
import "./App.scss";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import WatchedMoviesPage from "./pages/watched-movies/watched-movies";
import MovieToWatchPage from "./pages/movies-to-watch/movies-to-watch";
import MovieDetailsPage from "./pages/movie-details/movie-details";
import validIcon from "./shared/images/valid-snackbar-icon.png";
import closeIcon from "./shared/images/close-snackbar-icon.png";
import { closeSnackbarAction } from "./redux/actions/global-actions";
import {
  HOME_ROUTE,
  MOVIES_TO_WATCH_ROUTE,
  MOVIE_DETAILS_ROUTE,
} from "./shared/constants/routes";
import {
  SNACKBAR_SUCCESS_TYPE,
  SNACKBAR_ERROR_TYPE,
} from "./shared/constants/variables";

function getSnackbarIcon(type) {
  switch (type) {
    case SNACKBAR_SUCCESS_TYPE:
      return validIcon;
    case SNACKBAR_ERROR_TYPE:
      return closeIcon;
    default:
      return validIcon;
  }
}

function getSnackbarIconClassName(type) {
  switch (type) {
    case SNACKBAR_SUCCESS_TYPE:
      return "snackbar__icon snackbar__icon--success";
    case SNACKBAR_ERROR_TYPE:
      return "snackbar__icon snackbar__icon--error";
    default:
      return "snackbar__icon";
  }
}

class App extends React.Component {
  render() {
    if (this.props.snackbar.isSnackbarActive) {
      setTimeout(this.props.closeSnackbar, 3000);
    }

    return (
      <div>
        {this.props.snackbar.isSnackbarActive && (
          <div id="snackbar">
            <img
              src={getSnackbarIcon(this.props.snackbar.type)}
              alt="valid icon"
              className={getSnackbarIconClassName(this.props.snackbar.type)}
            />
            <p>{this.props.snackbar.message}</p>
            <img
              src={closeIcon}
              alt="close icon"
              onClick={this.props.closeSnackbar}
              className="snackbar__close-icon"
            />
          </div>
        )}
        <Route exact path={HOME_ROUTE} component={WatchedMoviesPage} />
        <Route path={MOVIES_TO_WATCH_ROUTE} component={MovieToWatchPage} />
        <Route
          path={MOVIE_DETAILS_ROUTE + "/:id"}
          component={MovieDetailsPage}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  snackbar: state.global.snackbar,
});

const mapDispatchToProps = (dispatch) => ({
  closeSnackbar: () => dispatch(closeSnackbarAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
