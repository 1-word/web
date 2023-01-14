import React, { useState } from "react";
import Alert from "../wordPaper/Component/Alert/alert";
import ModalPortal from "../module/ModalPortal"
import "./login.css";

function Login(){
    const [ismsg, setmsgShow] = useState(false);

    const handleClick = () => {
        setmsgShow(true);
        let timer = setTimeout(() => {
            setmsgShow(false);
            }, 3000);
            return ()=>{ clearTimeout(timer) }
    }

    return <div className="login">        
                <svg  preserveAspectRatio="none" viewBox="7809.310546875 0 1102.7587890625 1078.965576171875" className="bg"><path d="M 8156.89697265625 0 L 8912.0693359375 0 L 8912.0693359375 1078.965576171875 L 7809.310546875 1078.965576171875 L 8156.89697265625 0 Z"  /></svg>
            <div className="login725514bd">            
            <div className="rect"></div>
                <div className="save" onClick={handleClick}>                
            </div>
                <div className="group">                    
                    <div className="x2a307169">아이디</div>
                    <div className="login_input"></div>
                    <input type="text" name="id" style={{top:"141px"}}placeholder="아이디를 입력해주세요."/>  
                    <div className="xb4bf6ba8">비밀번호</div>
                    <div className="login_input" style={{top:"255px"}}></div> 
                    <input type="password" name="password" style={{top:"215px"}} placeholder="비밀번호를 입력해주세요."/>  
                    <div className="x80b3bbb6">로그인</div>
                </div>
            </div>
        {ismsg? <ModalPortal id='alert'>
            <Alert type="error" message="아이디 또는 비밀번호를 확인해주세요.">
            </Alert>
        </ModalPortal>
        : ''
        }
        </div>
}

export default Login;