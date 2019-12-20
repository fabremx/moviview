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
    this.state = { ratingStars: [false, false, false, false, false] };
    this.handleRatingMovie = this.handleRatingMovie.bind(this);
  }

  getMovieGenre(movieGenres) {
    return movieGenres.map(genre => <div>{genre}</div>);
  }

  displayMovieRatingStars() {
    return this.state.ratingStars.map((star, index) =>
      star ? (
        <img
          className="star-rating__star-icon"
          src={fullStarIcon}
          alt="star icon"
          onClick={() => this.handleRatingMovie(index)}
        />
      ) : (
        <img
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
    const MOVIE = JSON.parse(
      '{"Title":"Raging Bull","Year":"1980","Rated":"R","Released":"19 Dec 1980","Runtime":"129 min","Genre":"Biography, Drama, Sport","Director":"Martin Scorsese","Writer":"Jake LaMotta (based on the book by), Joseph Carter (with), Peter Savage (with), Paul Schrader (screenplay), Mardik Martin (screenplay)","Actors":"Robert De Niro, Cathy Moriarty, Joe Pesci, Frank Vincent","Plot":"The life of boxer Jake LaMotta, whose violence and temper that led him to the top in the ring destroyed his life outside of it.","Language":"English","Country":"USA","Awards":"Won 2 Oscars. Another 22 wins & 26 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BYjRmODkzNDItMTNhNi00YjJlLTg0ZjAtODlhZTM0YzgzYThlXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.2/10"},{"Source":"Rotten Tomatoes","Value":"94%"},{"Source":"Metacritic","Value":"89/100"}],"Metascore":"89","imdbRating":"8.2","imdbVotes":"296,838","imdbID":"tt0081398","Type":"movie","DVD":"01 Aug 2000","BoxOffice":"N/A","Production":"United Artists","Website":"N/A","Response":"True"}'
    );

    const movieGenres = MOVIE.Genre.split(",");

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
            <img src={MOVIE.Poster} alt={MOVIE.Title} />
          </div>

          <div className="movie-details__text">
            <div className="movie-details__text--title">{MOVIE.Title}</div>

            <div className="movie-details__text__IMDBRating">
              <img src={fullStarIcon} alt="star icon" />
              <span className="movie-details__text--rating">
                {MOVIE.imdbRating}
              </span>
              / 10 (Imdb)
            </div>

            <div className="movie-details__text__genre">
              {this.getMovieGenre(movieGenres)}
            </div>

            <p>
              Année de sortie:
              <span className="movie-details__text--bold">{MOVIE.Year}</span>
              <br></br>
              De:
              <span className="movie-details__text--bold">
                {MOVIE.Director}
              </span>
              <br></br>
              Avec:
              <span className="movie-details__text--bold">{MOVIE.Actors}</span>
              <br></br>
              Pays:
              <span className="movie-details__text--bold">{MOVIE.Country}</span>
              <br></br>
              Durée:
              <span className="movie-details__text--bold">{MOVIE.Runtime}</span>
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
          <p>{MOVIE.Plot}</p>
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
