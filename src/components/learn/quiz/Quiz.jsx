function Quiz(){
	return(
		<>
			<div className="quiz_progress_bar"
				style={{
					width: "50%",
				}}></div>
			<h2 className="word_quiz_title">빈칸에 알맞은 답을 선택해 주세요</h2>
			<div className="quiz_wrap">
				<div className="quiz_area">
					<div></div>
					<div className="quiz_question">apple</div>
					<div className="quiz_correct"></div>
					<div className="quiz_progress_indicator">100 / 400</div>
				</div>
				<div className="quiz_answer_area">
					<ul className="quiz_answer_lists">
						<li>사과</li>
						<li>바나나</li>
						<li>맛있겠따</li>
						<li>냠냠</li>
					</ul>
				</div>
			</div>
		</>
	);
};
export default Quiz;