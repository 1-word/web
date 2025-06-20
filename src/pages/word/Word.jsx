import React, { useRef, useState } from "react";
import WordList from "@components/word/WordList";
import Store, { MEMORIZATION_TYPE } from "@/store/store";
import api, { MODE } from "@/services/api";

import Layout from "@/components/layout/Layout";
import HeaderMini from "@/components/layout/HeaderMini";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import LeftFix from "@/components/layout/LeftFix";
import wordListStore from "@/store/wordListStore";
import { Pagination } from "@/util/Pagination";
import { useParams } from "react-router-dom";

function Word() {
  // Store 사용
  const { memorization, setMemorization } = Store((state) => state);
  const { wordBookId } = useParams();
  const {
    setWordList,
    savePreviousWordList,
    wordListRestore,
    preventDisableFunc,
    updateStart,
  } = wordListStore((state) => state);

  const [sort, setSort] = useState("created");

  const pageRef = useRef({
    current: 0,
    lastId: null,
  });

  const onClickHandler = api();
  const searchInput = useRef();
  const isSearchingRef = useRef(false);
  const previousSearchText = useRef("");

  const handleSearchWord = (e) => {
    const isSearching = isSearchingRef.current;
    let page = pageRef.current;

    if (!isSearching) {
      // 검색하기 이전의 단어 데이터들을 저장한다.
      savePreviousWordList();
      page = {
        current: 0,
        lastId: null,
        wordBookId,
      };
      setPage(page);
    }

    isSearchingRef.current = true;
    const searchText = searchInput.current.value.replaceAll("?", "") || "";

    // 검색 완료
    if (searchText === "") {
      // 이전에 검색한 단어들을 다시 복원한다.
      // 서버 api를 다시 호출하지 않게 하기 위함
      wordListRestore();
      setPage(null);
      isSearchingRef.current = false;
      preventDisableFunc();
      return;
    }

    // 이전에 검색한 단어가 아니면 page를 초기화
    if (searchText !== previousSearchText) {
      page = {
        current: 0,
        lastId: null,
      };
      setPage(page);
    }

    const queryParams = {
      current: page.current ?? 0,
      lastId: page.lastId,
      memorization,
      wordBookId,
      sort: sort,
    };

    const query = Pagination.getQueryParameter(queryParams);

    onClickHandler(null, MODE.SEARCH, wordBookId, searchText + query).then((res) => {
      setWordList(res);
      setPage(res.page);
      previousSearchText.current = searchText;
    });
  };

  const setPage = (page) => {
    pageRef.current = page;
  };

  const handleMemorizeClick = (status) => (e) => {
    setMemorization(status);

    const queryParams = {
      current: 0,
      memorization: status,
      wordBookId,
      sort: sort,
    };

    const query = Pagination.getQueryParameter(queryParams);

    onClickHandler(null, MODE.READ, query).then((res) => {
      setWordList(res);
      preventDisableFunc();
    });
  };

  const sortOnClick = (type) => () => {
    setSort(type);
    updateStart();
  };

  return (
    <Layout title="단어장" active="word">
      <div className="search_wrap">
        <div className="search_cont">
          <input
            ref={searchInput}
            onChange={handleSearchWord}
            type="text"
            className="s_text"
            placeholder="검색어를 입력해 주세요"
          />
          <button className="search_icon" onClick={handleSearchWord}>
            <i className="xi-search"></i>
          </button>
        </div>
      </div>

      <div className="word_tab_wrap">
        {/* 암기탭 */}
        <ul className="word_tab flex">
          <li
            className={memorization === MEMORIZATION_TYPE.ALL ? "active" : ""}
            onClick={handleMemorizeClick(MEMORIZATION_TYPE.ALL)}
          >
            전체
          </li>
          <li
            className={
              memorization === MEMORIZATION_TYPE.MEMORIZATION_PERIOD
                ? "active"
                : ""
            }
            onClick={handleMemorizeClick(MEMORIZATION_TYPE.MEMORIZATION_PERIOD)}
          >
            미암기
          </li>
          <li
            className={
              memorization === MEMORIZATION_TYPE.MEMORIZATION ? "active" : ""
            }
            onClick={handleMemorizeClick(MEMORIZATION_TYPE.MEMORIZATION)}
          >
            암기
          </li>
        </ul>
        {/* 조회 순서 */}
        <ul className="word_tab_view flex">
          <li
            className={sort === "created" ? "active" : ""}
            onClick={sortOnClick("created")}
          >
            등록순
          </li>
          <li
            className={sort === "updated" ? "active" : ""}
            onClick={sortOnClick("updated")}
          >
            업데이트순
          </li>
        </ul>
      </div>

      {/* 단어 리스트 */}
      <div className="word_wrap">
        <WordList memorization={memorization} sort={sort}></WordList>
      </div>
    </Layout>
  );
}

export default Word;
