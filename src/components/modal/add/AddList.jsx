import wordListStore, { WORD_KEY } from "@/store/wordListStore";
import { useModal } from "@/hook/_hooks";
import CenterModal from "@components/layout/popup/CenterModal";
import CenterModalConfirm from "@/components/layout/popup/CenterModalConfirm";
import AddTypeEdit from "./GroupEdit";
import React from "react";

function AddList(props){
	const [addTypeEditModal] = useModal("addTypeEdit");
	const [deleteTypeEditModal] = useModal("deleteTypeEditModal");

		const handleAddTypeEditModal = (idx) => (e) => {
			addTypeEditModal(CenterModal, AddTypeEdit);
		}

		const handleDeleteTypeEditModal = (idx) => (e) => {
			deleteTypeEditModal(CenterModal,CenterModalConfirm,{
				title: '',
				content: '정말 삭제하시겠습니까?add_listadd_listadd_listadd_list',
				onClick: () => {},
			})
		}

    const handleOnchange = (idx) => e => {
				e.preventDefault();
				const {name, value} = e.target;
				const saveList = {...props.saveList};

				saveList.details[props.idx].groups[idx][name] = value;

				props.saveGroupList(saveList);
    }

		const groupList = props.detail.groups.map((group, idx) => {
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
							<button className="new_sub_list_btn" onClick={handleAddTypeEditModal(props.detail.wordGroupId)}>수정</button>
							<button className="new_sub_list_btn" onClick={handleDeleteTypeEditModal(props.detail.wordGroupId)}>삭제</button>
						</div>
						{groupList}
        </div>    
}

export default AddList;