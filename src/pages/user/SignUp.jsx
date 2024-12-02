import LOGOTitle_SVG from "@images/logoTitle.svg";
import React, { useState, useRef } from "react";
import api, { MODE } from "@/services/api";
import { Link } from "react-router-dom";

function Signup(){
	const signupData = useRef(null);
	const [mailState,setMailState] = useState(false);
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

	const handleCheckMailAuth = () => {
		setMailState(true);
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
							<div className="login-area">
									<legend className="disN">회원가입</legend>
									{/* 에러 메시지 :: error : 에러 / correct : 통과 */}
									<div className="login-input-area input_wrap">
											<label htmlFor="email">이메일</label>
											<div className="auth_num_area">
												<input id="email" name="email" type="email" spellCheck placeholder="이메일" onChange={setSignupInput} onKeyDown={onKeyDown} />
												<button className="btn-fill auth_num_btn sizeM" onClick={handleCheckMailAuth}>이메일 인증</button>
											</div>
											<p className="msg error">에러입니다</p>
									</div>
									<div className="login-input-area input_wrap auth_num_wrap">
										<label htmlFor="auth_num"></label>
										<div className="auth_num_area">
											<input id="auth_num" name="" type="text" spellCheck placeholder="인증번호"  />
											<button className="btn-fill auth_num_btn sizeM">재전송</button>
											<div className="auth_num_count">05 : 00</div>
										</div>
										<p className="msg error">입력한 인증번호가 맞지 않습니다</p>
									</div>
									<div className="login-btn-wrap">
										<button className="btn-fill btn-login sizeL">인증번호 확인</button>
									</div>
									<div className="login-input-area input_wrap">
											<label htmlFor="nickname">이름</label>
											<input id="nickname" name="nickname" type="text" spellCheck placeholder="이름" onChange={setSignupInput} onKeyDown={onKeyDown} />
											<p className="msg error">에러입니다</p>
									</div>
									<div className="login-input-area input_wrap">
											<label htmlFor="password">비밀번호</label>
											<input id="password" type="password" name="password" spellCheck placeholder="비밀번호" onChange={setSignupInput} onKeyDown={onKeyDown}/>
											<p className="msg error">에러입니다</p>
									</div>
									<div className="login-input-area input_wrap">
											<label htmlFor="confirm_password">비밀번호 확인</label>
											<input id="confirm_password" type="password" name="confirm_password" spellCheck placeholder="비밀번호 확인" onChange={setSignupInput} onKeyDown={onKeyDown}/>
											<p className="msg error">에러입니다</p>
											<p className="msg correct">통과입니다</p>
									</div>
									<div className="login-btn-wrap">
									<button className="btn-fill btn-login sizeL" onClick={handleClick}>회원가입</button>
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