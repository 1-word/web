import React, { useRef, useEffect, useState } from "react";
import AddList from "./AddList";
import api, { MODE } from "@/services/api";
import { useModal } from "@/hook/_hooks";
import AddTypeMore from "./AddTypeMore";

import CenterModal from "@components/layout/popup/CenterModal";
import { textTypeCheck } from "@/util/utils";

function Add({
	word,
	isEdit,
	deleteModalAfterTime
}){
		const [addTypeMoreModal] = useModal("userConfig");
		const [saveList, setWordList] = useState({	
				word: '',
				read: '',
				mean: '',
				details: []
			});

    const onClickHandler = api();

		useEffect(() => {
			if (isEdit) {
				setWordList(word);
			}
		},[]);

		const handleMoreModal = () => e => {
			addTypeMoreModal(CenterModal, AddTypeMore, {
				saveList,
				saveGroupList,
			})
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
			const result = {
				word: saveList.word,
				mean: saveList.mean,
				read: saveList.read,
				memo: saveList.memo ?? '',
				memorization: saveList.memorization ?? 'N',
				details: saveList.details.flatMap(group => 
					group.groups.map(item => ({
						wordGroupId: group.wordGroupId,
						title: item.title,
						content: item.content
					}))
				)
			};
			
			if (isEdit) {
				onClickHandler(null, MODE.UPDATE, saveList.wordId, result)
				.then(res => {
					if (res){
						deleteModalAfterTime(0, "ALL");
					}
				});
				return;
			}
			
			const type = textTypeCheck(saveList.word);
			console.log(type);

			onClickHandler(null, MODE.SAVE, type, result)
			.then(res => {
				if (res) {
					deleteModalAfterTime(0);
				}
			});
    }

    const moreInputList = saveList.details.map((data, idx) => (
        <AddList key={`details${data.wordGroupId}`}
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
						<input name="word" value={saveList?.word} disabled={isEdit} type="text" onChange={onChangeInput}/>
					</div>
					<div className="input_wrap">
						<span>뜻</span>
						<input name="mean" type="text" value={saveList?.mean} onChange={onChangeInput}/>
					</div>
					<div className="input_wrap">
						<span>발음</span>
						<input name="read" type="text" value={saveList.read} onChange={onChangeInput}/>
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