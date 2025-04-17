import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function ErrorPage({content}){
	const dinoBox = useRef([]);
	
	
	useEffect(()=>{
		const width = 150;
		let currentIdx = 0;
		const gap = 200;
		
		setInterval(()=>{
			dinoBox.current.style.backgroundPositionX = `${-width * currentIdx}px`;
			currentIdx ++;
			if(currentIdx === 5){
				currentIdx = 0;
			}
		},gap)

	},[])

	return(
		<>
			<div className="ep_wrap">
				<h1 className="ep_title">Oops!</h1>
				<p className="ep_content">{content}잠시 후에 다시 시도해주세요</p>
				<div className="ep_ani">
					<div ref={dinoBox} className="ep_dino"></div>
				</div>
				<div className="ep_btn_wrap">
					<Link to="/" className="btn-fill sizeL ep_btn">홈으로 돌아가기</Link>
				</div>
			</div>
		</>
	);
};
export default ErrorPage;