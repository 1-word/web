import {useEffect,useState} from "react";
import HeaderMini from "@/components/layout/HeaderMini";
import LeftFix from "@/components/layout/LeftFix";
import BottomNav from "@/components/layout/BottomNav";
import VocabookList from "@/components/word/folder/VocaBookList";
import Quiz from "@/components/learn/quiz/Quiz";
import Result from "@/components/learn/quiz/Result";
import Memorize from "@/components/learn/memorize/Memorize";

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
	const handleResultPhaze = () => {
		nextState({quiz:false,result:true});
	}
	return(
		<div className="wrap">
			<HeaderMini title="단어 학습"></HeaderMini>
			<LeftFix></LeftFix>
			{/* <BottomNav active="learn"></BottomNav> */}
			<div className="word_learn_wrap">
				<div className="word_learn_cont">
					<Memorize></Memorize>
				</div>
			</div>
		</div>
	);
};
export default WordQuiz;