import connect, {CONNECT_MODE} from "@/util/axiosUtil"
import { dataCheck  } from "@/util/utils"
import wordListStore, {WORD_MODE} from "@/store/wordListStore"
import authStore from "@/store/authStore"
import { useNavigate, useLocation } from "react-router"
import ModalStore, {ALERT_TYPE} from "@/store/modal"
import Store from "@/store/store"

export const MODE = {
    READ: "read",
    SEARCH_ALL: "all",
    SEARCH: "search",
    PAGE: "page",
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
 * handlerMap 객체의 함수 실행
 * @param {*} e 이벤트가 일어난 객체
 * @param {*} modeType 함수명
 * @param {*} data 데이터
 * @param {*} func 실행시킬 함수
 * @returns modeType명의 함수 결과
 */
function useEvntHandler(e, modeType, data, func){
    
    const {createWordList, addWordList,setUpdateFlag, saveListClear, setFolderList, setPage, updateWordList, updateMemo, deleteWordList, page, mode, setMode, setSearchItem, searchItem} = wordListStore(state => state);
    const {clickedFolder} = Store();
    const {setLoading, setAlert} = ModalStore();
    const {token, saveToken, clearToken} = authStore(state=>state);
    const navigate = useNavigate();
    const location = useLocation();
    const app = process.env.REACT_APP_ENV;

    function postReadAPI(res){
        if (!dataCheck(res)) return;
        // 데이터 조회 후 페이징 처리
        setPage(res.datas.page);
        page.obsEndUpdate(!res.datas.page.hasNext);
        page.obsActivate();
        // 데이터가 없으면 데이터 생성
        if (res.datas.page.current === 0){
            if(dataCheck(res.datas.word))
                createWordList(res.datas.word);
            if(dataCheck(res.datas.folder))
                handlerMap[MODE.FOLDER_READ](res.datas.folder);
            return;
        }
        // 데이터가 있으면 데이터 추가
        addWordList(res.datas.word);
    }

    const createUrlParam = (name, param) => {
        return dataCheck(param) ? `&${name}=${param}` : "";
    }

    const getUrlParam = () => {
        console.log(searchItem);
        const memorization_param = createUrlParam("memorization", searchItem.memorization);
        const language_param = createUrlParam("language", searchItem.language);
        let next = page.next, lastWid = page.lastWid;
        // console.log(dataCheck(memorization_param))
        // if (dataCheck(memorization_param) || dataCheck(language_param)){
        //     // 초기화
        //     next = 0;
        //     lastWid = -1;
        //     // setPage({next:0, hasNext:true, lastWid:-1});
        // }
        const url = `${folder}/${searchItem.text ?? ""}?page=${next}&last_wid=${lastWid}${memorization_param}${language_param}`;
        console.log(`url: ${url}`);
        return url
    }

    let folder = `${clickedFolder}`;

    // 단어 조회 url param 생성
    // const search_param = createUrlParam("")

    // const url_param = getUrlParam();

    const handlerMap = {
        async read(e, {folder_id}){
            folder = folder_id ?? -1 + "/";
            const url_param = getUrlParam();
            console.log(url_param)
            const res = await executeSrvConnect(CONNECT_MODE.READ, url_param, '', {isUpdate: false, returnMsg: false});
            postReadAPI(res);
        },
        all(){
            return executeSrvConnect(CONNECT_MODE.SEARCH, MODE.SEARCH_ALL);
        },
        async search(e, {folder_id, data}){
            // const search = dataCheck(data)? data: searchText;
            const url_param = getUrlParam();
            const res = await executeSrvConnect(CONNECT_MODE.SEARCH, url_param, '', {isLoading: false, returnMsg: false, isUpdate: false});
            postReadAPI(res);
        },
        /**
         * 페이징 처리
         * @param {*} e 
         * @param {*} mode READ, SEARCH
         * @param {*} param2 {data: 검색 문자열}
         */
        async page(e, mode, {id, data, func}){
            let read_param = "";
            const url_param = getUrlParam();
            console.log(`page: ${mode} / ${url_param}`);
            const res = await executeSrvConnect(CONNECT_MODE[mode], url_param, '', {isLoading: false, returnMsg: false, isUpdate: false});
            postReadAPI(res);
        },
        async delete(e, id){
            const res = await executeSrvConnect(CONNECT_MODE.DELETE, id, { isUpdate: false });
            deleteWordList(res.data);
            setUpdateFlag();
        },
        async update(e, id, data){
            const res = await executeSrvConnect(CONNECT_MODE.UPDATE, id, data, { isUpdate: false, returnMsg: false });
            updateWordList(res.data.word_id, res.data);
        },
        async updateMemo(e, id, data){
            const res = await executeSrvConnect(CONNECT_MODE.UPDATE_MEMO, id, data, {returnMsg: false});
            updateWordList(res.data.word_id, res.data);
        },
        async memorization(e, id, data){
            const res = await executeSrvConnect(CONNECT_MODE.MEMORIZATION, id, data, {returnMsg: false});
            updateWordList(res.data.word_id, res.data);
        },
        async save(e, data){
            setMode(WORD_MODE.UPDATE);
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
                clearToken();
                return;
            }
            const data = {
                "refreshToken": res.data.refreshToken,
                "accessToken": res.data.accessToken
            };
            saveToken(data, user.user_id);
            // setUpdateFlag();
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
     * 서버 요청 전, 후처리
     * @param {STRING} connectMode CONNECT_MODE(axiosUtil)
     * @param {NUMBER} id key값
     * @param {*} body 데이터
     * @param {*} obj {isLoading, isUpdate=true, msgType, returnMsg=true, moveUrl}
     * @returns 서버에서 응답한 데이터
     * @description obj 객체
     * * isLoading: 로딩 여부 true | false
     * * isUpdate: 컴포넌트 업데이트 여부 true(기본값) | false
     * * returnMsg: 서버에서 리턴하는 메시지를 띄울 것인지 true(기본값) | false
     * * moveUrl: URL 이동 여부 true | false
     */
    const executeSrvConnect = async function(connectMode, id, data, obj){
        if ((obj?.isLoading ?? true)) setLoading(true);
        try {
            let res = await connect(connectMode, id, data, token.accessToken);
            if ((obj?.returnMsg ?? true) && typeof obj?.returnMsg === 'undefined') setAlert(getAlertData(obj?.msgType, res.msg ?? obj?.returnMsg));
            if (res.success === true){
                if (obj?.moveUrl) navigate(obj?.moveUrl);
            }
            if (res.code === 6004){
                navigate("/");
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
     * 특정 상황에 알맞는 알림 메시지를 작성한다.
     * @param {alert} obj alert
     * @param {STRING} type ALERT_TYPE(store)
     * @param {STRING} message 
     * @returns alert object
     */
    const getAlertData = (msgType, message) => {
        return {
            type: ALERT_TYPE.MSG,
            msgType: msgType ?? ALERT_TYPE.SUCCESS,
            message: message ?? "성공적으로 데이터를 저장했습니다.",
            show: true,            
        }
    }

    const dataAdd = (data, addData) => {
        const result = {addData, ...data};
        return result;
    }

    /**
     * modeType명의 함수를 실행한다.
     * @param {*} e 이벤트가 일어난 객체
     * @param {*} modeType 함수명
     * @param {*} data 데이터
     * @param {*} func 실행시킬 함수
     * @returns modeType명의 함수 결과
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