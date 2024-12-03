import { useEffect, useRef, createElement } from "react";

function FullModal({
	setOpenModal,
	isOpened,
	deleteModal,
	contents, 
	contentsProps,
	deleteModalAfterTime
}) {
	const full_wrap = useRef(null);
	useEffect(() => {
		if (!isOpened) {
			full_wrap.current.classList.add("on");
			setOpenModal();
			return;
		}
		full_wrap.current.classList.add("visible");
	}, []);

	return (
		<div ref={full_wrap} className="modal_full_wrap">
			<header className="mini flex">
				<button className="back xi-angle-left" onClick={() => deleteModal(full_wrap.current)}></button>
				<h2 className="title"></h2>
			</header>
			<div className="modal_full_cont">
				<div className="modal_full_scroll">
					{/* contents */}
					{
						createElement(
							contents,
							{
								...contentsProps,
								deleteModalAfterTime
							}
						)
					}
				</div>
			</div>
		</div>
	);
}

export default FullModal;