import React, {useEffect, useRef, useState} from "react";
import api, { MODE } from "@/services/api";
import SynonsymsList from "@components/word/SynonymsList";
import Edit from "@components/word/edit/Edit";
import wordListStore from "@/store/wordListStore";
import Store, {COMM_MODE} from "@/store/store";
import { useModal, useAlert } from "@/hook/_hooks";
import FolderCog from "@components/word/folder/FolderCog";
import Confirm from "../modal/Confirm";
import { useObserver } from "@/hook/_hooks";

function WordList(props){

    const {page, update, wordList, memoStatus, setMemoStatus, mode} = wordListStore(state => state);
    const [openModal] = useModal("move");
    const [addAlert] = useAlert();

    const obsRef = useRef();

    const onClickHandler = api();
    const [obsPage, obsInit, isEnd, preventDisable] = useObserver();
    const memoRef = useRef([]);
    const headsetRef = useRef([]);

    let resultList = [];

    const [edit_mode, setEditMode] = useState({
        word_id:1,
        isEdit: false
    });

    useEffect(() => {
        obsInit(obsRef);
    }, []);

    useEffect(()=> {
        if (!edit_mode.isEdit && update ){
            // onClickHandler('', MODE.READ, '');
            callReadAPI('update');
        }
    },[update]);

    useEffect(()=> {
        if (!edit_mode.isEdit && obsPage > -1 
            && mode === 'read' && page.hasNext){
            const param = `?page=${page.next}&last_wid=${page.lastWid}`;
            callReadAPI('page', param);
        }
    },[obsPage]);

    const callReadAPI = async (a, param) => {
        console.log(`callReadAPI / ${a} / ${param}`);
        await onClickHandler('', MODE.READ, '', param);
        //옵저빙 가능하도록 수정
        preventDisable();
    }

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
        addAlert({
            type: "confirm",
            title: "잠깐만요!",
            content: "정말 삭제하시겠습니까?",
            component: <Confirm></Confirm>,
            executionFunction: async function(){
                onClickHandler('', MODE.DELETE, id);
            }
        })
    }

    const handleMemoClick = (id, mode, wordId) => e => {
        const memo_input = memoRef.current[id];
        let status = memoStatus[id]?.status ?? "FIRST";
        const memo_mode = mode ?? status;

        if (memo_mode === "FIRST"){
            status = "ON";
            memo_input.memo = memo_input.childNodes[0].value;  //텍스트 저장
            setMemoStatus({id: id, status: status});
            return;
        }

        if (memo_mode === "OFF"){
            status = "ON";
            setMemoStatus({id: id, status: status});
            return;
        }

        if (memo_mode === "ON"){
            status = 'OFF';
            setMemoStatus({id: id, status: status});
            return;
        }

        if (memo_mode === "CANCLE"){
            memo_input.childNodes[0].value = memo_input.memo;
            return;
        }

        if (memo_mode === "SAVE"){
            let data = {};
            data.memo = memo_input?.childNodes[0]?.value;
            memo_input.memo = memo_input.childNodes[0].value;  //텍스트 저장
            onClickHandler(e, MODE.UPDATE_MEMO, wordId, data); 
            return;
        }
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

    const handleCheckClick = (word_id, status) => e => {
        let result = status === "Y" ? "N" : "Y";
        onClickHandler(e, MODE.MEMORIZATION, word_id, {memorization: result});
    }

    const handleFolderClick = (word_id) => e => {
        const config = {
            word_id: word_id,
            mode: COMM_MODE.MOVE
        }
        openModal(<FolderCog folderCog={config}></FolderCog>)
        // onClickHandler(e, MODE.MEMORIZATION, wordId, {memorization: result});
    }

    resultList = wordList;
    if (props.memorization === props.memorization_type.MEMORIZATION){
        resultList = wordList.filter(data => data?.memorization === "Y");
    }

    if (props.memorization === props.memorization_type.MEMORIZATION_PERIOD){
        resultList = wordList.filter(data => data?.memorization === "N");
    }

    const dataList = resultList.map((data, idx) => {
        return <div className="word_cont" key={'wl'+data?.word_id}>
            {data?.folder?.folder_name ?? "" !== "" ?
            <div className="book-clip" style={{background: data?.folder?.background, color: data?.folder?.color}}>{data?.folder?.folder_name.slice(0,4) ?? ""}</div>
            :<></>}
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
                        <span className={data?.memorization === "Y"? "check on icon" : "check icon"} onClick={handleCheckClick(data?.word_id, data?.memorization)}>
                            <i className="xi-check-circle-o"></i>
                        </span>
                            <span>{data?.word}</span>
                            <span className="read">{data?.wread ?? "" !== "" ? "["+data?.wread+"]" : ""}</span>
                        </div>
                        <button onClick={handleAudioClick(idx)}>
                            <i ref={el => headsetRef.current[idx] = el} className="xi-headset listen" data-pron-audio={data?.soundPath}></i>
                        </button>
                    </div>
                    <div className="mid_area">
                        <div className="mean_wrap">
                            <p>{data?.mean}</p>
                        </div>
                        <SynonsymsList cls={data?.details}></SynonsymsList>
                    </div>
                    {/* 메모 */}
                    <div ref={el => memoRef.current[idx] = el} 
                    className={memoStatus[idx]?.status === "ON" ? "memo_area on" : "memo_area"}>
                        <textarea className="memo_text" maxLength={3000} 
                                defaultValue={data?.memo.replace(/\\n/g, '\n')}>                       
                        </textarea>
                        <div className="btn_area flex">
                            <button className="cancle_memo" onClick={handleMemoClick(idx, 'CANCLE')}>취소</button>
                            <button className="save_memo" onClick={handleMemoClick(idx ,'SAVE', data?.word_id)}>저장</button>
                        </div>
                    </div>
                    {/* 메모 끝 */}
                    <div className="foot_area flex">
                        <div><span>{data?.update_time}</span></div>
                        <div className="btn_area">
                            <span className="folder icon"><i className="xi-folder-o" onClick={handleFolderClick(data?.word_id)}></i></span>
                            <span className="pen icon"><i className="xi-pen-o" onClick={handleEditClick(data?.word_id)}></i></span>
                            <span className={memoStatus[idx]?.status === "ON" ? "memo on icon" : "memo icon"}><i className="xi-comment-o" onClick={handleMemoClick(idx)}></i></span>
                            <span className="close icon"><i className="xi-close" onClick={handleDeleteClick(data?.word_id)}></i></span>
                        </div>
                    </div>
                </div>
            }
            </div>
        });


    return (
        <>
        {dataList}
        <div ref={obsRef} style={{height:"100px"}}>hello</div>
        </>
    );
}

export default WordList;