import wordListStore, { WORD_KEY } from "@/store/wordListStore";
import { useModal } from "@/hook/_hooks";
import CenterModal from "@components/layout/popup/CenterModal";
import CenterModalConfirm from "@/components/layout/popup/CenterModalConfirm";
import GroupEdit from "./GroupDetail";
import React from "react";

function AddList(props){
	const [addTypeEditModal] = useModal("addTypeEdit");
	const [deleteTypeEditModal] = useModal("deleteTypeEditModal");

		const handleAddTypeEditModal = (e) => {
			addTypeEditModal(CenterModal, GroupEdit, {
				group: props.detail,
				saveList: props.saveList,
				saveGroupList: props.saveGroupList,
				isEdit: true,
				editIdx: props.idx,
			});
		}

		const handleDeleteTypeEditModal = (e) => {
			deleteTypeEditModal(CenterModal, CenterModalConfirm, {
				title: '품사 세부사항 삭제',
				content: '정말 삭제하시겠습니까?',
				onClick: () => {
					let data= {...props.saveList};
					data.details = data.details.filter(item => item.wordGroupId !== props.detail.wordGroupId);
					props.saveGroupList(data);
				},
			})
		}

    const handleOnchange = (idx) => e => {
				e.preventDefault();
				const {name, value} = e.target;
				const saveList = {...props.saveList};

				saveList.details[props.idx].groups[idx][name] = value;

				props.saveGroupList(saveList);
    }

		const groupList = props.detail?.groups?.map((group, idx) => {
			return <React.Fragment key={`detailGroups${props.idx}${idx}`}>
							<div className="input_wrap new_sub_list_input_wrap">
								<span>{group.title}</span>
								<input name='content' value={group.content} type="text" onChange={handleOnchange(idx)}/>
            	</div>
						</React.Fragment>
		})

    return <div className="new_sub_list">
							<div className="new_sub_list_head">
								<p className="new_sub_list_title">{props.detail.groupName}</p>
								<button className="new_sub_list_btn" onClick={handleAddTypeEditModal}>수정</button>
								<button className="new_sub_list_btn" onClick={handleDeleteTypeEditModal}>삭제</button>
							</div>
						{groupList}
        </div>    
}

export default AddList;