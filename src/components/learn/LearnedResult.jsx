function LearnedResult(){
	return(
		<>
		<div>
			<p className="word_learn_title">2024-12-02의 학습결과에요</p>
			<ul className="word_learn_result_lists">
				<li className="word_learn_result_list">
					<div>
						<p className="word_learn_result_time">14:10</p>
						<p className="word_learn_result_method">단어 퀴즈</p>
					</div>
					<div>
						{/* 51 넘으면 over class 부여 */}
						<div className="word_learn_result_persent over">51</div>
						<div className="word_learn_result_score">10/10</div>
					</div>
				</li>
				<li className="word_learn_result_list">
					<div>
						<p className="word_learn_result_time">14:10</p>
						<p className="word_learn_result_method">단어 퀴즈</p>
					</div>
					<div>
						<div className="word_learn_result_persent">50</div>
						<div className="word_learn_result_score">10/10</div>
					</div>
				</li>
			</ul>
		</div>
		<div>
			<p className="word_learn_title">2024-12-02의 학습결과에요</p>
			<ul className="word_learn_result_lists">
				<li className="word_learn_result_list">
					<div>
						<p className="word_learn_result_time">14:10</p>
						<p className="word_learn_result_method">단어 퀴즈</p>
					</div>
					<div>
						<div className="word_learn_result_persent over">51</div>
						<div className="word_learn_result_score">10/10</div>
					</div>
				</li>
				<li className="word_learn_result_list">
					<div>
						<p className="word_learn_result_time">14:10</p>
						<p className="word_learn_result_method">단어 퀴즈</p>
					</div>
					<div>
						<div className="word_learn_result_persent">50</div>
						<div className="word_learn_result_score">10/10</div>
					</div>
				</li>
			</ul>
		</div>
		</>
	);
};

export default LearnedResult;