import {TmdbAPI} from "../api/tmdb";
import {SearchSuggestion} from "../models/searchSuggestion";
import {MEDIA_TYPE} from "../constants/variables";

export const searchMedia = async (search) => {
    const response = await TmdbAPI.search(search)

    return response.results && response.results.length
        ? response.results
            .filter((suggestion) => suggestion.media_type === MEDIA_TYPE.SERIES || suggestion.media_type === MEDIA_TYPE.MOVIES)
            .map((suggestion) => new SearchSuggestion(suggestion))
        : [];
}