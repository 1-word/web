import React, { useEffect, useState } from "react";
import api, { MODE } from "@/services/api";
import wordListStore from "@/store/wordListStore";
import { useModal } from "@/hook/_hooks";
import AddVocaBook from "@/components/word/folder/AddVocaBook";
import FullModal from "@components/layout/popup/FullModal";
import BottomModalSelect from "@components/layout/popup/BottomModalSelect";
import BottomModal from "@components/layout/popup/BottomModal";
import WordBookPermission from "@components/lounge/WordBookPermission";
import { useNavigate } from "react-router-dom";
import authStore from "@/store/authStore";
import ListEmpty from "../ListEmpty";

function ShareBookList({
  clickedFolder,
  afterCompleteFunc,
  deleteModalAfterTime,
  props,
}) {
  const [folderList, setFolderList] = useState([{ id: -1 }]);
  const [addFolderModal] = useModal("addFolder");
  const { updateStart } = wordListStore((state) => state);
  const { setStoreFolderList } = authStore((state) => state);
  const navigate = useNavigate();

  const onClickHandler = api();

  const [permissionModal] = useModal("wordbookPermission");
  const [moreModal] = useModal("more");

  const handlePermissionModal = () => (e) => {
    permissionModal(FullModal, WordBookPermission);
  };

  const handleMoreModal = (item) => (e) => {
    moreModal(BottomModal, BottomModalSelect, {
      setting: [
        {
          title: "수정",
          onClick: onEditClick(item),
        },
        {
          title: "멤버 설정",
          onClick: handlePermissionModal(),
        },
      ],
    });
    e.stopPropagation();
  };

  useEffect(() => {
    onClickHandler(null, MODE.FOLDER_READ).then((res) => {
      setFolderList(res);
    });
  }, []);

  const onEditClick = (folder) => (e) => {
    addFolderModal(FullModal, AddVocaBook, {
      setFolderList,
      prevFolder: folder,
    });
  };

  const onFolderClick = (item) => (e) => {
    const id = item.wordBookId;
    e.preventDefault();

    // 단어장으로 이동하기
    if (!afterCompleteFunc) {
      navigate(`/word/${id}`);
      updateStart();
      setStoreFolderList(item);
      if (deleteModalAfterTime) {
        deleteModalAfterTime(0);
      }
      return;
    }

    // 클릭된 폴더 데이터 넘겨주기
    afterCompleteFunc(item, props);
    deleteModalAfterTime(0);
  };

  return (
    <div className="voca_book_wrap">
      <div className="voca_book_cont">
        <div className="voca_book_top flex"></div>
        {
          // 단어장 없을 경우 체크
          folderList.length > 0 ? (
            ""
          ) : (
            <ListEmpty
              title={"단어장이"}
              content={"라운지에서 새 단어장을 추가해주세요"}
            />
          )
        }
        <ul className="voca_book_lists flex">
          {folderList?.map((item) => (
            // 현재 단어장 위치
            <li
              className={
                clickedFolder === item?.wordBookId + ""
                  ? "voca_book_list on"
                  : "voca_book_list off"
              }
              key={`folders${item?.wordBookId}`}
              onClick={onFolderClick(item)}
            >
              <div className="voca_book_list_top">
                <div
                  className="voca_book_list_dot"
                  style={{ backgroundColor: item?.background || "#946CF4" }}
                ></div>
                <p className="voca_book_list_name">{item?.name}</p>
                <button
                  className="voca_book_list_more"
                  onClick={handleMoreModal()}
                >
                  <i className="xi-ellipsis-v"></i>
                </button>
              </div>
              <div className="voca_book_list_sub">
                oo님의 단어장 / {item?.totalCount}개
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ShareBookList;
