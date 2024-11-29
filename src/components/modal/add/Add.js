import React, { useRef, useEffect } from "react";
import AddList from "./AddList";
import wordListStore, { WORD_KEY } from "@/store/wordListStore";
import Store from "@/store/store";
import api, { MODE } from "@/services/api";
import { textTypeCheck } from "@/util/utils";
import { useModal } from "@/hook/_hooks";
import AddTypeMore from "./AddTypeMore";

import BottomModalSelect from "@components/layout/popup/BottomModalSelect";
import CenterModal from "@components/layout/popup/CenterModal";
import FullModal from "@components/layout/popup/FullModal";
import BottomModal from "@components/layout/popup/BottomModal";

function Add(){
	const [addTypeMoreModal] = useModal("userConfig");
    const {saveList, saveWordList} = wordListStore(state => state);
    const {clickedFolder} = Store(state=> state);
    const onClickHandler = api();

		const handleMoreModal = () => (e) => {
			addTypeMoreModal(CenterModal,AddTypeMore)
		}

    const handleSaveClick = (e) => {
        let target_name = e.target.name;
        let target_id = e.target.id;
        let resultList = {};

        resultList = saveList;

        let folder_id = clickedFolder === -1 ? "" : clickedFolder;

        resultList = {
            ...saveList,
            folder_id: folder_id,
            type: textTypeCheck(saveList.word)
        }
        
        //저장 버튼 클릭시
        if(target_name === MODE.SAVE_BTN)
            onClickHandler(e, MODE.SAVE, resultList);
    }

    const synonymInputList = saveList.synonyms.map((data, idx) => (
        <AddList key={idx}
            btncls = {idx===0? "add_plus xi-plus" : "add_minus xi-close"}
            btnname = {idx===0? "add_plus" : "minus_btn"}
            name= {WORD_KEY.SYNONYMS}
            text= {idx===0? "유의어" : ""} 
            id = {idx}
            value = { data.synonym }
        />
    ));

    // 영어 add
    return(
		<div className="modal-wrap">
			<div className="modal-cont">
				<div className="new_cont modal-area">
					<div className="new_word-cont modal-scroll">
							<div className="new_main">
							<AddList name="word" text="단어" value={saveList.word} ></AddList>          
							<AddList name="mean" text="뜻" value={saveList.mean} ></AddList>
							<AddList name="wread" text="발음" value={saveList.wread} ></AddList>
							</div>
							<div className="new_sub_cont">
								<h2 className="new_sub_title btn-light" onClick={handleMoreModal()}>세부사항 추가를 원하신다면 눌러주세요</h2>
								{synonymInputList}
							</div>
					</div>
					<div className="new_btn_wrap modal-btn-wrap">
							<button className="btn-fill sizeM" name="save_btn" onClick={handleSaveClick}>저장</button>                   
					</div>
				</div>
			</div>
		</div>
		);
}

export default Add;