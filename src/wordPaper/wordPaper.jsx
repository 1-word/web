import React, { useEffect, useRef } from "react";
import "./wordPaper.css";
import SynonsymsList from "./Component/synonymsList";
import wordListStore from "../stores/wordListStore";
import Store from "../stores/store";
import useEvntHandler, { MODE } from "../js/useEvntHandler";

function WordPaper(){
    // Store 사용
    const {update, wordList} = wordListStore(state => state)
    const {setModal} = Store(state=>state)

    
    const onClickHandler = useEvntHandler()

    const searchInput = useRef()

    let headset_id = ""

    let headset

    useEffect(() => {
       onClickHandler('', MODE.READ, '')
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
                //const audioItem = document.getElementById('audio' + id)
                headset = document.getElementById('headset' + id)
                const soundPath= headset.dataset.pronAudio ?? ""
                if(soundPath !== ""){
                    onClickHandler(e, MODE.AUDIO_PLAY, soundPath, audio_end)
                    headset.classList.add('on')
                }
            default:
                break;
        }
    }

    const audio_end = () => {
        console.log("end")
        //const headset = document.getElementById('headset' + headset_id)
        headset.classList.remove('on')
    }

    // 팝업 이벤트
    const handleModal = e => {
        setModal(true)
    }

    const onSearchHandler = e => {
        let searchText = searchInput.current.value || ""
        searchText !== "" ? searchText = searchText : searchText = MODE.SEARCH_ALL
        onClickHandler('', MODE.SEARCH, searchText)
    }


    const dataList = wordList.map((data, idx) => {
    return  <div className="word" id={data?.word_id}>
                <div className="top_area flex">
                    <span>{data?.word}</span>
                    <button id={idx} onClick={handleClick(MODE.AUDIO_PLAY)}>
                        <i id={"headset"+idx} className="xi-headset listen" data-pron-audio={data?.soundPath}></i>
                        {/* <audio id="audio1" src={process.env.PUBLIC_URL + '/pronu/あとうあ_1685105178825.mp3'} onEnded={audio_end}></audio> */}
                    </button>
                </div>
                <div className="mid_area">
                    <div className="mean_wrap">
                        <p>{data?.mean}</p>
                    </div>
                    <SynonsymsList synonyms={data?.synonyms}></SynonsymsList>
                </div>
                <div className="memo_area">
                    <textarea className="memo_text" maxLength={3000} 
                              defaultValue={data?.memo.replace(/\\n/g, '\n')}>                       
                    </textarea>
                    <div className="btn_area flex">
                        <button className="cancle_memo">취소</button>
                        <button className="save_memo">저장</button>
                    </div>
                </div>
                <div className="foot_area flex">
                    <div><span>{data?.update_time}</span></div>
                    <div className="btn_area">
                        <span className="check"><i className="xi-check-circle-o"></i></span>
                        <span className="memo"><i className="xi-comment-o"></i></span>
                        <span className="close"><i className="xi-close"></i></span>
                    </div>
                </div>
            </div>  
});

    return (
    <div className="wrap">
        <div className="search_wrap">
            <div className="seacrch_cont">
                <input ref={searchInput} onChange={onSearchHandler} type="text" className="s_text" placeholder="검색어를 입력해 주세요"/>
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
            <button className="word_plus" onClick={handleModal}>추가<i className="xi-plus-circle"></i></button>
        </div>
        </div>
        <div className="word_wrap">
            <div className="word_cont">
                {dataList}
            </div>
            <ul className="word_cont">
                <li className="word edit">
                    <div className="top_area flex">
                        <input defaultValue="word" className="edit_input" />
                        <button className="headset"><i className="xi-headset"></i></button>
                    </div>
                    <div className="mid_area">
                        <div className="mean_wrap">
                            <input defaultValue="mean" className="edit_input"/>
                        </div>
                        <div className="synonym_wrap">
                            <span>유의어</span>
                            <div className="synonym_cont flex">
                                <div className="synonym_add flex">
                                    <input defaultValue="유의어1"/>
                                    <button><i className="xi-minus-circle"></i></button>
                                </div>
                                <div className="synonym_add flex">
                                    <input defaultValue="유의어1"/>
                                    <button><i className="xi-minus-circle"></i></button>
                                </div><div className="synonym_add flex">
                                    <input defaultValue="유의어1"/>
                                    <button><i className="xi-minus-circle"></i></button>
                                </div><div className="synonym_add flex">
                                    <input defaultValue="유의어1"/>
                                    <button><i className="xi-minus-circle"></i></button>
                                </div><div className="synonym_add flex">
                                    <input defaultValue="유의어1"/>
                                    <button><i className="xi-minus"></i></button>
                                </div><div className="synonym_add flex">
                                    <input defaultValue="유의어1"/>
                                    <button><i className="xi-minus flex"></i></button>
                                </div>
                                <div className="flex synonym_plus_cont">
                                <button className="synonym_plus"><i className="xi-plus-circle"></i></button>
                                </div>
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
          