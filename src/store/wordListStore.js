import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const WORD_KEY = {
    WORD: "word", 
    MEAN: "mean",
    WREAD: "wread",
    SYNONYMS: "synonyms",
    SYNONYM: "synonym"
}

export const WORD_MODE = {
    READ: "READ",
    SEARCH: "SEARCH",
    UPDATE: "UPDATE"
}

/**
 * @Description WordList 상태 관리
 * @Author 정현경
 * @LastEdit 20230112
 */


const store = set => ({
    wordList: [{
        "word_id": 0,
        "type": "",
        "word": "",
        "mean": "",
        "read": "",
        "memo": "",
        "soundPath": "",
        "memorization": "",
        "update_time": "",
        "details": [
            {
                "detail_id": 0,
                "title": {
                    "title_id": 0,
                    "title_name": "",
                },
                "content": "",
                "memo": "",
                "subs": [{
                    "detail_sub_id": 0,
                    "title": {
                        "title_id": 0,
                        "title_name": "",
                    },
                    "content": "",
                    "memo": "" 
                }]
            }
        ]
    }],
    /**
     * 검색 모드일 때 임시로 단어 저장, 조회 모드로 변경되면 해당 리스트로 변경
     */
    preWordList: {},
    prePage : {},
    setPreWordList: () => set((state) => ({
        page:{
            ...state.page,
            lastWid: -1,
            next: 0,
        },
        preWordList: state.wordList,
        prePage: state.page
    })),
    /**
     * 페이징 처리를 위한 변수 선언
     */
    page: {
        current: 0,
        next: 0,
        hasNext: true,
        lastWid: -1,
        obsActivate: () => {},
        obsEndUpdate: () => {}
    },
    setPage: (page) => set((state) => ({
        page: {...state.page, ...page}
    })),
    setPageObsActivate: ({obsActivate: activateFunc, obsEndUpdate: endUpdateFunc}) => set((state) => ({
        page: {
            ...state.page,
            obsActivate: activateFunc,
            obsEndUpdate: endUpdateFunc
        }
    })),
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
    searchText: "",
    setSearchText: (text) => set(()=> ({
        searchText: text
    })),
    searchItem: {
        text: "",
        memorization: "",
        language: ""
    },
    setSearchItem: (item) => set((state) => ({
        searchItem: {
            ...state.searchItem,
            ...item
        }
    })),
    update: false,
    mode: "READ",
    /**
     * 단어 조회, 검색, 수정 모드 설정
     * READ: 조회
     * SEARCH: 검색, 
     * UPDATE: 수정, 조회API 호출X
     */
    setMode: (mode) => set(()=> ({
        mode: mode
    })),
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

    addWordList: (wordListRequest) => set((pre) => ({
        wordList: [...pre.wordList, ...wordListRequest]
    })),

    /**
     * 수정 데이터 업데이트
     * @param {int} wordId 컴포넌트 Key 값 
     * @param {object} wordListRequest updateList() 수정할 전체 word데이터 리스트
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
     * 삭제 데이터 업데이트
     * @param {int} wordId(int) 컴포넌트 Key 값  
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
            "memorization": "N",
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