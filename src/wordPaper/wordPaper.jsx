import React, { useEffect, useRef } from "react";
import "./wordPaper.css";
import SynonsymsList from "./Component/synonymsList";
import wordListStore from "../stores/wordListStore";
import Store from "../stores/store";
import useEvntHandler, { MODE } from "../js/useEvntHandler";
import authStore from "../stores/authStore";

function WordPaper(){
    // Store 사용
    const {update, wordList, createWordList, setUpdateFlag, saveListClear} = wordListStore(state => state)
    const {modal, alert, setModal, setAlert} = Store(state=>state)

    const onClickHandler = useEvntHandler()

    const searchInput = useRef()

    useEffect(() => {
        onClickHandler('', MODE.READ, '')
    }, [update]);   //해당 state가 변경될 때 해당 로직 수행

   // 버튼 이벤트 
    const handleClick = mode => e => {
        const id = e.target.id;

        switch (mode) {
            case MODE.UPDATE:
                
                break;
            case MODE.DELETE:
                onClickHandler('', MODE.DELETE, id)
                break;
        
            default:
                break;
        }
    }

    // 팝업 이벤트
    const handleModal = e => {
        setModal(true)
    }

    const onSearchHandler = e => {
        onClickHandler('', MODE.SEARCH, searchInput)
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
        <button className="plus_btn" id="plus_btn" onClick={handleModal}/>
        <div  className="framec6cc90c6">{/*단어 전체 그리드*/}
            {dataList}
        </div>
    </div>
    );
}



export default WordPaper;
          