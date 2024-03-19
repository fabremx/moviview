export class Serie {
    type;
    id;
    title;
    originalTitle;
    rating;
    userRating;
    genres;
    backgroundSrc;
    posterSrc;
    releaseYear;
    seasonsNumber;
    episodesNumber;
    synopsis;
    actors;
    country;
    director;

    constructor(serie) {
        this.type = 'SERIE'
        this.id = serie.id;
        this.imdbId = serie.imdbId;
        this.title = serie.name;
        this.originalTitle = serie.original_name;
        this.rating = serie.vote_average?.toFixed(1);
        this.userRating = null;
        this.synopsis =  serie.overview;
        this.genres =  serie.genres;
        this.backgroundSrc = serie.backdrop_path;
        this.posterSrc = serie.poster_path;
        this.releaseYear = serie.first_air_date?.split('-')[0];
        this.seasonsNumber = serie.number_of_episodes
        this.episodesNumber = serie.number_of_seasons

        this.actors = serie.Actors?.split(', ')
        this.country = serie.Country
        this.director = serie.Director
    }
}
