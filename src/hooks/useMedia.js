import {useContext} from "react";
import {StoreContext} from "../shared/context/storeContext";

export const useMedia = () => {
    const { mediaToWatch, setMediaToWatch, watchedMedia, setWatchedMedia } = useContext(StoreContext)

    const addMediaToWatch = (movie) => {
        const newList = [movie, ...mediaToWatch]

        setMediaToWatch(newList)
        window.localStorage.setItem("mediaToWatch", JSON.stringify(newList))
    }
    const addWatchedMedia = (movie) => {
        const newList = [movie, ...watchedMedia]

        setWatchedMedia(newList)
        window.localStorage.setItem("watchedMedia", JSON.stringify(newList))
    }

    const updateWatchedMediaRating = (id, rating) => {
        const newList = watchedMedia.map((movie) => {
            return movie.id === +id
                ? { ...movie, userRating: rating }
                : movie
        })

        setWatchedMedia(newList)
        window.localStorage.setItem("watchedMedia", JSON.stringify(newList))
    }

    const removeMediaToWatch = (id) => {
        const newList = mediaToWatch.filter((movie) => movie.id !== +id)

        setMediaToWatch(newList)
        window.localStorage.setItem("mediaToWatch", JSON.stringify(newList))
    }
    const removeWatchedMedia = (id) => {
        const newList = watchedMedia.filter((movie) => movie.id !== +id)

        setWatchedMedia(newList)
        window.localStorage.setItem("watchedMedia", JSON.stringify(newList))
    }

    const getMediaFromLists = (id) => {
        return [
            ...mediaToWatch,
            ...watchedMedia
        ].find((movie) => movie.id === +id)
    }
    const isMediaInLists = (id) => {
        return [
            ...mediaToWatch,
            ...watchedMedia
        ].some((movie) => movie.id === +id)
    }

    const isMediaToWatch = (id) => {
        return mediaToWatch.some((movie) => movie.id === +id)
    }
    const isWatchedMedia = (id) => {
        return watchedMedia.some((movie) => movie.id === +id)
    }

    return {
        mediaToWatch,
        watchedMedia,
        addMediaToWatch,
        addWatchedMedia,
        updateWatchedMediaRating,
        removeMediaToWatch,
        removeWatchedMedia,
        getMediaFromLists,
        isMediaInLists,
        isMediaToWatch,
        isWatchedMedia
    }
}