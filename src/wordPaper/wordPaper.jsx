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

    let headset_id = ""

    useEffect(() => {
        //onClickHandler('', MODE.READ, '')
    }, [update]);   //해당 state가 변경될 때 해당 로직 수행

   // 버튼 이벤트 
    const handleClick = mode => e => {
        const id = e.currentTarget.id;

        switch (mode) {
            case MODE.UPDATE:
                
                break;
            case MODE.DELETE:
                onClickHandler('', MODE.DELETE, id)
                break;
        
            case MODE.AUDIO_PLAY:
                const audioItem = document.getElementById('audio' + id)
                const headset = document.getElementById('headset' + id)
                onClickHandler(e, MODE.AUDIO_PLAY, audioItem)
                headset.classList.add('on')
            default:
                break;
        }
    }

    const audio_end = () => {
        const headset = document.getElementById('headset' + headset_id)
        headset.classList.remove('on')
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
                        <button id={data?.word_id} className="delete_btn" onClick={handleClick("delete")}/>                            
                        <div  className="x471465d67bb6"></div>
                    </div> 
                </div>
            </div>
        <div className="x47abd6047f"> </div>
    </div>;
});

    return (
    <div className="wrap">
        <div className="search_wrap">
            <div className="seacrch_cont">
                <input type="text" className="s_text" placeholder="검색어를 입력해 주세요"/>
                <button className="search_icon" onClick={onSearchHandler}><i className="xi-search"></i></button>
            </div>
            <div className="s_pop">
                <div className="s_pop_cont">
                    <p>내가 찾은 단어</p>
                    <ul>
                        <li className="flex">
                            <a href="#">
                                <span>검색내용</span>
                            </a>
                            <button><i className="xi-close"></i></button>
                        </li>
                    </ul>
                    <div>
                        <span>전체삭제</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex word_top">
        <div className="word_tab_area flex">
            <div className="active">전체</div>
            <div>미암기</div>
            <div>암기</div>
        </div>
        <div>
            <button className="word_plus">추가<i className="xi-plus-circle"></i></button>
        </div>
        </div>
        <div className="word_wrap">
            <ul className="word_cont">
                <li className="word">
                    <div className="top_area flex">
                        <span>단어이름</span>
                        <buttton id={1} onClick={handleClick(MODE.AUDIO_PLAY)}>
                            <i id={"headset"+1} className="xi-headset listen"></i>
                            <audio id="audio1" src={process.env.PUBLIC_URL + '/pronu/あとうあ_1685105178825.mp3'} onEnded={audio_end}></audio>
                        </buttton>
                    </div>
                    <div className="mid_area">
                        <div className="mean_wrap">
                            <p>단어뜻</p>
                        </div>
                        <div className="synonym_wrap flex">
                            <span>유의어</span>
                            <div className="synonym_cont flex">
                                <p>유의어</p>
                                <p>유의어2</p>
                                <p>유의어3</p>
                            </div>
                        </div>
                    </div>
                    <div className="foot_area flex">
                        <div><span>현재날짜</span>저장</div>
                        <div className="btn_area">
                            <button className="check"><i className="xi-check-circle-o"></i></button>
                            <button className="memo"><i className="xi-comment-o"></i></button>
                            <button className="close"><i className="xi-close"></i></button>
                        </div>
                    </div>
                </li>
                <li className="word edit">
                    <div className="top_area flex">
                        <input defaultValue="word" className="edit_input" />
                        <buttton className="headset"><i className="xi-headset"></i></buttton>
                    </div>
                    <div className="mid_area">
                        <div className="mean_wrap">
                            <input defaultValue="mean" className="edit_input"/>
                        </div>
                        <div className="synonym_wrap">
                            <span>유의어</span>
                            <div className="synonym_cont flex">
                                <input defaultValue="유의어1"/>
                                <input defaultValue="유의어2"/>
                                <input/>
                                <input/>
                                <input/>
                                <input/>
                                <input/>
                                <input/>
                                <input/>
                                <input/>
                                <input/>
                                <input/>
                                <input/>
                                <input/>
                                <input/>
                                <button className="synonym_plus"><i className="xi-plus-circle"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="foot_area flex">
                        <div><span>현재날짜</span>저장</div>
                        <div className="btn_area">
                            <button className="check"><i className="xi-check-circle-o"></i></button>
                            <button className="memo"><i className="xi-comment-o"></i></button>
                            <button className="close"><i className="xi-close"></i></button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    );
}



export default WordPaper;
          