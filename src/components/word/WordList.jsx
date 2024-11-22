import React, {useEffect, useRef, useState} from "react";
import api, { MODE } from "@/services/api";
import SynonsymsList from "@components/word/SynonymsList";
import Edit from "@components/word/edit/Edit";
import wordListStore from "@/store/wordListStore";
import Store, {COMM_MODE} from "@/store/store";
import { useModal, useAlert } from "@/hook/_hooks";
import FolderCog from "@components/word/folder/FolderCog";
import Confirm from "../modal/Confirm";

function WordList(props){

    const {update, wordList, memoStatus, setMemoStatus} = wordListStore(state => state);
    const [openModal] = useModal("move");
    const [addAlert] = useAlert();

    const onClickHandler = api();
    const memoRef = useRef([]);
    const headsetRef = useRef([]);

    let resultList = [];

    //console.log(memoStatus[0]?.status);

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
            <div className="word_bookclip" style={{background: data?.folder?.background, color: data?.folder?.color}}>{data?.folder?.folder_name.slice(0,4) ?? ""}</div>
            :<></>}
            { edit_mode.isEdit && edit_mode.word_id === data.word_id?
                <Edit word_id={data?.word_id}
                    word={data?.word} 
                    mean={data?.mean}
                    synonyms={data?.synonyms}
                    setEditExit={setEditExit}
                ></Edit> :
                <div className="word_card" id={data?.word_id}>
                    <div className="word_card_top">
												<button className={data?.memorization === "Y"? "word_card_check on" : "word_card_check"} onClick={handleCheckClick(data?.word_id, data?.memorization)}>
														<i className="check_ani">
														<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path className="border" d="M9.91475 0.893067C4.9913 0.952124 1.04788 4.9913 1.10693 9.91475C1.16599 14.8385 5.20516 18.7816 10.1286 18.7226C15.0523 18.6635 18.9955 14.6246 18.9364 9.70088C18.8774 4.77743 14.8385 0.834007 9.91475 0.893067ZM10.1155 17.6258C5.81437 17.6774 2.27287 14.2025 2.22128 9.90134C2.16968 5.60026 5.62703 2.05897 9.92811 2.00738C14.2292 1.95578 17.7705 5.41314 17.8221 9.71421C17.8737 14.0153 14.4165 17.5742 10.1155 17.6258Z" fill="#666666"/>
															<path d="M10.1155 17.6258C5.81437 17.6774 2.27287 14.2025 2.22128 9.90134C2.16968 5.60026 5.62703 2.05897 9.92811 2.00738C14.2292 1.95578 17.7705 5.41314 17.8221 9.71421C17.8737 14.0153 14.4165 17.5742 10.1155 17.6258Z" fill="white"/>
															<path d="M8.37184 12.5007L13.5392 7.17459C13.7544 6.9544 14.1071 6.95017 14.3276 7.16514C14.5475 7.38037 14.5517 7.73306 14.337 7.95324L8.85346 13.6046C8.8343 13.6333 8.81316 13.6609 8.78839 13.6862C8.57314 13.9061 8.22045 13.9104 8.00027 13.6957L5.20947 10.9708C4.98928 10.7558 4.98505 10.4031 5.20002 10.1829C5.41526 9.96273 5.76795 9.9585 5.98814 10.1735L8.37184 12.5007Z" fill="#666666"/>
															<path className="check" d="M5.5 10.5L8.5 13.5" stroke="#666666" stroke-linecap="round"/>
															<path className="check" d="M8.5 13.5L14 7.5" stroke="#666666" stroke-linecap="round"/>
														</svg>
														</i>
												</button>
												<h2 className="word_card_name">{data?.word}mimikyyu</h2>
												<span className="word_card_read">{data?.wread ?? "" !== "" ? "["+data?.wread+"]" : ""}[미미뀨]</span>
												<button className="word_card_headset" onClick={handleAudioClick(idx)}>
														<i ref={el => headsetRef.current[idx] = el} className="xi-headset listen" data-pron-audio={data?.soundPath}></i>
												</button>
                    </div>
										<div className="word_card_mean">
												<div className="word_card_mean_list">{data?.mean}귀여움</div>
										</div>
                    {/* 메모 */}
                    <div ref={el => memoRef.current[idx] = el} 
                    className={memoStatus[idx]?.status === "ON" ? "memo_area on" : "memo_area"}>
											<div className="memo_box textarea-box">
                        <textarea className="memo_text" maxLength={3000} 
                                defaultValue={data?.memo.replace(/\\n/g, '\n')}>                       
                        </textarea>
											</div>
											<div className="btn_area flex">
													<button className="btn-light sizeS cancle_memo" onClick={handleMemoClick(idx, 'CANCLE')}>취소</button>
													<button className="btn-fill sizeS save_memo" onClick={handleMemoClick(idx ,'SAVE', data?.word_id)}>저장</button>
											</div>
                    </div>
                    {/* 메모 끝 */}
                    <div className="word_card_foot">
                        <div><span>{data?.create_time}2024-11-21</span></div>
                        {/* <div className="btn_area">
                            <span className="folder icon"><i className="xi-folder-o" onClick={handleFolderClick(data?.word_id)}></i></span>
                            <span className="pen icon"><i className="xi-pen-o" onClick={handleEditClick(data?.word_id)}></i></span>
                            <span className={memoStatus[idx]?.status === "ON" ? "memo on icon" : "memo icon"}><i className="xi-comment-o" onClick={handleMemoClick(idx)}></i></span>
                            <span className="close icon"><i className="xi-close" onClick={handleDeleteClick(data?.word_id)}></i></span>
                        </div> */}
                    </div>
                </div>
            }
            {/* 영어 단어장 컴포넌트 */}
                <div className="word_card word-e" id={data?.word_id}>
                    <div className="top_area flex">
                        <div className="top_word_wrap">
                        <span className={data?.memorization === "Y"? "check on icon" : "check icon"} onClick={handleCheckClick(data?.word_id, data?.memorization)}>
                            <i className="xi-check-circle-o"></i>
                        </span>
                            <span>{data?.word}</span>
                            <span className="read">{data?.wread !== ""? "["+data?.wread+"]" : ""}</span>
                        </div>
                        <button onClick={handleAudioClick(idx)}>
                            <i ref={el => headsetRef.current[idx] = el} className="xi-headset listen" data-pron-audio={data?.soundPath}></i>
                        </button>
                    </div>
                    <div className="mid_area">
                        <div className="mean_wrap flex">
                            <span>{data?.mean}뜻1</span>
                            <span>{data?.mean}뜻2</span>
                            <span>{data?.mean}뜻3</span>
                        </div>
                        <ul className="word_type_wrap flex">
                            <li className="word_type_list flex">
                                <span className="word_type_title">동사</span>
                                <ul className="word_type_cont flex">
                                    {/* {props.synonyms.map((_synonym, idx) => 
                                        <p key={'sl'+idx+_synonym?.synonym_id}>{_synonym.synonym}</p>
                                    )} */}
                                    <li>
                                        <span className="word_type_cont_title">과거</span>
                                        <span>aa</span>
                                    </li>
                                    <li>
                                        <span className="word_type_cont_title">과거분사</span>
                                        <span>bbb</span>
                                    </li>
                                    <li>
                                        <span className="word_type_cont_title">현재분사</span>
                                        <span>cccc</span>
                                    </li>
                                    <li>
                                        <span className="word_type_cont_title">3인칭단수</span>
                                        <span>ddddd</span>
                                    </li>
                                </ul>
                            </li>
                            <li className="word_type_list flex">
                                <span className="word_type_title">명사</span>
                                <ul className="word_type_cont flex">
                                    {/* {props.synonyms.map((_synonym, idx) => 
                                        <p key={'sl'+idx+_synonym?.synonym_id}>{_synonym.synonym}</p>
                                    )} */}
                                    <li>
                                        <span className="word_type_cont_title">복수</span>
                                        <span>eeeee</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
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
								{/* 영어 에딧 */}
								<div className="word edit e-edit" >
                    <div className="top_area flex">
                        <span>{props?.word}</span>
                        <button className="headset"><i className="xi-headset"></i></button>
                    </div>
                    <div className="mid_area">
                        <div className="input_wrap">
                            <span>발음</span>
                            <input type="text" className="edit_input"/>
                        </div>
                        <div className="input_wrap">
                            <span>뜻</span>
                            <div className="add_cont flex">
                                <div className="add_list flex" key={idx}>                                    
                                <input type="text" className="edit_input"/>
                                    <button ><i className="xi-close"></i></button>
                                </div>       
                                <button className="add_plus" ><i className="xi-plus"></i></button>
                            </div>
                        </div>
                        <div className="word_type_wrap flex">
                            <span>동사</span>
                            <div>
																{/* {props.synonyms.map((_synonym, idx) => 
																		<p key={'sl'+idx+_synonym?.synonym_id}>{_synonym.synonym}</p>
																)} */}
																<div className="input_wrap">
																		<span>과거</span>
																		<input type="text" className="edit_input"/>
																</div>
																<div className="input_wrap">
																		<span>과거분사</span>
																		<input type="text" className="edit_input"/>
																</div>
																<div className="input_wrap">
																		<span>현재분사</span>
																		<input type="text" className="edit_input"/>
																</div>
																<div className="input_wrap">
																		<span>3인칭단수</span>
																		<input type="text" className="edit_input"/>
																</div>
														</div>
                        </div>
                        <div className="word_type_wrap flex">
                            <span>명사</span>
                            <div>
                                <div className="input_wrap">
                                    <span>단수</span>
                                    <input type="text" className="edit_input"/>
                                </div>
                                <div className="input_wrap">
                                    <span>복수</span>
                                    <input type="text" className="edit_input"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="edit_foot flex">
                            <button className="btn-light sizeS" onClick={props.setEditExit}>취소</button>
                            <button className="btn-fill sizeS">수정</button>
                    </div>
									</div>
            </div>
        });


    return (
        <>
        {dataList}
        </>
    );
}

export default WordList;