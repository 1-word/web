import wordListStore, { WORD_KEY } from "@/store/wordListStore";
import { useModal } from "@/hook/_hooks";
import CenterModal from "@components/layout/popup/CenterModal";
import CenterModalConfirm from "@/components/layout/popup/CenterModalConfirm";
import AddTypeEdit from "./GroupEdit";

function AddList(props){
	const [addTypeEditModal] = useModal("addTypeEdit");
	const [deleteTypeEditModal] = useModal("deleteTypeEditModal");
    const {saveList, saveWordList} = wordListStore(state => state);
		const handleAddTypeEditModal = () => (e) => {
			addTypeEditModal(CenterModal,AddTypeEdit);
		}

		const handleDeleteTypeEditModal = () => (e) => {
			deleteTypeEditModal(CenterModal,CenterModalConfirm,{
				title: "",
				content: "정말 삭제하시겠습니까?add_listadd_listadd_listadd_list",
				onClick: () => {},
			})
		}

    const handleOnchange = e => {
        //변수 설정
        let target_id = e.target.id;
        let target_value = e.target.value;        
        let target_name = e.target.name;

        //wordListStore.WORD_KEY
        //객체 저장과 배열(유의어) 저장 분기
        target_name === WORD_KEY.SYNONYMS? saveList[target_name][target_id][WORD_KEY.SYNONYM] = target_value : saveList[target_name] = target_value;
        saveWordList(saveList);
    }

    return <div className="new_sub_list">
						<div className="new_sub_list_head">
							<p className="new_sub_list_title">내 커스텀</p>
							<button className="new_sub_list_btn" onClick={handleAddTypeEditModal()}>수정</button>
							<button className="new_sub_list_btn" onClick={handleDeleteTypeEditModal()}>삭제</button>
						</div>
						<div className="input_wrap new_sub_list_input_wrap">
							<span>{props.text}</span>
							<input name={props.name} id={props.id} value={props.value}type="text"onChange={handleOnchange}/>
            </div>
        </div>    
}

export default AddList;