import { useEffect, useRef, createElement } from "react";
import LOGOTitle_SVG from "@images/logoTitle.svg";

function Member(contents){
	return(
		<div className="login-wrap">
			<div className="login-scroll">
				<h1 className="login-title">VOCABOX<img src={LOGOTitle_SVG} alt="VOCABOX" /></h1>
			</div>
			{
				createElement(
					contents
				)
			}
		</div>
	)
}

export default Member;