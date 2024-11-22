import { useEffect, useRef, createElement } from "react";

function CenterModal({ idx, deleteModalAfterTime, contents, contentsProps }) {
	return(
		<div className="vb-pop">
			<div className="vb_pop_wrap">
				<div className="vb-pop-cont">
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

export default CenterModal;