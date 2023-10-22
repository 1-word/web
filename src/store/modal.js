import { create } from 'zustand'

const useStore = set => ({
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