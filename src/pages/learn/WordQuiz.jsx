import { useEffect, useRef, useState } from "react";
import HeaderMini from "@/components/layout/HeaderMini";
import LeftFix from "@/components/layout/LeftFix";
import BottomNav from "@/components/layout/BottomNav";
import Quiz from "@/components/learn/quiz/Quiz";
import Result from "@/components/learn/quiz/Result";
import { useLocation, useNavigate } from "react-router-dom";
import api, { MODE } from "@/services/api";
import { useModal } from "@/hook/_hooks";
import Toast from "@/components/layout/popup/Toast";

function WordQuiz(){
	const { state } = useLocation();
	const onClickHandler = api();

	const [quiz, setQuiz] = useState(<></>);
	const [openModal] = useModal();
	const navigate = useNavigate();

	useEffect(() => {
		// state 초기화
		navigate(window.location.pathname, { replace: true, state: null });
		// 퀴즈 생성 api 불러오기
		if (state?.quizType === "create") {
			onClickHandler(null, MODE.QUIZ_CREATE, state?.quizInfoId).then(res => {
				startQuiz(res);
			});
		} else if(state?.quizType === "continue") {
			onClickHandler(null, MODE.QUIZ_WORD_READ, state?.wordBookId).then(res => {
				startQuiz(res);
			});
		} else {
			openModal(Toast, null, {msg: "퀴즈 정보가 올바르지 않아 퀴즈 선택으로 돌아갑니다."}, "toast");
			navigate("/learn", {replace: true});
		}

		state?.quizType === "";
	}, []);

	// 퀴즈 데이터 생성 이후 퀴즈 문제 조회
	const startQuiz = (allWordData) => {
		const result = <Quiz 
										allWordData={allWordData} 
										quizInfoId={state?.quizInfoId} 
										quizCount={state?.count}
										quizType={state?.type}
										isContinue={state?.quizType === "continue"? true : false}>
									</Quiz>
		setQuiz(result);
	}

	return(
		<div className="wrap">
			<HeaderMini title="단어 학습"></HeaderMini>
			<LeftFix></LeftFix>
			<BottomNav active="learn"></BottomNav>
			<div className="word_learn_wrap">
				<div className="word_learn_cont">
					{quiz}
				</div>
			</div>
		</div>
	);
};
export default WordQuiz;