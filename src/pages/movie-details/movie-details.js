import React from "react";
import "./movie-details.scss";
import returnIcon from "../../shared/images/return-icon.png";
import fullStarIcon from "../../shared/images/full-star-icon.png";
import emptyStarIcon from "../../shared/images/empty-star-icon.png";
import plusIcon from "../../shared/images/plus-icon.png";
import validationIcon from "../../shared/images/validation-icon.png";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../shared/constants/routes";

class MovieDetailsPage extends React.Component {
  constructor() {
    super();

    this.state = {
      movie: null,
      ratingStars: [false, false, false, false, false]
    };
    this.handleRatingMovie = this.handleRatingMovie.bind(this);
  }

  componentDidMount() {
    this.getMovieDetails();
  }

  getMovieDetails() {
    fetch(
      "http://www.omdbapi.com/?apikey=ded9768&i=" + this.props.match.params.id
    )
      .then(res => res.json())
      .then(
        response => {
          this.setState({ movie: response });
        },
        error => {
          console.log(error);
        }
      );
  }

  getMovieGenre(movieGenres) {
    return movieGenres.map(genre => <div key={genre}>{genre}</div>);
  }

  displayMovieRatingStars() {
    return this.state.ratingStars.map((star, index) =>
      star ? (
        <img
          key={index}
          className="star-rating__star-icon"
          src={fullStarIcon}
          alt="star icon"
          onClick={() => this.handleRatingMovie(index)}
        />
      ) : (
        <img
          key={index}
          className="star-rating__star-icon"
          src={emptyStarIcon}
          alt="star icon"
          onClick={() => this.handleRatingMovie(index)}
        />
      )
    );
  }

  handleRatingMovie(starIndex) {
    const starNumber = starIndex + 1;

    const newRatingStars = [false, false, false, false, false];
    newRatingStars.fill(true, 0, starNumber);

    this.setState({
      ratingStars: newRatingStars
    });
  }

  doesUserRateMovie() {
    return this.state.ratingStars.some(star => star);
  }

  displayRatingValidationButton() {
    if (!this.doesUserRateMovie()) {
      return;
    }

    return (
      <div className="star-rating__button button">
        <img src={validationIcon} alt="button icon" />
        <span className="button__label">VALIDER</span>
      </div>
    );
  }

  render() {
    if (!this.state.movie) {
      return <p>Loading...</p>;
    }

    const movieGenres = this.state.movie.Genre.split(",");

    return (
      <div id="movie-details-page">
        <div className="movie-details__header">
          <Link to={HOME_ROUTE}>
            <div>
              <img src={returnIcon} alt="return icon" />
            </div>
          </Link>
        </div>

        <div className="movie-details__info">
          <div className="movie-details__img">
            <img src={this.state.movie.Poster} alt={this.state.movie.Title} />
          </div>

          <div className="movie-details__text">
            <div className="movie-details__text--title">
              {this.state.movie.Title}
            </div>

            <div className="movie-details__text__IMDBRating">
              <img src={fullStarIcon} alt="star icon" />
              <span className="movie-details__text--rating">
                {this.state.movie.imdbRating}
              </span>
              / 10 (Imdb)
            </div>

            <div className="movie-details__text__genre">
              {this.getMovieGenre(movieGenres)}
            </div>

            <p>
              Année de sortie:
              <span className="movie-details__text--bold">
                {this.state.movie.Year}
              </span>
              <br></br>
              De:
              <span className="movie-details__text--bold">
                {this.state.movie.Director}
              </span>
              <br></br>
              Avec:
              <span className="movie-details__text--bold">
                {this.state.movie.Actors}
              </span>
              <br></br>
              Pays:
              <span className="movie-details__text--bold">
                {this.state.movie.Country}
              </span>
              <br></br>
              Durée:
              <span className="movie-details__text--bold">
                {this.state.movie.Runtime}
              </span>
            </p>
          </div>
        </div>

        <div className="movie-details__rating">
          <h2>Noter le film</h2>
          <div>Sélectionner une note avant de valider.</div>

          <div className="star-rating">
            <div>{this.displayMovieRatingStars()}</div>
            {this.displayRatingValidationButton()}
          </div>
        </div>

        <div className="movie-details__synopsis">
          <h2>Résumé</h2>
          <p>{this.state.movie.Plot}</p>
        </div>

        <div className="movie-details__button button">
          <img src={plusIcon} alt="button icon" />
          <span className="button__label">AJOUTER A LA LISTE</span>
        </div>
      </div>
    );
  }
}

export default MovieDetailsPage;
