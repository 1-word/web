
/**
 * 입력한 문자열이 무슨 언어인지 확인한다.
 * @param {*} text 타입 체크할 문자열
 * @returns KO | EN | JP
 */
export function textTypeCheck(text){
    const TEXT_TYPE = {
        KO: "KO",
        EN: "EN",
        JP: "JP"
    }
    const kor = "";
    const kor_regex = /[가-힇ㄱ-ㅎㅏ-ㅣ]/g;
    const eng_regex = /[a-zA-Z]/g;
    const jp_regex = /[ぁ-ゔァ-ヴー々〆〤一-龥]/g;
    const num_regex = /[0-9]/g;
    const hanja_regex = /[一-龥]/g;

    if (eng_regex.test(text)){
        return TEXT_TYPE.EN
    }

    if (jp_regex.test(text)){
        return TEXT_TYPE.JP
    }

    if (kor_regex.test(text)){
        return TEXT_TYPE.KO;
    }

    return TEXT_TYPE.JP
}

/**
 * data가 null인지 확인한다.
 * @param {*} 체크할 데이터 
 * @returns true | false
 */
export function dataCheck(data){
    if (typeof data === "undefined" || data === -1 || data === "") 
        return false;
    if (Array.isArray(data))
        return true;
    return true;
}