import { useModal, useObserver } from "@/hook/_hooks";
import FullModal from "@components/layout/popup/FullModal";
import SaveWordBook from "@components/lounge/SaveWordBook";
import api, { MODE } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { Pagination } from "@/util/Pagination";

const EveryList = () => {
  const onClickHandler = api();
  const [obsPage, obsInit, isEnd, preventDisable] = useObserver();
  const [SaveWordBookModal] = useModal("saveWordBook");
  const [shareWordBook, setShareWordBook] = useState({ page: {}, data: [] });
  const handleSaveWordBookModal = () => (e) => {
    SaveWordBookModal(FullModal, SaveWordBook);
  };
  const obsRef = useRef();

  useEffect(() => {
    obsInit(obsRef);
    onClickHandler(null, MODE.SHAREROOM_READ, "").then((res) => {
      setShareWordBook(res);
      preventDisable();
    });
  }, []);

  useEffect(() => {
    if (obsPage > -1 && shareWordBook.page?.hasNext) {
      const queryParams = {
        current: shareWordBook.page.next ?? 0,
        limit: 30,
        lastId: shareWordBook.page.lastId,
      };

      const query = Pagination.getQueryParameter(queryParams);

      onClickHandler(null, MODE.SHAREROOM_READ, query).then((res) => {
        setShareWordBook((prev) => {
          return {
            page: res.page,
            data: [...prev.data, ...res.data],
          };
        });
        preventDisable();
      });
    }
  }, [obsPage]);

  return (
    <>
      {shareWordBook?.data.map((item, idx) => (
        <li key={`shareWordBook${item?.id}`}>
          <div onClick={handleSaveWordBookModal()}>
            {/* 단어장 색깔 넣어주기 */}
            <div className="lounge_list-title">
              <div
                className="lounge_list-title-dot"
                style={{
                  backgroundColor: item?.background || "#946CF4",
                  border:
                    item?.background === "#fff" ? "1px solid #666666" : "",
                }}
              ></div>

              <p>{item?.name}</p>
            </div>
            <p className="lounge_list-title-sub">
              {item?.nickname} 님의 단어장
            </p>
            <p className="lounge_list-title-sub">
              총 단어 : {item?.totalCount}개
            </p>
          </div>
        </li>
      ))}
      <div ref={obsRef} style={{ height: "100px" }}></div>
    </>
  );
};

export default EveryList;
