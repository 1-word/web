import LOGOTitle_SVG from "@images/logoTitle.svg";
import React, { useState, useRef } from "react";
import api, { MODE } from "@/services/api";
import { Link } from "react-router-dom";

function Signup(){
	const signupData = useRef(null);
	const onClickHandler = api();

	const handleClick = (e) => {
			e.preventDefault();
			const data = signupData.current;

			if (!checkPassword(data?.confirm_password, data?.password)) {
					// 아래 메시지를 출력해줄 text 추가 필요
					console.log("비밀번호와 일치하지 않습니다.");
					return;
			}

			const {confirm_password, ...req} = data;
			console.log(req);
			onClickHandler(null, MODE.SIGNUP, req);
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

	const setSignupInput = e => {
			const data = signupData.current;
			const { value, name } = e.target;

			setSignupData({
					...data,
					[name]: value
			});

			if (data?.password &&
					name === "confirm_password" && 
					!checkPassword(value, data?.password)) {
					// 아래 메시지를 출력해줄 text 추가 필요
					console.log("비밀번호와 일치하지 않습니다.");
			}
	}

	const setSignupData = (data) => {
			signupData.current = data;
	}

    return (
			<div className="login-wrap">
				<div className="login-scroll">
				<h1 className="login-title"><Link to="/">VOCABOX<img src={LOGOTitle_SVG} alt="VOCABOX" /></Link></h1>
					<div className="login-cont">
							<form className="login-area">
									<h2>회원가입</h2>
									{/* 에러 메시지 :: error : 에러 / correct : 통과 */}
									<div className="login-input-area input_wrap">
											<label htmlFor="email">아이디</label>
											<input id="email" name="email" type="text" required spellCheck placeholder="아이디" onChange={setSignupInput} onKeyDown={onKeyDown} />
											<p className="msg error">에러입니다</p>
									</div>
									<div className="login-input-area input_wrap">
											<label htmlFor="nickname">이름</label>
											<input id="nickname" name="nickname" type="text" required spellCheck placeholder="이름" onChange={setSignupInput} onKeyDown={onKeyDown} />
											<p className="msg error">에러입니다</p>
									</div>
									<div className="login-input-area input_wrap">
											<label htmlFor="password">비밀번호</label>
											<input id="password" type="password" name="password" required spellCheck placeholder="비밀번호" onChange={setSignupInput} onKeyDown={onKeyDown}/>
											<p className="msg error">에러입니다</p>
									</div>
									<div className="login-input-area input_wrap">
											<label htmlFor="confirm_password">비밀번호 확인</label>
											<input id="confirm_password" type="password" name="confirm_password" required spellCheck placeholder="비밀번호 확인" onChange={setSignupInput} onKeyDown={onKeyDown}/>
											<p className="msg error">에러입니다</p>
											<p className="msg correct">통과입니다</p>
									</div>
									<div className="login-btn-wrap">
									<button className="btn-fill btn-login sizeL" onClick={handleClick}>Join</button>
									</div>
									<div className="login-join-wrap">
											<p>이미 회원가입을 하셨나요? <Link to='/signin'>로그인</Link></p>
									</div>
							</form>
					</div>
				</div>
			</div>
    );
}

export default Signup;