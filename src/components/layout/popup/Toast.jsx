import { useEffect, useRef, createElement } from "react";

function Toast({ deleteModalAfterTime, contentsProps }) {

	useEffect(() => {
		deleteModalAfterTime(3000);
	});

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