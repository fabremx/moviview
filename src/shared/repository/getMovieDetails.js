import {TmdbAPI} from "../api/tmdb";
import {OmdbAPI} from "../api/omdb";
import {Movie} from "../models/movie";

export const getMovieDetails = async (id) => {
    const tmdbDetails = await TmdbAPI.fetchMovieDetails(id)
    const omdbDetails = await OmdbAPI.fetchDetails(tmdbDetails.imdb_id)

    return new Movie({ ...omdbDetails, ...tmdbDetails })
}