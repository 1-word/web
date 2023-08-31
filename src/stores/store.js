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
    }
})    

const Store = create(
    useStore
)

export default Store