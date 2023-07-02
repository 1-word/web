import connect, {CONNECT_MODE} from "../util/axiosUtil"
import Store, {ALERT_TYPE} from "../stores/store"
import wordListStore from "../stores/wordListStore"
import authStore from "../stores/authStore"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router"

export const MODE = {
    READ: "read",
    SEARCH_ALL: "all",
    SEARCH: "search",
    DELETE: "delete",
    UPDATE: "update",
    SAVE: "save",
    LOGIN: "login",
    OPEN: "open",
    CLOSE: "close",
    PLUS_BTN: "plus_btn",
    MINUS_BTN: "minus_btn",
    SAVE_BTN: "save_btn",
    ALERT: "alert",
    AUDIO_PLAY: "audio_play",
    MEMO_BTN: "memo_btn",
    UPDATE_MEMO: "updateMemo"
}

/**
 * 
 * @param {*} e 이벤트가 일어난 객체
 * @param {*} modeType 함수명
 * @param {*} data 데이터
 * @param {*} func 실행시킬 함수
 * @returns modeType명의 함수 결과
 * @Description useEvntHandler()를 
 */
function useEvntHandler(e, modeType, data, func){
    
    const {update, wordList, createWordList, setUpdateFlag, saveListClear} = wordListStore(state => state)
    const {modal, alert, setModal, setAlert} = Store(state=>state)
    const {token, user_id, save, saveToken, clearToken} = authStore(state=>state)
    const navigate = useNavigate()

    const handlerMap = {
    async read(e, data, func){
        const res = await executeSrvConnect(CONNECT_MODE.READ)
        if (!dataCheck(res)) return
        createWordList(res.list);
        setAlertState(alert, ALERT_TYPE.SUCCESS, "성공적으로 데이터를 불러왔습니다.")
        return res
    },
    all(){
        return executeSrvConnect(CONNECT_MODE.SEARCH, MODE.SEARCH_ALL)
    },
    async search(e, data){
        const res = await executeSrvConnect(CONNECT_MODE.SEARCH, "", data)
        if (!dataCheck(res)) return

        let wordListrequest = res.list
        // 검색한 단어가 한개이면 배열이 아니므로 배열로 만들어줌
        if(Array.isArray(wordListrequest)) return createWordList(wordListrequest)
        let arr = []
        arr.push(wordListrequest)
        createWordList(arr)
        return arr
    },
    async delete(e, id){
        let res = await executeSrvConnect(CONNECT_MODE.DELETE, id)
        setUpdateFlag();    //update state변경, 변경 시 useEffect() 실행
        return res
    },
    async update(e, id){
        let res = await executeSrvConnect(CONNECT_MODE.UPDATE, id)
        setUpdateFlag();    //update state변경, 변경 시 useEffect() 실행
        setAlertState(alert, ALERT_TYPE.SUCCESS, "성공적으로 데이터를 저장했습니다.")
    },
    async updateMemo(e, id, data){
        let res = await executeSrvConnect(CONNECT_MODE.UPDATE_MEMO, id, data)
        setUpdateFlag();    //update state변경, 변경 시 useEffect() 실행
        setAlertState(alert, ALERT_TYPE.SUCCESS, "성공적으로 데이터를 저장했습니다.")
    },
    async save(e, data, closePopup){
        data.user_id = user_id
        let res = await executeSrvConnect(CONNECT_MODE.SAVE, '', data)
        saveListClear()
        setUpdateFlag()
        closePopup()
        return res
    },
    open(){

    },
    close(){

    },
    async login(e, user){
        const res = await executeSrvConnect(CONNECT_MODE.LOGIN, '', user)
        if(res.code === 6006) {
            setAlertState(alert, ALERT_TYPE.WARNING, res.msg)
            clearToken()
            return
        }
        save(res)
        let data = {
            "refreshToken": res.data.refreshToken,
            "accessToken": res.data.accessToken
        }
        saveToken(data, user.user_id)
        setAlertState(alert, ALERT_TYPE.SUCCESS, "로그인 성공")
        navigate("/word")
    },
    audio_play(e, data, endFunc){
        const audio = new Audio()
        const soundUrl = process.env.PUBLIC_URL + '/pronu/' + data.sound_path + '.mp3'
        audio.src = soundUrl
        audio.onended= endFunc(data.id)
        let playPromise = audio.play()
        if (playPromise !== undefined){
            playPromise.then(_ => {

            }).catch(error => {
                endFunc(data.id);
            })
        }
    }
}

    /**
     * 
     * @param {STRING} connectMode CONNECT_MODE(axiosUtil)
     * @param {NUMBER} id key값
     * @param {*} data 데이터
     * @returns 
     */
    const executeSrvConnect = async function(connectMode, id, data){
        try {
            return await connect(connectMode, id, data, token.accessToken)
        } catch (error) {
            let msg = error?.response?.data?.msg || "서버에 응답이 없거나, 오류가 발생하였습니다. 잠시 후 다시 접속해주시기 바랍니다."
            setAlertState(alert, ALERT_TYPE.ERROR, msg)
            clearToken()
            //navigate("/")
            // setAlertState(alert, ALERT_TYPE.ERROR, error?.response?.data?.msg)
            throw new Error(error);
            //return -1
        }
    }

    /**
     * @param {alert} obj alert
     * @param {STRING} type ALERT_TYPE(store)
     * @param {STRING} message 
     * @returns alert object
     * @Description 특정 상황에 알맞는 알림 메시지를 작성한다.
     */
    const setAlertState = (obj, type, message) => {
        obj.show = true
        obj.type = type
        obj.message = message
        setAlert(obj)
    }

    /**
     * @param {*} data 체크할 data
     * @returns true, false값
     * @Description data가 null인지 체크한다.
     */
    const dataCheck = data => {
        if (typeof data === "undefined" || data === -1 || data === "") return false
        return true
    }

    const dataAdd = (data, addData) => {
        const result = {addData, ...data}
        return result
    }

    /**
     * 
     * @param {*} e 이벤트가 일어난 객체
     * @param {*} modeType 함수명
     * @param {*} data 데이터
     * @param {*} func 실행시킬 함수
     * @returns modeType명의 함수 결과
     * @Description 실제 실행되는 함수 (반환되는 함수)
     */
    const executeCommFunc = (e, modeType, data, func) => {
        return handlerMap[modeType](e, data, func)
    }

    /**
     * useEvntHandler 실행
     */
    return executeCommFunc
}

export default useEvntHandler