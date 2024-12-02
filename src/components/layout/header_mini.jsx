import React from "react";

const HeaderMini = ({idx, handleClick, compCloseAction, title}) => {

return(
	<header className="mini flex">
		<button className="back xi-angle-left"></button>
		<h2 className="title">{title}</h2>
	</header>
	);
};

export default HeaderMini;
