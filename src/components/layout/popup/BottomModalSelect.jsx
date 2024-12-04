import React, { useEffect, useRef } from "react";

function BottomModalSelect({setting,deleteModalAfterTime}){
	return (
		<div className="modal_bottom_select_wrap">
			<ul className="modal_bottom_select_lists">
				{
				setting.map((data, idx)=>{
					return <li key={idx} className="modal_bottom_select_list" onClick={() => data.onClick()}>{data.title}</li>;
				})
				}
			</ul>
			<div className="modal_bottom_select_btn_wrap">
				<button onClick={() => deleteModalAfterTime(240)}>취소</button>
			</div>
		</div>
	)
}

export default BottomModalSelect;