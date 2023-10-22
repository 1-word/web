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
    alert: {
        show: false,
        type: ALERT_TYPE.confirm,
        msgType: ALERT_TYPE.SUCCESS,
        message: "",
        component: <></>,
        title: "",
        content: "",
        executionFunction: ()=>{},
        closeFunction: ()=>{}
    },
    setAlert: (obj) => {
        set((state) => ({
            alert : {
                ...state,
                type: obj?.type,
                show: obj?.show,
                msgType: obj?.msgType,
                message: obj?.message,
                title: obj?.title,
                content: obj?.content,
                component: obj?.component,
                executionFunction: obj?.executionFunction,
                closeFunction: obj?.closeFunction
            }
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