import React, { useState } from "react";
import api, { MODE } from "@/services/api";
import { Link } from "react-router-dom";
import { useInput } from "@/hook/_hooks"

function Login(){
    // const [loginData, setLoginData] = useState({user_id: '', password: ''});

    const submitAction = () => {
        onClickHandler('', MODE.LOGIN, loginData);
    }

    const [loginData, handleChange, handleSubmit, handleOnKeyDown] = useInput({user_id: '', password: ''}, submitAction);

    const onClickHandler = api();

    return (
        <div className="login-wrap">        
            <div className="login-cont">
                <div className="login-area">
                    <h2>Login</h2>
                    <div className="login-input-area">
                        <input id="user_id" name="user_id" type="text" spellCheck placeholder="아이디" onChange={e=>handleChange(e, loginData)} onKeyDown={handleOnKeyDown} />
                        <label htmlFor="user_id">UserID</label>
                    </div>
                    <div className="login-input-area">
                        <input id="password" type="password" name="password" spellCheck placeholder="비밀번호" onChange={e=>handleChange(e, loginData)} onKeyDown={handleOnKeyDown}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="login-btn-wrap">
                    <button className="btn-fill sizeL" onClick={handleSubmit}>Login</button>
                    </div>
                <div className="login-join-wrap">
                    <p>아직 회원가입을 하지 않으셨나요? <Link to='/signup'>회원가입</Link></p>
                </div>
                </div>
            </div>
        </div>
        
    );
}

export default Login;