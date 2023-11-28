import connect, {CONNECT_MODE} from "@/util/axiosUtil"
import wordListStore from "@/store/wordListStore"
import authStore from "@/store/authStore"
import { useNavigate, useLocation } from "react-router"
import ModalStore, {ALERT_TYPE} from "@/store/modal"

export const MODE = {
    READ: "read",
    SEARCH_ALL: "all",
    SEARCH: "search",
    DELETE: "delete",
    UPDATE: "update",
    SAVE: "save",
    LOGIN: "login",
    SIGNUP: "signup",
    OPEN: "open",
    CLOSE: "close",
    PLUS_BTN: "plus_btn",
    MINUS_BTN: "minus_btn",
    SAVE_BTN: "save_btn",
    ALERT: "alert",
    AUDIO_PLAY: "audio_play",
    MEMO_BTN: "memo_btn",
    EDIT:"edit",
    UPDATE_MEMO: "updateMemo",
    FOLDER_READ: "folderRead",
    FOLDER_UPDATE: "folderUpdate",
    FOLDER_SAVE: "folderSave",
    FOLDER_DELETE: "folderDelete",
    MEMORIZATION: "memorization",
    WORD_FOLDER_UPDATE: "wordFolderUpdate"
}

/**
 * 
 * @param {*} e 이벤트가 일어난 객체
 * @param {*} modeType 함수명
 * @param {*} data 데이터
 * @param {*} func 실행시킬 함수
 * @returns modeType명의 함수 결과
 * @Description api()를 
 */
