import React, { useEffect, useRef, useState } from "react";
import IsCorrectAni from "./IsCorrectAni";
import Result from "./Result";
import api, { MODE } from "@/services/api";
import { useNavigate } from "react-router-dom";

function Quiz({allWordData, quizInfoId, quizCount}){
	const onClickHandler = api();

	const navigate = useNavigate();

	const [currentQuiz, setCurrentQuiz] = useState({
		quizId: null, 
		question: null,
		correctAnswer: null, 
		answers: []
	});

	const answerRef = useRef(null);
	const solve = useRef({datas: []});
	const [quizData, setQuizData] = useState([]);
	const [currentNum, setCurrentNum] = useState(1);

	const pageRef = useRef({
		current: 0,
		next: 0,
		hasNext: true
	});


	const [progress, setProgress] = useState({
		now: 30,
		total: 30,
		width: '0%',
	});

	const [isClicked, setIsClicked] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

	useEffect(() => {
		// 퀴즈 조회 api 불러오기
		let currentPage = pageRef.current.current;
		if (!pageRef.current.hasNext && quizData.length <= 0) {

			// 다 푼 문제 제출 및 퀴즈 완료
			solveQuiz(() => onClickHandler(null, MODE.QUIZ_END, quizInfoId).then(_ => {
				// 퀴즈 통계 생성
				onClickHandler(null, MODE.QUIZ_STAT_CREATE, quizInfoId).then(res => {
					navigate('/quiz-result', {
						state: {
							end: true,
							result: res,
							quizInfoId
						}});
				});
			}));
		}

		setIsClicked(false);
		setIsCorrect(false);

		if (30 * (currentPage === 0? 1 : currentPage) <= currentNum || currentNum === 1) {
			onClickHandler(null, MODE.QUIZ_READ, {
				quizInfoId,
				query: `?current=${pageRef.current.next}`
			}).then(res => {
				const quiz = res.data.sort((a, b) => b.quizId - a.quizId);
				setQuizData(quiz);
				pageRef.current = {
					current: res.current,
					next: res.next,
					hasNext: res.hasNext
				}
				setCurrent(quiz);
			});
			
		} else {
			setCurrent(quizData);
		}
		
	}, [currentNum]);

	const solveQuiz = async(callback) => {
		await onClickHandler(null, MODE.QUIZ_SOLVE, solve.current).then(_ => {
			callback();
		});
	}

	// 현재 퀴즈 세팅
	const setCurrent = (quiz) => {
		if (quiz.length > 0) {
			const currentQuiz = quiz.pop();
			const result = createAnswers(currentQuiz);
			setCurrentQuiz(result);
		}
	}

	// 4지선다 생성
	const createAnswers = (currentQuiz) => {
		let result = [];
		let tmpAllWordData = allWordData;
		let tmp = [];
		for (let i=0; i<3;i ++) {
			// 랜덤으로 생성
			const idx = Math.floor(Math.random() * (tmpAllWordData.length - 1));
			// 오답에 정답이 들어갈 수 없음
			if (tmp.includes(idx) || tmpAllWordData[idx].wordId === currentQuiz.wordId) {
				i--;
				continue;
			}
			tmp.push(idx);
			result.push(allWordData[idx]);
		}

		// 답란 완성
		result.push({
			wordId: currentQuiz.wordId,
			word: currentQuiz.word,
			mean: currentQuiz.mean
		});

		// 랜덤으로 섞기
		result = shuffleArray(result);

		const answers = {
			quizId: currentQuiz.quizId,
			question: currentQuiz.word,
			correctAnswer: {...currentQuiz},
			answers: result
		};

		return answers;
	}

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
	
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	// 제한시간
	const calcPercent = () => {
		const total = Number(progress.total);
		const now = Number(progress.now);
		const percent = String(Math.floor((now / total) * 100))+"%";
		setProgress({
			...progress,
			width:percent
		})
	}
	
	// 정답 또는 틀린 문제 만들기
	const handleAnswer = (e) => {
		// const correctAnswer = true;
		
		// if(progress.now === progress.total){
			// 	setProgress({
				// 		...progress,
				// 		result: true
				// 	})
				// }
				
		const clicked = !isClicked? true: isClicked;
		// 선택한 퀴즈 답안 가져오기
		const selectValue = parseInt(e.target.getAttribute("data-value"));

		let solveValue = true;

		// 정답 확인
		if (currentQuiz.correctAnswer.wordId === selectValue) {
			e.target.classList.add('correct');
			initQuizAnswer();

			//TODO ~초 이후 다음 퀴즈로 넘어가기
			setCurrentNum((prev) => ++prev);
		} else {
			e.target.classList.add('wrong');
			solveValue = false;
		}

		// 처음이면 답안 작성
		if (!isClicked) {
			solve.current = {
				datas: [
					...solve.current.datas,
					{
						quizId: currentQuiz.quizId,
						correct: solveValue
					}
				]
			}
			setIsClicked(clicked);
		}
  }

	// 퀴즈 푼 표시 삭제
	const initQuizAnswer = () => {
		if (answerRef.current.childNodes.length > 0) {
			answerRef.current.childNodes.forEach(el => {
				el.classList.remove('correct');
				el.classList.remove('wrong');
			});
		}
	}

	const answerList = () => {
		return currentQuiz?.answers.map(v => 
			<React.Fragment key={`answer${v.wordId}`}>
				<li data-value={v.wordId} className="quiz_answer">{v.mean}</li>	
			</React.Fragment>
		);
	}

	return(
		<>
			<div className="quiz_progress_bar"
					style={{
						width: progress.width,
					}}></div>
			<h2 className="word_quiz_title">빈칸에 알맞은 답을 선택해 주세요</h2>
			<div className={ !isClicked ? "quiz_wrap" : isCorrect ? "quiz_wrap true" :"quiz_wrap false"}>
				<div className="quiz_area">
					{/* {
						isClicked && <IsCorrectAni isCorrect={isCorrect}></IsCorrectAni>
					} */}
					<div className="quiz_question">{currentQuiz.question}</div>
					<div className="quiz_correct"></div>
					<div className="quiz_progress_indicator">{currentNum} / {quizCount}</div>
				</div>
				<div className="quiz_answer_area">
					<ul ref={answerRef} className="quiz_answer_lists" onClick={handleAnswer}>
						{answerList()}
					</ul>
				</div>
			</div>
		</>
	);
};
export default Quiz;