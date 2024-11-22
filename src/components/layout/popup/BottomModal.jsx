import { useEffect, useRef, createElement } from "react";

function BottomModal({ 
	idx, 
	deleteModalAfterTime, 
	contents, 
	contentsProps,
	isOpened,
	setOpenModal
}) {
	const bottom_wrap = useRef(null);
	useEffect(() => {
		if (!isOpened) {
			bottom_wrap.current.classList.add("on");
			setOpenModal();
		}
	}, []);

	return (
		<div className="modal_bottom off">
			<div className="modal_bottom_fix" onClick={() => deleteModalAfterTime(150)}></div>
			<div ref={bottom_wrap} className="modal_bottom_wrap">
				<div className="modal_bottom_dragable"></div>
				<div className="modal_bottom_cont">
				{
						createElement(
							contents,
							{
								idx,
								deleteModalAfterTime,
								...contentsProps,
							}
						)
					}
				</div>
			</div>
		</div>
	)
}

export default BottomModal;