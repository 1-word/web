import React, { useEffect, useRef } from "react";

function CenterModalConfirm({title,content,onClick,deleteModalAfterTime}){
	return (
		<section className="confirm-wrap">
		<div className="confirm-area">
				<div className="confirm-img-area"></div>
				<div className="confirm-txt-area">
						<h2>{title ?? ""}</h2>
						<p>{content ?? ""}</p>
				</div>
		</div>
		<div className="confirm-btn">
				<button className="btn-light sizeM" onClick={() => deleteModalAfterTime(0)}>취소</button>
				<button className="btn-fill sizeM" onClick={(onClick)}>확인</button>
		</div>
	</section>
	)
}

export default CenterModalConfirm;