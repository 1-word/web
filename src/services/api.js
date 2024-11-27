import connect from "@/util/axiosUtil"
import wordListStore from "@/store/wordListStore"
import authStore from "@/store/authStore"
import { useNavigate, useLocation } from "react-router"
import ModalStore, {ALERT_TYPE} from "@/store/modalStore"
import { useModal } from "@/hook/_hooks"
import Toast from "@/components/layout/popup/Toast"

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
    WORD_FOLDER_UPDATE: "wordFolderUpdate",
    SIGNOUT: "signout",
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
    
    const {createWordList, setUpdateFlag, saveListClear, setFolderList} = wordListStore(state => state);
    const {setLoading} = ModalStore();
    const [ openModal ] = useModal();
    const {token, save, saveToken, clearToken} = authStore(state=>state);
    const navigate = useNavigate();
    const location = useLocation();
    const app = process.env.REACT_APP_ENV;

    const activeToast = (msg) => {
        openModal(Toast, null, {msg}, "toast");
    }

    const handlerMap = {
        async read(_){
            const res = await executeSrvConnect("get", "word", null, {isUpdate: false, returnMsg: false});
            if (!dataCheck(res)) return;
            createWordList(res.words);
            return res;
        },
        all(){
            return executeSrvConnect("get", "word");
        },
        async search(e, data){
            const res = await executeSrvConnect("get", data, null, {isLoading: false, returnMsg: false});
            if (!dataCheck(res)) return;

            let wordListrequest = res.list;

            // 검색한 단어가 한개이면 배열이 아니므로 배열로 만들어줌
            if(Array.isArray(wordListrequest)) { 
                return createWordList(wordListrequest); 
            }
            let arr = [];
            arr.push(wordListrequest);
            createWordList(arr);
            return arr;
        },
        async delete(e, id){
            await executeSrvConnect("delete", id, { isUpdate: false });
        },
        async update(e, id, data){
            return await executeSrvConnect("put", id, data);
        },
        async updateMemo(e, id, data){
            return await executeSrvConnect("put", id, data);
        },
        async memorization(e, id, data){
            return await executeSrvConnect("put", id, data);
        },
        async save(e, data){
            let res = await executeSrvConnect("post", data.type, data);
            saveListClear();
            return res;
        },
        folderRead(data){
            setFolderList(data);
        },
        async folderUpdate(e, data){
            return await executeSrvConnect("put", data.folder_id, data);
        },
        async folderSave(e, data){
            return await executeSrvConnect("post", '', data);
        },
        async wordFolderUpdate(e, id, data){
            return await executeSrvConnect("put", id, data);
        },
        async folderDelete(e, id){
            return await executeSrvConnect("delete", id, '', {msgType: ALERT_TYPE.PRIMARY});
        },
        open(){

        },
        close(){

        },
        async login(_, user){
            const res = await executeSrvConnect("post", "auth/login", user, { isUpdate: false });
            const data = {
                "accessToken": res.accessToken,
                "refreshToken": res.refreshToken,
            };
            saveToken(data);
            navigate("/word");
        },
        async signup(_, user){
            const res = await executeSrvConnect("post", "user/signup", user, { isUpdate: false });
            activeToast("회원가입이 완료되었습니다.");
            const { email, password } = user;
            const loginRes = {
                email,
                password
            }
            this.login(null, loginRes);
        },
        async signout(_) {
            const res = await executeSrvConnect("delete", "auth");
            clearToken();
            navigate("/");
        },
        audio_play(_, data, endFunc){
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
     * @param {'get' | 'post' | 'put' | 'delete'} method http 메소드
     * @param {string} uri uri
     * @param {*} data body 데이터
     * @param {*} obj {isLoading, isUpdate}
     * @returns 
     */
    const executeSrvConnect = async function(method, uri, data, obj){
        // 로딩 화면 출력 여부
        if ((obj?.isLoading ?? true)) { 
            setLoading(true);
        }

        try {
            const res = await connect(method, uri, data, token.accessToken);

            const resData = res.data;

            // return 메시지가 있으면 toast 메시지를 띄워준다
            if (res.msg && 
                (obj?.returnMsg ?? true) && 
                typeof obj?.returnMsg === 'undefined'){
                activeToast(res.msg);
            }

            return resData;
        } catch (error) {
            const msg = error?.response?.data?.msg || "서버에 응답이 없거나, 오류가 발생하였습니다. 잠시 후 다시 시도해주시기 바랍니다."
            activeToast(msg);
            throw new Error(msg);
        }
        finally{
            // 데이터 불러온 후 로딩 false처리
            setLoading(false);

            //update state변경, 변경 시 useEffect() 실행, 기본값은 항상 업데이트
            if (obj?.isUpdate ?? true) { 
                setUpdateFlag();
            }
        }
    }

    /**
     * @param {*} data 체크할 data
     * @returns true, false값
     * @Description data가 null인지 체크한다.
     */
    const dataCheck = data => {
        if (typeof data === "undefined" || data === -1 || data === "") return false;
        return true;
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