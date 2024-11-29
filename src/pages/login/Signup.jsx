import React, { useRef, useState } from "react";
import api, { MODE } from "@/services/api";
import { Link } from "react-router-dom";

function Signup(){
    const signupData = useRef(null);
    const onClickHandler = api();

    const handleClick = (e) => {
        e.preventDefault();
        const data = signupData.current;

        if (!checkPassword(data?.confirm_password, data?.password)) {
            // 아래 메시지를 출력해줄 text 추가 필요
            console.log("비밀번호와 일치하지 않습니다.");
            return;
        }

        const {confirm_password, ...req} = data;
        console.log(req);
        onClickHandler(null, MODE.SIGNUP, req);
    }

    const onKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleClick();
        }
    }

    const checkPassword = (value, password) => {
        if (value !== password) {
            return false;
        }
        return true;
    }

    const setSignupInput = e => {
        const data = signupData.current;
        const { value, name } = e.target;

        setSignupData({
            ...data,
            [name]: value
        });

        if (data?.password &&
            name === "confirm_password" && 
            !checkPassword(value, data?.password)) {
            // 아래 메시지를 출력해줄 text 추가 필요
            console.log("비밀번호와 일치하지 않습니다.");
        }
    }

    const setSignupData = (data) => {
        signupData.current = data;
    }

    return (
        <div className="login-wrap">
            <div className="login-cont">
                <div className="login-area">
                    <h2>Join</h2>
                    <div className="login-input-area">
                        <input name="email" type="text" spellCheck placeholder="아이디" onChange={setSignupInput} onKeyDown={onKeyDown} />
                        <label htmlFor="UserID">UserID</label>
                    </div>
                    <div className="login-input-area">
                        <input name="nickname" type="text" spellCheck placeholder="이름" onChange={setSignupInput} onKeyDown={onKeyDown} />
                        <label htmlFor="username">Nickname</label>
                    </div>
                    <div className="login-input-area">
                        <input type="password" name="password" spellCheck placeholder="비밀번호" onChange={setSignupInput} onKeyDown={onKeyDown}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="login-input-area">
                        <input type="password" name="confirm_password" spellCheck placeholder="비밀번호 확인" onChange={setSignupInput} onKeyDown={onKeyDown}/>
                        <label htmlFor="">Confirm Password</label>
                    </div>
                    <div className="login-btn-wrap">
                    <button className="btn-fill btn-login sizeL" onClick={handleClick}>Join</button>
                    </div>
                <div className="login-join-wrap">
                    <p>이미 회원가입을 하셨나요? <Link to='/signin'>로그인</Link></p>
                </div>
                </div>
            </div>
        </div>
        
    );
}

export default Signup;