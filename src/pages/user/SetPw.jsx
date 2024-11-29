import LOGOTitle_SVG from "@images/logoTitle.svg";
import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import AuthNum from "@/components/user/AuthNum";

function SetPw(){
	const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
	const [btnState, setBtnState] = useState(true);
	const [text, setText] = useState('');
	const [disabled , setDisabled] = useState(true);

  function handleChange(e) {
		const {value} = e.target;
    setText(e.target.value);
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
		setBtnState(false);
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
						<input id="email" name="email" type="text" spellCheck placeholder="이메일을 입력해 주세요" onChange={handleChange} />
						<p className="msg error">입력하신 이메일이 존재하지 않습니다</p>
					</div>
					<div className="login-btn-wrap">
						{
							btnState ? 
							<button className="btn-fill btn-login sizeL" disabled={disabled} onClick={handleAuthNum}>이메일로 인증번호 받기</button> : "" 
						}
					</div>
					{/* 인증번호 랩 */}
					<div>
						{btnState ? "" : <AuthNum></AuthNum>}
					</div>
					{/* 인증번호 랩 */}
				</form>
			</div>
		</div>
	</div>
	);
};
export default SetPw;