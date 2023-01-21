import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

/**
 * @Description 전체 store 상태 관리
 * @Author 정현경
 * @LastEdit 20230112
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
    setModal: (flag) => {
        set((state) => ({
            modal: flag
        }))
    },
    setAlert: (alertRequest) => {
        set((state) => ({
            alert: alertRequest
        }))
    }
})    

const Store = create(
    process.env.NODE_ENV !== 'prod' ? devtools(useStore) : useStore
)

export default Store