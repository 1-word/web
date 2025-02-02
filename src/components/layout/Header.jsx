import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LOGOTitle_SVG from "@images/logoTitle.svg";
import authStore from "@/store/authStore";
import api, { MODE } from "@/services/api";

const Header = () =>{
	const [loginStatus, setLoginStatus] = useState(false);
	const { token } = authStore();
	const onClickHandler = api();

	useEffect(() => {
		if (token.accessToken === null || token.accessToken === undefined || token.accessToken === "") {
			setLoginStatus(false);
			return;
		}
		setLoginStatus(true);
	}, [token]);

	const handleSignout = () => {
		onClickHandler(null, MODE.SIGNOUT);
		setLoginStatus(false);
	}
return(
	<header className="flex">
	<h1><Link to="/">VOCABOX<img src={LOGOTitle_SVG} alt="VOCABOX" /></Link></h1>
	<nav>
		<ul className="flex">
				{/* 알림 없는 경우 */}
				{/* 임시 삭제 */}
				{/* <li>
					<Link to="/notice">
						<i className="bell"></i>
					</Link>
				</li> */}
				{/* 알림 있는 경우 */}
				<li>
					<Link to="/notice">
						<i className="ring"></i>
					</Link>
				</li>
				{loginStatus?
					<li className="btn">
						<button className="btn-fill sizeM" onClick={handleSignout}>로그아웃</button>
					</li>
				: <>
						<li>
								<Link to="/signin">로그인</Link>
						</li>
						<li className="btn">
								<Link to="/signup" className="btn-fill sizeM">회원가입</Link>
						</li>
					</>
				}
		</ul>
	</nav>
	</header>
	);
};

export default Header;