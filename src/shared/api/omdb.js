import {OMDB_KEY} from "./keys";
import {OMDB_URL} from "./urls";

const fetchDetails = async (imdbId) => {
    try {
        const response = await fetch(`${OMDB_URL}?apikey=${OMDB_KEY}&i=${imdbId}`)
        return await response.json()
    } catch (error) {
        console.error('Unable to fetch media external Ids from TMDB')
    }
}

export const OmdbAPI = {
    fetchDetails
}