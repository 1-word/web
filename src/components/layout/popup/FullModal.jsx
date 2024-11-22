import { useEffect, useRef, createElement } from "react";

function FullModal({ deleteModalAfterTime, contents, contentsProps }) {

	const full_wrap = useRef(null);
	useEffect(() => {
		full_wrap.current.className = "modal_full_wrap on"
	}, []);

	return (
		<div ref={full_wrap} className="modal_full_wrap">
			<header className="mini flex">
				<button className="back xi-angle-left"></button>
				<h2 className="title">내 단어장</h2>
				<button className="close xi-close" onClick={() => deleteModalAfterTime(150)}></button>
			</header>
			<div className="modal_full_cont">
				<div className="modal_full_scroll">
					{/* contents */}
					{
						createElement(
							contents,
							{
								...contentsProps
							}
						)
					}
				</div>
			</div>
		</div>
	);
}

export default FullModal;