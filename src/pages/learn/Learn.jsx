import {useEffect,useState} from "react";
import HeaderMini from "@/components/layout/HeaderMini";
import LeftFix from "@/components/layout/LeftFix";
import BottomNav from "@/components/layout/BottomNav";
import VocabookList from "@/components/word/folder/VocaBookList";
import Quiz from "@/components/learn/quiz/Quiz";
import Result from "@/components/learn/quiz/Result";
import QuizImg from "@/assets/images/quiz.svg";
import FlashImg from "@/assets/images/flash.svg";
import { useModal } from "@/hook/_hooks";
import FullModal from "@/components/layout/popup/FullModal";
import BeforeLearn from "@/components/learn/BeforeLearn";

function Learn(){
	const [beforeLearnModal] = useModal('beforeLearnModal');

	const handleBeforeLearnModal = () => e => {
		beforeLearnModal(FullModal,BeforeLearn,{})
	}
	return(
		<div className="wrap">
			<HeaderMini title="단어 학습"></HeaderMini>
			<LeftFix></LeftFix>
			<BottomNav active="learn"></BottomNav>
			<div className="word_learn_wrap">
				<div className="word_learn_cont">
					<h2 className="word_learn_title">학습 방법을 선택해주세요</h2>
						<ul className="method_choose_lists">
							<li className="method_choose_list" onClick={handleBeforeLearnModal()}>
								<div className="method_choose_img">
									<img src={QuizImg} alt="퀴즈" />
								</div>
								<h3 className="method_choose_title">단어 퀴즈</h3>
								<p className="method_choose_sub_title">퀴즈 형식</p>
								<p className="method_choose_contents">사지선다로 퀴즈를 낼거에요</p>
							</li>
							<li className="method_choose_list">
								<div className="method_choose_img">
									<img src={FlashImg} alt="플래시" />
								</div>
								<h3 className="method_choose_title">플래시 카드</h3>
								<p className="method_choose_sub_title">타이머 형식</p>
								<p className="method_choose_contents">카드를 넘겨가며 반복 학습해요</p>
							</li>
							<li className="method_choose_list">
								<h3 className="method_choose_title">결과 보기</h3>
								<p className="method_choose_contents">오늘 학습한 단어는 어땠나요?</p>
							</li>
						</ul>
				</div>
			</div>
		</div>
	);
};

export default Learn;