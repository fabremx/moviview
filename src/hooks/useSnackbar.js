import {useContext} from "react";
import {StoreContext} from "../shared/context/storeContext";

export const useSnackbar = () => {
    const { snackbar, setSnackbar } = useContext(StoreContext)

    const displaySnackbar = (type, message) => {
        const TIME_DISPLAYING_SNACKBAR = 3000

        setSnackbar({
            isActive: true,
            type: type,
            message: message
        })

        setTimeout(closeSnackbar, TIME_DISPLAYING_SNACKBAR);
    }

    const closeSnackbar = () => {
        setSnackbar({
            isActive: false
        })
    }

    return {
        snackbar,
        displaySnackbar,
        closeSnackbar
    }
}