import {useEffect,useState} from "react";
import HeaderMini from "@/components/layout/HeaderMini";
import LeftFix from "@/components/layout/LeftFix";
import BottomNav from "@/components/layout/BottomNav";
import VocabookList from "@/components/word/folder/VocaBookList";
import Quiz from "@/components/learn/quiz/Quiz";
import Result from "@/components/learn/quiz/Result";

function WordQuiz(){
	const [next,nextState] = useState(
		{
			quiz : false,
			result : false
		}
	);

	const handleQuizPhaze = () => {
		nextState({quiz:true});
	}
	return(
		<div className="wrap">
			<HeaderMini title="단어 학습"></HeaderMini>
			<LeftFix></LeftFix>
			<BottomNav active="learn"></BottomNav>
			<div className="word_quiz_wrap">
				<div className="word_quiz_cont">
					{
						(next.quiz) === true ? "" :
						<>
							<h2 className="word_quiz_title">단어 학습에 사용할 단어장을 선택해주세요</h2>
							<ul className="word_quiz_vocabook_lists">
								<li>
									단어장1
								</li>
								<li>
									단어장1
								</li>
							</ul>
							<div className="word_quiz_btn_wrap">
								<button className="btn-fill sizeM" onClick={handleQuizPhaze}>다음 단계</button>
							</div>
						</>
					}
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