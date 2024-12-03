import {useEffect,useState} from "react";

function AddDailySentence(){
	return(
		<>
			<div className="input_wrap">
				<label htmlFor="sentence">문장</label>
				<div className="textarea-box">
					<textarea name="" id="sentence" maxLength={255}>문장을 입력해 주세요 (최대 255문자)</textarea>
				</div>
			</div>
			<div className="input_wrap">
				<label htmlFor="smean">뜻</label>
				<div className="textarea-box">
					<textarea name="" id="smean" maxLength={255}>뜻을 입력해 주세요 (최대 255문자)</textarea>
				</div>
			</div>
			<div className="modal_full_btn_wrap">
				<button className="btn-fill sizeL">내 문장 저장</button>
			</div>
		</>
	);
};
export default AddDailySentence;