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

//class WordPaper extends React.Component {
function WordPaper(){
    // Store 사용
    const {update, wordList, createWordList, setUpdateFlag, saveListClear} = wordListStore(state => state);
    const {modal, alert, setModal, setAlert} = Store(state=>state);

    useEffect(() => {        
        console.log('1234');
        async function getWordData(){
            const result = await connect("get", "read", "");
            //const result = await btnClick('', MODE.READ)
            createWordList(result.list);
        }
        getWordData();
    }, [update]);   //해당 state가 업데이트될 때 해당 로직 수행

   // 버튼 이벤트 
    const handleClick = mode => e => {
        console.log("[mode]: "+ mode+ "// [id]: ", e.target.id);
        if(mode === "search"){
            //검색API 호출 ex) {project_url}:{port}/search/1
          let searchText = document.getElementById("search_input").value;
          console.log(searchText);
        //   const data = connect("get", "search", searchText)
        //   console.log("[wordSearch]: ", data)
          connect("get", "search", searchText)
            .then(res => {
            console.log("[wordSearch]: ", res)
            let wordListrequest = res.list
            //검색한 데이터 저장
            if(Array.isArray(wordListrequest)){
                createWordList(wordListrequest)
            }else{
                let arr = []
                arr.push(wordListrequest)
                createWordList(arr)
            }
          });
        }else if (mode === "delete"){
            //삭제API 호출 ex) {project_url}:{port}/remove/1
           connect("delete", "remove", e.target.id)
                .then(res =>{
                    console.log(res)
                    btnClick(e, mode, '', setUpdateFlag)
                });
           console.log("[wordDelete]: ");  
        }
    }

    // 팝업 이벤트
    const handleModal = (flag) => {
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
        console.log("[input id]: ", e.target.id)
        //검색API 호출 ex) {project_url}:{port}/search/1
        //let searchText = document.getElementById("search_input").value
        let searchText = e.target.value
        console.log(searchText)
        if (searchText === "") searchText = MODE.SEARCH_ALL
        connect("get", "search", searchText)
            .then(res => {
            console.log("[wordSearch]: ", res)
            let wordListrequest = res.list
            //검색한 데이터 저장
            if(Array.isArray(wordListrequest)){
                createWordList(wordListrequest)
            }else{
                let arr = []
                arr.push(wordListrequest)
                createWordList(arr)
            }
        });
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
                    <button className="search_btn" id="search_btn" onClick={handleClick(MODE.SEARCH)}></button>
                </div>
                <div  className="xf958f200">
                    <input className="text_input" id="search_input" placeholder="" type="text" required="" onChange={onSearchHandler}/>
                </div>
            </div> 
        <button className="plus_btn" id="plus_btn" onClick={e => {handleModal(MODE.OPEN)}}/>
        <div  className="framec6cc90c6">{/*단어 전체 그리드*/}
            {dataList}
            {modal && (<ModalPortal id='modal'>
                <Add closePopup={e=> {handleModal(MODE.CLOSE)}}></Add>
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
          