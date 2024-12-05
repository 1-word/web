import {useEffect,useState} from "react";
import HeaderMini from "@/components/layout/header_mini";
import LeftFix from "@components/layout/left_fix";
import BottomNav from "@components/layout/bottom_nav";
import VocabookList from "@/components/word/folder/VocaBookList";

function WordQuiz(){
	return(
		<div className="wrap">
			<HeaderMini title="단어 학습"></HeaderMini>
			<LeftFix></LeftFix>
			<BottomNav active="learn"></BottomNav>
			<div className="word_quiz_wrap">
				<div className="word_quiz_cont">
					<h2 className="word_quiz_title">단어 학습에 사용할 단어장을 선택해주세요</h2>
					<ul className="word_quiz_vocabook_lists">
						<li>
							단어장1
						</li>
					</ul>
					<div className="word_quiz_btn_wrap">
						<button className="btn-fill sizeM">다음으로</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default WordQuiz;