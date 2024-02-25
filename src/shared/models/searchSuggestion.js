export class SearchSuggestion {
    adult
    backdrop_path
    id
    name
    original_language
    original_name
    overview
    poster_path
    media_type
    genre_ids
    popularity
    first_air_date
    vote_average
    vote_count
    origin_country

    constructor(suggestion) {
        this.adult = suggestion.adult;
        this.backdrop_path = suggestion.backdrop_path;
        this.id = suggestion.id;
        this.name = suggestion?.name || suggestion?.title;
        this.original_language = suggestion.original_language;
        this.original_name = suggestion?.original_name || suggestion?.original_title;
        this.overview = suggestion.overview;
        this.poster_path = suggestion.poster_path;
        this.media_type = suggestion.media_type;
        this.genre_ids = suggestion.genre_ids;
        this.popularity = suggestion.popularity;
        this.first_air_date = suggestion.first_air_date;
        this.vote_average = suggestion.vote_average;
        this.vote_count = suggestion.vote_count;
        this.origin_country = suggestion.origin_country;
    }
}
