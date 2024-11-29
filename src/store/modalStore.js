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
    /**
     * 로딩 컴포넌트 출력 여부
     * @param {true | false} flag 로딩 여부
     */
    setLoading: (flag) => {
        set(() => ({
            loading : flag
        }));
    },
    openedModals: [],
    /**
     * 모달을 추가한다.
     * @param {object} modal 추가할 모달
     */
    addModal: (modal) => {
        set((modals) => ({
            openedModals: [...modals.openedModals, modal]
        }))
    },
    /**
     * 모달이 열리면 다시 열리는 것을 방지
     * @param {int} id 모달 아이디
     */
    setOpenModal: (id) => {
        set((modals) => ({
            openedModals: modals.openedModals.map((item, idx) => 
                idx === id? {
                    ...item,
                    isOpened: true,
                }
                : item
            )
        }))
    },
    /**
     * 모달 index에 해당하는 모달 삭제
     * @param {int} itemIndex 모달 인덱스
     */
    deleteModal: (itemIndex) => {
        set((modals) => ({
           openedModals: modals.openedModals.filter((value, index) => index !== itemIndex)
        }))
    },
    /**
     * 모달 id에 해당하는 모달 삭제
     * @param {int} id 모달 아이디
     */
    deleteModalById: (id) => {
        set((modals) => ({
                openedModals: modals.openedModals.filter((value, index) => value.id !== id)
        }))
	},
    /**
     * 모든 모달 삭제
     */
    deleteAllModal: () => {
        set(() => ({
            openedModals: [],
        }))
    }
});

const ModalStore = create(
    useStore
);

export default ModalStore