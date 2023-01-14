import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const INPUT_NAME = {
    WORD_INPUT: "word_input", 
    MEAN_INPUT: "mean_input",
    WREAD_INPUT: "wread_input",
    SYNONYM_INPUT: "synonym_input"
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
    saveList: {"word": "",
        "mean": "",
        "wread": "",
        "memo": "",
        "synonyms": [{
            "synonym": "",
            "memo": ""
        }]
    },

    /**
     * @param {*} wordList (Object) 전체 word데이터 리스트
     * @returns 
     * @Description 전체 word데이터 저장 (페이지 처음 접속 시 호출)
     * @LastEdit 20230112
     */

    createWordList: (wordListRequest) => {set(() => ({
        wordList: [...wordListRequest]
    }))
    console.log("hello")
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
        saveList: {"word": "",
            "mean": "",
            "wread": "",
            "memo": "",
            "synonyms": [{
                "synonym": "",
                "memo": ""
            }]
    }}))
})

const wordListStore = create(
    process.env.NODE_ENV !== 'prod' ? devtools(store) : store
)

// const wordListStore = create(devtools(store))

export default wordListStore