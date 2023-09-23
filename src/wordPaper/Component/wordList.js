import React, {useEffect, useRef, useState} from "react";
import useEvntHandler, { MODE } from "../../js/useEvntHandler";
import SynonsymsList from "./synonymsList";
import Edit from "./Edit/edit";
import wordListStore from "../../stores/wordListStore";

function WordList(props){

    const {update, wordList} = wordListStore(state => state);

    const onClickHandler = useEvntHandler();
    const memoRef = useRef([]);
    const headsetRef = useRef([]);

    const [edit_mode, setEditMode] = useState({
        word_id:1,
        isEdit: false
    });

    useEffect(()=> {
        if (!edit_mode.isEdit){
            onClickHandler('', MODE.READ, '');
        }
    },[update]);

    // Edit mode
    // Edit 모드 종료
    const setEditExit = () => {
        setEditMode({
            word_id:-1,
            isEdit: false
        });
    }

    const handleAudioClick = (id) => e => {
        const headset = headsetRef?.current[id];
        const sound_path = headset?.dataset?.pronAudio ?? "";
        const audio_data = {
            "sound_path" : sound_path,
            "id" : id
        }
        if(sound_path !== ""){
            onClickHandler(e, MODE.AUDIO_PLAY, audio_data, handleAudioEnd);
            headset.classList.add('on');
        }
    }

    const handleDeleteClick = (id) => e => {
        onClickHandler('', MODE.DELETE, id);
    }

    const handleMemoClick = (id, mode, wordId) => e => {
        const memo_input = memoRef.current[id];
        let status = memo_input?.status ?? 'ON';
        const memo_mode = mode ?? status;
        const memoBtnHandler = {
            OFF: function(){
                status = 'OFF';
                memo_input.classList.remove('on');
            },
            ON : function(){
                status = 'OFF';
                if(!memo_input.first) {
                    memo_input.first = true;
                    memo_input.memo = memo_input.childNodes[0].value;  //텍스트 저장
                }
                memo_input.classList.add('on');
            },
            CANCLE : function(){
                memo_input.childNodes[0].value = memo_input.memo;
            },
            SAVE : function(){
                let data = {};
                data.memo = memo_input?.childNodes[0]?.value;
                memo_input.memo = memo_input.childNodes[0].value;  //텍스트 저장
                onClickHandler(e, MODE.UPDATE_MEMO, wordId, data); 
            }
        }
        memoBtnHandler[memo_mode]();
        memo_input.status = status;       
    }

    const handleEditClick = (wordId) => e => {
        setEditMode({
            word_id: wordId,
            isEdit: true
        })
    }

    const handleAudioEnd = id => e =>{
        headsetRef?.current[id]?.classList?.remove('on');
    }

    const wordList1 = [{
        "word_id": 0,
        "word": "단어단어단어단어단어단어단어단어단어단어단어단어단어단어단어단어단어단어단어",
        "mean": "22",
        "wread": "바름",
        "memo": "44",
        "soundPath": "",
        "update_time": "",
        "synonyms": [
            {
                "synonym_id": 0,
                "synonym": "2",
                "memo": "3"
            },
            {
                "synonym_id": 0,
                "synonym": "2",
                "memo": "3"
            }
        ]
    }
]

    const dataList = wordList.map((data, idx) => {
        return  <div className="word_cont" key={data?.word_id}>
            { edit_mode.isEdit && edit_mode.word_id === data.word_id?
                <Edit word_id={data?.word_id}
                    word={data?.word} 
                    mean={data?.mean}
                    synonyms={data?.synonyms}
                    setEditExit={setEditExit}
                ></Edit> :
                <div className="word" id={data?.word_id}>
                    <div className="top_area flex">
                        <div className="top_word_wrap">
                        <span className="check icon"><i className="xi-check-circle-o"></i></span>
                            <span>{data?.word}</span>
                            <span className="read">[{data?.wread}]</span>
                        </div>
                        <button onClick={handleAudioClick(idx)}>
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
                            <button className="cancle_memo" onClick={handleMemoClick(idx, 'CANCLE')}>취소</button>
                            <button className="save_memo" onClick={handleMemoClick(idx ,'SAVE', data?.word_id)}>저장</button>
                        </div>
                    </div>
                    <div className="foot_area flex">
                        <div><span>{data?.update_time}</span></div>
                        <div className="btn_area">
                            <span className="folder icon"><i className="xi-folder-o"></i></span>
                            <span className="pen icon"><i className="xi-pen-o" onClick={handleEditClick(data?.word_id)}></i></span>
                            <span className="memo icon"><i className="xi-comment-o" onClick={handleMemoClick(idx)}></i></span>
                            <span className="close icon"><i className="xi-close" onClick={handleDeleteClick(data?.word_id)}></i></span>
                        </div>
                    </div>
                    {/* modal */}
                    <aside class="folder-wrap">
                        <div class="folder-cont">
                            <div class="folder-area">
                                <div class="title-area flex on">
                                    <h2>폴더 이동하기</h2>
                                    <span>
                                        <i class="xi-close"></i>
                                    </span>
                                </div>
                                <div class="name-area">
                                    <div class="name-title title flex">
                                        <span class="folder-color"></span>
                                        <h3>이름</h3>
                                    </div>
                                    <div class="name-title title flex">
                                        <span class="folder-color"></span>
                                        <h3>이름</h3>
                                    </div>
                                </div>
                                <div class="btn-area">
                                    <button class="btn">이동하기</button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            }
            </div>
        });


    return (
        <>
        {dataList}
        </>
    );
}

export default WordList;