import React from "react";

const HeaderMini = ({idx, handleClick, compCloseAction}) => {

return(
	<header className="mini flex">
		<button className="back xi-angle-left"></button>
		<h2 className="title">내 단어장</h2>
	</header>
	);
};

export default HeaderMini;
