import { useEffect, useRef, createElement } from "react";

function FullModal({
	setOpenModal,
	isOpened,
	deleteModalAfterTime, 
	contents, 
	contentsProps 
}) {
	const full_wrap = useRef(null);
	useEffect(() => {
		full_wrap.current.classList.remove("remove");
		console.log("modal flag: " + isOpened);
		if (!isOpened) {
			full_wrap.current.classList.add("on");
			setOpenModal();
		}
	}, []);

	return (
		<div ref={full_wrap} className="modal_full_wrap remove">
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