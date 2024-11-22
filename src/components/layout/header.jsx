import React from "react";
import { Link } from "react-router-dom";
import LOGOTitle_SVG from "@images/logoTitle.svg";

const Header = () =>{
return(
<header className="flex">
<h1><Link to="/">VOCABOX<img src={LOGOTitle_SVG} alt="VOCABOX" /></Link></h1>
<nav>
	<ul className="flex">
		{/* 회원일 경우에 로그인 사라짐 && 회원가입이 로그아웃으로 바뀜 */}
		{/* sessionStorage.getItem */}
			<li>
					<Link to="/signin">로그인</Link>
			</li>
			<li className="btn">
					<Link to="/signup" className="btn-fill sizeM">회원가입</Link>
			</li>
	</ul>
</nav>
</header>
);
};

export default Header;
