import {useContext} from "react";
import {StoreContext} from "../shared/context/storeContext";

export const useModal = () => {
    const { modal, setModal } = useContext(StoreContext)

    const displayModal = (callback) => {
        setModal({
            isActive: true,
            callback: callback
        })
    }

    const closeModal = () => {
        setModal({
            isActive: false
        })
    }

    return {
        modal,
        displayModal,
        closeModal
    }
}