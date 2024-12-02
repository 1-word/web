
import LOGOTitle_SVG from "@images/logoTitle.svg";
import React, { useState, useRef } from "react";
import api, { MODE } from "@/services/api";
import { Link } from "react-router-dom";

function Login(){
	const loginData = useRef(null);
	const onClickHandler = api();
	
	const handleSubmit = (e) => {
		if (e) {
			e.preventDefault();
		}
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

	const onClickSocialLogin = (e) => {
		const service = e.target.dataset.name;
		const host = process.env.REACT_APP_HOST;
		const url = `${host}oauth2/authorization/${service}`
		window.location.href = url;
	}

	return (
		<div className="login-wrap">
			<div className="login-scroll">
			<h1 className="login-title"><Link to="/">VOCABOX<img src={LOGOTitle_SVG} alt="VOCABOX" /></Link></h1>
				<div className="login-cont">
					<form className="login-area">
						<legend className="disN">로그인</legend>
						<div className="login-input-area input_wrap">
							<label htmlFor="email">아이디</label>
							<input id="email" name="email" type="text" required spellCheck placeholder="아이디를 입력해 주세요" onChange={setInput} onKeyDown={onKeyDown} />
						</div>
						<div className="login-input-area input_wrap">
							<label htmlFor="password">비밀번호</label>
							<input id="password" type="password" name="password" required spellCheck placeholder="비밀번호를 입력해 주세요" onChange={setInput} onKeyDown={onKeyDown}/>
						</div>
						<div className="login-btn-wrap">
							<button className="btn-fill btn-login sizeL" onClick={handleSubmit}>로그인</button>
						</div>
						<div className="login-join-wrap">
								<Link to='/setPw'>비밀번호 재설정</Link>
								<Link to='/signup'>회원가입</Link>
						</div>
						{/* sns login */}
						<ul className="login-sns-lists">
							<li data-name="kakao" className="login-sns-list" onClick={onClickSocialLogin}>
								<i className="kakao"></i>
								카카오 로그인
							</li>
							<li data-name="naver" className="login-sns-list" onClick={onClickSocialLogin}>
								<i className="naver"></i>
								네이버 로그인
							</li>
							<li data-name="google" className="login-sns-list" onClick={onClickSocialLogin}>
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