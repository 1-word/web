import { useEffect, useRef, createElement } from "react";

function Toast({ idx, closeModal, deleteModalAfterTime, contentsProps }) {

	useEffect(() => {
		setTimeout(() => {
			closeModal()
		}, 2500);
	}, []);

	return (
		<div className="toast_wrap">
			<div className="toast_cont">
					{/* contents */}
					{
						contentsProps?.msg
					}
			</div>
		</div>
	);
}

export default Toast;