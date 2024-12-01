import {useState, useRef, useEffect} from "react";
import { useModal } from "@/hook/_hooks";
import CenterModal from "@/components/layout/popup/CenterModal";
import AddName from "./AddName";


function GroupEdit({deleteModalAfterTime}){

	const [addNameModal] = useModal("addName");

	const handleAddNameModal = () => e => {
		addNameModal(CenterModal,AddName)
	}

	return(
		<div className="add_type_wrap">
			<h2 className="modal_center_title">
				품사 이름
				<button className="add_type_edit_btn" onClick={handleAddNameModal()}>
					수정
					<i className="edit"></i>
				</button>
			</h2>
			<div className="add_wrap">
				<ul className="add_cont">
					<li className="add_list">
						<input type="text" />
						<button className="xi-close"></button>
					</li>
					<li className="add_list">
						<input type="text" />
						<button className="xi-close"></button>
					</li>
					<li className="add_list">
						<input type="text" />
						<button className="xi-close"></button>
					</li>
					<li className="add_list">
						<input type="text" />
						<button className="xi-close"></button>
					</li>
					<li className="add_list">
						<input type="text" />
						<button className="xi-close"></button>
					</li>
					<li className="add_list add_plus">
						<i className="xi-plus"></i>
					</li>
				</ul>
			</div>
			<div className="modal_center_btn">
				<button className="btn-light sizeM" onClick={() => deleteModalAfterTime(240)}>취소</button>
				<button className="btn-fill sizeM">확인</button>
			</div>
		</div>
	);
};
export default GroupEdit;