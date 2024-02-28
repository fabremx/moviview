import {TMDB_KEY} from "../api/keys";

export const isAMovie = async (id) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=fr&api_key=${TMDB_KEY}`)
        return response.ok
    } catch (error) {
        return false
    }
}