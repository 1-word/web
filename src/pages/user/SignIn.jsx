import React, { useState, useRef } from "react";
import api, { MODE } from "@/services/api";
import { Link } from "react-router-dom";
import { useInput } from "@/hook/_hooks"

function Login(){
	const loginData = useRef(null);
	const onClickHandler = api();

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = loginData.current;
		onClickHandler('', MODE.LOGIN, data);
	}

	const setInput = e => {
		const data = loginData.current;
		const { value, name } = e.target;

		setData({
			...data,
			[name]: value
		});
	}

	const setData = (data) => {
		loginData.current = data;
	}

	const onKeyDown = (e) => {
		if(e.key === 'Enter'){
				handleSubmit();
		}
	}

	return (
		<div className="login-wrap">
			<div className="login-scroll">
				<div className="login-cont">
					<form className="login-area">
						<h2>로그인</h2>
						<div className="login-input-area input_wrap">
							<label htmlFor="email">아이디</label>
							<input id="email" name="email" type="text" required spellCheck placeholder="아이디" onChange={setInput} onKeyDown={onKeyDown} />
						</div>
						<div className="login-input-area input_wrap">
							<label htmlFor="password">비밀번호</label>
							<input id="password" type="password" name="password" required spellCheck placeholder="비밀번호" onChange={setInput} onKeyDown={onKeyDown}/>
						</div>
						<div className="login-btn-wrap">
							<button className="btn-fill btn-login sizeL" onClick={handleSubmit}>Login</button>
						</div>
						<div className="login-join-wrap">
								<p>아직 회원가입을 하지 않으셨나요? <Link to='/signup'>회원가입</Link></p>
						</div>
						{/* sns login */}
						<ul className="login-sns-lists">
							<li className="login-sns-list">
								<i className="kakao"></i>
								카카오 로그인
							</li>
							<li className="login-sns-list">
								<i className="naver"></i>
								네이버 로그인
							</li>
							<li className="login-sns-list">
								<i className="google"></i>
								구글 로그인
							</li>
						</ul>
						{/* sns login */}
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;