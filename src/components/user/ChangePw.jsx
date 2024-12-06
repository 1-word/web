import { useRef, useState } from "react";
import api, { MODE } from "@/services/api";

function ChangePw({
	deleteModalAfterTime
}){

	const passwordRe = /(?=.*[a-zA-Z])(?=.*[\d\W]).{8,20}/g;
	const [disabled, setDisabled] = useState(true);
	const onClickHandler = api();

	const inputRef = useRef({
		oldPw: '',
		newPw: '',
		newPwConfirm: '',
	});

	const [errorMsg, setErrorMsg] = useState({
		oldPw: '',
		newPw: '',
		newPwConfirm: '',
	});

	const onChangeInput = e => {
		setDisabled(true);
		const newErrorMsg = {...errorMsg};
		const input = inputRef.current;

		let failed = false;

		if (input.oldPw.value === '') {
			newErrorMsg.oldPw = '현재 비밀번호를 입력해주세요.';
			failed = true;
		} else {
			newErrorMsg.oldPw = '';
		}

		if (input.newPw.value === '' || !passwordRe.test(input.newPw.value)) {
			newErrorMsg.newPw = '8~20자, 영문+숫자/특수문자를 포함해야 합니다.';
			failed = true;
		} else {
			newErrorMsg.newPw = '';	
		}

		if (input.newPwConfirm.value === '' || input.newPw.value !== input.newPwConfirm.value) {
			newErrorMsg.newPwConfirm = '비밀번호가 맞지 않습니다.';
			failed = true;
		} else {
			newErrorMsg.newPwConfirm = '';	
		}

		setErrorMsg(newErrorMsg);

		if (!failed) {
			setDisabled(false);
		}
	}

	const onClickComplete = async(e) => {
		const oldPassword = inputRef.current.oldPw.value;
		const newPassword = inputRef.current.newPw.value;

		await onClickHandler(null, MODE.UPDATE_PW, {
			oldPassword,
			newPassword
		});
		deleteModalAfterTime(0);
	}

	return(
		<>
			<ul className="my_page_config_lists">
				<li className="input_wrap">
					<label htmlFor="oldPw">현재 비밀번호</label>
					<input ref={el => inputRef.current.oldPw = el} id="oldPw" type="password" onChange={onChangeInput} />
					<p className="msg error">{errorMsg.oldPw}</p>
				</li>
				<li className="input_wrap">
					<label htmlFor="newPw">새 비밀번호</label>
					<input ref={el => inputRef.current.newPw = el} id="newPw" type="password" onChange={onChangeInput} />
					<p className="msg error">{errorMsg.newPw}</p>
				</li>
				<li className="input_wrap">
					<label htmlFor="newPwConfirm">새 비밀번호 확인</label>
					<input ref={el => inputRef.current.newPwConfirm = el} id="newPwConfirm" onChange={onChangeInput} type="password" />
					<p className="msg error">{errorMsg.newPwConfirm}</p>
				</li>
			</ul>
			<div className="my_page_config_btn_wrap">
				<button className="btn-fill sizeM" disabled={disabled} onClick={onClickComplete}>비밀번호 저장</button>
			</div>
		</>
	);
};

export default ChangePw;