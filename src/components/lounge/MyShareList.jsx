import { useModal, useObserver } from "@/hook/_hooks";
import FullModal from "@components/layout/popup/FullModal";
import SaveWordBook from "@components/lounge/SaveWordBook";
import api, { MODE } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { Pagination } from "@/util/Pagination";
import ListEmpty from "../word/ListEmpty";

const MyShareList = () => {
  const onClickHandler = api();
  const [shareWordBook, setShareWordBook] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    onClickHandler(null, MODE.SHAREROOM_MY_READ).then((res) => {
      setShareWordBook(res);
    });
  }, [])

  useEffect(() => {
    onClickHandler(null, MODE.SHAREROOM_MY_READ).then((res) => {
      setShareWordBook(res);
    });
  }, [update]);

  const shareWordBookDeleteHandle = (id) => () => {
    onClickHandler(null, MODE.SHAREROOM_DELETE, id).then((res) => {
      setUpdate(!update);
    });
  }

  return (
    <>
      {shareWordBook.map((item, idx) =>
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
                <button className="voca_book_list_more" onClick={shareWordBookDeleteHandle(item?.id)}>
                  <i className="xi-close"></i>
                </button>
                {/* 삭제 버튼 */}
              </div>
            </div>
          </li>
        ) : (
            <ListEmpty
              title={"내가 공유한 단어장이"}
              content={"내 단어장을 공유해보세요!"}
            />
        )
      )}
      <li style={{ height: "100px" }}></li>
    </>
  );
};

export default MyShareList;
