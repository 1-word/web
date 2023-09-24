import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

/**
 * @Description 전체 store 상태 관리
 * @Author 정현경
 * @LastEdit 20230831 로딩 상태 추가
 */

export const ALERT_TYPE = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    PRIMARY: "primary",
    SECONDARY: "secondary",
    INFO: "info"
}

export const MEMORIZATION_TYPE = {
    ALL: "all",
    MEMORIZATION: "memorization",
    MEMORIZATION_PERIOD: "memorizationPeriod"
}

export const COMM_MODE = {
    EDIT: 0,
    SAVE: 1,
    MOVE: 2
}

const useStore = set => ({
    modal: false,
    alert: {
        show: false,
        type: ALERT_TYPE.SUCCESS,
        message: "성공",
    },
    loading: false,
    confirm: {
        title: "확인",
        content: "정말 삭제하시겠습니까?",
        show: false,
        executionFunction: function(){

        },
        closeFunction: function(){
        }
    },
    colorPick: false,
    colorPickPop: {
        modal: {
            show: false,
            mode: COMM_MODE.EDIT
        },
        folderData: {
            folder_id: -1,
            folder_name: "",
            color: "",
            background: "",
        }
    },
    memorization: MEMORIZATION_TYPE.ALL,
    clickedFolder: -1,
    folderCog: {
        word_id: -1,
        mode: COMM_MODE.EDIT,
        show: false
    },
    setModal: (flag) => {
        set(() => ({
            modal: flag
        }));
    },
    setAlert: (alertRequest) => {
        set(() => ({
            alert: alertRequest
        }));
    },
    setLoading: (flag) => {
        set((state) => ({
            loading : flag
        }));
    },
    setConfirm: ({title, content, show, executionFunction, closeFunction}) => {
        set(() => ({
            confirm : {
                title: title,
                content: content,
                show: show,
                executionFunction: executionFunction,
                closeFunction: closeFunction
            }
        }));
    },
    setColorPickModal: (flag) => {
        set(() => ({
            colorPick: flag
        }));
    },
    setMemorization: (memorizationType) => {
        set(() => ({
            memorization: memorizationType
        }));
    },
    setClickedfolder: (folder_id) => {
        set(()=> ({
            clickedFolder: folder_id
        }));
    },
    setFolderCog: ({word_id, mode, show}) => {
        set(()=> ({
            folderCog: {
                word_id: word_id ?? -1,
                mode: mode ?? COMM_MODE.MOVE,
                show: show ?? false
            }
        }));
    },
    setColorPickPop: ({folder_id, folder_name, color, background, mode, show}) => {
        set(()=> ({
            colorPickPop:{
                modal: {
                    show: show ?? false,
                    mode: mode ?? COMM_MODE.SAVE
                },
                folderData: {
                    folder_id: folder_id ?? -1,
                    folder_name: folder_name ?? "",
                    color: color ?? "",
                    background: background ?? ""
                }
            }
        }));
    }
})    

const Store = create(
    useStore
);

export default Store