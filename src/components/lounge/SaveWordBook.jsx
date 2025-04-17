import { useEffect, useState, useRef } from "react";
import { useModal, useObserver } from "@/hook/_hooks";
import VocabookList from "@/components/word/folder/VocaBookList";
import FullModal from "@components/layout/popup/FullModal";
import api, { MODE } from "@/services/api";
import { Pagination } from "@/util/Pagination";
import WordDetailList from "../word/WordDetailList";

const SaveWordBook = ({
  wordBook,
  deleteModalAfterTime,
}) => {
  const onClickHandler = api();
  const [shareModal] = useModal("share");
  const obsRef = useRef();
  const [obsPage, obsInit, isEnd, preventDisable] = useObserver();
  const [wordList, setWordList] = useState({ page: {}, data: [] });

  useEffect(() => {
    obsInit(obsRef);
    onClickHandler(null, MODE.READ, wordBook.wordBookId, '').then((res) => {
      setWordList(res);
      preventDisable();
    });
  }, []);

  useEffect(() => {
    if (obsPage > -1 && wordList.page?.hasNext) {
      const queryParams = {
        current: wordList.page.next ?? 0,
        limit: 30,
        lastId: wordList.page.lastId,
      };

      const query = Pagination.getQueryParameter(queryParams);

      onClickHandler(null, MODE.READ, wordBook.wordBookId, query).then((res) => {
        setWordList((prev) => {
          return {
            page: res.page,
            data: [...prev.data, ...res.data],
          };
        });
        preventDisable();
      });
    }
  }, [obsPage]);

  const handleShareModal = () => (e) => {
    shareModal(FullModal, VocabookList, {
      afterCompleteFunc
    });
  }

  const afterCompleteFunc = (item) => {
    const wordBookId = item.wordBookId;

  }

  return (
    <>
      <div>
        <p className="lounge_title-flex">
          {wordBook.name}
          <button className="btn-light sizeS" onClick={handleShareModal()}>
            저장하기<i className="xi-angle-right-min"></i>
          </button>
        </p>
        <div className="lounge_cont">
          {
            wordList.data.map((data, idx) => 
            <div key={`loungesave${idx}`} className="word_wrap">
              <div className="word_card">
                <div className="word_card_top">
                  <h2 className="word_card_name">{data.word}</h2>
                  <span className="word_card_read">[{data.read}]</span>
                </div>
                <ul className="word_card_mean">
                  {data?.mean?.split(",")?.map((value, idx) => (
                    <li key={`loungesavemean${idx}`} className="word_card_mean_list">
                      {idx + 1}.{value}
                    </li>
                  ))}
                  뜻
                </ul>
                <WordDetailList details={data?.details}></WordDetailList>
              </div>
            </div>
          )}
        </div>
      </div>
      <div ref={obsRef} style={{ height: "100px" }}></div>
      <div className="lounge_btn-fix">
        <button className="btn-fill sizeL" onClick={handleShareModal()}>
          내 단어장에 저장
        </button>
      </div>
    </>
  );
};

export default SaveWordBook;
