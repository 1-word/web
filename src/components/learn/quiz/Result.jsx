import WordList from "@/components/word/WordList";

function Result(){
	return(
		<>
			<h2 className="word_quiz_title">축하해요! 모든 단어를 학습했어요!</h2>
			<div className="quiz_wrap quiz_result_wrap">
				<div className="quiz_area quiz_result_correct_wrap">
					<div>
						<div></div>
						<div>90%</div>
					</div>
					<div>
						정답 갯수 : 0
					</div>
					<div>
						오답 갯수 : 0
					</div>
				</div>
				<div className="quiz_incorrect_wrap">
					<p>오답 목록</p>
					<WordList></WordList>
				</div>
			</div>
		</>
	);
};
export default Result;