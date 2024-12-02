import LOGOTitle_SVG from "@images/logoTitle.svg";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import api, { MODE } from "@/services/api";
import AuthNumComp from "@/pages/user/AuthNumComplete";

function AuthNum({retry, email}){
	const onClickHandler = api();
	const codeRef = useRef(null);
	const [timer, setTimer] = useState(300);
	const [reset, setResetStatus] = useState(false);

	useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTime => {
        if (prevTime <= 1) {
          clearInterval(interval); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
	
	const endTimer = () => {
		setTimer(0);
	}

	const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
	const seconds = String(timer % 60).padStart(2, '0');

	const resendVerificationCode = (e) => {
		e.preventDefault();
		retry();
		setTimer(300);
	}

	const verificationCode = e => {
		e.preventDefault();
		onClickHandler(null, MODE.VERIFICATION, {
			email,
			code: codeRef.current.value
		}).then(res => {
			if (res) {
				// 비밀번호 재설정 출력
				endTimer();
				setResetStatus(true)
			}
		});
	}

	return(
		<div>
			{ !reset ?
			<>
					<div className="login-input-area input_wrap auth_num_wrap">
					<label htmlFor="auth_num">인증번호</label>
					<div className="auth_num_area">
						<input ref={codeRef} id="auth_num" name="" type="text" spellCheck placeholder="인증번호"  />
						<button className="btn-fill auth_num_btn sizeM" onClick={resendVerificationCode}>재전송</button>
						<div className="auth_num_count">{minutes} : {seconds}</div>
					</div>
				</div>
				<div className="login-btn-wrap">
					<button className="btn-fill btn-login sizeL" onClick={verificationCode}>인증번호 확인</button>
				</div>
			</>
			: <AuthNumComp email={email}></AuthNumComp>
			}
		</div>
	);
};
export default AuthNum;