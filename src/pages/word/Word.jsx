import React, { useEffect, useRef, useState } from "react";
import MyDeault_SVG from "@images/myImgDefault.svg";
import WordList from "@components/word/WordList";
import Store, {MEMORIZATION_TYPE} from "@/store/store";
import api, { MODE } from "@/services/api";
import Header from "@components/layout/header";
import Footer from "@components/layout/footer";
import BottomNav from "@components/layout/bottom_nav";
import LeftFix from "@components/layout/left_fix";
import FolderList from "@components/word/folder/FolderList";
import Colorpick from "@components/word/folder/Colorpick";
import FolderCog from "@components/word/folder/FolderCog";
import { useModal } from "@/hook/_hooks";
import { Link } from "react-router-dom";
import HeaderMini from "@/components/layout/header_mini";
import wordListStore from "@/store/wordListStore";

function Word(){
    // Store 사용
    const {memorization, setMemorization} = Store(state=>state);
		const { setWordList, savePreviousWordList, wordListRestore } = wordListStore(state => state);

		const pageRef = useRef({
			current: 0,
			lastWordId: null,
		});

    const onClickHandler = api();
    const searchInput = useRef();
		const isSearchingRef = useRef(false);
		const previousSearchText = useRef("");

    const handleSearchWord = e => {
				const isSearching = isSearchingRef.current;
				let page = pageRef.current;

				if (!isSearching) {
					// 검색하기 이전의 단어 데이터들을 저장한다.
					savePreviousWordList();
					page = {
						current: 0,
						lastWordId: null,
					};
					setPage(page);
				}

				isSearchingRef.current = true;
        const searchText = searchInput.current.value.replaceAll("?", "") || "";

				// 검색 완료
				if (searchText === "") {
					// 이전에 검색한 단어들을 다시 복원한다.
					// 서버 api를 다시 호출하지 않게 하기 위함
					wordListRestore();
					setPage(null);
					isSearchingRef.current = false;
					return;
				}

				// 이전에 검색한 단어가 아니면 page를 초기화
				if (searchText !== previousSearchText) {
					page = {
						current: 0,
						lastWordId: null,
					};
					setPage(page);	
				}

				// 페이징 처리
				let query = `?current=${page.current}`;

				if (page.lastWordId) {
					query += `&lastWordId=${page.lastWordId}`;
				}

        onClickHandler(null, MODE.SEARCH, searchText + query)
				.then((res => {
					setWordList(res);
					setPage(res.page);
					previousSearchText.current = searchText;
				}));
    }

		const setPage = (page) => {
			pageRef.current = page;
		}

    const handleMemorizeClick = (status) => e => {
        setMemorization(status);
    }

    return (
    <div className="wrap">
			<LeftFix></LeftFix>
			<BottomNav></BottomNav>
			<Header></Header>
        <div className="search_wrap">
            <div className="search_cont">
                <input ref={searchInput} onChange={handleSearchWord} type="text" className="s_text" placeholder="검색어를 입력해 주세요"/>
                <button className="search_icon" onClick={handleSearchWord}><i className="xi-search"></i></button>
            </div>
        </div>

				{/* 폴더 추가 컴포넌트 */}
				<div className="my_word_wrap">
					<div className="my_user">
						<div className="my_user_img">
						<img src={MyDeault_SVG} alt="default" />
						</div>
						<span className="my_user_name">유저 네임</span> 님, 오늘도 힘내봐요!
					</div>
					<ul className="my_word_list">
						<li>내 단어장</li>
						<li>오늘의 문장</li>
						<li>즐겨찾기한 단어</li>
						<li>단어 퀴즈</li>
					</ul>
				</div>
				{/* 폴더 추가 컴포넌트 */}

				{/* 내 단어장 클릭시 보여지는 리스트 */}
        {/* <FolderList></FolderList> */}

				{/* 암기탭 */}
				<ul className="word_tab flex">
						<li className= {memorization === MEMORIZATION_TYPE.ALL ? "active" : ""} onClick={handleMemorizeClick(MEMORIZATION_TYPE.ALL)}>전체</li>
						<li className= {memorization === MEMORIZATION_TYPE.MEMORIZATION_PERIOD ? "active" : ""} 
									onClick={handleMemorizeClick(MEMORIZATION_TYPE.MEMORIZATION_PERIOD)}>미암기</li>
						<li className= {memorization === MEMORIZATION_TYPE.MEMORIZATION ? "active" : ""} 
								onClick={handleMemorizeClick(MEMORIZATION_TYPE.MEMORIZATION)}>암기</li>
				</ul>
				
				{/* 단어 리스트 */}
        <div className="word_wrap">
            <WordList memorization={memorization} memorization_type={MEMORIZATION_TYPE}></WordList>
        </div>
				<Footer></Footer>
     </div>
    );
}

export default Word;          