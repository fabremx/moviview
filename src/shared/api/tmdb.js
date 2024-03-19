import {TMDB_KEY} from "./keys";

const fetchMovieExternalIDs = async (movieId) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/external_ids?language=fr&api_key=${TMDB_KEY}`)
        return await response.json()
    } catch (error) {
        console.error('Unable to fetch movie external Ids from TMDB')
    }
}

const fetchMovieDetails = async (movieId) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=fr&api_key=${TMDB_KEY}`)
        return await response.json()
    } catch (error) {
        console.error('Unable to fetch movie details from TMDB')
    }
}

const search = async (searchInput) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?language=fr&api_key=${TMDB_KEY}&query=${searchInput}`)
        return await response.json()
    } catch (error) {
        console.error('Unable to search movies or series from TMDB')
    }
}

const fetchSerieExternalIDs = async (serieId) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${serieId}/external_ids?language=fr&api_key=${TMDB_KEY}`)
        return await response.json()
    } catch (error) {
        console.error('Unable to fetch serie external Ids from TMDB')
    }
}

const fetchSerieDetails = async (serieId) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${serieId}?language=fr&api_key=${TMDB_KEY}`)
        return await response.json()
    } catch (error) {
        console.error('Unable to fetch serie details from TMDB')
    }
}

export const TmdbAPI = {
    search,
    fetchMovieExternalIDs,
    fetchMovieDetails,
    fetchSerieExternalIDs,
    fetchSerieDetails
}