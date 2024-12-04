import LOGOTitle_SVG from "@images/logoTitle.svg";
import React, { useState, useRef } from "react";
import api, { MODE } from "@/services/api";
import { Link } from "react-router-dom";
import AuthNum from "@/components/user/AuthNum";

function Signup(){
	const patternEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[a-z]+$/;
	const signupData = useRef(null);
	const [mailState, setMailState] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [disabledAll, setDisabledAll] = useState(true);
	const [errorMsg, setErrorMsg] = useState();
	const passwordRe = /(?=.*[a-zA-Z])(?=.*[\d\W]).{8,20}/g;
	const signupRef = useRef([]);
	const [mailCompleteState, setMailCompleteState] = useState(false);

	const onClickHandler = api();

	const handleClick = (e) => {
			e.preventDefault();
			const data = signupData.current;

			if (!mailCompleteState) {
				setErrorMsg({
					...errorMsg,
					email: '이메일 인증을 완료해주세요.'
				})
				return;
			}

			const {confirm_password, ...req} = data;
			onClickHandler(null, MODE.SIGNUP, req);
	}

	const handleCheckMailAuth = () => {
		const email = signupData.current.email;
		onClickHandler(null, MODE.CODE, {
			type: 'signup',
			email
		}).then(res => {
			if (res) {
				setMailState(true);
			}
		})
	}

	const onKeyDown = (e) => {
			if(e.key === 'Enter'){
					handleClick();
			}
	}

	const checkPassword = (value, password) => {
			if (value !== password) {
					return false;
			}
			return true;
	}

	const mailVerificationAfter = () => {
		setMailCompleteState(true);
		setMailState(true);
		setErrorMsg({
			...errorMsg,
			email: ''
		});
	}

	const setSignupInput = e => {
			setDisabledAll(true);
			const data = signupData.current;
			const { value, name } = e.target;

			let failed = false;

			let newErrorMsg = {...errorMsg};

			setSignupData({
					...data,
					[name]: value
			});
			
			// 이메일 확인
			if (name === "email" && value !== "") {
				if (!patternEmail.test(value)) {
					newErrorMsg.email = '이메일 형식이 아닙니다.';
					failed = true;
					setDisabled(true);
				} else {
					// 정상적으로 입력되었으면 disabled 해제
					setDisabled(false);
					newErrorMsg.email = '';
				}
			}
			
			if (newErrorMsg.email === '' && !mailCompleteState) {
				newErrorMsg.email = '이메일 인증을 완료해주세요.';
				failed = true;
			}
			
			// 닉네임 확인
			if (signupRef.current[2].value === "") {
					newErrorMsg.nickname = '닉네임을 입력해주세요.';
					failed = true;
			}
			else {
					newErrorMsg.nickname = '';
			}
			

			// 비밀번호 규칙 확인
			if (signupRef.current[0].value !== '' && !passwordRe.test(signupRef.current[0].value)) {
				newErrorMsg.password = '8~20자, 영문+숫자/특수문자를 포함해야 합니다.';
				failed = true;
			} else {
				newErrorMsg.password = '';
			}

			// 비밀번호 확인
			if (signupRef.current[1].value !== '' && signupRef.current[0].value !== signupRef.current[1].value) {
				newErrorMsg.confirm_password = '비밀번호가 맞지 않습니다.';
				failed = true;
			} else {
				newErrorMsg.confirm_password = '';
			}

			setErrorMsg(newErrorMsg);

			if (failed) {
				return;
			}

			setDisabledAll(false);
	}

	const setSignupData = (data) => {
			signupData.current = data;
	}

    return (
			<div className="login-wrap">
				<div className="login-scroll">
				<h1 className="login-title"><Link to="/">VOCABOX<img src={LOGOTitle_SVG} alt="VOCABOX" /></Link></h1>
					<div className="login-cont">
							<div className="login-area">
									<h2 className="disN">회원가입</h2>
									{/* 에러 메시지 :: error : 에러 / correct : 통과 */}
									<div className="login-input-area input_wrap">
											<label htmlFor="email">이메일</label>
											<div className="auth_num_area">
												<input id="email" name="email" type="email" spellCheck placeholder="이메일주소를 입력해주세요" onChange={setSignupInput} onKeyDown={onKeyDown} />
												<button className="btn-fill auth_num_btn sizeM" disabled={disabled} onClick={handleCheckMailAuth}>메일 인증</button>
											</div>
											<p className="msg error">{errorMsg?.email?? ''}</p>
									</div>
									<>
										{
											mailState ? <AuthNum retry={handleCheckMailAuth} 
											email={signupData.current.email} 
											isSignup={true}
											setComplete={mailVerificationAfter}> </AuthNum> : ""
										}
									</>
									<div className="login-input-area input_wrap">
											<label htmlFor="nickname">닉네임</label>
											<input ref={el => signupRef.current[2] = el} id="nickname" name="nickname" type="text" spellCheck placeholder="이름" onChange={setSignupInput} onKeyDown={onKeyDown} />
											<p className="msg error">{errorMsg?.nickname?? ''}</p>
									</div>
									<div className="login-input-area input_wrap">
											<label htmlFor="password">비밀번호</label>
											<input ref={el => signupRef.current[0] = el} id="password" type="password" name="password" spellCheck placeholder="비밀번호" onChange={setSignupInput} onKeyDown={onKeyDown}/>
											<p className="msg error">{errorMsg?.password?? ''}</p>
									</div>
									<div className="login-input-area input_wrap">
											<label htmlFor="confirm_password">비밀번호 확인</label>
											<input ref={el => signupRef.current[1] = el} id="confirm_password" type="password" name="confirm_password" spellCheck placeholder="비밀번호 확인" onChange={setSignupInput} onKeyDown={onKeyDown}/>
											<p className="msg error">{errorMsg?.confirm_password?? ''}</p>
									</div>
									<div className="login-btn-wrap">
									<button className="btn-fill btn-login sizeL" disabled={disabledAll} onClick={handleClick}>회원가입</button>
									</div>
									<div className="login-join-wrap">
											<p>이미 회원가입을 하셨나요? <Link to='/signin'>로그인</Link></p>
									</div>
							</div>
					</div>
				</div>
			</div>
    );
}

export default Signup;