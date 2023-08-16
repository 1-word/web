import React, { useState } from "react";
import "./login.css";
import useEvntHandler, { MODE } from "../js/useEvntHandler";
import { Link } from "react-router-dom";

function Signup(){
    const [signupData, setSignupData] = useState({user_id: '', password: '', username: ''});

    const onClickHandler = useEvntHandler();

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
                    <legend>Join</legend>
                    <div className="login-input-area">
                        <input id="user_id" name="user_id" type="text" spellCheck placeholder="UserID" onChange={setSignupInput} onKeyDown={onKeyDown} />
                        <label htmlFor="UserID">UserID</label>
                    </div>
                    <div className="login-input-area">
                        <input id="username" name="username" type="text" spellCheck placeholder="Username" onChange={setSignupInput} onKeyDown={onKeyDown} />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="login-input-area">
                        <input id="password" type="password" name="password" spellCheck placeholder="Password" onChange={setSignupInput} onKeyDown={onKeyDown}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="login-input-area">
                        <input id="" type="password" name="" spellCheck placeholder="Confirm Password" onChange={setSignupInput} onKeyDown={onKeyDown}/>
                        <label htmlFor="">Confirm Password</label>
                    </div>
                    <div className="login-btn-wrap">
                    <button className="btn-login" onClick={handleClick}>Join</button>
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