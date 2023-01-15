import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./wordPaper.css";
import SynonsymsList from "./Component/synonymsList";
import Add from "./Component/Add/add";
import ModalPortal from "../util/ModalPortal";
import connect from "../util/axiosUtil";
import Alert from "./Component/Alert/alert";
import wordListStore from "../stores/wordListStore";
import Store from "../stores/store";
import { btnClick, MODE } from "../js/word";

function WordPaper(){
    // Store 사용
    const {update, wordList, createWordList, setUpdateFlag, saveListClear} = wordListStore(state => state);
    const {modal, alert, setModal, setAlert} = Store(state=>state);

    const searchInput = useRef();

    useEffect(() => {        
        getWordData();

        async function getWordData(){
            const res = await btnClick('', MODE.READ)
            createWordList(res.list);
        }
    }, [update]);   //해당 state가 변경될 때 해당 로직 수행

   // 버튼 이벤트 
    const handleClick = mode => e => {
        const id = e.target.id;
        console.log("[mode]: "+ mode+ "// [id]: ", e.target.id);

        switch (mode) {
            case MODE.UPDATE:
                
                break;
            case MODE.DELETE:
                updateWordData(MODE.DELETE, id)
                break;
        
            default:
                break;
        }

        async function updateWordData(modeType, id){
            let res = await btnClick('', modeType, id)
            console.log(res)
            setUpdateFlag();    //update state변경, 변경 시 useEffect() 실행
        }
    }

    // 팝업 이벤트
    const handleModal = (flag) => e => {
        if (flag === MODE.OPEN){
            console.log("open")
            setModal(true)
        }
        if(flag === MODE.CLOSE){
            setModal(false)
            saveListClear()
        }
        console.log(modal)
    }

    const onSearchHandler = e => {
        let searchText = searchInput.current.value
        searchText !== "" ? searchText=searchText : searchText=MODE.SEARCH_ALL
        searchWordData()

        async function searchWordData(){
            let res = await btnClick('', MODE.SEARCH, searchText)
            let wordListrequest = res.list
            // 검색한 단어가 한개이면 배열이 아니므로 배열로 만들어줌
            if(Array.isArray(wordListrequest)) return createWordList(wordListrequest)
            let arr = []
            arr.push(wordListrequest)
            createWordList(arr)
        }
    }


    const dataList = wordList.map((data, idx) => {
    return <div  className="frame" key={data?.word_id}>  {/*단어 출력   */}
            <div  className="frame83f7e349"> 
                <div  className="wordea5202cf">
                    <SynonsymsList synonyms={data?.synonyms}></SynonsymsList>
                    <div  className="x16d628d6">{data?.word}</div>
                    <div className="x465a364d58"></div>
                    <div  className="xe5e28e22">
                        <div  className="bgd197c3b9"></div>
                        <div  className="x5ee0a870">유의어</div>
                    </div>
                    <div  className="xf63f2ca8">{data?.wread}</div>
                </div>
                <div  className="xd106727b">
                    <div  className="x4154b626">{data?.mean}</div>
                    <div  className="xb9a31159">
                        <button id={data?.word_id} class="delete_btn" onClick={handleClick("delete")}/>                            
                        <div  className="x471465d67bb6"></div>
                    </div> 
                </div>
            </div>
        <div className="x47abd6047f"> </div>
    </div>;
});

    return (
          <div  className="wordPaper">        
            <div  className="x8bc1b3ee">            
                <div  className="x18458">                
                    <button className="search_btn" id="search_btn" onClick={onSearchHandler}></button>
                </div>
                <div  className="xf958f200">
                    <input ref={searchInput} className="text_input" id="search_input" placeholder="" type="text" required="" onChange={onSearchHandler}/>
                </div>
            </div> 
        <button className="plus_btn" id="plus_btn" onClick={handleModal(MODE.OPEN)}/>
        <div  className="framec6cc90c6">{/*단어 전체 그리드*/}
            {dataList}
            {modal && (<ModalPortal id='modal'>
                <Add closePopup={handleModal(MODE.CLOSE)}></Add>
            </ModalPortal>)
            }{''} 
        </div>
        <ModalPortal id='alert'>
            <Alert type="error" message="아이디 또는 비밀번호를 확인해주세요."></Alert>
        </ModalPortal>
    </div>
    );
}



export default WordPaper;
          