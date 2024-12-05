import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const WORD_KEY = {
    WORD: "word", 
    MEAN: "mean",
    WREAD: "wread",
    SYNONYMS: "synonyms",
    SYNONYM: "synonym"
}

const store = set => ({
    wordList: {
        words:[],
        page:{
            current: 0
        }
    },
    previousWordList: [],
    preventDisableFunc: () => {},
    setPreventDisableFunc: (func) => {
        set(() => ({
            preventDisableFunc: func
        }))
    },
    savePreviousWordList: () => {
        set((state) => ({
            previousWordList: state.wordList
        }));
    },
    wordListRestore: () => {
        set((state) => ({
            wordList: state.previousWordList,
            previousWordList: [],
        }))
    },
    saveList: {
        "user_id": "",
        "word": "",
        "mean": "",
        "wread": "",
        "memo": "",
        "memorization": "N",
        "synonyms": [{
            "synonym": "",
            "memo": ""
        }],
        "folder_id": "",
    },
    storeFolderList: [
        {
            "folder_id" : null,
            "folder_name": "",
            "background": "",
            "color": "",
            "memo": ""
        }
    ],
    update: true,
    /**
     * @param {*} wordList 전체 word데이터 리스트
     * @Description 전체 word데이터 저장 (페이지 처음 접속 시 호출)
     * @LastEdit 20230112
     */

    setWordList: (wordListRequest) => {set(() => ({
        wordList: wordListRequest
    }))
    },

    /**
     * 단어 데이터를 추가한다.
     * @param {*} wordList {words: [], page: {}}
     */
    addWordList: (wordList) => {
        set((state) => ({
            wordList: {
                words: [...state.wordList.words, ...wordList.words],
                page: wordList.page,
            }
        }))
    },

    /**
     * @param {bigint} wordId 컴포넌트 Key 값 
     * @param {*} updateList 수정할 전체 word데이터 리스트
     * @Description 수정 데이터 업데이트
     * @LastEdit 20230112
     */

    updateWordList: (wordId, wordListRequest) => set(state => ({
        wordList: state.wordList.words.map(item =>
            item.word_id === wordId
            ? {
                ...wordListRequest 
              }
            : item
        )
    })),

    /**
     * @param {bigint} wordId 컴포넌트 Key 값 
     * @Description 삭제 데이터 업데이트
     * @LastEdit 20230112
     */

    deleteWordList: (wordId) => set (state => ({
        wordList: state.wordList.words.filter(item => item.word_id !== wordId)
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
            "memorization": "N",
            "synonyms": [{
                "synonym": "",
                "memo": ""
            }],
            "folder_id": ""
    }})),

    setUpdateFlag: (flag) => set((state) => ({
        update: flag 
    })),

    updateStart: () => set(() => ({
        update: true 
    })),

    setStoreFolderList: (folderListRequest) => set(state => ({
        storeFolderList: folderListRequest
    })),
})

const wordListStore = create(store);
// const wordListStore = create(devtools(store));

export default wordListStore