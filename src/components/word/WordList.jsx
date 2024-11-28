import React, { useEffect, useRef, useState } from "react";
import api, { MODE } from "@/services/api";
import Edit from "@components/modal/add/Add";
import wordListStore from "@/store/wordListStore";
import { COMM_MODE } from "@/store/store";
import { useModal } from "@/hook/_hooks";
import FolderCog from "@components/word/folder/FolderCog";
import Confirm from "../modal/Confirm";
import BottomModalSelect from "@components/layout/popup/BottomModalSelect";
import CenterModal from "@components/layout/popup/CenterModal";
import FullModal from "@components/layout/popup/FullModal";
import BottomModal from "@components/layout/popup/BottomModal";
import WordDetailList from "./WordDetailList";

function WordList(props) {
    const { update } = wordListStore(state => state);

    const [ wordList, setWordList ] = useState([]);
    const [ memoStatus, setMemoStatusState ] = useState({
        0: {
            "status": "OFF",
            "memo": ""
        }
    });


    const [openModal] = useModal("confirm");
    const [folderMoveModal] = useModal("foldercog");
    const [moreModal] = useModal("more");
    const [editModal] = useModal("edit");

    useEffect(() => {
        onClickHandler(null, MODE.READ)
            .then(res => {
                setWordList(res.words);
            });
    }, [update]);

    const handleMoreModal = (id, data, wordId) => e => {
        moreModal(BottomModal, BottomModalSelect, {
            setting: [
                {
                    title: "폴더 이동",
                    onClick: handleFolderClick(data?.wordId),
                },
                {
                    title: "수정",
                    onClick: HandleEditWord(data?.wordId),
                },
                {
                    title: "삭제",
                    onClick: handleDeleteWord(data?.wordId),
                },
            ],
        });
    }

    const handleFolderClick = (wordId) => e => {
        const config = {
            wordId: wordId,
            mode: COMM_MODE.MOVE
        }
        folderMoveModal(FullModal, FolderCog, {
            folderCog: config,
        })
    }

    const handleDeleteWord = (id) => e => {
        openModal(CenterModal, Confirm, {
            title: "잠깐만요!",
            content: "정말 삭제하시겠습니까?",
            submit: () => onClickHandler('', MODE.DELETE, id)
        });
    }

    const HandleEditWord = (id, wordId) => e => {
        editModal(FullModal, Edit, {
            wordId: wordId,
            isEdit: true

        });
    }

    const onClickHandler = api();
    const memoRef = useRef([]);
    const headsetRef = useRef([]);

    let resultList = [];

    const handleAudioClick = (id) => e => {
        const headset = headsetRef?.current[id];
        const sound_path = headset?.dataset?.pronAudio ?? "";
        const audio_data = {
            "sound_path": sound_path,
            "id": id
        }
        if (sound_path !== "") {
            onClickHandler(e, MODE.AUDIO_PLAY, audio_data, handleAudioEnd);
            headset.classList.add('on');
        }
    }


    const handleMemoClick = (id, mode, wordId) => e => {
        const memo_input = memoRef.current[id];
        let status = memoStatus[id]?.status ?? "FIRST";
        const memo_mode = mode ?? status;

        if (memo_mode === "FIRST" || memo_mode === "OFF") {
            status = "ON";
            memo_input.previous = memo_input.value;  //텍스트 저장
            setMemoStatus({ id: id, status: status });
            return;
        }

        if (memo_mode === "ON") {
            status = 'OFF';
            setMemoStatus({ id: id, status: status });
            return;
        }

        if (memo_mode === "CANCLE") {
            memo_input.value = memo_input.previous;
            return;
        }

        if (memo_mode === "SAVE") {
            const data = {
                memo: memo_input.value
            };
            memo_input.previous = memo_input.value;  //텍스트 저장
            onClickHandler(e, MODE.UPDATE_MEMO, wordId, data);
            return;
        }
    }

    const setMemoStatus = ({id, status, memo}) => {
        setMemoStatusState({
                ...memoStatus,
                [id]: {
                    "status": status,
                    "memo": memo
                }
            }
        )
    }

    const handleAudioEnd = id => e => {
        headsetRef?.current[id]?.classList?.remove('on');
    }

    const handleCheckClick = (wordId, status) => e => {
        let result = status === "Y" ? "N" : "Y";
        onClickHandler(e, MODE.MEMORIZATION, wordId, { memorization: result });
    }

    resultList = wordList;
    if (props.memorization === props.memorization_type.MEMORIZATION) {
        resultList = wordList.filter(data => data?.memorization === "Y");
    }

    if (props.memorization === props.memorization_type.MEMORIZATION_PERIOD) {
        resultList = wordList.filter(data => data?.memorization === "N");
    }

    const dataList = resultList.map((data, idx) => {
        return (
            <div className="word_card" key={data?.wordId}>
                <div className="word_card_top">
                    <button className={data?.memorization === "Y" ? "word_card_check on" : "word_card_check"} onClick={handleCheckClick(data?.wordId, data?.memorization)}>
                        <i className="check_ani">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="border" d="M9.91475 0.893067C4.9913 0.952124 1.04788 4.9913 1.10693 9.91475C1.16599 14.8385 5.20516 18.7816 10.1286 18.7226C15.0523 18.6635 18.9955 14.6246 18.9364 9.70088C18.8774 4.77743 14.8385 0.834007 9.91475 0.893067ZM10.1155 17.6258C5.81437 17.6774 2.27287 14.2025 2.22128 9.90134C2.16968 5.60026 5.62703 2.05897 9.92811 2.00738C14.2292 1.95578 17.7705 5.41314 17.8221 9.71421C17.8737 14.0153 14.4165 17.5742 10.1155 17.6258Z" fill="#666666" />
                                <path d="M10.1155 17.6258C5.81437 17.6774 2.27287 14.2025 2.22128 9.90134C2.16968 5.60026 5.62703 2.05897 9.92811 2.00738C14.2292 1.95578 17.7705 5.41314 17.8221 9.71421C17.8737 14.0153 14.4165 17.5742 10.1155 17.6258Z" fill="white" />
                                <path d="M8.37184 12.5007L13.5392 7.17459C13.7544 6.9544 14.1071 6.95017 14.3276 7.16514C14.5475 7.38037 14.5517 7.73306 14.337 7.95324L8.85346 13.6046C8.8343 13.6333 8.81316 13.6609 8.78839 13.6862C8.57314 13.9061 8.22045 13.9104 8.00027 13.6957L5.20947 10.9708C4.98928 10.7558 4.98505 10.4031 5.20002 10.1829C5.41526 9.96273 5.76795 9.9585 5.98814 10.1735L8.37184 12.5007Z" fill="#666666" />
                                <path className="check" d="M5.5 10.5L8.5 13.5" stroke="#666666" strokeLinecap="round" />
                                <path className="check" d="M8.5 13.5L14 7.5" stroke="#666666" strokeLinecap="round" />
                            </svg>
                        </i>
                    </button>
                    <h2 className="word_card_name">{data?.word}</h2>
                    <span className="word_card_read">{data?.read ?? "" !== "" ? "[" + data?.read + "]" : ""}</span>
                    <button className="word_card_headset" onClick={handleAudioClick(idx)}>
                        <i ref={el => headsetRef.current[idx] = el} className="xi-headset listen" data-pron-audio={data?.soundPath}></i>
                    </button>
                    <button className="word_card_more" onClick={handleMoreModal(idx)}>
                        <i className="xi-ellipsis-v"></i>
                    </button>
                </div>
                {/* 뜻 여러개인 경우 :: 한 개일 경우에도 이 안에 넣으면 됨 */}
                <div className="word_card_mean_wrap">
                    {
                        data?.mean.split(",").map((value, idx) =>
                            <div key={idx} className="word_card_mean_list">{idx + 1}.{value}</div>
                        )
                    }
                </div>
                {/* 품사 영역 */}
                <WordDetailList details={data?.details}></WordDetailList>
                {/* 품사 영역 */}
                {/* 메모 */}
                <div className={memoStatus[idx]?.status === "ON" ? "memo_area on" : "memo_area"}>
                    <div className="memo_box textarea-box">
                        <textarea ref={el => memoRef.current[idx] = el} className="memo_text" maxLength={3000}
                            defaultValue={data?.memo.replace(/\\n/g, '\n')}>
                        </textarea>
                    </div>
                    <div className="btn_area flex">
                        <button className="btn-light sizeS cancle_memo" onClick={handleMemoClick(idx, 'CANCLE')}>취소</button>
                        <button className="btn-fill sizeS save_memo" onClick={handleMemoClick(idx, 'SAVE', data?.wordId)}>저장</button>
                    </div>
                </div>
                {/* 메모 */}
                <div className="word_card_foot">
                    <div><span>{data?.createTime}</span></div>
                    <button className={memoStatus[idx]?.status === "ON" ? "word_card_memo on" : "word_card_memo"}><i className="xi-comment-o" onClick={handleMemoClick(idx)}></i></button>
                </div>
            </div>
        )
    });

    return (
        <div className="word_cont">
            {dataList}
        </div>
    );
}

export default WordList;