function useEvntHandler(e, modeType, data, func){
    
    const {createWordList, addWordList,setUpdateFlag, saveListClear, setFolderList, setPage} = wordListStore(state => state);
    const {setLoading, setAlert} = ModalStore();
    const {token, saveToken, clearToken} = authStore(state=>state);
    const navigate = useNavigate();
    const location = useLocation();
    const app = process.env.REACT_APP_ENV;

    const handlerMap = {
        async read(e, id, param){
            const read_id = id ?? "";
            const read_param = param ?? "";
            const res = await executeSrvConnect(CONNECT_MODE.READ, read_id + read_param, '', {isUpdate: false, returnMsg: false});
            if (!dataCheck(res)) return;
            
            // 처음 데이터 가져올 때 확인 해야함
            if (res.datas.page.current === 0){
                createWordList(res.datas.word);
                this.folderRead(res.datas.folder);
            }else{
                addWordList(res.datas.word);
            }
            setPage(res.datas.page);
            //폴더 정보 가져오기
            return res.datas;
        },
        all(){
            return executeSrvConnect(CONNECT_MODE.SEARCH, MODE.SEARCH_ALL);
        },
        async search(e, data){
            const res = await executeSrvConnect(CONNECT_MODE.SEARCH, '', data, {isLoading: false, returnMsg: false, isUpdate: false});
            if (!dataCheck(res)) return;

            let wordListrequest = res.list;
            // 검색한 단어가 한개이면 배열이 아니므로 배열로 만들어줌
            if(Array.isArray(wordListrequest)) return createWordList(wordListrequest);
            let arr = [];
            arr.push(wordListrequest);
            createWordList(arr);
            return arr;
        },
        async delete(e, id){
            await executeSrvConnect(CONNECT_MODE.DELETE, id, { isUpdate: false });
        },
        async update(e, id, data){
            return await executeSrvConnect(CONNECT_MODE.UPDATE, id, data);
        },
        async updateMemo(e, id, data){
            return await executeSrvConnect(CONNECT_MODE.UPDATE_MEMO, id, data);
        },
        async memorization(e, id, data){
            return await executeSrvConnect(CONNECT_MODE.MEMORIZATION, id, data);
        },
        async save(e, data){
            let res = await executeSrvConnect(CONNECT_MODE.SAVE, data.type, data);
            saveListClear();
            return res;
        },
        folderRead(data){
            setFolderList(data);
        },
        async folderUpdate(e, data){
            return await executeSrvConnect(CONNECT_MODE.FOLDER_UPDATE, data.folder_id, data);
        },
        async folderSave(e, data){
            return await executeSrvConnect(CONNECT_MODE.FOLDER_SAVE, '', data);
        },
        async wordFolderUpdate(e, id, data){
            return await executeSrvConnect(CONNECT_MODE.WORD_FOLDER_UPDATE, id, data);
        },
        async folderDelete(e, id){
            return await executeSrvConnect(CONNECT_MODE.FOLDER_DELETE, id, '', {msgType: ALERT_TYPE.PRIMARY});
        },
        open(){

        },
        close(){

        },
        async login(e, user){
            const res = await executeSrvConnect(CONNECT_MODE.LOGIN, '', user, { moveUrl: "/word", isUpdate: false });

            if(res.code === 6006) {
                // setAlert(getAlertData(ALERT_TYPE.SUCCESS, res.msg));
                clearToken();
                return;
            }
            let data = {
                "refreshToken": res.data.refreshToken,
                "accessToken": res.data.accessToken
            };
            saveToken(data, user.user_id);
            setUpdateFlag();
            setAlert(getAlertData(ALERT_TYPE.SUCCESS, "로그인 성공"));
        },
        async signup(e, user){
            const res = await executeSrvConnect(CONNECT_MODE.SIGNUP, '', user, { returnMsg: false, moveUrl: "/", isUpdate: false });
            setAlert(getAlertData(ALERT_TYPE.SUCCESS, "회원가입이 완료되었습니다."));
        },
        audio_play(e, data, endFunc){
            const audio = new Audio();
            const soundUrl = process.env.PUBLIC_URL + '/pronu/' + data.sound_path + '.mp3';
            audio.src = soundUrl;
            audio.onended= endFunc(data.id);
            let playPromise = audio.play();
            if (playPromise !== undefined){
                playPromise.then(_ => {
                    
                }).finally(()=>endFunc(data.id))
            }
        }
    }

    /**
     * 
     * @param {STRING} connectMode CONNECT_MODE(axiosUtil)
     * @param {NUMBER} id key값
     * @param {*} data 데이터
     * @param {*} {isLoading, isUpdate, msgType, returnMsg=true, moveUrl}
     * @returns 
     */
    const executeSrvConnect = async function(connectMode, id, data, obj){
        if ((obj?.isLoading ?? true)) setLoading(true);
        try {
            let res = await connect(connectMode, id, data, token.accessToken);
            if ((obj?.returnMsg ?? true) && typeof obj?.returnMsg === 'undefined') setAlert(getAlertData(obj?.msgType, res.msg ?? obj?.returnMsg));
            if (res.success === true){
                if (obj?.moveUrl) navigate(obj?.moveUrl);
            }
            return res;
        } catch (error) {
            let msg = error?.response?.data?.msg || "서버에 응답이 없거나, 오류가 발생하였습니다. 잠시 후 다시 시도해주시기 바랍니다."
            setAlert(getAlertData(ALERT_TYPE.ERROR, msg));
            throw new Error("error");
        }
        finally{
            setLoading(false);
            //update state변경, 변경 시 useEffect() 실행, 기본값은 항상 업데이트
            if (obj?.isUpdate ?? true) setUpdateFlag();
        }
    }

    /**
     * @param {alert} obj alert
     * @param {STRING} type ALERT_TYPE(store)
     * @param {STRING} message 
     * @returns alert object
     * @Description 특정 상황에 알맞는 알림 메시지를 작성한다.
     */
    const getAlertData = (msgType, message) => {
        return {
            type: ALERT_TYPE.MSG,
            msgType: msgType ?? ALERT_TYPE.SUCCESS,
            message: message ?? "성공적으로 데이터를 저장했습니다.",
            show: true,            
        }
    }


    /**
     * @param {*} data 체크할 data
     * @returns true, false값
     * @Description data가 null인지 체크한다.
     */
    const dataCheck = data => {
        if (typeof data === "undefined" || data === -1 || data === "") 
            return false;
        return true;
    }

    const dataAdd = (data, addData) => {
        const result = {addData, ...data};
        return result;
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
        return handlerMap[modeType](e, data, func);
    }

    /**
     * api 실행
     */
    return executeCommFunc;
}

export default useEvntHandler