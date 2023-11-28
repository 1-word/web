import React, { useEffect, useRef, useState } from "react";
import LOGO_SVG from "@images/logo.svg";
import WordList from "@components/word/WordList";
import Store, {MEMORIZATION_TYPE} from "@/store/store";
import api, { MODE } from "@/services/api";
import FolderList from "@components/word/folder/FolderList";
import Add from "@/components/modal/add/Add";
import { useModal } from "@/hook/_hooks";
import wordListStore from "@/store/wordListStore";

function Word(){
    // Store 사용
    const {memorization, setMemorization} = Store(state=>state);
    const {setMode, preWordList, setPreWordList, createWordList} = wordListStore(state=>state);

    const searchFirst = useRef(true);

    // Modal Test
    const [ openModal ] = useModal("add");
    
    const onClickHandler = api();
    const searchInput = useRef();    

    // 팝업 이벤트
    const handleModal = e => {
        openModal(<Add></Add>);
    }

    const handleSearchClick = e => {
        let searchText = searchInput.current.value || "";
        // 검색어가 없는 경우 이전에 불러온 정보 불러오기
        if (searchText === ""){
            setMode('read');
            createWordList(preWordList);
            searchFirst.current = true;
            return;
        }
        // 처음 검색하는 경우 이전에 검색했던 데이터를 저장함
        setMode('search');
        if (searchFirst.current){
            searchFirst.current = false;
            setPreWordList();
        }
        onClickHandler('', MODE.SEARCH, searchText);
    }

    const handleMemorizeClick = (status) => e => {
        setMemorization(status);
    }

    return (
    <div className="wrap">
        <header className="flex">
            <h1><a href="#">wordbook<img src={LOGO_SVG} alt="logo Image" /></a></h1>
            <nav>
                <ul className="flex">
                    <li>
                        <a href="">사전</a>
                    </li>
                    <li>
                        <a href="">단어장</a>
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

export default Word;          