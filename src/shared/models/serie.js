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

    constructor(serieDetail) {
        this.type = 'SERIE'
        this.id = serieDetail.id;
        this.imdbId = serieDetail.imdbId;
        this.title = serieDetail.name;
        this.originalTitle = serieDetail.original_name;
        this.rating = serieDetail.vote_average;
        this.userRating = null;
        this.synopsis =  serieDetail.overview;
        this.genres =  serieDetail.genres;
        this.backgroundSrc = serieDetail.backdrop_path;
        this.posterSrc = serieDetail.poster_path;
        this.releaseYear = serieDetail.first_air_date.split('-')[0];
        this.seasonsNumber = serieDetail.number_of_episodes
        this.episodesNumber = serieDetail.number_of_seasons

        this.actors = serieDetail.Actors.split(', ')
        this.country = serieDetail.Country
        this.director = serieDetail.Director
    }
}
