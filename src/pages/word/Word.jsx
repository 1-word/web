import React, { useEffect, useRef, useState } from "react";
import LOGO_SVG from "@images/logo.svg";
import WordList from "@components/word/WordList";
import Store from "@/store/store";
import api, { MODE } from "@/services/api";
import FolderList from "@components/word/folder/FolderList";
import Add from "@/components/modal/add/Add";
import { useModal } from "@/hook/_hooks";
import wordListStore, { WORD_MODE } from "@/store/wordListStore";

function Word(){
    // Store 사용
    
    const {memorization, setMemorization} = Store(state=>state);
    const {setMode, preWordList, setPreWordList, createWordList, prePage, setPage, page, setSearchItem, searchItem, update, setUpdateFlag} = wordListStore(state=>state);

    const searchFirst = useRef(true);

    // 모달 등록
    const [ openModal ] = useModal("add");
    
    const onClickHandler = api();
    const searchInput = useRef();    

    useEffect(() => {
        console.log("hello");
    }, [update])

    // 단어 추가 팝업 이벤트
    const handleModal = e => {
        openModal(<Add></Add>);
    }

    /* 버튼 클릭 이벤트 */
    const handleSearchClick = e => {
        let searchText = searchInput.current.value || "";
        // 검색어가 없는 경우 이전에 불러온 정보 불러오기
        setSearchItem({text: searchText});
        setMode(WORD_MODE.SEARCH);
        if (searchText === ""){
            console.log(prePage)
            // 검색모드 종료 시 이전에 조회한 데이터를 불러오므로 page관련 처리 로직 필요
            setPage(prePage);
            page.obsEndUpdate(!prePage.hasNext);
            page.obsActivate();
            setMode(WORD_MODE.READ);
            createWordList(preWordList);
            searchFirst.current = true;
            return;
        }
        // 처음 검색하는 경우 이전에 조회했던 데이터를 저장함
        if (searchFirst.current){
            searchFirst.current = false;
            setPreWordList();
        }

        onClickHandler('', MODE.SEARCH, {data:searchText});
    }

    // 전체, 미암기, 암기 버튼 선택 이벤트
    const handleMemorizeClick = (status) => e => {
        console.log(status)
        setPage({next:0, hasNext:true, lastWid:-1});
        setSearchItem({memorization: status});
        setUpdateFlag();
    }

    // 언어 설정 버튼 선택 이벤트
    const handleLanguageClick = (status) => e => {
        setPage({next:0, hasNext:true, lastWid:-1});
        setSearchItem({language: status});
        setUpdateFlag();
    }

    /* 버튼 이벤트 끝 */

    /* 화면단 설정 */

    /**
     * 언어 설정 버튼 클릭 시 클래스 변경
     * @param {*} status 
     * @returns 클래스명
     */
    const getLanguageClickClass = (status) => {
        return searchItem.language === status? "active" : "";
    }

    /**
     * 암기 조회 조건 버튼 클릭 시 클래스 변경
     * @param {*} status 
     * @returns 클래스명
     */
    const getMemorizationClickClass = (status) => {
        return searchItem.memorization === status ? "active" : ""
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
        {/* 단어 검색 */}
        <div className="search_wrap">
            <div className="seacrch_cont">
                <input ref={searchInput} onChange={handleSearchClick} type="text" className="s_text" placeholder="검색어를 입력해 주세요"/>
                <button className="search_icon" onClick={handleSearchClick}><i className="xi-search"></i></button>
            </div>
        </div>
        {/* 폴더 출력 */}
        <FolderList></FolderList>
        {/* 언어 설정 */}
        <nav className="lan">
            <ul className="flex">
                <li>언어 설정</li>
                <li className={getLanguageClickClass("")} onClick={handleLanguageClick("")}>전체</li>
                <li className={getLanguageClickClass("EN")} onClick={handleLanguageClick("EN")}>영어</li>
                <li className={getLanguageClickClass("JP")} onClick={handleLanguageClick("JP")}>일본어</li>
            </ul>
        </nav>
        {/* 언어 설정 끝 */}
        <div className="flex word_top">
            {/* 암기 조회 설정 */}
            <div className="word_tab_area flex">
                <div className= {getMemorizationClickClass("")} onClick={handleMemorizeClick("")}>전체</div>
                <div className= {getMemorizationClickClass("N")} 
                     onClick={handleMemorizeClick("N")}>미암기</div>
                <div className= {getMemorizationClickClass("Y")} 
                    onClick={handleMemorizeClick("Y")}>암기</div>
            </div>
            {/* 암기 조회 설정 끝 */}
            <div className="word_plus_wrap">
                <button className="word_plus" onClick={handleModal}>추가<i className="xi-plus-circle"></i>
                <span data-tooltip="tooltip"></span></button>
                <button className="word_plus_mobile" onClick={handleModal}><i className="xi-plus"></i></button>
            </div>
        </div>
        {/* 단어 조회 */}
        <div className="word_wrap">
            <WordList></WordList>
        </div>
     </div>
    );
}

export default Word;          