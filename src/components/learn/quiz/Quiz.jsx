import { useState } from "react";
import IsCorrectAni from "./IsCorrectAni";
import Result from "./Result";

function Quiz(){
	const [progress, setProgress] = useState({
		now: 30,
		total: 30,
		width: '0%',
		result: false,
	});
	const [isClicked, setIsClicked] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const calcPercent = () => {
		const total = Number(progress.total);
		const now = Number(progress.now);
		const percent = String(Math.floor((now / total) * 100))+"%";
		setProgress({
			...progress,
			width:percent
		})
	}
	const handleAnswer = (userAnswer) => {
		const correctAnswer = true;
		setIsClicked(true);
    setIsCorrect(false);
		if(progress.now === progress.total){
			setProgress({
				...progress,
				result: true
			})
		}
  };

	return(
		<>
			{
				progress.result ? <Result></Result> :
				<>
					<div className="quiz_progress_bar"
							style={{
								width: progress.width,
							}}></div>
					<h2 className="word_quiz_title">빈칸에 알맞은 답을 선택해 주세요</h2>
					<div className={ !isClicked ? "quiz_wrap" : isCorrect ? "quiz_wrap true" :"quiz_wrap false"}>
						<div className="quiz_area">
							{
								isClicked && <IsCorrectAni isCorrect={isCorrect}></IsCorrectAni>
							}
							<div className="quiz_question">apple</div>
							<div className="quiz_correct"></div>
							<div className="quiz_progress_indicator">{progress.now} / {progress.total}</div>
						</div>
						<div className="quiz_answer_area">
							<ul className="quiz_answer_lists">
								<li className="correct" onClick={handleAnswer}>사과</li>
								<li>바나나</li>
								<li className="wrong">맛있겠따</li>
								<li>냠냠</li>
							</ul>
						</div>
					</div>
				</>
			}
		</>
	);
};
export default Quiz;