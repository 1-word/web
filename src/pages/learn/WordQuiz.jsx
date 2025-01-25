import { useEffect, useState } from "react";
import HeaderMini from "@/components/layout/HeaderMini";
import LeftFix from "@/components/layout/LeftFix";
import BottomNav from "@/components/layout/BottomNav";
import Quiz from "@/components/learn/quiz/Quiz";
import Result from "@/components/learn/quiz/Result";
import { useLocation } from "react-router-dom";

function WordQuiz(){

	const { state } = useLocation();
	console.log(state);

	useEffect(() => {
		console.log(quizInfo);
		// 퀴즈 생성 api 불러오기
		
	}, []);

	const [next, nextState] = useState(
		{
			quiz : false,
			result : false
		}
	);

	const handleQuizPhaze = () => {
		nextState({quiz:true});
	}
	const handleResultPhaze = () => {
		nextState({quiz:false,result:true});
	}
	return(
		<div className="wrap">
			<HeaderMini title="단어 학습"></HeaderMini>
			<LeftFix></LeftFix>
			<BottomNav active="learn"></BottomNav>
			<div className="word_learn_wrap">
				<div className="word_learn_cont">
					<Quiz></Quiz>
					{
						(next.quiz) === true ? <Quiz></Quiz> :
						(next.result) === true ? <Result></Result> :
						""
					}
				</div>
			</div>
		</div>
	);
};
export default WordQuiz;