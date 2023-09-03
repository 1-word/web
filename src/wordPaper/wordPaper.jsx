import React, { useEffect, useRef, useState } from "react";
import "./wordPaper.css";
import WordList from "./Component/wordList";
import wordListStore from "../stores/wordListStore";
import Store from "../stores/store";
import useEvntHandler, { MODE } from "../js/useEvntHandler";
import FolderList from "./folderList";

function WordPaper(){
    // Store 사용
    const {update, folderList} = wordListStore(state => state);
    const {setModal} = Store(state=>state);
    
    const onClickHandler = useEvntHandler();
    const searchInput = useRef();
    // useEffect(() => {
    //     onClickHandler('', MODE.FOLDER_READ, '');
    // }, [update]);   //해당 state가 변경될 때 해당 로직 수행
    
    // Folder
    const [clickedFolder, setClickedfolder] = useState(0);

    // 팝업 이벤트
    const handleModal = e => {
        setModal(true);
    }

    const handleSearchClick = e => {
        let searchText = searchInput.current.value || "";
        searchText !== "" ? searchText = searchText : searchText = MODE.SEARCH_ALL;
        onClickHandler('', MODE.SEARCH, searchText);
    }

    return (
    <div className="wrap">
        <div className="search_wrap">
            <div className="seacrch_cont">
                <input ref={searchInput} onChange={handleSearchClick} type="text" className="s_text" placeholder="검색어를 입력해 주세요"/>
                <button className="search_icon" onClick={handleSearchClick}><i className="xi-search"></i></button>
            </div>
            <div className="s_pop">
                <div className="s_pop_cont">
                    <p>내가 찾은 단어</p>
                    <ul>
                        <li className="flex">
                            <a href="#">
                                <span>검색내용</span>
                            </a>
                            <button><i className="xi-close"></i></button>
                        </li>
                    </ul>
                    <div>
                        <span>전체삭제</span>
                    </div>
                </div>
            </div>
        </div>
        <FolderList></FolderList>
        <div className="flex word_top">
        <div className="word_tab_area flex">
            <div className="active">전체</div>
            <div>미암기</div>
            <div>암기</div>
        </div>
        <div className="word_plus_wrap">
            <button className="word_plus" onClick={handleModal}>추가<i className="xi-plus-circle"></i></button>
            <button className="word_plus_mobile" onClick={handleModal}><i className="xi-plus"></i></button>
        </div>
        </div>
        <div className="word_wrap">
            {/* {dataList} */}
            <WordList></WordList>
        </div>
     </div>
    );
}



export default WordPaper;
          