import React from "react";
import "./search-suggestions.scss";
import utils from "../../shared/utils";

export const SearchSuggestions = ({suggestion}) => {
    const displayOriginalTitle = () => {
        if (
            suggestion.original_name.toLowerCase() ===
            suggestion.name.toLowerCase()
        ) {
            return;
        }

        return (
            <span className="search-suggestion__title--original-title">
        ({suggestion.original_name})
      </span>
        );
    }

    const getYearOf = (date) => {
        return date ? date.split("-")[0] : null;
    }

    return (
        <div className="search-suggestion">
            <div className="search-suggestion__img">
                <img
                    src={utils.getMediaPoster(suggestion.poster_path)}
                    alt={suggestion.name}
                />
            </div>

            <div className="search-suggestion__info">
                <span className="search-suggestion__title">
                    {suggestion.name} {displayOriginalTitle()}
                </span>

                <span className="search-suggestion__release">
                    Année de sortie: {getYearOf(suggestion.releaasYear)}
                </span>
            </div>
        </div>
    )
}
