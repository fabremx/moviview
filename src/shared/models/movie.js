export class Movie {
  id;
  imdbId;
  title;
  originalTitle;
  imdbRating;
  userRating;
  genres;
  backgroundSrc;
  posterSrc;
  releaseYear;
  director;
  actors;
  country;
  runtime;
  synopsis;

  constructor(
    id,
    imdbId,
    title,
    originalTitle,
    imdbRating,
    genres,
    backgroundSrc,
    posterSrc,
    releaseYear,
    director,
    actors,
    country,
    runtime,
    synopsis
  ) {
    this.id = id;
    this.imdbId = imdbId;
    this.title = title;
    this.originalTitle = originalTitle;
    this.imdbRating = imdbRating;
    this.userRating = null;
    this.synopsis = synopsis;
    this.genres = genres;
    this.backgroundSrc = backgroundSrc;
    this.posterSrc = posterSrc;
    this.releaseYear = releaseYear;
    this.director = director;
    this.actors = actors;
    this.country = country;
    this.runtime = runtime;
    this.synopsis = synopsis;
  }
}
