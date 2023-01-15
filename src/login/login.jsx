import React, { useState } from "react";
import Alert from "../wordPaper/Component/Alert/alert";
import ModalPortal from "../util/ModalPortal"
import "./login.css";
import { btnClick, MODE } from "../js/word";
import authStore from "../stores/authStore";

function Login(){
    const [ismsg, setmsgShow] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const {auth, save, saveToken} = authStore(state => state)

    const handleClick = () => {
        setmsgShow(false)
        console.log(loginData)
        async function login(){
            try{
                const result = await btnClick('', MODE.LOGIN, loginData)
                save(result)
                let data = {
                    "refreshToken": result.data.refreshToken,
                    "accessToken": result.data.accessToken
                }
                saveToken(data)
            }catch (e){
                console.log(e)
                setmsgShow(true)
            }
        }
        login()
        
        //btnClick('', MODE.LOGIN, loginData)
        // setmsgShow(true);
        // let timer = setTimeout(() => {
        //     setmsgShow(false);
        //     }, 3000);
        //     return ()=>{ clearTimeout(timer) }
    }

    const onKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleClick();
        }
    }

    const setUsername = (e) => {
        setLoginData({
            username: e.target.value,
            password: loginData.password
        })
    }

    const setPassword = (e) => {
        setLoginData({
            username: loginData.username,
            password: e.target.value
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
                    <input id="username" type="text" name="id" style={{top:"141px"}}placeholder="아이디를 입력해주세요." onChange={setUsername} onKeyDown={onKeyDown}/>  
                    <div className="xb4bf6ba8">비밀번호</div>
                    <div className="login_input" style={{top:"255px"}}></div> 
                    <input id="password" type="password" name="password" style={{top:"215px"}} placeholder="비밀번호를 입력해주세요." onChange={setPassword} onKeyDown={onKeyDown}/>  
                    <div className="x80b3bbb6">로그인</div>
                </div>
            </div>
            {ismsg? <ModalPortal id='alert'>
            <Alert type="error" message="아이디 또는 비밀번호를 확인해주세요."></Alert>
            </ModalPortal>
            : ''
            }
        </div>
}

export default Login;