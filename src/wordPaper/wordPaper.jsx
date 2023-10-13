import React, { useEffect, useRef, useState } from "react";
import "@css/wordPaper.css";
import WordList from "@components/wordList";
import wordListStore from "../stores/wordListStore";
import Store, {MEMORIZATION_TYPE} from "../stores/store";
import useEvntHandler, { MODE } from "../js/useEvntHandler";
import FolderList from "./Component/folderList";
import Colorpick from "./Component/colorpick";
import FolderCog from "./Component/folderCog";
import { Link } from "react-router-dom";

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
        {folderCog.show && 
        <div className="modal-wrap">
        <FolderCog></FolderCog></div>}
        {colorPickPop.modal.show && <Colorpick></Colorpick>}
        <header className="flex">
            <h1><a href="#">wordbook<img src={process.env.PUBLIC_URL + '/img/logo.svg'} alt="logo Image" /></a></h1>
            <nav>
                <ul className="flex">
                    <li>
                        <a href="">사전</a>
                        {/* <Link to="/dic">사전</Link> */}
                    </li>
                    <li>
                        <a href="">단어장</a>
                        {/* <Link>단어장</Link> */}
                    </li>
                </ul>
            </nav>
        </header>
        <div className="search_wrap">
            <div className="seacrch_cont">
                <input ref={searchInput} onChange={handleSearchClick} type="text" className="s_text" placeholder="검색어를 입력해 주세요"/>
                <button className="search_icon" onClick={handleSearchClick}><i className="xi-search"></i></button>
            </div>
        </div>
        <FolderList></FolderList>
        <nav className="lan">
            <ul className="flex">
                <li>언어 설정</li>
                <li className="">전체</li>
                <li className="active">영어</li>
                <li>일본어</li>
            </ul>
        </nav>
        <div className="flex word_top">
            <div className="word_tab_area flex">
                <div className= {memorization === MEMORIZATION_TYPE.ALL ? "active" : ""} onClick={handleMemorizeClick(MEMORIZATION_TYPE.ALL)}>전체</div>
                <div className= {memorization === MEMORIZATION_TYPE.MEMORIZATION_PERIOD ? "active" : ""} 
                     onClick={handleMemorizeClick(MEMORIZATION_TYPE.MEMORIZATION_PERIOD)}>미암기</div>
                <div className= {memorization === MEMORIZATION_TYPE.MEMORIZATION ? "active" : ""} 
                    onClick={handleMemorizeClick(MEMORIZATION_TYPE.MEMORIZATION)}>암기</div>
            </div>
        <div className="word_plus_wrap">
            <button className="word_plus" onClick={handleModal}>추가<i className="xi-plus-circle"></i>
            <span data-tooltip="tooltip"></span></button>
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
          