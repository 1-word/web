import React from "react";
import { Link } from "react-router-dom";

const HeaderMini = ({idx, handleClick, compCloseAction, title}) => {

return(
	<header className="mini flex">
		{
			(title==="단어장") ?
			<Link to="/" className="home xi-angle-left"></Link>
			: <button className="back xi-angle-left"></button>
		}
		
		<h2 className="title">{title}</h2>
	</header>
	);
};

export default HeaderMini;
