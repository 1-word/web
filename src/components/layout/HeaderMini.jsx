import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HeaderMini = ({idx, handleClick, compCloseAction, title, fixed}) => {
	const navigate = useNavigate();
return(
	<header className={fixed? "mini flex fixed" : "mini flex"}>
		{
			(title==="단어장") ?
			<button></button>
			: <button className="back xi-angle-left" onClick={() => navigate(-1)}></button>
		}
		
		<h2 className="title">{title}</h2>
	</header>
	);
};

export default HeaderMini;
