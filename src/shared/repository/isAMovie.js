import {TmdbAPI} from "../api/tmdb";

export const isAMovie = async (id) => {
    try {
        const response = await TmdbAPI.fetchMovieDetails(id)

        if (response.hasOwnProperty('success')) {
            return response.success
        }

        return true
    } catch (error) {
        return false
    }
}