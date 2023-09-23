import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const WORD_KEY = {
    WORD: "word", 
    MEAN: "mean",
    WREAD: "wread",
    SYNONYMS: "synonyms",
    SYNONYM: "synonym"
}

/**
 * @Description WordList 상태 관리
 * @Author 정현경
 * @LastEdit 20230112
 */


const store = set => ({
    wordList: [{
            "word_id": 0,
            "word": "",
            "mean": "",
            "wread": "",
            "memo": "",
            "soundPath": "",
            "memorization": "",
            "update_time": "",
            "synonyms": [
                {
                    "synonym_id": 0,
                    "synonym": "",
                    "memo": ""
                },
                {
                    "synonym_id": 0,
                    "synonym": "",
                    "memo": ""
                }
            ]
        }
    ],
    saveList: {
        "user_id": "",
        "word": "",
        "mean": "",
        "wread": "",
        "memo": "",
        "synonyms": [{
            "synonym": "",
            "memo": ""
        }],
        "folder_id": "",
    },
    folderList: [
        {
            "folder_id" : 0,
            "folder_name": "",
            "background": "",
            "color": "",
            "memo": ""
        }
    ],
    memoStatus: {
        0: {
            "status": "OFF",
            "memo": ""
        }
    },
    update: false,
    /**
     * @param {*} wordList (Object) 전체 word데이터 리스트
     * @returns 
     * @Description 전체 word데이터 저장 (페이지 처음 접속 시 호출)
     * @LastEdit 20230112
     */

    createWordList: (wordListRequest) => {set(() => ({
        wordList: wordListRequest
    }))
    },

    /**
     * @param {*} wordId(int) 컴포넌트 Key 값 
     * @param {*} updateList(Object) 수정할 전체 word데이터 리스트
     * @returns 
     * @Description 수정 데이터 업데이트
     * @LastEdit 20230112
     */

    updateWordList: (wordId, wordListRequest) => set(state => ({
        wordList: state.wordList.map(item =>
            item.word_id === wordId
            ? {
                ...wordListRequest 
              }
            : item
        )
    })),

    /**
     * @param {*} wordId(int) 컴포넌트 Key 값 
     * @returns 
     * @Description 삭제 데이터 업데이트
     * @LastEdit 20230112
     */

    deleteWordList: (wordId) => set (state => ({
        wordList: state.wordList.filter(item => item.word_id !== wordId)
    })),

    saveWordList: (saveListRequest) => set(state => ({
        saveList: saveListRequest
    })),

    saveListClear: () => set(() => ({
        saveList: {
            "user_id": "",
            "word": "",
            "mean": "",
            "wread": "",
            "memo": "",
            "synonyms": [{
                "synonym": "",
                "memo": ""
            }],
            "folder_id": ""
    }})),

    setUpdateFlag: () => set((state) => ({
        update: !state.update
    })),

    setFolderList: (folderListRequest) => set(state => ({
        folderList: folderListRequest
    })),

    setMemoStatus: ({id, status, memo}) => set(state => ({
        memoStatus: {
            ...state.memoStatus,
            [id]: {
                "status": status,
                "memo": memo
            }
        }
    })),

    setMemoStatusInit: () => set(() => ({
        memoStatus: {}
    })),
})

const wordListStore = create(store);
// const wordListStore = create(devtools(store));

export default wordListStore