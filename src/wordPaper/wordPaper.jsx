import React, { useEffect, useRef, useState } from "react";
import "./wordPaper.css";
import SynonsymsList from "./Component/synonymsList";
import wordListStore from "../stores/wordListStore";
import Store from "../stores/store";
import useEvntHandler, { MODE } from "../js/useEvntHandler";
import Edit from "./Component/Edit/edit";

function WordPaper(){
    // Store 사용
    const {update, wordList} = wordListStore(state => state)
    const {setModal} = Store(state=>state)
    
    const onClickHandler = useEvntHandler()
    const searchInput = useRef()
    const memoRef = useRef([])
    const headsetRef = useRef([])

    const [edit_mode, setEditMode] = useState({
        word_id:1,
        isEdit: false
    })

    useEffect(() => {
       onClickHandler('', MODE.READ, '')
    }, [update, edit_mode]);   //해당 state가 변경될 때 해당 로직 수행

   // 버튼 이벤트 
    const handleClick = (mode, objId, detailMode, wordId) => e => {
        const id = objId ?? e.currentTarget.id        

        switch (mode) {
            case MODE.UPDATE:
                
                break
            case MODE.DELETE:
                onClickHandler('', MODE.DELETE, id)
                break
        
            case MODE.AUDIO_PLAY:
                const headset = headsetRef?.current[id]
                const sound_path = headset?.dataset?.pronAudio ?? ""
                const audio_data = {
                    "sound_path" : sound_path,
                    "id" : id
                }
                if(sound_path !== ""){
                    onClickHandler(e, MODE.AUDIO_PLAY, audio_data, audioEnd)
                    headset.classList.add('on')
                }
                break

            case MODE.MEMO_BTN:         
                let memo_input = memoRef.current[id]
                let status = memo_input?.status ?? 'on'
                let memo_mode = detailMode ?? status
                const memoBtnHandler = {
                    off(){
                        status = 'on'
                        memo_input.classList.remove('on')
                    },
                    on(){
                        status = 'off'
                        if(!memo_input.first) {
                            memo_input.first = true
                            memo_input.memo = memo_input.childNodes[0].value  //텍스트 저장
                        }
                        memo_input.classList.add('on')
                    },
                    cancle(){
                        memo_input.childNodes[0].value = memo_input.memo
                    },
                    save(){
                        let data = {};
                        data.memo = memo_input?.childNodes[0]?.value
                        memo_input.memo = memo_input.childNodes[0].value  //텍스트 저장
                        onClickHandler(e, MODE.UPDATE_MEMO, wordId, data) 
                    }
                }
                memoBtnHandler[memo_mode]()
                memo_input.status = status
                break
            
            case MODE.EDIT:
                console.log("edit")
                setEditMode({
                    word_id: wordId,
                    isEdit: true
                })
                break
            default:
                break
        }
    }

    const audioEnd = id => e =>{
        headsetRef?.current[id]?.classList?.remove('on')
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
    return  <div className="word_cont">
        { edit_mode.isEdit && edit_mode.word_id === data.word_id?
            <Edit word={data?.word} 
                  mean={data?.mean}
                  synonyms={data?.synonyms}
            ></Edit> :
            <div className="word" id={data?.word_id}>
                <div className="top_area flex">
                    <span>{data?.word}</span>
                    <button onClick={handleClick(MODE.AUDIO_PLAY, idx)}>
                        <i ref={el => headsetRef.current[idx] = el} className="xi-headset listen" data-pron-audio={data?.soundPath}></i>
                    </button>
                </div>
                <div className="mid_area">
                    <div className="mean_wrap">
                        <p>{data?.mean}</p>
                    </div>
                    <SynonsymsList synonyms={data?.synonyms}></SynonsymsList>
                </div>
                <div ref={el => memoRef.current[idx] = el} className="memo_area">
                    <textarea className="memo_text" maxLength={3000} 
                              defaultValue={data?.memo.replace(/\\n/g, '\n')}>                       
                    </textarea>
                    <div className="btn_area flex">
                        <button className="cancle_memo" onClick={handleClick(MODE.MEMO_BTN, idx, 'cancle')}>취소</button>
                        <button className="save_memo" onClick={handleClick(MODE.MEMO_BTN, idx, 'save', data?.word_id)}>저장</button>
                    </div>
                </div>
                <div className="foot_area flex">
                    <div><span>{data?.update_time}</span></div>
                    <div className="btn_area">
                        <span className="check"><i className="xi-check-circle-o"></i></span>
                        <span className="memo"><i className="xi-comment-o" onClick={handleClick(MODE.MEMO_BTN, idx)}></i></span>
                        <span className="close"><i className="xi-close" onClick={handleClick(MODE.EDIT, idx, '', data?.word_id)}></i></span>
                    </div>
                </div>
            </div>
        }
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
            {dataList}
        </div>
     </div>
    );
}



export default WordPaper;
          