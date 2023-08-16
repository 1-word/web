import React, { useState } from "react";
import "./login.css";
import useEvntHandler, { MODE } from "../js/useEvntHandler";
import { Link } from "react-router-dom";

function Login(){
    const [loginData, setLoginData] = useState({user_id: '', password: ''});

    const onClickHandler = useEvntHandler();

    const handleClick = () => {
        onClickHandler('', MODE.LOGIN, loginData);
    }

    const onKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleClick();
        }
    }

    const setLoginInput = e => {
        const { value, name } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    return (
        <div className="login-wrap">        
            <div className="login-cont">
                <div className="login-area">
                    <legend>Login</legend>
                    <div className="login-input-area">
                        <input id="user_id" name="user_id" type="text" spellCheck placeholder="UserID" onChange={setLoginInput} onKeyDown={onKeyDown} />
                        <label htmlFor="user_id">UserID</label>
                    </div>
                    <div className="login-input-area">
                        <input id="password" type="password" name="password" spellCheck placeholder="Password" onChange={setLoginInput} onKeyDown={onKeyDown}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="login-btn-wrap">
                    <button className="btn-login" onClick={handleClick}>Login</button>
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