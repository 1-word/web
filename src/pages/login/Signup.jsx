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
            <div className="login-cont">
                <div className="login-area">
                    <h2>Join</h2>
                    <div className="login-input-area">
                        <input id="user_id" name="user_id" type="text" spellCheck placeholder="아이디" onChange={setSignupInput} onKeyDown={onKeyDown} />
                        <label htmlFor="UserID">UserID</label>
                    </div>
                    <div className="login-input-area">
                        <input id="username" name="username" type="text" spellCheck placeholder="이름" onChange={setSignupInput} onKeyDown={onKeyDown} />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="login-input-area">
                        <input id="password" type="password" name="password" spellCheck placeholder="비밀번호" onChange={setSignupInput} onKeyDown={onKeyDown}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="login-input-area">
                        <input id="" type="password" name="" spellCheck placeholder="비밀번호 확인" onChange={setSignupInput} onKeyDown={onKeyDown}/>
                        <label htmlFor="">Confirm Password</label>
                    </div>
                    <div className="login-btn-wrap">
                    <button className="btn-fill btn-login sizeL" onClick={handleClick}>Join</button>
                    </div>
                <div className="login-join-wrap">
                    <p>이미 회원가입을 하셨나요? <Link to='/'>로그인</Link></p>
                </div>
                </div>
            </div>
        </div>
        
    );
}

export default Signup;