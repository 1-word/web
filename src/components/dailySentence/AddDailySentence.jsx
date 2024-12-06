import {useRef} from "react";
import api, { MODE } from "@/services/api";

function AddDailySentence({
	dailySentenceId,
	deleteModalAfterTime
}){
  const onClickHandler = api();
	const dailSentence = useRef({
		sentence: null,
		mean: null
	});

	const onClickComplete = e => {
		const sentence = dailSentence.current.sentence.value;
		const mean = dailSentence.current.mean.value;
		dailySentenceSave({
			sentence,
			mean
		})
	}

	const dailySentenceSave = async(data) => {
		const res = await onClickHandler(null, MODE.DAILY_SENTENCE_SAVE, data);
		console.log(res);
		deleteModalAfterTime(0);
	}

	const onChangeText = e => {

	}

	return(
		<>
			<div className="input_wrap">
				<label htmlFor="sentence">문장</label>
				<div className="textarea-box">
					<textarea ref={el => dailSentence.current.sentence = el} name="" id="sentence" defaultValue="" onChange={onChangeText} maxLength={255}>문장을 입력해 주세요 (최대 255문자)</textarea>
				</div>
			</div>
			<div className="input_wrap">
				<label htmlFor="smean">뜻</label>
				<div className="textarea-box">
					<textarea ref={el => dailSentence.current.mean = el} name="" id="smean" defaultValue=""onChange={onChangeText} maxLength={255}>뜻을 입력해 주세요 (최대 255문자)</textarea>
				</div>
			</div>
			<div className="modal_full_btn_wrap">
				<button className="btn-fill sizeL" onClick={onClickComplete}>내 문장 저장</button>
			</div>
		</>
	);
};
export default AddDailySentence;