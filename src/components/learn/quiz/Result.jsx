import { useEffect, useState } from "react";
import LearnedList from "../LearnedList";

function Result(){
	const [persentState,setPersentState] = useState({
		score: 0,
		aniVal: "",
		aniLength: 0,
	});
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
	useEffect(()=>{
		updateAniVal(50);
	},[])
	return(
		<>
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
							{persentState.score}
						</div>
					</div>
					<div>
						정답 <span className="quiz_result_count">0</span>
					</div>
					<div>
						오답 <span className="quiz_result_count">0</span>
					</div>
				</div>
				<div className="quiz_result_bottom">
					<p className="quiz_result_bottom_title">학습한 단어 목록이에요</p>
					<LearnedList></LearnedList>
				</div>
			</div>
		</>
	);
};
export default Result;