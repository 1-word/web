import LOGOTitle_SVG from "@images/logoTitle.svg";
import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";

function AuthNumComp(){
	const [btnState, setBtnState] = useState(true);
	const [text, setText] = useState('');
	const [disabled , setDisabled] = useState(true);

  function handleChange(e) {
		const {value} = e.target;
    setText(e.target.value);
		if(value === undefined || value === "" || value === null){
			setDisabled(true);
		}else{
			setDisabled(false);
		}
  }
	return(
		<div className="login-wrap">
		<div className="login-scroll">
		<h1 className="login-title"><Link to="/">VOCABOX<img src={LOGOTitle_SVG} alt="VOCABOX" /></Link></h1>
			<div className="login-cont">
				<form className="login-area">
					<legend className="disN">이메일 인증 완료</legend>
					<div className="login-input-area input_wrap">
						<label htmlFor="password">비밀번호</label>
						<input id="password" name="" type="password" spellCheck placeholder="새 비밀번호를 입력해 주세요" onChange={handleChange} />
						<p className="msg error">사용할 수 없는 비밀번호입니다</p>
					</div>
					<div className="login-btn-wrap">
						<button className="btn-fill btn-login sizeL" disabled={disabled}>비밀번호 재설정</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	);
};
export default AuthNumComp;