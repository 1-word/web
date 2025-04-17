import Layout from "@/components/layout/Layout";

import React, { useEffect, useRef, useState } from "react";
import { useModal } from "@/hook/_hooks";
import BottomModal from "@/components/layout/popup/BottomModal";
import BottomModalSelect from "@/components/layout/popup/BottomModalSelect";
import FullModal from "@/components/layout/popup/FullModal";
import AddDailySentence from "@/components/dailySentence/AddDailySentence";
import DailySentenceView from "@/components/dailySentence/DailySentenceView";
import { Pagination } from "@/util/Pagination";
import api, { MODE } from "@/services/api";

function DailySentence() {
  const [readTypeModal] = useModal("readType");
  const [addDailySentenceModal] = useModal("addDailySentence");
  const [dailySentenceViewModal] = useModal("dailySentenceView");
  const [update, setUpdate] = useState(false);
  const [dailySentenceList, setDailySentenceList] = useState([]);

  const dailySentenceDays = useRef([]);

  const onClickHandler = api();

  const handleReadTypeModal = () => (e) => {
    readTypeModal(BottomModal, BottomModalSelect, {
      setting: [
        {
          title: "연도",
          onClick: () => {},
        },
        {
          title: "월",
          onClick: () => {},
        },
        {
          title: "주간",
          onClick: () => {},
        },
      ],
    });
  };

  const handleAddModal = () => (e) => {
    addDailySentenceModal(FullModal, AddDailySentence, {
      setUpdate,
    });
  };

  const handleViewModal = (sentence, idx) => (e) => {
    dailySentenceViewModal(FullModal, DailySentenceView, {
      idx,
      dailySentenceList,
      setDailySentenceList,
      setUpdate,
    });
  };

  // calendar
  const [date, setDate] = useState({
    year: "",
    month: "",
    week: "",
    day: 1,
  });

  useEffect(() => {
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;

    setSentenceDays({ year, month });
  }, []);

  useEffect(() => {
    let nowDate;
    // 처음 달력 초기화
    if (date.year === "") {
      nowDate = new Date();
    } else {
      // 달력 변경 시 세팅
      nowDate = new Date(date.year, date.month - 1, date.day ?? 1);
    }
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth();
    // const month = 1;
    const realMonth = parseInt(month) + 1;
    const week = new Date(year, month).getDay();
    const day = nowDate.getDate();

    //1월부터 12월까지 마지막 일을 배열로 저장
    let last = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //윤년 계산
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      last[1] = 29;
    }

    //현재 월의 마지막 일 정보
    const lastDate = last[month];

    setDate({
      year,
      month: realMonth,
      week,
      lastDate,
      day,
    });

    const queryParams = [
      {
        name: "year",
        value: year ?? null,
      },
      {
        name: "month",
        value: realMonth ?? null,
      },
      {
        name: "day",
        value: day ?? null,
      },
    ];

    getSentenceList(queryParams);
  }, [update]);

  const getSentenceList = (queryParams) => {
    const query = Pagination.getPageParameter(queryParams);

    onClickHandler(null, MODE.DAILY_SENTENCE_READ, query).then((res) => {
      setDailySentenceList(res);
    });
  };

  const setSentenceDays = ({ year, month }) => {
    // month 변경으로 저장한 문장이 있는 날 표시를 위해 날짜 리스트를 받아온다.
    onClickHandler(null, MODE.DAILY_SENTENCE_DAYS_READ, {
      year,
      month,
    }).then((res) => {
      dailySentenceDays.current = res;
    });
  };

  const changeLeftMonth = (e) => {
    changeMonth(-1);
  };

  const changeRightMonth = (e) => {
    changeMonth(+1);
  };

  // 월 변경
  const changeMonth = (flag) => {
    let month = (date.month + flag) % 12 === 0 ? 12 : (date.month + flag) % 12;
    let year = date.year;

    // 다음 년도
    if (date.month === 12 && month === 1) {
      year = date.year += 1;
    }

    // 이전 년도
    if (date.month === 1 && month === 12) {
      year = date.year -= 1;
    }

    setDate({
      ...date,
      month,
      year,
      day: 1,
    });

    setSentenceDays({
      year,
      month,
    });

    setTimeout(() => {
      setUpdate(!update);
    }, 50);
  };

  // 달력 그려주기
  const calcCalendar = Array.from(
    { length: date.lastDate + date?.week },
    (v, i) => i + 1
  ).map((v, i) => {
    const today = new Date();

    const calenderDay = i >= date?.week ? v - date?.week : "";
    let className = "";

    // 오늘 날짜 계산
    if (
      today.getFullYear() === date.year &&
      today.getMonth() + 1 === date.month &&
      today.getDate() === calenderDay
    ) {
      className += "today";
    }

    // 선택한 날짜
    if (calenderDay === date.day) {
      className += " active";
    }

    const days = dailySentenceDays.current;

    days.forEach((val) => {
      if (val === calenderDay) {
        className += " dot";
      }
    });

    return (
      <React.Fragment key={`$calendar${i}`}>
        <li className={className}>{calenderDay}</li>
      </React.Fragment>
    );
  });

  // 날짜 클릭했을 때
  const onCalendarClick = (e) => {
    const day = e.target.textContent;
    if (day < 32 && day !== "") {
      setDate((prev) => {
        return {
          ...prev,
          day: parseInt(day),
        };
      });

      const queryParams = [
        {
          name: "year",
          value: date.year ?? null,
        },
        {
          name: "month",
          value: date.realMonth ?? null,
        },
        {
          name: "day",
          value: day ?? null,
        },
      ];

      getSentenceList(queryParams);
    }
  };

  const dailySentenceComp = dailySentenceList.map((val, idx) => {
    return (
      <React.Fragment key={`dailySentenceList${idx}`}>
        <li onClick={handleViewModal(val, idx)}>
          <div className="daily_sentence_mylist_mysentence">
            <p className="daily_sentence_mylist_date">
              {val.year}-{String(val.month).padStart(2, "0")}-
              {String(val.day).padStart(2, "0")}
            </p>
            <p>{val.sentence}</p>
            <p className="daily_sentence_mylist_mysentence_mean">{val.mean}</p>
          </div>
        </li>
      </React.Fragment>
    );
  });

  return (
    <Layout title="오늘의 내 문장" active="dailySentence">
      <div className="daily_sentence_wrap">
        <div className="daily_sentence_cont">
          <div className="daily_sentence_callendar_wrap">
            <div className="daily_sentence_callendar_head">
              <button
                name="left"
                className="daily_sentence_callendar_head_btn"
                onClick={changeLeftMonth}
              >
                <i className="xi-angle-left"></i>
              </button>
              <div>
                {date.year}.{String(date.month).padStart(2, "0")}
              </div>
              <button
                name="right"
                className="daily_sentence_callendar_head_btn"
              >
                <i className="xi-angle-right" onClick={changeRightMonth}></i>
              </button>
              {/* 미구현 임시 none처리 */}
              <button
                className="btn-light sizeS daily_sentence_read_type_btn disN"
                onClick={handleReadTypeModal()}
              >
                보기
              </button>
              <button
                className="daily_sentence_callendar_head_btn daily_sentence_plus_btn"
                onClick={handleAddModal()}
              >
                <i className="xi-plus"></i>
              </button>
            </div>
            {/* 달력 클래스
								today : 오늘
								dot : 저장한 문장이 있는 날 표시
								active : 해당 날짜 누르면 표시
								none : 숫자 달력 넘어갔을 경우 회색 처리
								today / dot / active는 서로 중복될 수 있다
								다만 toady가 더 명시성이 높게 처리됨
						*/}
            <div className="daily_sentence_callendar_area">
              <ul className="daily_sentence_callendar_grid daily_sentence_callendar_grid_top">
                <li>일</li>
                <li>월</li>
                <li>화</li>
                <li>수</li>
                <li>목</li>
                <li>금</li>
                <li>토</li>
              </ul>
              <ul
                className="daily_sentence_callendar_grid"
                onClick={onCalendarClick}
              >
                {calcCalendar}
              </ul>
            </div>
          </div>
        </div>
        <div className="daily_sentence_mylist_wrap">
          <div className="daily_sentence_mylist_scroll">
            <ul className="daily_sentence_mylist_lists">
              {dailySentenceComp}
              {/* li 반복 */}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default DailySentence;
