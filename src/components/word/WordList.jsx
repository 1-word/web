import React, { useEffect, useRef, useState } from "react";
import api, { MODE } from "@/services/api";
import Edit from "@components/modal/add/Add";
import wordListStore from "@/store/wordListStore";
import Store, { COMM_MODE, MEMORIZATION_TYPE } from "@/store/store";
import { useModal, useObserver } from "@/hook/_hooks";
import FolderCog from "@components/word/folder/FolderCog";
import Confirm from "../modal/Confirm";
import BottomModalSelect from "@components/layout/popup/BottomModalSelect";
import CenterModal from "@components/layout/popup/CenterModal";
import FullModal from "@components/layout/popup/FullModal";
import BottomModal from "@components/layout/popup/BottomModal";
import WordDetailList from "./WordDetailList";
import { Pagination } from "@/util/Pagination";
import { useParams } from "react-router-dom";
import VocabookList from "./folder/VocaBookList";
import Toast from "../layout/popup/Toast";
import ListEmpty from "./ListEmpty";
import CheckAni from "./checkAni";

function WordList(props) {
  const {
    wordList,
    setWordList,
    update,
    setUpdateFlag,
    addWordList,
    setPreventDisableFunc,
  } = wordListStore((state) => state);
  const { memorization, setMemorization } = Store((state) => state);
  const { wordBookId } = useParams();

  const [memoStatus, setMemoStatusState] = useState({
    0: { status: "OFF" },
  });

  const [obsPage, obsInit, isEnd, preventDisable] = useObserver();

  const [openModal] = useModal("confirm");
  const [folderMoveModal] = useModal("foldercog");
  const [moreModal] = useModal("more");
  const [editModal] = useModal("edit");
  const [memoToast] = useModal("memotoast");
  const obsRef = useRef();

  useEffect(() => {
    obsInit(obsRef);
    setPreventDisableFunc(preventDisable);
  }, []);

  useEffect(() => {
    // 단어 데이터 초기화
    if (update) {
      setUpdateFlag(false);

      const queryParams = {
        current: 0,
        lastId: null,
        memorization,
        wordBookId,
        sort: props.sort,
      };

      const query = Pagination.getQueryParameter(queryParams);

      onClickHandler(null, MODE.READ, wordBookId, query).then((res) => {
        setWordList(res);
        preventDisable();
      });
    }
  }, [update]);

  useEffect(() => {
    if (obsPage > -1 && wordList.page?.hasNext) {
      const queryParams = {
        current: wordList.page.next ?? 0,
        lastId: wordList.page.lastId,
        memorization,
        wordBookId,
        sort: props.sort,
      };

      const query = Pagination.getQueryParameter(queryParams);

      onClickHandler(null, MODE.READ, wordBookId, query).then((res) => {
        addWordList(res);
        preventDisable();
      });
    }
  }, [obsPage]);

  const handleMoreModal = (id, word) => (e) => {
    moreModal(BottomModal, BottomModalSelect, {
      setting: [
        {
          title: "단어장 이동",
          onClick: () => handleFolderClick({wordId: id, wordBookId}),
        },
        {
          title: "수정",
          onClick: () => HandleEditWord({wordId: id, wordBookId}, word),
        },
        {
          title: "삭제",
          onClick: () => handleDeleteWord({wordId: id, wordBookId}),
        },
      ],
    });
  };

  // 단어장 변경
  const handleFolderClick = (wordId) => {
    folderMoveModal(FullModal, VocabookList, {
      clickedFolder: wordBookId,
      afterCompleteFunc: afterMoveFolder,
      props: wordId,
    });
  };

  const afterMoveFolder = (item, updateWordInfo) => {
    const targetWordBookId = item.wordBookId;
    onClickHandler(null, MODE.WORD_FOLDER_UPDATE, { wordId: updateWordInfo.wordId, wordBookId }, {targetWordBookId});
  };

  // 단어 삭제
  const handleDeleteWord = (id) => {
    openModal(CenterModal, Confirm, {
      title: "잠깐만요!",
      content: "정말 삭제하시겠습니까?",
      submit: () => onClickHandler("", MODE.DELETE, id),
    });
  };

  // 단어 수정
  const HandleEditWord = (id, word) => {
    editModal(FullModal, Edit, {
      word,
      isEdit: true,
      wordBookId,
    });
  };

  const onClickHandler = api();
  const memoRef = useRef([]);
  const headsetRef = useRef([]);

  let resultList = [];

  const handleAudioClick = (id) => (e) => {
    const headset = headsetRef?.current[id];
    const sound_path = headset?.dataset?.pronAudio ?? "";
    const audio_data = {
      sound_path: sound_path,
      id: id,
    };
    if (sound_path !== "") {
      onClickHandler(e, MODE.AUDIO_PLAY, audio_data, handleAudioEnd);
      headset.classList.add("on");
    }
  };

  const handleMemoClick = (id, mode, wordId) => (e) => {
    const memo_input = memoRef.current[id];
    let status = memoStatus[id]?.status ?? "FIRST";
    const memo_mode = mode ?? status;

    if (memo_mode === "FIRST" || memo_mode === "OFF") {
      status = "ON";
      memo_input.previous = memo_input.value; //텍스트 저장
      setMemoStatus({ id: id, status: status });
      return;
    }

    if (memo_mode === "ON") {
      status = "OFF";
      setMemoStatus({ id: id, status: status });
      return;
    }

    if (memo_mode === "CANCLE") {
      memo_input.value = memo_input.previous;
      return;
    }

    if (memo_mode === "SAVE") {
      const data = {
        memo: memo_input.value,
      };
      memo_input.previous = memo_input.value; //텍스트 저장
      onClickHandler(e, MODE.UPDATE_MEMO, {wordId, wordBookId}, data);
      memoToast(Toast, null, {
        msg: "저장되었습니다",
      });
      return;
    }
  };

  const setMemoStatus = ({ id, status, memo }) => {
    setMemoStatusState({
      ...memoStatus,
      [id]: {
        status: status,
        memo: memo,
      },
    });
  };

  const handleAudioEnd = (id) => (e) => {
    headsetRef?.current[id]?.classList?.remove("on");
  };

  const handleCheckClick = (idx, wordId, status) => (e) => {
    const current = status === "Y" ? "N" : "Y";
    onClickHandler(e, MODE.MEMORIZATION, {wordBookId, wordId}, {
      memorization: current,
    }).then((res) => {
      if (res) {
        // 완료 후 상태 업데이트
        const result = { ...wordList };
        result.data[idx].memorization = current;
        setWordList(result);
      }
    });
  };

  const dataList = wordList?.data.map((data, idx) => {
    return (
      <div className="word_card" key={data?.wordId}>
        <div className="word_card_top">
          <button
            className={
              data?.memorization === "Y"
                ? "word_card_check on"
                : "word_card_check"
            }
            onClick={handleCheckClick(idx, data?.wordId, data?.memorization)}
          >
            <CheckAni />
          </button>
          <h2 className="word_card_name">{data?.word}</h2>
          <span className="word_card_read">
            {data?.read ?? "" !== "" ? "[" + data?.read + "]" : ""}
          </span>
          <button className="word_card_headset" onClick={handleAudioClick(idx)}>
            <i
              ref={(el) => (headsetRef.current[idx] = el)}
              className="xi-headset listen"
              data-pron-audio={data?.soundPath}
            ></i>
          </button>
          <button
            className="word_card_more"
            onClick={handleMoreModal(data?.wordId, data)}
          >
            <i className="xi-ellipsis-v"></i>
          </button>
        </div>
        {/* 뜻 여러개인 경우 :: 한 개일 경우에도 이 안에 넣으면 됨 */}
        <ul className="word_card_mean">
          {data?.mean?.split(",")?.map((value, idx) => (
            <li key={idx} className="word_card_mean_list">
              {idx + 1}.{value}
            </li>
          ))}
        </ul>
        {/* 품사 영역 */}
        <WordDetailList details={data?.details}></WordDetailList>
        {/* 품사 영역 */}
        {/* 메모 */}
        <div
          className={
            memoStatus[idx]?.status === "ON" ? "memo_area on" : "memo_area"
          }
        >
          <div className="memo_box textarea-box">
            <textarea
              ref={(el) => (memoRef.current[idx] = el)}
              className="memo_text"
              maxLength={3000}
              defaultValue={data?.memo?.replace(/\\n/g, "\n")}
            ></textarea>
          </div>
          <div className="btn_area flex">
            {/* <button className="btn-light sizeS cancle_memo" onClick={handleMemoClick(idx, 'CANCLE')}>취소</button> */}
            <button
              className="btn-fill sizeS save_memo"
              onClick={handleMemoClick(idx, "SAVE", data?.wordId)}
            >
              저장
            </button>
          </div>
        </div>
        {/* 메모 */}
        <div className="word_card_foot">
          <div>
            <span>
              {props.sort === "updated" ? data?.updateTime : data?.createTime}
            </span>
          </div>
          <button
            className={
              memoStatus[idx]?.status === "ON"
                ? "word_card_memo on"
                : "word_card_memo"
            }
          >
            <i className="xi-comment-o" onClick={handleMemoClick(idx)}></i>
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="word_cont">
      {
        // 단어 없을 경우 체크
        dataList.length > 0 ? (
          ""
        ) : (
          <ListEmpty
            title={"단어장이"}
            content={"+ 버튼을 눌러 새 단어를 추가해주세요"}
          />
        )
      }
      {dataList}
      <div ref={obsRef} style={{ height: "100px" }}></div>
    </div>
  );
}

export default WordList;
