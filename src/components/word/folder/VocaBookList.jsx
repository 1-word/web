import React, {useEffect, useState} from "react";
import api, {MODE} from "@/services/api";
import wordListStore from "@/store/wordListStore";
import Store, { COMM_MODE } from "@/store/store";
import { useModal } from "@/hook/_hooks";
import AddVocaBook from "@/components/word/folder/AddVocaBook";
import FullModal from "@components/layout/popup/FullModal";

function VocabookList({
  clickedFolder,
  afterCompleteFunc
}){
  const [editState, setEditState] = useState(false);
  const [folderList, setFolderList] = useState([]);
  const [addFolderModal] = useModal("addFolder");

  const onClickHandler = api();

  useEffect(() => {
    onClickHandler(null, MODE.FOLDER_READ)
    .then(res => {
      setFolderList(res);
    })
  }, []); 

  const handleAddClick = () => e => {
    addFolderModal(FullModal, AddVocaBook, {
      setFolderList
    });
  }

  const handleConfigClick = () => {
	  setEditState(!editState);
  }
  
  const onEditClick = (folder) => e => {
    addFolderModal(FullModal, AddVocaBook, {
      setFolderList,
      prevFolder: folder
    })
  }

  const onDeleteClick = (id) => e => {
    onClickHandler(null, MODE.FOLDER_DELETE, id);
  }

  const onFolderClick = (id) => e => {
    e.preventDefault();
    if (editState) {
      return false;
    }

    // 단어장으로 이동하기
    if (!afterCompleteFunc) {
      return;
    }

    // 클릭된 폴더 아이디 넘겨주기
    afterCompleteFunc(id);
  }

  return (
    <div className="voca_book_wrap">
	  <div className="voca_book_cont">
		<div className="voca_book_top flex">
          <button onClick={handleConfigClick}>단어장 관리</button>
			<button className="voca_book_plus" onClick={handleAddClick()}>새 단어장 만들기<i className="xi-plus"></i></button>
		</div>
        <ul className="voca_book_lists flex">
          {
            folderList?.map(item =>
                // 현재 단어장 위치
            <li className={clickedFolder === item.folders.folderId? "on" : "off"} 
                key={`folders${item.folders.folderId}`} 
                style={{ background: item.folders.background || '#fff', color: item.folders.color || '#946CF4'}}
                disabled={editState}
                onClick={onFolderClick(item.folders.folderId)}
            >
            <div className="voca_book_list_area">
            <p className="voca_book_list_name">{item.folders.folderName}</p>
              { editState &&
                <div className="voca_book_list_btn_area">
                    {/* 수정 */}
                  <button onClick={onEditClick(item.folders)}><i className="edit"></i></button>
                    {/* 삭제 */}
                  <button onClick={onDeleteClick(item.folders.folderId)}><i className="xi-close"></i></button>
                </div>       
              }
                </div>
                <div className="voca_book_list_wordamount">
                    총 단어 갯수 : {item.count}개
                </div>
          </li>
            )
          }
        </ul>
      </div>
    </div>
  );
}

export default VocabookList;