import React, { useRef, useEffect, useState } from "react";
import AddList from "./AddList";
import api, { MODE } from "@/services/api";
import { useModal } from "@/hook/_hooks";
import AddTypeMore from "./AddTypeMore";

import CenterModal from "@components/layout/popup/CenterModal";
import { textTypeCheck } from "@/util/utils";
import FullModal from "@/components/layout/popup/FullModal";
import VocabookList from "@/components/word/folder/VocaBookList";
import wordListStore from "@/store/wordListStore";
import authStore from "@/store/authStore";

function Add({
	folderId,
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
		const wordRelative = useRef([]);
		const [folderName, setFolderName] = useState('');
		const {storeFolderList} = authStore(state => state);
		const [wordRelativeList, setwordRelativeList] = useState([]);
		const wordInputRef = useRef(null);

    const onClickHandler = api();
		const [vocaBookListModal] = useModal("vocaBookList");

		const handleVocaBookListModal = () => e => {
			vocaBookListModal(FullModal, VocabookList, {
				clickedFolder: folderId,
				afterCompleteFunc
			})
		}

		const afterCompleteFunc = (item) => {
			const id = item.folders.folderId;
			setFolderName(item.folders.folderName);
			saveWordList('folderId', id);
		}

		useEffect(() => {
			if (isEdit) {
				setWordList(word);
			}
			setFolderName(storeFolderList.folderName);
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
				folderId: saveList.folderId ?? storeFolderList.folderId,
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
			if(name === "word" && value !== ""){
				wordRelative.current.classList.add('on');
				onClickHandler(null, MODE.WORD_RELATIVE_READ, value)
				.then(res => {
					setwordRelativeList(res);
				});
			}else{
				wordRelative.current.classList.remove('on');
			}
		}

		const onBlurInput = () => {
			wordRelative.current.classList.remove('on');
		}

		const handleOnClick = (e) => {
			wordRelative.current.classList.remove('on');
		}

		const handleDictClick = async(e) => {
			const word = e.target.textContent;
			const res = await onClickHandler(null, MODE.WORD_DICT, word);
			if (res.mean !== null) {
				setWordList({
					...saveList,
					mean: res.mean,
					word: word,
				})
			}
			wordRelative.current.classList.remove('on');
		}

    // 영어 add
    return(
			<>
				<div className="new_cont">
					<div className="new_location">
						현재 단어장 위치
						<div className="btn-light new_location_name" onClick={handleVocaBookListModal()}>{folderName || ''}</div>
					</div>
					<div ref={wordRelative} className="input_wrap word_relative_wrap">
						<span>단어</span>
						<input ref={wordInputRef} name="word" value={saveList?.word} disabled={isEdit} type="text" autoComplete="off" onChange={onChangeInput}
						/>
						<div className="word_relative_layer">
							<ul className="word_relative_layer_lists" onClick={handleDictClick}>
								{
									wordRelativeList.map((val, idx) => 
										<React.Fragment key={`wordRelative${idx}`}>
											<li className="word_relative_layer_list">{val.word}</li>
										</React.Fragment>
									)
								}
							</ul>
						</div>
						<div className="word_relative_layerfix" onClick={handleOnClick}></div>
					</div>
					<div className="input_wrap">
						<button className="btn-light sizeS" onClick={handleDictClick}>"{saveList?.word}" 사전 연동</button>
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
						<button className="btn-fill sizeL" name="save_btn" onClick={handleSaveClick}>저장</button>                   
				</div>
			</>
		);
}

export default Add;