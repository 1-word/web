import {useRef} from "react";
import api, { MODE } from "@/services/api";

function AddDailySentence({
	dailySentence,
	deleteModalAfterTime,
	setUpdate,
	afterEditSentence
}){
  const onClickHandler = api();
	const dailySentenceRef = useRef({
		sentence: null,
		mean: null
	});

	const onClickComplete = e => {
		const sentence = dailySentenceRef.current.sentence.value;
		const mean = dailySentenceRef.current.mean.value;
		if (dailySentence) {
			dailySentenceUpdate({sentence, mean});
			return;
		}
		
		dailySentenceSave({sentence, mean});
	}

	const dailySentenceSave = async(data) => {
		await onClickHandler(null, MODE.DAILY_SENTENCE_SAVE, data);
		if (setUpdate) {
			setUpdate(prev => !prev);
		}
		deleteModalAfterTime(0);
	}
	
	const dailySentenceUpdate = async(data) => {
		const id = dailySentence.dailySentenceId;
		 if (data.sentence === dailySentence.sentence) {
			data.sentence = null;
		 }
		 await onClickHandler(null, MODE.DAILY_SENTENCE_UPDATE, id, data);

		if (setUpdate) {
			setUpdate(prev => !prev);
		}

		deleteModalAfterTime(0);
		if (afterEditSentence) {
			afterEditSentence();
		}
	}

	const onChangeText = e => {

	}

	return(
		<>
			<div className="input_wrap">
				<label htmlFor="sentence">문장</label>
				<div className="textarea-box">
					<textarea ref={el => dailySentenceRef.current.sentence = el} 
					defaultValue={dailySentence?.sentence || ''} 
					onChange={onChangeText} maxLength={1000}
					placeholder="문장을 입력해 주세요 (최대 1000문자)"></textarea>

				</div>
			</div>
			<div className="input_wrap">
				<label htmlFor="smean">뜻</label>
				<div className="textarea-box">
					<textarea ref={el => dailySentenceRef.current.mean = el}
					defaultValue={dailySentence?.mean || ''} 
					onChange={onChangeText} maxLength={255}
					placeholder="뜻을 입력해 주세요 (최대 255문자)"></textarea>
				</div>
			</div>
			<div className="modal_full_btn_wrap">
				<button className="btn-fill sizeL" onClick={onClickComplete}>내 문장 저장</button>
			</div>
		</>
	);
};
export default AddDailySentence;