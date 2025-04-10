import { useState } from "react";
import { useModal } from "@/hook/_hooks";
import VocabookList from "@/components/word/folder/VocaBookList";
import FullModal from "@components/layout/popup/FullModal";

const SaveWordBook = () => {
  const [shareModal] = useModal("share");

  const handleShareModal = () => (e) => {
    shareModal(FullModal, VocabookList);
  };
  return (
    <>
      <div>
        <p className="lounge_title-flex">
          원오크락이 너무좋아서 만든 단어장
          <button className="btn-light sizeS" onClick={handleShareModal()}>
            저장하기<i className="xi-angle-right-min"></i>
          </button>
        </p>
        <div className="lounge_cont">
          <div className="word_wrap">
            <div className="word_card">
              <div className="word_card_top">
                <h2 className="word_card_name">단어 이름</h2>
                <span className="word_card_read">[발음]</span>
              </div>

              <ul className="word_card_mean">
                {/* {data?.mean?.split(",")?.map((value, idx) => (
                  <li key={idx} className="word_card_mean_list">
                    {idx + 1}.{value}
                  </li>
                ))} */}
                뜻
              </ul>

              {/* <WordDetailList details={data?.details}></WordDetailList> */}
            </div>
          </div>
        </div>
      </div>
      <div className="lounge_btn-fix">
        <button className="btn-fill sizeL" onClick={handleShareModal()}>
          내 단어장에 저장
        </button>
      </div>
    </>
  );
};

export default SaveWordBook;
