import React from "react";
import "./movie-details.scss";
import returnIcon from "../../shared/images/return-icon.png";
import fullStarIcon from "../../shared/images/full-star-icon.png";
import emptyStarIcon from "../../shared/images/empty-star-icon.png";
import plusIcon from "../../shared/images/plus-icon.png";
import validationIcon from "../../shared/images/validation-icon.png";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../shared/constants/routes";
import {
  RATING_1_COMMENT,
  RATING_2_COMMENT,
  RATING_3_COMMENT,
  RATING_4_COMMENT,
  RATING_5_COMMENT
} from "../../shared/constants/rating-comments";
import {
  TMDB_URL_MOVIE_DETAILS,
  TMDB_URL_IMAGE,
  OMDB_URL
} from "../../shared/api/urls";
import { TMDB_KEY } from "../../shared/api/keys";
import { Movie } from "../../shared/models/movie";

class MovieDetailsPage extends React.Component {
  constructor() {
    super();

    this.state = {
      movie: null,
      selectedStar: 0,
      ratingStars: [false, false, false, false, false]
    };
    this.handleRatingMovie = this.handleRatingMovie.bind(this);
  }

  componentDidMount() {
    this.getMovieDetails();
  }

  async getMovieDetailsFromTMDB(tmdb_id) {
    const response = await fetch(
      TMDB_URL_MOVIE_DETAILS + tmdb_id + "?language=fr&api_key=" + TMDB_KEY
    );

    return response.json();
  }

  async getMovieDetailsFromOMDB(imdb_id) {
    const response = await fetch(OMDB_URL + "?apikey=ded9768&i=" + imdb_id);

    return response.json();
  }

  async getMovieDetails() {
    const TMDB_movie = await this.getMovieDetailsFromTMDB(
      this.props.match.params.id
    );
    const OMDB_movie = await this.getMovieDetailsFromOMDB(TMDB_movie.imdb_id);

    const movie = new Movie(
      TMDB_movie.id,
      TMDB_movie.imdb_id,
      TMDB_movie.title,
      TMDB_movie.original_title,
      OMDB_movie.imdbRating,
      TMDB_movie.genres,
      TMDB_movie.backdrop_path,
      TMDB_movie.poster_path,
      OMDB_movie.Year,
      OMDB_movie.Director,
      OMDB_movie.Actors,
      OMDB_movie.Country,
      TMDB_movie.runtime,
      TMDB_movie.overview || OMDB_movie.Plot
    );

    this.setState({ movie: movie });
  }

  getMovieGenre(movieGenres) {
    return movieGenres.map(genre => <div key={genre.id}>{genre.name}</div>);
  }

  displayMovieRatingStars() {
    return this.state.ratingStars.map((star, index) =>
      star ? (
        <img
          key={index}
          src={fullStarIcon}
          alt="star icon"
          onClick={() => this.handleRatingMovie(index)}
        />
      ) : (
        <img
          key={index}
          src={emptyStarIcon}
          alt="star icon"
          onClick={() => this.handleRatingMovie(index)}
        />
      )
    );
  }

  handleRatingMovie(starIndex) {
    const starNumber = starIndex + 1;

    if (this.state.selectedStar === starNumber) {
      this.setState({
        selectedStar: 0,
        ratingStars: [false, false, false, false, false]
      });

      return;
    }

    const newRatingStars = [false, false, false, false, false];
    newRatingStars.fill(true, 0, starNumber);

    this.setState({
      selectedStar: starNumber,
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
      <div className="button">
        <img src={validationIcon} alt="button icon" />
        <span className="button__label">VALIDER</span>
      </div>
    );
  }

  displayRatingComment() {
    switch (this.state.selectedStar) {
      case 1:
        return <p className="star-rating__comment">"{RATING_1_COMMENT}"</p>;
      case 2:
        return <p className="star-rating__comment">"{RATING_2_COMMENT}"</p>;
      case 3:
        return <p className="star-rating__comment">"{RATING_3_COMMENT}"</p>;
      case 4:
        return <p className="star-rating__comment">"{RATING_4_COMMENT}"</p>;
      case 5:
        return <p className="star-rating__comment">"{RATING_5_COMMENT}"</p>;
      default:
        return;
    }
  }

  getMinutesToHours(totalMinutes) {
    const totalHours = totalMinutes / 60;
    const hours = Math.trunc(totalHours);
    const minutes = Math.round((totalHours - Math.floor(totalHours)) * 60);

    return hours + "h " + minutes + "min";
  }

  render() {
    if (!this.state.movie) {
      return <p>Loading...</p>;
    }

    return (
      <div id="movie-details-page">
        <img
          className="movie-details__background"
          src={TMDB_URL_IMAGE + this.state.movie.backgroundSrc}
          alt={this.state.movie.title}
        />

        <div className="movie-details__header">
          <Link to={HOME_ROUTE}>
            <div>
              <img src={returnIcon} alt="return icon" />
            </div>
          </Link>
        </div>

        <div className="movie-details__info">
          <div className="movie-details__img">
            <img
              src={TMDB_URL_IMAGE + this.state.movie.posterSrc}
              alt={this.state.movie.title}
            />
          </div>

          <div className="movie-details__text">
            <div className="movie-details__text--title">
              {this.state.movie.title}
            </div>

            <div className="movie-details__text__IMDBRating">
              <img src={fullStarIcon} alt="star icon" />
              <span className="movie-details__text--rating">
                {this.state.movie.imdbRating}
              </span>
              / 10 (Imdb)
            </div>

            <div className="movie-details__text__genre">
              {this.getMovieGenre(this.state.movie.genres)}
            </div>

            <p>
              Année de sortie:
              <span className="movie-details__text--bold">
                {this.state.movie.releaseYear}
              </span>
              <br></br>
              De:
              <span className="movie-details__text--bold">
                {this.state.movie.director}
              </span>
              <br></br>
              Avec:
              <span className="movie-details__text--bold">
                {this.state.movie.actors}
              </span>
              <br></br>
              Pays:
              <span className="movie-details__text--bold">
                {this.state.movie.country}
              </span>
              <br></br>
              Durée:
              <span className="movie-details__text--bold">
                {this.getMinutesToHours(this.state.movie.runtime)}
              </span>
            </p>
          </div>
        </div>

        <div className="movie-details__rating">
          <h2>Noter le film</h2>

          <div className="star-rating">
            <div className="star-rating__rating">
              {this.displayMovieRatingStars()}
              {this.displayRatingValidationButton()}
            </div>

            <div className="star-rating__comment">
              {this.displayRatingComment()}
            </div>
          </div>
        </div>

        <div className="movie-details__synopsis">
          <h2>Résumé</h2>
          <p>{this.state.movie.synopsis}</p>
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
