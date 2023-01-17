import React, { useState } from "react";
import "./login.css";
import useEvntHandler, { MODE } from "../js/useEvntHandler";

function Login(){
    const [loginData, setLoginData] = useState({username: '', password: ''});

    const onClickHandler = useEvntHandler()

    const handleClick = () => {
        console.log(loginData)
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

    return <div className="login">        
            <svg  preserveAspectRatio="none" viewBox="7809.310546875 0 1102.7587890625 1078.965576171875" className="bg"><path d="M 8156.89697265625 0 L 8912.0693359375 0 L 8912.0693359375 1078.965576171875 L 7809.310546875 1078.965576171875 L 8156.89697265625 0 Z"  /></svg>
            <div className="login725514bd">            
                <div className="rect"></div>
                <div className="save" onClick={handleClick}>확인</div>
                <div className="group">                    
                    <div className="x2a307169">아이디</div>
                    <div className="login_input"></div>
                    <input id="username" type="text" name="username" style={{top:"141px"}}placeholder="아이디를 입력해주세요." onChange={setLoginInput} onKeyDown={onKeyDown}/>  
                    <div className="xb4bf6ba8">비밀번호</div>
                    <div className="login_input" style={{top:"255px"}}></div> 
                    <input id="password" type="password" name="password" style={{top:"215px"}} placeholder="비밀번호를 입력해주세요." onChange={setLoginInput} onKeyDown={onKeyDown}/>  
                    <div className="x80b3bbb6">로그인</div>
                </div>
            </div>
        </div>
}

export default Login;