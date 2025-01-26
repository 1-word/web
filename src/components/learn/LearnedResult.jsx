import api, { MODE } from "@/services/api";
import { useEffect, useState } from "react";

function LearnedResult(){
	const onClickHandler = api();

	const [quizResult, setQuizResult] = useState([]);

	useEffect(() => {
		onClickHandler(null, MODE.QUIZ_STAT_LIST_READ, '').then(res => {
			const result = createResultGroup(res).sort((a, b) => new Date(b.time) - new Date(a.time));
			setQuizResult(result);			
		})
	}, []);

	// 날짜별 그룹 생성 
	const createResultGroup = (resultData) => {
		return resultData.reduce((acc, v) => {
			const createTime = v.createTime.split(' ')[0];

			// 그룹 생성
			let group = acc.find(g => g.time === createTime);
	
			if (!group) {
					group = {
							time: createTime,
							items: []
					}
					acc.push(group);
			}
	
			group.items.push(v);
			return acc;
		}, []);
	}

	const resultItems = (items) => {
		return items.map((v, i) => 
				<li key={`ritems${i}`} className="word_learn_result_list">
						<div>
							<p className="word_learn_result_time">{v.createTime?.split(' ')[1]}</p>
							<p className="word_learn_result_method">단어 퀴즈</p>
						</div>
						<div>
							{/* 51 넘으면 over class 부여 */}
							<div className="word_learn_result_persent over">{Math.floor(v.correctCount / v.totalCount * 100)}</div>
							<div className="word_learn_result_score">{`${v.correctCount}/${v.totalCount}`}</div>
						</div>
				</li>
		)
	}

	const learnedResult = quizResult?.map((v, i) => {
		return <div key={`result${i}`}>
						<p className="word_learn_title">{`${v.time}의 학습 결과에요`}</p>
							<ul className="word_learn_result_lists">
								{resultItems(v.items)}
							</ul>
					</div>
	})

	return(
		<>
			{learnedResult}
		</>
	);
};

export default LearnedResult;