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
    setModal: (flag) => {
        set((state) => ({
            modal: flag
        }))
    },
    authStore
})    

const store = create(
    process.env.NODE_ENV !== 'prod' ? devtools(useStore) : useStore
)

// const wordListStore = create(devtools(store))

export default store