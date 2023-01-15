import connect, {CONNECT_MODE} from "../util/axiosUtil"

export const MODE = {
    READ: "read",
    SEARCH_ALL: "all",
    SEARCH: "search",
    DELETE: "delete",
    UPDATE: "update",
    SAVE: "save",
    OPEN: "open",
    CLOSE: "close",
    LOGIN: "login",
    PLUS_BTN: "plus_btn",
    MINUS_BTN: "minus_btn"
}

const clickMap = {
    read(){
        return executeSrvConnect(CONNECT_MODE.READ)
    },
    all(){
        return executeSrvConnect(CONNECT_MODE.SEARCH, MODE.SEARCH_ALL)  
    },
    search(e, text){
        return executeSrvConnect(CONNECT_MODE.SEARCH, text)
    },
    delete(e, id){
        return executeSrvConnect(CONNECT_MODE.DELETE, id)
    },
    update(){
        
    },
    save(e, data){
        return executeSrvConnect(CONNECT_MODE.SAVE, "", data)
    },
    open(){

    },
    close(){

    },
    login(e, user){
        return executeSrvConnect(CONNECT_MODE.LOGIN, "", user)
    }
}

async function executeSrvConnect(connectMode, id, data){
    try {
        return await connect(connectMode, "", id, data)
    } catch (error) {
        console.log(error)
        return error
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