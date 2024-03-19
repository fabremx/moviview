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

    constructor(movie) {
        this.type = 'MOVIE'
        this.id = movie.id;
        this.imdbId = movie.imdbId;
        this.title = movie.title;
        this.originalTitle = movie.originalTitle;
        this.rating = movie.vote_average?.toFixed(1);
        this.userRating = null;
        this.synopsis =  movie.overview;
        this.genres =  movie.genres;
        this.backgroundSrc = movie.backdrop_path;
        this.posterSrc = movie.poster_path;
        this.releaseYear = movie.release_date?.split('-')[0];
        this.runtime = movie.runtime;

        this.actors = movie.Actors?.split(', ')
        this.country = movie.Country
        this.director = movie.Director
    }
}
