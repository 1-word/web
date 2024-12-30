import HeaderMini from "@/components/layout/HeaderMini";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import LeftFix from "@/components/layout/LeftFix";
import VocabookList from "@/components/word/folder/VocaBookList";
import { useState } from "react";

function VocaBook(){
	const [tutorialState,setTutorialState] = useState(false);
	const closeTutorial = () => {
		setTutorialState(true);
	}
	return(
		<div className="wrap">
				<HeaderMini title="단어장"></HeaderMini>
				<BottomNav active="word"></BottomNav>
				<LeftFix></LeftFix>
				<VocabookList></VocabookList>
				{
					!tutorialState ?
					<div className="tutorial">
					<div className="tutorial_fixed"></div>
					<button className="tutorial_close" onClick={closeTutorial}>
						<i className="xi-close-thin"></i>
					</button>
					<div className="tutorial_title tutorial_1">단어장을 수정 및 삭제할 수 있어요</div>
					<div className="tutorial_title tutorial_2">새 단어장을 만들 수 있는 버튼이에요</div>
					<div className="tutorial_title tutorial_3">새 단어를 추가하는 버튼이에요</div>
				</div>
				: ""
				}
		</div>
	);
};
export default VocaBook;