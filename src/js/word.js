import connect, {connect2, CONNECT_MODE} from "../util/axiosUtil"

export const MODE = {
    READ: "read",
    SEARCH_ALL: "all",
    SEARCH: "search",
    DELETE: "delete",
    UPDATE: "update",
    OPEN: "open",
    CLOSE: "close",
    LOGIN: "login",
    PLUS_BTN: "plus_btn",
    MINUS_BTN: "minus_btn"
}

const clickMap = {
    async read(){
        return await executeSrvConnect(CONNECT_MODE.READ)
    },
    all(){
        
    },
    search(){

    },
    delete(e, data, func){
        func()
    },
    update(){
        
    },
    open(){

    },
    close(){

    },
    async login(e, user){
        return await connect("POST", "api/login","", user)
    }
}

async function executeSrvConnect(connectMode, data){
    return await connect2(connectMode, data)
    try {

    } catch (error) {
        console.log(error)
    }
}

/**
 * 
 * @param {*} e 이벤트가 일어난 객체
 * @param {*} modeType 함수명
 * @param {*} data 데이터
 * @param {*} func 실행시킬 함수
 * @returns modeType명의 함수 결과
 */
export function btnClick(e, modeType, data, func){
    return clickMap[modeType](e, data, func)
}