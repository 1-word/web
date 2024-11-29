import LOGOTitle_SVG from "@images/logoTitle.svg";
import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";

function AuthNum(){
	const handleAuthNum = (e) => {
		e.preventDefault();
	}
	return(
		<div>
			<div className="login-input-area input_wrap auth_num_wrap">
				<label htmlFor="auth_num">인증번호</label>
				<div className="auth_num_area">
					<input id="auth_num" name="" type="text" spellCheck placeholder="인증번호"  />
					<button className="btn-fill auth_num_btn sizeM">재전송</button>
					<div className="auth_num_count">03 : 00</div>
				</div>
				<p className="msg error">입력한 인증번호가 맞지 않습니다</p>
			</div>
			<div className="login-btn-wrap">
				<button className="btn-fill btn-login sizeL">인증번호 확인</button>
			</div>
		</div>
	);
};
export default AuthNum;