import React, { useState, useRef } from "react";
import api, { MODE } from "@/services/api";

function AuthNumComp({email}){
	const [disabled , setDisabled] = useState(true);
	const [errorMsg, setErrorMsg] = useState('');
	const [confirmErrorMsg, setConfirmErrorMsg] = useState('');
	const passwordRe = /(?=.*[a-zA-Z])(?=.*[\d\W]).{8,20}/g;
	const passwordRef = useRef(null);
	const confirmPasswordRef = useRef(null);
	const onClickHandler = api();

  function handleChange(e) {
		e.preventDefault();
		setDisabled(true);
		const {name, value} = e.target;
		const password = passwordRef.current.value;
		const confirmPassword = confirmPasswordRef.current.value;
		
		// 비밀번호 규칙 확인
		if (name === "password" && !passwordRe.test(value)) {
			setErrorMsg('8~20자, 영문+숫자/특수문자를 포함해야 합니다.');
			return;
		}

		setErrorMsg('');

		// 비밀번호와 비밀번호 확인 동일한지 확인
		if (password !== confirmPassword) {
			setConfirmErrorMsg('비밀번호가 맞지 않습니다.');
			return;
		}

		setConfirmErrorMsg('');
		setDisabled(false);
  }

	const resetPassword = e => {
		e.preventDefault();
		onClickHandler(null, MODE.RESET_PW, {
			email,
			newPassword:	passwordRef.current.value
		});
	}

	return(
		<>
			<div className="login-input-area input_wrap">
				<label htmlFor="">비밀번호</label>
				<input ref={passwordRef} name="password" type="password" spellCheck placeholder="새 비밀번호를 입력해 주세요" onChange={handleChange} />
				<p className="msg error">{errorMsg}</p>
			</div>
			<div className="login-input-area input_wrap">
				<label htmlFor="">비밀번호 확인</label>
				<input ref={confirmPasswordRef} name="confirmPassword" type="password" spellCheck placeholder="다시 한번 비밀번호를 입력해주세요" onChange={handleChange} />
				<p className="msg error">{confirmErrorMsg}</p>
			</div>
			<div className="login-btn-wrap">
				<button className="btn-fill btn-login sizeL" disabled={disabled} onClick={resetPassword}>비밀번호 재설정</button>
			</div>
		</>
	);
};
export default AuthNumComp;