export class Movie {
    type;
    id;
    imdbId;
    title;
    originalTitle;
    rating;
    userRating;
    genres;
    backgroundSrc;
    posterSrc;
    releaseYear;
    runtime;
    synopsis;
    actors;
    country;
    director;

    constructor(movieDetail) {
        this.type = 'MOVIE'
        this.id = movieDetail.id;
        this.imdbId = movieDetail.imdbId;
        this.title = movieDetail.title;
        this.originalTitle = movieDetail.originalTitle;
        this.rating = movieDetail.vote_average;
        this.userRating = null;
        this.synopsis =  movieDetail.overview;
        this.genres =  movieDetail.genres;
        this.backgroundSrc = movieDetail.backdrop_path;
        this.posterSrc = movieDetail.poster_path;
        this.releaseYear = movieDetail.release_date.split('-')[0];
        this.runtime = movieDetail.runtime;

        this.actors = movieDetail.Actors.split(', ')
        this.country = movieDetail.Country
        this.director = movieDetail.Director
    }
}
