import { create } from 'zustand'

export const ALERT_TYPE = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    PRIMARY: "primary",
    SECONDARY: "secondary",
    INFO: "info",
    MSG: "msg",
    CONFIRM: "confirm",
    LOADING: "loading"
}

const useStore = set => ({
    loading: false,
    setLoading: (flag) => {
        set(() => ({
            loading : flag
        }));
    },
    openedModals: [],
    addModal: (modal) => {
        set((modals) => ({
            openedModals: [...modals.openedModals, modal]
        }))
    },
    deleteModal: (itemIndex) => {
        set((modals) => ({
           openedModals: modals.openedModals.filter((value, index) => index !== itemIndex)
        }))
    }
});

const ModalStore = create(
    useStore
);

export default ModalStore