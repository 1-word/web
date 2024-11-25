import { createElement } from "react";

function CenterModal({ idx, deleteModalAfterTime, contents, contentsProps }) {
	return(
		<div className="modal_center">
			<div className="modal_center_fix" onClick={() => deleteModalAfterTime(0)}></div>
			<div className="modal_center_wrap">
				<div className="modal_center_cont">
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