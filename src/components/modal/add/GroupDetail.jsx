import React, {useState, useRef, useEffect} from "react";
import { useModal } from "@/hook/_hooks";
import CenterModal from "@/components/layout/popup/CenterModal";
import AddName from "./AddName";
import api, { MODE } from "@/services/api";

function GroupDetail({
	deleteModalAfterTime,
	group,
	saveList,
	saveGroupList,
	updateGroupName,
	createGroup,
	isEdit,
	editIdx,
}){

	const [groupDetail, setGroupDetail] = useState([{}]);
	const [addNameModal] = useModal("addName");
	const onClickHandler = api();

	useEffect(() => {
		if (isEdit){
			setGroupDetail(group.groups);
		}
	}, []);

	const handleAddNameModal = () => e => {
		addNameModal(CenterModal, AddName, {
			wordGroupId: group.wordGroupId,
			updateGroupName,
			createGroup
		});
	}

	// title 입력
	const handleOnChangeInput = (idx) => e => {
		const {name, value} = e.target;

		const saveGroup = [...groupDetail];
		saveGroup[idx]['title'] = value;

		setGroupDetail(saveGroup);
	}

	// + 버튼 클릭
	const hanndleClickAdd = e => {
		setGroupDetail([...groupDetail, {}]);
	}

	// title 삭제
	const handleClickDelete = (idx) => e => {
		const deleteGroup = groupDetail.filter((value, i) => i !== idx);
		setGroupDetail(deleteGroup);
	}

	// 완료
	const handleClickComplete = e => {
		if (isEdit) {
			// 수정된건 수정,
			let editGroups = group.groups.map((val, idx) => {
				val.title = groupDetail[idx].title;
				return val;
			});

			const preGroupLen = group.groups.length;

			if (preGroupLen < groupDetail.length) {
				for (let i=preGroupLen; i<groupDetail.length; i++) {
					editGroups = [...editGroups, {title: groupDetail[i].title}];
				}
			}

			let edit = {...saveList};
			edit.details[editIdx].groups = editGroups;
			deleteModalAfterTime(240);
			saveGroupList(edit);
			return;
		}

		const result = {
			wordGroupId: group.wordGroupId,
			groupName: group.name,
			groups: groupDetail
		}

		let data = {...saveList};
		data.details = [...data?.details, result];
		deleteModalAfterTime(240);
		saveGroupList(data);
	}

	const groupNameEdit = e => {}

	const groupDetailList = groupDetail?.map((group, idx) => {
		return <React.Fragment key={`groupDetail${idx}`}>
			<li className="add_list">
						<input type="text" value={group.title || ''} onChange={handleOnChangeInput(idx)}/>
						<button className="xi-close" onClick={handleClickDelete(idx)}></button>
			</li>
		</React.Fragment>
	});

	return(
		<div className="add_type_wrap">
			<h2 className="modal_center_title">
				{group.name || group.groupName}
				{ (!group?.isDefaultGroup && !isEdit) && 
				<button className="add_type_edit_btn" onClick={handleAddNameModal()}>
					수정
				<i className="edit" onClick={groupNameEdit}></i>
				</button>}
			</h2>

			<div className="add_wrap">
				<ul className="add_cont">
					{groupDetailList}
					<li className="add_list add_plus" onClick={hanndleClickAdd}>
						<i className="xi-plus"></i>
					</li>
				</ul>
			</div>
			<div className="modal_center_btn">
				<button className="btn-light sizeM" onClick={() => deleteModalAfterTime(240)}>취소</button>
				<button className="btn-fill sizeM" onClick={handleClickComplete}>확인</button>
			</div>
		</div>
	);
};
export default GroupDetail;