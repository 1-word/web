import connect from "@/util/axiosUtil"
import wordListStore from "@/store/wordListStore"
import authStore from "@/store/authStore"
import { useNavigate, useLocation } from "react-router"
import ModalStore, {ALERT_TYPE} from "@/store/modalStore"
import { useModal } from "@/hook/_hooks"
import Toast from "@/components/layout/popup/Toast"

export const MODE = {
    READ: "read",
    SINGLE_READ: "singleRead",
    SEARCH_ALL: "all",
    SEARCH: "search",
    DELETE: "delete",
    UPDATE: "update",
    SAVE: "save",
    LOGIN: "login",
    SIGNUP: "signup",
    USER_READ: "userRead",
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
    CODE: "code",
    VERIFICATION: "verification",
    RESET_PW: "resetPw",
    UPDATE_PW: "updatePw",
    WORD_GROUP_READ: "wordGroupRead",
    WORD_GROUP_UPDATE: "wordGroupUpdate",
    WORD_GROUP_SAVE: "wordGroupSave",
    IMAGE_UPLOAD: "imageUpload",
    USER_UPDATE: "userUpdate",
    USER_DELETE: "userDelete",
    WORD_RELATIVE_READ: "wordRelativeRead",
    WORD_DICT: "wordDict",
    DAILY_SENTENCE_SAVE: "dailySentenceSave",
    DAILY_SENTENCE_READ: "dailySentenceRead",
    DAILY_SENTENCE_UPDATE: "dailySentenceUpdate",
    DAILY_SENTENCE_DELETE: "dailySentenceDelete",
    DAILY_SENTENCE_DAYS_READ: "dailySentenceDaysRead",
    DAILY_SENTENCE_RELATION_INFO_READ: "dailySentenceRelationInfoRead",
    POST_IMAGE_UPLOAD: "postImageUpload",
    QUIZ_INFO_SAVE: "quizInfoSave",
    QUIZ_CREATE: "quizCreate",
    QUIZ_READ: "quizRead",
    QUIZ_SOLVE: "quizSolve",
    QUIZ_END: "quizEnd",
    QUIZ_STAT_CREATE: "quizStatCreate"
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
    
    const {setUpdateFlag} = wordListStore(state => state);
    const {setLoading} = ModalStore();
    const [ openModal ] = useModal();
    const {token, saveToken, clearToken, setUserInfo} = authStore(state=>state);
    const navigate = useNavigate();
    const location = useLocation();

    const activeToast = (msg) => {
        openModal(Toast, null, {msg}, "toast");
    }

    const handlerMap = {
        async read(_, query){
            const res = await executeSrvConnect("get", `word${query}`, null, {isUpdate: false, returnMsg: false});
            return res;
        },
        async singleRead(_, id) {
            return await executeSrvConnect("get", `word/item/${id}`, null, {isUpdate: false, returnMsg: false});
        },
        async search(e, query){
            const res = await executeSrvConnect("get", `word/${query}`, null, {isUpdate:false, isLoading: false, returnMsg: false});
            return res;
        },
        async delete(_, wordId){
            await executeSrvConnect("delete", `word/${wordId}`);
        },
        async update(e, wordId, data){
            return await executeSrvConnect("put", `word/all/${wordId}`, data);
        },
        async updateMemo(e, id, data){
            return await executeSrvConnect("put", `word/memo/${id}`, data, {isUpdate: false});
        },
        async memorization(e, wordId, data){
            return await executeSrvConnect("put", `word/memorization/${wordId}`, data);
        },
        async save(_, type, data){
            const res = await executeSrvConnect("post", `word/${type}`, data);
            return res;
        },
        // 폴더
        async folderRead(_){
            const res = await executeSrvConnect('get', `folders`, null, {isUpdate: false});
            return res;
        },
        async folderUpdate(_, folderId, data){
            return await executeSrvConnect("put", `folders/${folderId}`, data, {isUpdate: false});
        },
        async folderSave(_, data){
            return await executeSrvConnect("post", 'folders', data, {isUpdate: false});
        },
        async wordFolderUpdate(_, {wordId, folderId}){
            return await executeSrvConnect('put', `word/${wordId}/folder/${folderId}`, null);
        },
        async folderDelete(_, folderId){
            return await executeSrvConnect("delete", `folders/${folderId}`, null, {isUpdate: false});
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
            navigate('/vocabook');
            setUpdateFlag(true);
            this.userRead(null, data.accessToken);
        },
        async userRead(_, data) {
            const userRes = await connect('get', 'user', null, data);
            setUserInfo(userRes.data);
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
            const soundUrl = '/data/sound/' + data.sound_path + '.mp3';
            audio.src = soundUrl;
            audio.onended= endFunc(data.id);
            let playPromise = audio.play();
            if (playPromise !== undefined){
                playPromise.then(_ => {
                    
                }).finally(()=>endFunc(data.id))
            }
        },
        async code(_, {type, email}) {
            const res = await executeSrvConnect("post", `auth/code/${type}`, {email}, {isUpdate: false});
            activeToast(res);
            return true;
        },
        async verification(_,{email, code}) {
            const res = await executeSrvConnect("post", `auth/code/verify`, {email, code}, {isUpdate: false});
            activeToast(res);
            return true;
        },
        async resetPw(_, {email, newPassword}) {
            const res = await executeSrvConnect("put", 'user/pw/reset', {email, newPassword}, {isUpdate: false});
            activeToast('비밀번호 재설정이 완료되었습니다.');
            navigate('/signin');
            return true;
        },
        async updatePw(_, {oldPassword, newPassword}) {
            await executeSrvConnect('put', 'user/pw', {oldPassword, newPassword}, {isUpdate: false});
            activeToast('비밀번호 변경이 완료되었습니다.');
            return true;
        },
        async wordGroupRead(_) {
            const res = await executeSrvConnect('get', 'wordGroup', null, {isUpdate: false});
            return res;
        },
        async wordGroupSave(_, {name}) {
            const res = await executeSrvConnect('post', `wordGroup`, {name}, {isUpdate: false});
            return res;
        },
        async wordGroupUpdate(_, {id, name}) {
            const res = await executeSrvConnect('put', `wordGroup/${id}`, {name}, {isUpdate: false});
            return res;
        },
        async imageUpload(_, formData) {
            const res = await executeSrvConnect('post', 'files/upload/thumbnail', formData, {isUpdate: false});
            return res;
        },
        async userUpdate(_, data) {
            const res = await executeSrvConnect('put', 'user', data, {isUpdate: false});
            return res;
        },
        async userDelete(_) {
            const res = await executeSrvConnect('delete', 'user', null, {isUpdate: false});
            activeToast('회원탈퇴가 완료되었습니다.');
            clearToken();
            navigate('/'); 
        },
        async wordRelativeRead(_, word) {
            return await executeSrvConnect('get', `dict/list/${word}`, null, {isUpdate: false, isLoading: false});
        },
        async wordDict(_, word) {
            return await executeSrvConnect('get', `dict/${word}`, null, {isUpdate: false, isLoading: false});
        },

        // 오늘의 내 문장
        async dailySentenceSave(_, data) {
            return await executeSrvConnect('post', 'daily-sentence', data, {isUpdate: false});
        },
        async dailySentenceRead(_, query) {
            return await executeSrvConnect('get', `daily-sentence${query}`, null, {isUpdate: false});
        },
        async dailySentenceDaysRead(_, {year, month}) {
            return await executeSrvConnect('get', `daily-sentence/days?year=${year}&month=${month}`, null, {isUpdate: false});
        },
        async dailySentenceUpdate(_, id, {sentence, mean}) {
            await executeSrvConnect('put', `daily-sentence/${id}`, {sentence, mean}, null, {isUpdate: false});
        },
        async dailySentenceDelete(_, id) {
            await executeSrvConnect('delete', `daily-sentence/${id}`, null, {isUpdate: false});
            activeToast('문장 삭제가 완료되었습니다.');
        },
        async dailySentenceRelationInfoRead(_, id) {
            return await executeSrvConnect('get', `daily-sentence/relation/${id}`, null, {isUpdate: false});
        },
        // 오늘의 내 문장 끝
        async postImageUpload(_, {path, formData}) {
            return await executeSrvConnect('post', `files/upload/images/${path}`, formData, {isUpdate: false});
        },
        // 퀴즈 시작
        async quizInfoSave(_, data) {
            return await executeSrvConnect('post', 'quiz-info', data, {isUpdate: false});
        },
        async quizCreate(_, quizInfoId) {
            return await executeSrvConnect('post', `quiz/${quizInfoId}`, null, {isUpdate: false});
        },
        async quizRead(_, {quizInfoId, query}) {
            return await executeSrvConnect('get', `quiz/${quizInfoId}${query}`, null, {isUpdate: false});
        },
        async quizSolve(_, data) {
            return await executeSrvConnect('put', `quiz`, data, {isUpdate: false});
        },
        async quizEnd(_, quizInfoId) {
            return await executeSrvConnect('put', `quiz-info/complete/${quizInfoId}`, null, {isUpdate: false});
        },
        async quizStatCreate(_, quizInfoId) {
            return await executeSrvConnect('post', `quiz-stat/${quizInfoId}`, null, {isUpdate: false});
        },
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
        const connectInfo = {
            method,
            uri,
            data,
            obj
        }
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
            // accessToken 만료 시 토큰 재발급
            if (error?.response?.status === 401 && token.accessToken !== "") {
                await reissueToken();
            }

            if (error.response?.data.msg === "로그인이 필요합니다.") {
                navigate("/signin");
            }

            const msg = error?.response?.data?.msg || "서버에 응답이 없거나, 오류가 발생하였습니다. 잠시 후 다시 시도해주시기 바랍니다."
            activeToast(msg);
            throw new Error(msg);
        }
        finally{
            // 데이터 불러온 후 로딩 false처리
            setLoading(false);

            //update state변경, 변경 시 useEffect() 실행, 기본값은 항상 업데이트
            if (obj?.isUpdate ?? true) { 
                setUpdateFlag(true);
            }
        }
    }

    const reissueToken = async() => {
        try {
            const response = await connect("post", "auth/reissue", {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken
            });

            const data = {
                "accessToken": response.data.accessToken,
                "refreshToken": response.data.refreshToken,
            };

            saveToken(data);
            activeToast("재 로그인되었습니다. 다시 시도해주세요.");
            throw new Error("재 로그인 되었습니다. 다시 시도해주세요.");

        }catch(error) {
            if (error?.response?.status === 400) {
                clearToken();
                navigate('/signin');
                activeToast('로그인이 필요합니다.');
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