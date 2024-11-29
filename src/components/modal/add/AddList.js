import wordListStore, { WORD_KEY } from "@/store/wordListStore";
import { useModal } from "@/hook/_hooks";
import CenterModal from "@components/layout/popup/CenterModal";
import AddTypeEdit from "./addTypeEdit";

function AddList(props){
	const [addTypeEditModal] = useModal("addTypeEdit");
    const {saveList, saveWordList} = wordListStore(state => state);
		const handleAddTypeEditModal = () => (e) => {
			addTypeEditModal(CenterModal,AddTypeEdit);
		}

    // 버튼 이벤트 
    const handleClick = e => {
        let target_name = e.target.name;
        // 피연산자 앞에 + 연산자가 있으면 Number형으로 반환
        let target_id = +e.target.id;
        //유의어 input 추가
        if(target_name === "add_plus") {
            let updateList = [{synonym: "", memo: ""}]
            saveList.synonyms = [...saveList.synonyms, ...updateList]
            saveWordList(saveList)
        //유의어 input 제거     
        }else if(target_name === "minus_btn"){
            saveList.synonyms = saveList.synonyms.filter((item, idx) => idx !== target_id);
            saveWordList(saveList);
        }        
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
							<button className="new_sub_list_btn">삭제</button>
						</div>
						<div className="input_wrap new_sub_list_input_wrap">
							<span>{props.text}</span>
							<input name={props.name} id={props.id} value={props.value}type="text"onChange={handleOnchange}/>
							{props.name === WORD_KEY.SYNONYMS
								? <button className={props.btncls} name={props.btnname} id={props.id} value={props.value} onClick={handleClick} />
								: null}
            </div>
        </div>    
}

export default AddList;