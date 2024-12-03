import {useEffect,useState} from "react";

function DailySentenceView({
	sentence,
	smean,
	sdate
}){
	return(
		<>
			<div className="daily_sentence_view_date">{sdate}2024-10-02</div>
			<div className="daily_sentence_view_area">
				<p className="daily_sentence_view_sentence">
					{sentence}
					The golden rays of the setting sun cascaded through the towering trees, painting the forest floor in hues of amber and bronze, as the gentle rustle of leaves created a symphony that danced in harmony with the whispering breeze
				</p>
				<p className="daily_sentence_view_mean">
					{smean}
					황금빛 석양의 광선이 우뚝 솟은 나무들 사이로 흘러내리며 숲바닥을 호박과 청동빛으로 물들였고, 부드러운 나뭇잎의 바스락거림은 속삭이는 바람과 조화를 이루며 춤추는 교향곡을 만들어냈다.
				</p>
				{/* 연관 단어 */}
				<div className="daily_sentence_view_relative_word_area">
					<h3>연관 단어</h3>
					<ul className="daily_sentence_view_relative_word_grid">
						<li>
								<p className="daily_sentence_view_relative_word_name">Pneumonoultramicroscopicsilicovolcanoconiosis</p>
								<p className="daily_sentence_view_relative_word_mean">폐에 미세한 규산염 입자를 흡입하여 발생하는 질병</p>
						</li>
						<li>
								<p className="daily_sentence_view_relative_word_name">Misunderstanding</p>
								<p className="daily_sentence_view_relative_word_mean">오해</p>
						</li>
						<li>
								<p className="daily_sentence_view_relative_word_name">Uncharacteristically</p>
								<p className="daily_sentence_view_relative_word_mean">평소와 다르게</p>
						</li>
						<li>
								<p className="daily_sentence_view_relative_word_name">Uncharacteristically</p>
								<p className="daily_sentence_view_relative_word_mean">평소와 다르게</p>
						</li>
						<li>
								<p className="daily_sentence_view_relative_word_name">Uncharacteristically</p>
								<p className="daily_sentence_view_relative_word_mean">평소와 다르게</p>
						</li>
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