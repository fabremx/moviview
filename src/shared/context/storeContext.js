import React, {createContext, useEffect, useState} from "react";

export const StoreContext = createContext(null)

export const StoreContextProvider = ({children}) => {
    const [mediaToWatch, setMediaToWatch] = useState(getItem("mediaToWatch"))
    const [watchedMedia, setWatchedMedia] = useState(getItem("watchedMedia"))
    const [snackbar, setSnackbar] = useState({isActive: false})
    const [modal, setModal] = useState({isActive: false})

    // MIGRATION
    useEffect(() => {
        const oldListToWatch = window.localStorage.getItem('moviesToWatch')
        const oldListWatched = window.localStorage.getItem('watchedMovies')

        if (oldListToWatch) {
            console.log(JSON.parse(oldListToWatch))
            const newListToWatch = JSON.parse(oldListToWatch).map((old, index) => ({
                type: "MOVIE",
                id: old.id,
                title: old.originalTitle,
                rating: old.imdbRating || old.rating,
                userRating: old.userRating,
                synopsis: old.synopsis,
                genres: old.genres,
                backgroundSrc: old.backgroundSrc,
                posterSrc: old.posterSrc,
                releaseYear: old.releaseYear,
                runtime: old.runtime,
                actors: Array.isArray(old.actors) ? old.actors : old.actors.split(', '),
                country: old.country,
                director: old.director
            }))
            window.localStorage.setItem('mediaToWatch', JSON.stringify(newListToWatch))
            window.localStorage.removeItem('moviesToWatch')
        }

        if (oldListWatched) {
            const newWatchedList = JSON.parse(oldListWatched).map((old, index) => ({
                type: "MOVIE",
                id: old.id,
                title: old.originalTitle,
                rating: old.imdbRating || old.rating,
                userRating: old.userRating,
                synopsis: old.synopsis,
                genres: old.genres,
                backgroundSrc: old.backgroundSrc,
                posterSrc: old.posterSrc,
                releaseYear: old.releaseYear,
                runtime: old.runtime,
                actors: Array.isArray(old.actors) || !old.actors ? old.actors : old.actors.split(', '),
                country: old.country,
                director: old.director
            }))

            window.localStorage.setItem('watchedMedia', JSON.stringify(newWatchedList));
            window.localStorage.removeItem('watchedMovies')
        }
    }, []);

    function getItem(key) {
        const data = window.localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    return (
        <StoreContext.Provider value={{
            mediaToWatch,
            setMediaToWatch,
            watchedMedia,
            setWatchedMedia,
            snackbar,
            setSnackbar,
            modal,
            setModal
        }}>
            {children}
        </StoreContext.Provider>
    );
}