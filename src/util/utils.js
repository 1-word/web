export function getAnimationDuration(element) {
	const strDuration = window.getComputedStyle(element)?.animationDuration;
	const duration = parseFloat(strDuration);
	return isNaN(duration)? 0 : duration * 1000;
}

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