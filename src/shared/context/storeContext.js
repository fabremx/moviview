import React, {createContext, useState} from "react";

export const StoreContext = createContext(null)

export const StoreContextProvider = ({ children }) => {
    const [mediaToWatch, setMediaToWatch] = useState(getItem("mediaToWatch"))
    const [watchedMedia, setWatchedMedia] = useState(getItem("watchedMedia"))
    const [snackbar, setSnackbar] = useState({ isActive: false })
    const [modal, setModal] = useState({ isActive: false })

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
            { children }
        </StoreContext.Provider>
    );
}