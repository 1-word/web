import React, {useEffect,useState} from "react";

function DailySentenceView({
	sentence,
}){

	const relationWord = sentence.dailyWords.map((val, idx) => {
		return <React.Fragment key={`dailyWords${idx}`}>
						<li>
							<p className="daily_sentence_view_relative_word_name">{val.word}</p>
							<p className="daily_sentence_view_relative_word_mean">{val.mean}</p>
						</li>
		</React.Fragment>
	})
	return(
		<>
			<div className="daily_sentence_view_date">{sentence.year}-{sentence.month}-{sentence.day}</div>
			<div className="daily_sentence_view_area">
				<p className="daily_sentence_view_sentence">
					{sentence.sentence}
				</p>
				<p className="daily_sentence_view_mean">
					{sentence.mean}
				</p>
				{/* 연관 단어 */}
				<div className="daily_sentence_view_relative_word_area">
					<h3>연관 단어</h3>
					<ul className="daily_sentence_view_relative_word_grid">
						{relationWord}
					</ul>
				</div>
				{/* 연관 단어 */}
				<div className="modal_full_btn_wrap daily_sentence_view_btn_wrap">
					<button className="btn-light sizeM">이전문장</button>
					<button className="btn-fill sizeM">다음문장</button>
				</div>
			</div>
		</>
	);
};
export default DailySentenceView;