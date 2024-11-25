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

function Word(){
    // Store 사용
    const {memorization, setMemorization} = Store(state=>state);

    // Modal Test
	const [openBottomModal] = useModal("bottom");
    
    const onClickHandler = api();
    const searchInput = useRef();    

		const handleBottomClick = e => {
			openBottomModal(HeaderMini)
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
			<div onClick={handleBottomClick}>hello123123</div>
			<LeftFix></LeftFix>
			<BottomNav></BottomNav>
			<Header></Header>
        <div className="search_wrap">
            <div className="search_cont">
                <input ref={searchInput} onChange={handleSearchClick} type="text" className="s_text" placeholder="검색어를 입력해 주세요"/>
                <button className="search_icon" onClick={handleSearchClick}><i className="xi-search"></i></button>
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