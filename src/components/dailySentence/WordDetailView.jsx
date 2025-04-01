import WordDetailList from "@/components/word/WordDetailList";
import CheckAni from "@/components/word/CheckAni"
import api, { MODE } from "@/services/api";
import { useEffect, useRef, useState } from "react";

function WordDetailView({ wordList, setMemorization }) {
  const headSetRef = useRef(null);
  const onClickHandler = api();

  const [currentWordList, setCurrentWordList] = useState({});
  const meanRef = useRef(null);

  useEffect(() => {
    setCurrentWordList(wordList);
  }, [wordList]);

  const headSetBtnOnClick = (soundPath) => (e) => {
    const audio_data = {
      sound_path: soundPath,
      id: 0,
    };

    headSetRef.current.classList.add("on");
    onClickHandler(null, MODE.AUDIO_PLAY, audio_data, handleAudioEnd);
  };

  const handleAudioEnd = () => (e) => {
    headSetRef.current.classList.remove("on");
  };

  const handleCheckClick = (wordId, status) => (e) => {
    const current = status === "Y" ? "N" : "Y";
    onClickHandler(e, MODE.MEMORIZATION, wordId, {
      memorization: current,
    }).then(() => {
      setCurrentWordList((prev) => {
        return {
          ...prev,
          memorization: current,
        };
      });
      if (setMemorization) {
        setMemorization(wordId, current);
      }
    });
  };

  const handlTextCloseClick = (e) => {
    if (e.target.classList.contains("word_detail_close")) {
      e.target.classList.remove("word_detail_close");
    } else {
      e.target.classList.add("word_detail_close");
    }
  };

  const handlMeanCloseClick = () => {
    if (meanRef.current.classList.contains("word_detail_close")) {
      meanRef.current.classList.remove("word_detail_close");
    } else {
      meanRef.current.classList.add("word_detail_close");
    }
  };

  return (
    <>
      <div className="word_detail_wrap">
        <div className="word_detail_cont">
          <div className="word_detail_top">
            <div className="daily_sentence_view_date">
              {currentWordList?.createTime}
            </div>
            <button
              className={
                currentWordList?.memorization === "Y"
                  ? "word_card_check on"
                  : "word_card_check"
              }
              onClick={handleCheckClick(
                currentWordList?.wordId,
                currentWordList?.memorization
              )}
            >
							<CheckAni />
            </button>
          </div>
          <div className="word_detail">
            {/* 가릴때  word_detail_close 로 변경*/}
            {/* 예시 <div className="word_detail_close"></div> */}
            <div
              className="word_card_name word_detail_name"
              onClick={handlTextCloseClick}
            >
              {currentWordList?.word}
            </div>
            <div className="word_card_read">{currentWordList?.read}</div>
            <button className="word_card_headset word_detail_headset">
              <i
                ref={headSetRef}
                className="xi-headset listen"
                onClick={headSetBtnOnClick(currentWordList?.soundPath)}
              ></i>
            </button>
            {/* 가릴때  word_detail_close 로 변경*/}
            {/* 예시 <div className="word_detail_close"></div> */}
            <div
              ref={meanRef}
              className="word_card_mean word_detail_mean_wrap"
              onClick={handlMeanCloseClick}
            >
              {currentWordList?.mean?.split(",")?.map((value, idx) => (
                <div key={idx} className="word_card_mean_list">
                  {idx + 1}.{value}
                </div>
              ))}
            </div>
            <WordDetailList details={currentWordList?.details}></WordDetailList>
          </div>
        </div>
      </div>
    </>
  );
}
export default WordDetailView;
