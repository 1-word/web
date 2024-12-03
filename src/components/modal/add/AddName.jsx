import {useState, useRef, useEffect} from 'react';
import api, { MODE } from "@/services/api";

function AddName({
	deleteModalAfterTime,
	wordGroupId,
	updateGroupName,
	createGroup
}){

	const onClickHandler = api();
	const textRef = useRef(null);

	const handleClickComplete = e => {
		const text = textRef.current.value;

		console.log(text);

		// 새로 추가
		if (wordGroupId === null || wordGroupId === undefined) {
			onClickHandler(null, MODE.WORD_GROUP_SAVE, {
				name: text
			}).then(res => {
				createGroup(res);
			})
			deleteModalAfterTime(240);
			return;
		}

		// 변경
		onClickHandler(null, MODE.WORD_GROUP_UPDATE, {
			id: wordGroupId,
			name: text
		});

		updateGroupName(wordGroupId, text);

		deleteModalAfterTime(240);
	}

	const onChangeTemp = e => {

	}

	return(
		<div className="add_type_wrap">
			<h2 className="modal_center_title">이름 지정</h2>
			<div className="input_wrap add_type_input_wrap">
				<input ref={textRef} type="text" onChange={onChangeTemp}/>
			</div>
			<div className='modal_center_btn'>
				<button className='btn-light sizeM' onClick={() => deleteModalAfterTime(240)}>취소</button>
				<button className='btn-fill sizeM' onClick={handleClickComplete}>확인</button>
			</div>
		</div>
	);
};
export default AddName;