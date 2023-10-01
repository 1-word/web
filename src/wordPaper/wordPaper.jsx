import React, { useEffect, useRef, useState } from "react";
import "./wordPaper.css";
import WordList from "./Component/wordList";
import wordListStore from "../stores/wordListStore";
import Store, {MEMORIZATION_TYPE} from "../stores/store";
import useEvntHandler, { MODE } from "../js/useEvntHandler";
import FolderList from "./Component/folderList";
import Colorpick from "./Component/colorpick";
import FolderCog from "./Component/folderCog";

function WordPaper(){
    // Store 사용
    const {colorPickPop, memorization, setModal, setMemorization, folderCog} = Store(state=>state);
    
    const onClickHandler = useEvntHandler();
    const searchInput = useRef();    

    // 팝업 이벤트
    const handleModal = e => {
        setModal(true);
    }

    const handleSearchClick = e => {
        let searchText = searchInput.current.value || "";
        searchText !== "" ? searchText = searchText : searchText = MODE.SEARCH_ALL;
        onClickHandler('', MODE.SEARCH, searchText);
    }

    const handleMemorizeClick = (status) => e => {
        setMemorization(status);
    }

    return (
    <div className="wrap">
        {folderCog.show && <FolderCog></FolderCog>}
        {colorPickPop.modal.show && <Colorpick></Colorpick>}
        <div className="search_wrap">
            <div className="seacrch_cont">
                <input ref={searchInput} onChange={handleSearchClick} type="text" className="s_text" placeholder="검색어를 입력해 주세요"/>
                <button className="search_icon" onClick={handleSearchClick}><i className="xi-search"></i></button>
            </div>
        </div>
        <FolderList></FolderList>
        <div className="flex word_top">
            <div className="word_tab_area flex">
                <div className= {memorization === MEMORIZATION_TYPE.ALL ? "active" : ""} onClick={handleMemorizeClick(MEMORIZATION_TYPE.ALL)}>전체</div>
                <div className= {memorization === MEMORIZATION_TYPE.MEMORIZATION_PERIOD ? "active" : ""} 
                     onClick={handleMemorizeClick(MEMORIZATION_TYPE.MEMORIZATION_PERIOD)}>미암기</div>
                <div className= {memorization === MEMORIZATION_TYPE.MEMORIZATION ? "active" : ""} 
                    onClick={handleMemorizeClick(MEMORIZATION_TYPE.MEMORIZATION)}>암기</div>
            </div>
        <div className="word_plus_wrap">
            <button className="word_plus" onClick={handleModal}>추가<i className="xi-plus-circle"></i></button>
            <button className="word_plus_mobile" onClick={handleModal}><i className="xi-plus"></i></button>
        </div>
        </div>
        <div className="word_wrap">
            <WordList memorization={memorization} memorization_type={MEMORIZATION_TYPE}></WordList>
        </div>
     </div>
    );
}



export default WordPaper;
          