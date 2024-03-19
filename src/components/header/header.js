import React, {useState} from "react";
import searchIcon from "../../shared/images/search-icon.png";
import "./header.scss";
import {SNACKBAR_TYPE} from "../../shared/constants/variables";
import {SearchSuggestions} from "../search-suggestions/search-suggestions";
import {Link} from "react-router-dom";
import {ROUTES} from "../../shared/constants/routes";
import {repository} from "../../shared/repository";
import {useSnackbar} from "../../hooks/useSnackbar";
import {VERSION} from '../../version'

export const Header = () => {
    const {displaySnackbar} = useSnackbar()
    const [searchSuggestions, setSearchSuggestions] = useState([])

    const onSearch = async (event) => {
        try {
            const suggestions = await repository.searchMedia(event.target.value)
            setSearchSuggestions(suggestions)
        } catch (error) {
            displaySnackbar(SNACKBAR_TYPE.ERROR, "Erreur. Impossible de joindre l'API.")
        }
    }

    return (
        <div className="header">
            <span className="header__title">Moviview <span className="header__version">{VERSION}</span></span>


            <div className="header__input">
                <input
                    type="text"
                    placeholder="Rechercher un film, une série ..."
                    onChange={onSearch}
                />

                <img src={searchIcon} alt="search icon"/>
            </div>

            {searchSuggestions.length && (
                <div className="search-suggestions-container">
                    {searchSuggestions.map((suggestion) => (
                        <Link to={{ pathname: `${ROUTES.MEDIA_DETAILS}/${suggestion.id}`, state: { type: suggestion.media_type }}} key={suggestion.id}>
                            <SearchSuggestions suggestion={suggestion} key={suggestion.id}/>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
