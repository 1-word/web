import LOGOTitle_SVG from "@images/logoTitle.svg";
import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import AuthNum from "@/components/user/AuthNum";
import api, { MODE } from "@/services/api";

function SetPw(){
	const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
	const [btnState, setBtnState] = useState(true);
	const [disabled , setDisabled] = useState(true);
	const emailRef = useRef(null);
	const onClickHandler = api();

  function handleChange(e) {
		const {value} = e.target;
		const mailReg = pattern.test(value);
		if(value === undefined || value === "" || value === null){
			setDisabled(true);
		}else{
			if(mailReg){
				setDisabled(false);
			}
		}
  }

	const handleAuthNum = (e) => {
		e.preventDefault();
		verificationCode();
	}

	const retry = () => {
		verificationCode();
	}

	const verificationCode = () => {
		const text = emailRef.current.value;
		onClickHandler(null, MODE.CODE, {
			type: "pw",
			email: text
		}).then(res => {
			if (res) {
				setBtnState(false);
				emailRef.current.readOnly = true;
			}
		});
	}

	return(
		<div className="login-wrap">
		<div className="login-scroll">
		<h1 className="login-title"><Link to="/">VOCABOX<img src={LOGOTitle_SVG} alt="VOCABOX" /></Link></h1>
			<div className="login-cont">
				<form className="login-area">
					<legend className="disN">로그인</legend>
					<div className="login-input-area input_wrap">
						<label htmlFor="email">이메일</label>
						<input ref={emailRef} id="email" name="email" type="text" spellCheck placeholder="이메일을 입력해 주세요" onChange={handleChange} />
					</div>
					<div className="login-btn-wrap">
						{
							btnState ? 
							<button className="btn-fill btn-login sizeL" disabled={disabled} onClick={handleAuthNum}>이메일로 인증번호 받기</button> : "" 
						}
					</div>
					{/* 인증번호 랩 */}
					<div>
						{btnState ? "" : <AuthNum retry={retry} email={emailRef.current.value}></AuthNum>}
					</div>
					{/* 인증번호 랩 */}
				</form>
			</div>
		</div>
	</div>
	);
};
export default SetPw;