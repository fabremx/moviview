import {TmdbAPI} from "../api/tmdb";
import {OmdbAPI} from "../api/omdb";
import {Serie} from "../models/serie";

export const getSerieDetails = async (id) => {
    const tmdbDetails = await TmdbAPI.fetchSerieDetails(id)
    const externalIDs = await TmdbAPI.fetchSerieExternalIDs(id)
    const omdbDetails = await OmdbAPI.fetchDetails(externalIDs.imdb_id)

    return new Serie({ ...tmdbDetails, ...omdbDetails, imdbId: externalIDs.imdb_id })
}