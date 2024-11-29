import React, { useState, useRef} from "react";
import api, { MODE } from "@/services/api";
import { Link } from "react-router-dom";
import { useInput } from "@/hook/_hooks"

function Login(){
    const loginData = useRef(null);
    const onClickHandler = api();

    const handleSubmit = () => {
        const data = loginData.current;
        onClickHandler('', MODE.LOGIN, data);
    }

    const setInput = e => {
        const data = loginData.current;
        const { value, name } = e.target;

        setData({
            ...data,
            [name]: value
        });

    }

    const setData = (data) => {
        loginData.current = data;
    }

    const onKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleSubmit();
        }
    }


    return (
        <div className="login-wrap">        
            <div className="login-cont">
                <div className="login-area">
                    <h2>Login</h2>
                    <div className="login-input-area">
                        <input name="email" type="text" spellCheck placeholder="아이디" onChange={setInput} onKeyDown={onKeyDown} />
                        <label htmlFor="user_id">UserID</label>
                    </div>
                    <div className="login-input-area">
                        <input type="password" name="password" spellCheck placeholder="비밀번호" onChange={setInput} onKeyDown={onKeyDown}/>
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