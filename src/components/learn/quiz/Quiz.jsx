import { useEffect, useRef, useState } from "react";
import IsCorrectAni from "./IsCorrectAni";
import Result from "./Result";
import api, { MODE } from "@/services/api";

function Quiz({allWordData, quizInfoId}){
	const onClickHandler = api();

	const [wordData, setWordData] = useState({});

	const [currentQuiz, setCurrentQuiz] = useState({
		quizId: null, 
		question: null,
		correctAnswer: null, 
		answers: []
	});

	const answerRef = useRef(null);

	const [quizData, setQuizData] = useState([]);

	const [currentNum, setCurrentNum] = useState(-1);

	const pageRef = useRef({
		current: -1,
		next: 0,
		hasNext: true
	});

	const [progress, setProgress] = useState({
		now: 30,
		total: 30,
		width: '0%',
		result: false,
	});

	const [isClicked, setIsClicked] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

	useEffect(() => {
		setWordData({
			allWordData,
			quizInfoId
		})
	}, []);

	useEffect(() => {
		console.log('currentNum 변경');
		// 퀴즈 조회 api 불러오기
		let currentPage = pageRef.current.current;
		if (!pageRef.current.hasNext && quizData.length <= 0) {
			console.log("모든 퀴즈를 다 푸셨습니다.");
			return;
		}
		if (30 * (currentPage === 0? 1 : currentPage) <= currentNum || currentNum === -1) {
			onClickHandler(null, MODE.QUIZ_READ, {
				quizInfoId,
				// query: `?current=${pageRef.current.next}`
				query: `?current=0`
			}).then(res => {
				setQuizData(res.data);
				pageRef.current = {
					current: res.current,
					next: res.next,
					hasNext: res.hasNext
				}

				setCurrent(res.data);
			});
			
		} else {
			setCurrent(quizData);
		}
		
	}, [currentNum]);

	// 현재 퀴즈 세팅
	const setCurrent = (quiz) => {
		console.log(quiz);
		if (quiz.length > 0) {
			const currentQuiz = quiz.pop();
			const result = createAnswers(currentQuiz);
			setCurrentQuiz(result);
		}
	}

	// 4지선다 생성
	const createAnswers = (currentQuiz) => {
		let result = [];
		for (let i=0; i<3;i ++) {
			// 랜덤으로 생성
			const idx = Math.floor(Math.random() * allWordData.length - 1);
			// 오답에 정답이 들어갈 수 없음
			if (allWordData[idx].wordId === currentQuiz.wordId) {
				i--;
				continue;
			}
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

	const calcPercent = () => {
		const total = Number(progress.total);
		const now = Number(progress.now);
		const percent = String(Math.floor((now / total) * 100))+"%";
		setProgress({
			...progress,
			width:percent
		})
	}
	
	const handleAnswer = (e) => {
		// const correctAnswer = true;
		// setIsClicked(true);
    // setIsCorrect(false);
		// if(progress.now === progress.total){
		// 	setProgress({
		// 		...progress,
		// 		result: true
		// 	})
		// }

		// 초기화
		answerRef.current.childNodes.forEach(el => {
			el.classList.remove('correct');
			el.classList.remove('wrong');
		});

		// 선택한 퀴즈 답안 가져오기
		const selectValue = parseInt(e.target.getAttribute("data-value"));

		// 정답 확인
		if (currentQuiz.correctAnswer.wordId === selectValue) {
			console.log("정답");
			e.target.classList.add('correct');

			// ~초 이후 다음 퀴즈로 넘어가기
			setCurrentNum((prev) => ++prev);
		} else {
			e.target.classList.add('wrong');
		}
  };

	const answerList = () => {
		return currentQuiz?.answers.map(v => 
			<>
				<li key={v.wordId} data-value={v.wordId} className="quiz_answer">{v.mean}</li>	
			</>
		);
	}

	return(
		<>
			{
				// progress.result ? <Result></Result> :
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
							<div className="quiz_question">{currentQuiz.question}</div>
							<div className="quiz_correct"></div>
							<div className="quiz_progress_indicator">{progress.now} / {progress.total}</div>
						</div>
						<div className="quiz_answer_area">
							<ul ref={answerRef} className="quiz_answer_lists" onClick={handleAnswer}>
								{answerList()}
							</ul>
						</div>
					</div>
				</>
			}
		</>
	);
};
export default Quiz;