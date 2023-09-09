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

const useStore = set => ({
    modal: false,
    // alert: false,
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
    setModal: (flag) => {
        set((state) => ({
            modal: flag
        }))
    },
    setAlert: (alertRequest) => {
        set((state) => ({
            alert: alertRequest
        }))
    },
    setLoading: (flag) => {
        set((state) => ({
            loading : flag
        }))
    },
    setConfirm: ({title, content, show, executionFunction, closeFunction}) => {
        set((state) => ({
            confirm : {
                title: title,
                content: content,
                show: show,
                executionFunction: executionFunction,
                closeFunction: closeFunction
            }
        }))
    },
    setColorPickModal: (flag) => {
        set((state) => ({
            colorPick: flag
        }))
    }
})    

const Store = create(
    useStore
)

export default Store