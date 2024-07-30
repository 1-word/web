import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

/**
 * @Description 전체 store 상태 관리
 * @Author 정현경
 * @LastEdit 20230831 로딩 상태 추가
 */


export const COMM_MODE = {
    EDIT: 0,
    SAVE: 1,
    MOVE: 2
}

const useStore = set => ({
    clickedFolder: -1,
    setClickedfolder: (folder_id) => {
        set(()=> ({
            clickedFolder: folder_id
        }));
    },
    folderCog: {
        word_id: -1,
        mode: COMM_MODE.EDIT,
        show: false
    },
    setFolderCog: ({word_id, mode, show}) => {
        set(()=> ({
            folderCog: {
                word_id: word_id ?? -1,
                mode: mode ?? COMM_MODE.MOVE,
                show: show ?? false
            }
        }));
    }
})    

const Store = create(
    useStore
);

export default Store