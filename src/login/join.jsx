import React, { useState } from "react";
import "./login.css";
import useEvntHandler, { MODE } from "../js/useEvntHandler";
import { Link } from "react-router-dom";

function Login(){
    const [loginData, setLoginData] = useState({user_id: '', password: ''});

    const onClickHandler = useEvntHandler()

    const handleClick = () => {
        onClickHandler('', MODE.LOGIN, loginData)
    }

    const onKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleClick();
        }
    }

    const setLoginInput = e => {
        const { value, name } = e.target
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    return (
        <div className="login-wrap">
            <div className="login-cont">
                <div className="login-area">
                    <legend>Join</legend>
                    <div className="login-input-area">
                        <input id="user_id" name="user_id" type="text" spellCheck placeholder="UserID" onChange={setLoginInput} onKeyDown={onKeyDown} />
                        <label htmlFor="UserID">UserID</label>
                    </div>
                    <div className="login-input-area">
                        <input id="username" name="username" type="text" spellCheck placeholder="Username" onChange={setLoginInput} onKeyDown={onKeyDown} />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="login-input-area">
                        <input id="password" type="password" name="password" spellCheck placeholder="Password" onChange={setLoginInput} onKeyDown={onKeyDown}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="login-input-area">
                        <input id="" type="password" name="" spellCheck placeholder="Confirm Password" onChange={setLoginInput} onKeyDown={onKeyDown}/>
                        <label htmlFor="">Confirm Password</label>
                    </div>
                    <div className="login-btn-wrap">
                    <button className="btn-login">Join</button>
                    </div>
                <div className="login-join-wrap">
                    <p>이미 회원가입을 하셨나요? <Link to='/'>로그인</Link></p>
                </div>
                </div>
            </div>
        </div>
        
    );
}

export default Login;