import React, { useState } from "react";
import api, { MODE } from "@/services/api";
import { Link } from "react-router-dom";

function Signup(){
    const [signupData, setSignupData] = useState({user_id: '', password: '', username: ''});

    const onClickHandler = api();

    const handleClick = () => {
        onClickHandler('', MODE.SIGNUP, signupData);
    }

    const onKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleClick();
        }
    }

    const setSignupInput = e => {
        const { value, name } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    }

    return (
			<div className="login-wrap">
				<div className="login-scroll">
					<div className="login-cont">
							<form className="login-area">
									<h2>회원가입</h2>
									{/* 에러 메시지 :: error : 에러 / correct : 통과 */}
									<div className="login-input-area input_wrap">
											<label htmlFor="UserID">아이디</label>
											<input id="user_id" name="user_id" type="text" required spellCheck placeholder="아이디" onChange={setSignupInput} onKeyDown={onKeyDown} />
											<p className="msg error">에러입니다</p>
									</div>
									<div className="login-input-area input_wrap">
											<label htmlFor="username">이름</label>
											<input id="username" name="username" type="text" required spellCheck placeholder="이름" onChange={setSignupInput} onKeyDown={onKeyDown} />
											<p className="msg error">에러입니다</p>
									</div>
									<div className="login-input-area input_wrap">
											<label htmlFor="password">비밀번호</label>
											<input id="password" type="password" name="password" required spellCheck placeholder="비밀번호" onChange={setSignupInput} onKeyDown={onKeyDown}/>
											<p className="msg error">에러입니다</p>
									</div>
									<div className="login-input-area input_wrap">
											<label htmlFor="">비밀번호 확인</label>
											<input id="" type="password" name="" required spellCheck placeholder="비밀번호 확인" onChange={setSignupInput} onKeyDown={onKeyDown}/>
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