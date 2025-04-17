import { useModal, useObserver } from "@/hook/_hooks";
import { useEffect, useRef, useState } from "react";
import api, { MODE } from "@/services/api";
import { Pagination } from "@/util/Pagination";
import FullModal from "../layout/popup/FullModal";
import WordDetailView from "../dailySentence/WordDetailView";

function LearnedList({ quizInfoId, option }) {
  const [obsPage, obsInit, isEnd, preventDisable] = useObserver();
  const obsRef = useRef();
  const onClickHandler = api();
  const [wordViewModal] = useModal("wordView");

  const [wordList, setWordList] = useState({
    page: {
      hasNext: false,
    },
    data: [],
  });

  useEffect(() => {
    obsInit(obsRef);
  }, []);

  // search 옵션이 변경될 때마다 실행
  useEffect(() => {
    const value = option === "correct" ? true : option === "wrong" ? false : "";
    const correctQuery = value !== "" ? `&correct=${value}` : "";
    onClickHandler(null, MODE.QUIZ_STAT_WORD_READ, {
      quizInfoId,
      query: `?current=0${correctQuery}`,
    }).then((res) => {
      setWordList(res);
      preventDisable();
    });
  }, [option]);

  useEffect(() => {
    if (obsPage > -1 && wordList?.page?.hasNext) {
      const queryParams = {
        current: wordList.page.next ?? 0,
      };

      const query = Pagination.getQueryParameter(queryParams);
      const value =
        option === "correct" ? true : option === "wrong" ? false : "";
      const correctQuery = value !== "" ? `&correct=${value}` : "";

      onClickHandler(null, MODE.QUIZ_STAT_WORD_READ, {
        quizInfoId,
        query: query + correctQuery,
      }).then((res) => {
        setWordList((prev) => {
          return {
            data: [...prev.data, ...res.data],
            page: res.page,
          };
        });
        preventDisable();
      });
    }
  }, [obsPage]);

  const handleWordViewModal = ({wordId, wordBookId}) => () => {
    // 연관 단어를 클릭하면 단어의 전체 정보 출력
    onClickHandler(null, MODE.SINGLE_READ, {wordId, wordBookId}).then((res) => {
      wordViewModal(FullModal, WordDetailView, { wordList: res });
    });
  };

  const wordCard = wordList?.data.map((data, i) => {
    return (
      <div
        key={`wordCard${data.quizId}${i}`}
        className={data.correct ? "word_card" : "word_card wrongAnswer"}
        onClick={handleWordViewModal({wordId: data?.wordId, wordBookId: data?.wordBookId})}
      >
        <div className="word_card_top">
          <h2 className="word_card_name">{data?.word}</h2>
          <span className="word_card_read">{data?.read}</span>
        </div>
        <div className="word_card_mean">
          {data?.mean?.split(",")?.map((value, idx) => (
            <div key={idx} className="word_card_mean_list">
              {idx + 1}.{value}
            </div>
          ))}
        </div>
      </div>
    );
  });

  return (
    <div className="quiz_result_word">
      {wordCard}
      <div ref={obsRef} style={{ height: "100px" }}></div>
    </div>
  );
}
export default LearnedList;
