import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import connect from '../util/axiosUtil'
import persist from '../util/persist'

/**
 * @Description 전체 store 상태 관리
 * @Author 정현경
 * @LastEdit 20230112
 */

const useStore = set => ({
    modal: false,
    alert: false,
    setModal: (flag) => {
        set((state) => ({
            modal: flag
        }))
    },
    setAlert: (flag) => {
        set((state) => ({
            alert: flag
        }))
    }
})    

const Store = create(
    process.env.NODE_ENV !== 'prod' ? devtools(useStore) : useStore
)

// const wordListStore = create(devtools(store))

export default Store