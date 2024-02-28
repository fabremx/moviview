import React, {useEffect, useState} from "react";
import "./watched-movies.scss";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import MovieRating from "../../components/movie-rating/movie-rating";
import SearchSuggestions from "../../components/search-suggestions/search-suggestions";
import {MOVIE_DETAILS_ROUTE, MOVIES_TO_WATCH_ROUTE} from "../../shared/constants/routes";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import ModalDelete from "../../components/modal-delete/modal-delete";
import {SLIDE_DIRECTION, useSlider} from "../../hooks/handleSlide";

const WatchedMoviesPage = ({ watchedMovies }) => {
    const [searchSuggestions, setSearchSuggestions] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {slideDirection} = useSlider()

    useEffect(() => {
        if (slideDirection === SLIDE_DIRECTION.LEFT) {
            window.location.href = MOVIES_TO_WATCH_ROUTE
        }
    }, [slideDirection]);

    const handleSearchSuggestion = (moviesSuggestions) => {
        setSearchSuggestions(moviesSuggestions)
    };

    const toggleDeleteModal = () => {
        setIsModalOpen((prevState) => !prevState);
    };

    return (
        <div id="movie-watched-page">
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

            <div className="watched-movies-container">
                <div className="watched-movies-container__title">Films vus</div>
                {!watchedMovies.length && (
                    <p className="watched-movies--no-movies">
                        Aucun film(s) vu(s) présent dans la liste
                    </p>
                )}
                {watchedMovies.map((movie, index) => (
                    <MovieRating
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
    watchedMovies: state.watchedMovies,
});

export default connect(mapStateToProps, null)(WatchedMoviesPage);
