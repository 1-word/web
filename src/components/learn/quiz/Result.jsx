import { useEffect, useState } from "react";
import LearnedList from "../LearnedList";
import { useLocation } from "react-router-dom";
import api, { MODE } from "@/services/api";
import BottomNav from "@/components/layout/BottomNav";
import HeaderMini from "@/components/layout/HeaderMini";
import LeftFix from "@/components/layout/LeftFix";

// TODO 페이지로 변경
function Result(){
	const {state} = useLocation();
	const onClickHandler = api();

	const [quizInfoId, setQuizInfoId] = useState(0);

	const [persentState,setPersentState] = useState({
		score: 0,
		aniVal: "",
		aniLength: 0,
	});

	/**
	 * 원 그래프 그리기
	 * @param {int} newScore 퍼센트
	 */
	const updateAniVal = (newScore) => {
		const maxAniVal = document.querySelector('.vocabox-persent path').getTotalLength();
		const percentage = 1 - newScore / 100;
		const calculatedAniVal = maxAniVal * percentage;
	
		setPersentState({
			score: newScore,
			aniVal: `${maxAniVal};${calculatedAniVal}`,
			aniLength: maxAniVal
		});
	};

	useEffect(() => {
		const result = state?.result;
		setQuizInfoId(state.quizInfoId);

		if (result) {
			const percent = Math.floor(result.correctCount / result.totalCount * 100);
			updateAniVal(percent);
			return;
		}

		if (state?.quizInfoId) {
			onClickHandler(null, MODE.QUIZ_STAT_READ).then(res => {
				calcPercent(res);
			});
		}


	}, []);

	const calcPercent = (result) => {
		const percent = Math.floor(result.correctCount / result.totalCount * 100);
		updateAniVal(percent);
	}

	return(
		<div className="wrap">
			<HeaderMini title="단어 학습"></HeaderMini>
			<LeftFix></LeftFix>
			<BottomNav active="learn"></BottomNav>
			<div className="word_learn_wrap">
				<div className="word_learn_cont">
					<h2 className="word_quiz_title">축하해요! 모든 단어를 학습했어요!</h2>
					<div className="quiz_wrap">
						<div className="quiz_result_top">
							<div className="quiz_result_ani">
								<div>
									<svg className="vocabox-persent" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="none" stroke="#946CF4" strokeDasharray={persentState.aniLength} strokeDashoffset={persentState.aniLength} strokeLinejoin="round" strokeWidth="3" d="M3 12c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9Z">
										<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values={persentState.aniVal}/></path>
									</svg>
								</div>
								<div className={persentState.score > 50? "quiz_result_persent over": "quiz_result_persent"}>
									{persentState.score}%
								</div>
							</div>
							<div>
								전체 <span className="quiz_result_count">{state?.result.totalCount ?? 0}</span>
							</div>
							<div>
								정답 <span className="quiz_result_count">{state?.result.correctCount ?? 0}</span>
							</div>
							<div>
								오답 <span className="quiz_result_count">{state?.result.wrongCount ?? 0}</span>
							</div>
						</div>
						<div className="quiz_result_bottom">
							<div className="quiz_result_bottom_title">
								<p>학습한 단어 목록이에요</p>
								<ul className="word_tab flex">
									<li>전체</li>
									<li>정답</li>
									<li>오답</li>
								</ul>
							</div>
							<LearnedList quizInfoId={quizInfoId}></LearnedList>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Result;