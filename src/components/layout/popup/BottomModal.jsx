import { useEffect, useRef, createElement } from "react";

function BottomModal({ idx, deleteModalAfterTime, contents, contentsProps }) {

	const bottom_wrap = useRef(null);
	useEffect(() => {
		bottom_wrap.current.classList.add("on");
	}, []);

	return (
		<div ref={bottom_wrap} className="modal_bottom">
			<div className="modal_bottom_wrap">
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