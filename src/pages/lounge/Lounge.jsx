import { useState } from "react";
import Layout from "@/components/layout/Layout";
import EveryList from "@/components/lounge/EveryList";
import BestList from "@/components/lounge/BestList";
import { useModal } from "@/hook/_hooks";
import VocabookList from "@/components/word/folder/VocaBookList";
import FullModal from "@components/layout/popup/FullModal";
import api, { MODE } from "@/services/api";

const Lounge = () => {
  const [shareModal] = useModal("share");
  const [update, setUpdate] = useState(false);
  const onClickHandler = api();

  const handleShareModal = () => (e) => {
    shareModal(FullModal, VocabookList, {
      afterCompleteFunc: wordBookModalCallBack
    });
  }

  const wordBookModalCallBack = async (item) => {
    const wordBookId = item.wordBookId;
    await onClickHandler(null, MODE.SHAREROOM_CREATE, wordBookId);
    setUpdate(!update);
  }

  return (
    <Layout title="라운지" active="lounge">
      <div className="lounge_wrap">
        <div className="lounge_cont">
          <div className="voca_book_top flex">
            <button className="btn-fill sizeS" onClick={handleShareModal()}>
              내 단어장 공유하기
              <i className="xi-angle-right-min"></i>
            </button>
          </div>
          {/* 현재 미구현 기능 */}
          {/* <section className="lounge_sect">
            <h2 className="lounge_title">실시간 베스트 👍</h2>
            <ul>
              <BestList />
            </ul>
          </section> */}
          <section className="lounge_sect">
            <h2 className="lounge_title">모두의 단어장</h2>
            <ul>
              <EveryList update={update}/>
            </ul>
          </section>
          <h2 className="lounge_title-center">
            내 단어장을 모두에게 공유해보세요
          </h2>
          <div className="lounge_btn">
            <button className="btn-fill sizeL" onClick={handleShareModal()}>
              단어장 공유하기
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Lounge;
