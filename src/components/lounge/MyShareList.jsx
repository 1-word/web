import { useModal, useObserver } from "@/hook/_hooks";
import FullModal from "@components/layout/popup/FullModal";
import SaveWordBook from "@components/lounge/SaveWordBook";
import api, { MODE } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { Pagination } from "@/util/Pagination";
import ListEmpty from "../word/ListEmpty";

const MyShareList = ({ update }) => {
  const onClickHandler = api();
  const [obsPage, obsInit, isEnd, preventDisable] = useObserver();
  const [shareWordBook, setShareWordBook] = useState({ page: {}, data: [] });
  const obsRef = useRef();

  useEffect(() => {
    obsInit(obsRef);
    console.log(shareWordBook.length);
  }, []);

  useEffect(() => {
    onClickHandler(null, MODE.SHAREROOM_READ, "").then((res) => {
      setShareWordBook(res);
      preventDisable();
    });
  }, [update]);

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
      {shareWordBook?.data.map((item, idx) =>
        // 단어장 없을 경우 체크
        idx >= 0 ? (
          <li key={`shareWordBook${item?.id}`}>
            <div>
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
                {/* 삭제 버튼 */}
                <button className="voca_book_list_more" onClick={() => {}}>
                  <i className="xi-close"></i>
                </button>
                {/* 삭제 버튼 */}
              </div>
              <p className="lounge_list-title-sub">
                총 단어 : {item?.totalCount}개
              </p>
            </div>
          </li>
        ) : (
            <ListEmpty
              title={"내가 공유한 단어장이"}
              content={"내 단어장을 공유해보세요!"}
            />
        )
      )}
      <li ref={obsRef} style={{ height: "100px" }}></li>
    </>
  );
};

export default MyShareList;
