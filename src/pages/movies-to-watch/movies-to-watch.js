import React, {useEffect, useState} from "react";
import "./movies-to-watch.scss";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SearchSuggestions from "../../components/search-suggestions/search-suggestions";
import {MOVIE_DETAILS_ROUTE, WATCHED_MOVIES_ROUTE} from "../../shared/constants/routes";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import MovieSuggestion from "../../components/movie-suggestion/movie-suggestion";
import ModalDelete from "../../components/modal-delete/modal-delete";
import {SearchSuggestion} from "../../shared/models/searchSuggestion";
import {SLIDE_DIRECTION, useSlider} from "../../hooks/handleSlide";

const MoviesToWatchPage = ({moviesToWatch}) => {
    const [searchSuggestions, setSearchSuggestions] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {slideDirection} = useSlider()

    useEffect(() => {
        if (slideDirection === SLIDE_DIRECTION.RIGHT) {
            window.location.href = WATCHED_MOVIES_ROUTE
        }
    }, [slideDirection]);

    const handleSearchSuggestion = (moviesSuggestions) => {
        setSearchSuggestions(moviesSuggestions.map((suggestion) => new SearchSuggestion(suggestion)))
    };

    const toggleDeleteModal = () => {
        setIsModalOpen((prevState) => !prevState);
    };

    return (
        <div id="movies-to-watch-page">
            <Header onSearchMovie={handleSearchSuggestion}/>

            {searchSuggestions.length && (
                <div className="search-suggestions-container">
                    {searchSuggestions.map((movie) => (
                        <Link to={MOVIE_DETAILS_ROUTE + "/" + movie.id} key={movie.id}>
                            <SearchSuggestions movie={movie} key={movie.id}/>
                        </Link>
                    ))}
                </div>
            )}

            <div className="movies-to-watch-container">
                <div className="movies-to-watch-container__title">Films à voir</div>
                {!moviesToWatch.length && (
                    <p className="movies-to-watch--no-movies">
                        Aucun film(s) à voir présent dans la liste
                    </p>
                )}

                {moviesToWatch.map((movie, index) => (
                    <MovieSuggestion
                        movie={movie}
                        key={index}
                        onToggleDeleteModal={toggleDeleteModal}
                    />
                ))}
            </div>

            <ModalDelete
                show={isModalOpen}
                onCloseModal={toggleDeleteModal}
            />

            <Footer/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    moviesToWatch: state.moviesToWatch,
});

export default connect(mapStateToProps)(MoviesToWatchPage);
