import React, { useRef, useEffect, useState } from "react";
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

function Add({details}){
	const [addTypeMoreModal] = useModal("userConfig");
		const [saveList, setWordList] = useState({	
				word: '',
				read: '',
				mean: '',
				details: [{
				"wordGroupId": 1,
				"groupName": "동사",
				groups: [
					{
						"title": "3인칭 단수",
						"content": "child",
					}
				]
		}, {
				"wordGroupId": 2,
				"groupName": "명사",
				groups: []
		}]});

    const onClickHandler = api();

		const handleMoreModal = () => (e) => {
			addTypeMoreModal(CenterModal,AddTypeMore)
		}

		const saveWordList = (key, value) => {
			setWordList({
				...saveList,
				[key]: value
			})
		}

		const saveGroupList = (groups) => {
			setWordList(groups);
		}

    const handleSaveClick = (e) => {
			console.log(saveList);
			// onClickHandler(null, MODE.SAVE, saveList);
    }

    const moreInputList = saveList.details.map((data, idx) => (
        <AddList key={idx}
						idx={idx}
            detail={data}
						saveList={saveList}
						saveGroupList={saveGroupList}
        />
    ));

		const onChangeInput = e => {
			e.preventDefault();
			const {name, value} = e.target
			saveWordList(name, value);
		}

    // 영어 add
    return(
			<>
				<div className="new_cont">
					<div className="input_wrap">
						<span>단어</span>
						<input name="word" type="text" onChange={onChangeInput}/>
					</div>
					<div className="input_wrap">
						<span>뜻</span>
						<input name="mean" type="text" onChange={onChangeInput}/>
					</div>
					<div className="input_wrap">
						<span>발음</span>
						<input name="read" type="text" onChange={onChangeInput}/>
					</div>
					<div className="new_sub_cont">
						<h2 className="new_sub_title btn-light" onClick={handleMoreModal()}>세부사항 추가를 원하신다면 눌러주세요</h2>
						{moreInputList}
					</div>
				</div>
				<div className="new_btn_wrap">
						<button className="btn-fill sizeM" name="save_btn" onClick={handleSaveClick}>저장</button>                   
				</div>
			</>
		);
}

export default Add;