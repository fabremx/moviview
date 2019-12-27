import React from "react";
import closeIcon from "../../shared/images/close-icon.png";
import "./movie-suggestion.scss";
import utils from "../../shared/utils";
import { deleteMovieToWatchAction } from "../../actions/movies-to-watch-actions";
import { connect } from "react-redux";

class MovieSuggestion extends React.Component {
  deleteMovieToWatch = () => {
    this.props.deleteMovieToWatchAction(this.props.movie.imdbId);
  };

  render() {
    return (
      <div className="movie-suggestion row">
        <div className="movie-suggestion__img">
          <img
            src={utils.getMoviePoster(this.props.movie.posterSrc)}
            alt={this.props.movie.title}
          />
        </div>

        <div className="movie-suggestion__info">
          <div className="movie-suggestion__text">
            <span className="movie-suggestion__text--title">
              {this.props.movie.title}
            </span>

            <p>
              Année de sortie:
              <span className="movie-suggestion__text--bold">
                {this.props.movie.releaseYear}
              </span>
              <br></br>
              De:
              <span className="movie-suggestion__text--bold">
                {this.props.movie.director}
              </span>
              <br></br>
              Genre:
              <span className="movie-suggestion__text--bold">
                {/* {this.props.movie.genres} */}
              </span>
              <br></br>
              Durée:
              <span className="movie-suggestion__text--bold">
                {utils.getReadableRuntime(this.props.movie.runtime)}
              </span>
            </p>
          </div>
        </div>

        <img
          className="movie-suggestion__close-img"
          src={closeIcon}
          alt="close icon"
          onClick={this.deleteMovieToWatch}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  deleteMovieToWatchAction: movieToDeleteId =>
    dispatch(deleteMovieToWatchAction(movieToDeleteId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieSuggestion);
