import React, { useRef } from "react";
import AddList from "./AddList";
import HeaderMini from "@components/layout/header_mini";
import wordListStore, { WORD_KEY } from "@/store/wordListStore";
import Store from "@/store/store";
import api, { MODE } from "@/services/api";
import { textTypeCheck } from "@/util/textTypeCheck";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Add(){
    const {saveList, saveWordList} = wordListStore(state => state);
    const {clickedFolder} = Store(state=> state);
    const onClickHandler = api();

    const handleSaveClick = (e) => {
        let target_name = e.target.name;
        let target_id = e.target.id;
        let resultList = {};

        resultList = saveList;

        let folder_id = clickedFolder === -1 ? "" : clickedFolder;

        resultList = {
            ...saveList,
            folder_id: folder_id,
            type: textTypeCheck(saveList.word)
        }
        
        //저장 버튼 클릭시
        if(target_name === MODE.SAVE_BTN)
            onClickHandler(e, MODE.SAVE, resultList);
    }

    const synonymInputList = saveList.synonyms.map((data, idx) => (
        <AddList key={idx}
            btncls = {idx===0? "add_plus xi-plus" : "add_minus xi-close"}
            btnname = {idx===0? "add_plus" : "minus_btn"}
            name= {WORD_KEY.SYNONYMS}
            text= {idx===0? "유의어" : ""} 
            id = {idx}
            value = { data.synonym }
        />
    ));

    // 영어 add
    return(
		<div className="modal-wrap">
			<div className="modal-cont">
				<div className="new_cont modal-area">
					<div className="new_word-cont modal-scroll">
							<div className="new_main">
							<AddList name="word" text="단어" value={saveList.word} ></AddList>          
							<AddList name="mean" text="뜻" value={saveList.mean} ></AddList>
							<AddList name="wread" text="발음" value={saveList.wread} ></AddList>
							</div>
							<div className="new_sub_cont">
								<h2 className="new_sub_title btn-light">세부사항 추가를 원하신다면 눌러주세요</h2>
								{synonymInputList}
								{/* 바텀 시트 on 켜지면 스타일 입힘 */}
								<div className="bottom_sheet">
									<div className="bottom_sheet_wrap">
									{/* 드래그된 값에 맞춰 바텀 시트가 내려감 && 밑으로 스와이프하면 시트가 바로 내려감 */}
									<div className="bottom_sheet_dragable"></div>
									<h2>타이틀 영역</h2>
									{/* 내용영역(바뀌는 영역) */}
									<div className="bottom_sheet_cont">
										{/* 단어그룹 추가 스와이핑 컨텐츠 */}
										<div className="vb-vertical-wrap">
										<Swiper
											direction={'vertical'}
											// grid={{
											// 	rows: 3,
											// }}
											centeredSlides={true}
											loop={true}
											// modules={[Grid]}
											className="add_mygroup-swiper vb-vertical-swiper"
										>
											<SwiperSlide className="add_mygroup-slide vb-vertical-slide">Slide 1</SwiperSlide>
											<SwiperSlide className="add_mygroup-slide vb-vertical-slide">Slide 2</SwiperSlide>
											<SwiperSlide className="add_mygroup-slide vb-vertical-slide">Slide 3</SwiperSlide>
											<SwiperSlide className="add_mygroup-slide vb-vertical-slide">Slide 4</SwiperSlide>
											<SwiperSlide className="add_mygroup-slide vb-vertical-slide">Slide 5</SwiperSlide>
											<SwiperSlide className="add_mygroup-slide vb-vertical-slide">Slide 6</SwiperSlide>
											<SwiperSlide className="add_mygroup-slide vb-vertical-slide">Slide 7</SwiperSlide>
											<SwiperSlide className="add_mygroup-slide vb-vertical-slide">Slide 8</SwiperSlide>
											<SwiperSlide className="add_mygroup-slide vb-vertical-slide">Slide 9</SwiperSlide>
										</Swiper>
										</div>
									</div>
									<div className="bottom_sheet_btn">
										<button className="btn-fill sizeM">단어그룹 추가</button>
									</div>
									</div>
								</div>
							</div>
					</div>
					<div className="new_btn_wrap modal-btn-wrap">
							<button className="btn-fill sizeM" name="save_btn" onClick={handleSaveClick}>저장</button>                   
					</div>
				</div>
			</div>
		</div>
		);
}

export default Add;