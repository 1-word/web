import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import HeaderMini from "@/components/layout/HeaderMini";
import LeftFix from "@/components/layout/LeftFix";
import BottomNav from "@/components/layout/BottomNav";
import QuizImg from "@/assets/images/quiz.svg";
import FlashImg from "@/assets/images/flash.svg";
import { useModal } from "@/hook/_hooks";
import FullModal from "@/components/layout/popup/FullModal";
import BeforeLearn from "@/components/learn/BeforeLearn";
import api, { MODE } from "@/services/api";
import LearnedResult from "@/components/learn/LearnedResult";
import { useNavigate } from "react-router-dom";
import CenterModal from "@/components/layout/popup/CenterModal";
import CenterModalConfirm from "@/components/layout/popup/CenterModalConfirm";

function Learn() {
  const onClickHandler = api();
  const [beforeLearnModal] = useModal("beforeLearnModal");
  const [continueQuizPop] = useModal("continueQuizPop");
  const [inCompleteQuiz, setInCompleteQuiz] = useState({});
  const navigate = useNavigate();

  // 퀴즈 이어하기 데이터 조회
  useEffect(() => {
    // 퀴즈 저장 이후 바로 조회 시 count 갱신이 안되는 문제가 있어 시간 조정
    setTimeout(() => {
      onClickHandler(null, MODE.INCOMPLETE_QUIZ_READ).then((res) => {
        if (res?.wordBookId !== null) {
          setInCompleteQuiz(res);
        }
      });
    }, 100);
  }, []);

  const handleContinueQuiz = () => {
    navigate("/quiz", {
      state: {
        ...inCompleteQuiz,
        quizType: "continue",
      },
    });
  };

  const handleModalMemorize = (e) => (e) => {
    beforeLearnModal(FullModal, BeforeLearn, {
      learnType: "memorize",
    });
  };

  const handleModalResult = () => (e) => {
    beforeLearnModal(FullModal, LearnedResult);
  };

  const handleModalQuiz = () => {
    beforeLearnModal(FullModal, BeforeLearn, {
      learnType: "quiz",
    });
  };

  // 이어하기 퀴즈 팝업 추가
  const handleContinueQuizPop = () => {
    continueQuizPop(CenterModal, CenterModalConfirm, {
      title: "잠깐만요!",
      content:
        "퀴즈 이어하기 데이터가 남아 있어요. 이전 데이터가 사라져도 괜찮다면 확인을 눌러주세요.",
      onClick: () => {
        onClickHandler(null, MODE.QUIZ_DELETE, inCompleteQuiz.quizInfoId).then(
          (res) => {
            setInCompleteQuiz({});
            handleModalQuiz();
          }
        );
      },
    });
  };

  return (
    <Layout title="단어 학습" active="learn">
      <div className="word_learn_wrap">
        <div className="word_learn_cont">
          <h2 className="word_learn_title">학습 방법을 선택해주세요</h2>
          <ul className="method_choose_lists">
            {/* 이어하기 데이터가 있을경우에만 나타남 
							첫 번째로 옮김*/}
            {inCompleteQuiz?.quizInfoId && (
              <li
                className="method_choose_list_incomp"
                onClick={handleContinueQuiz}
              >
                <h3 className="method_choose_sub_title">퀴즈 이어하기</h3>
                <p className="method_choose_contents">
                  중단한 퀴즈를 이어할 수 있어요
                </p>
              </li>
            )}
            {/* 이어하기 데이터가 있을경우에만 나타남 */}
            <li
              className="method_choose_list"
              onClick={
                inCompleteQuiz?.quizInfoId
                  ? handleContinueQuizPop
                  : handleModalQuiz
              }
            >
              <div className="method_choose_img">
                <img src={QuizImg} alt="퀴즈" />
              </div>
              <h3 className="method_choose_title">단어 퀴즈</h3>
              <p className="method_choose_sub_title">퀴즈 형식</p>
              <p className="method_choose_contents">
                사지선다로 퀴즈를 낼거에요
              </p>
            </li>
            <li className="method_choose_list" onClick={handleModalMemorize()}>
              <div className="method_choose_img">
                <img src={FlashImg} alt="플래시" />
              </div>
              <h3 className="method_choose_title">플래시 카드</h3>
              <p className="method_choose_sub_title">타이머 형식</p>
              <p className="method_choose_contents">
                카드를 넘겨가며 반복 학습해요
              </p>
            </li>
            <li className="method_choose_list" onClick={handleModalResult()}>
              <h3 className="method_choose_title">결과 보기</h3>
              <p className="method_choose_contents">
                오늘 학습한 단어는 어땠나요?
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default Learn;
