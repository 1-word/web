import HeaderMini from "@components/layout/header_mini";
import Footer from "@components/layout/footer";
import BottomNav from "@components/layout/bottom_nav";
import LeftFix from "@components/layout/left_fix";
import VocabookList from "@/components/word/folder/VocaBookList";

function VocaBook(){
	return(
		<div className="wrap">
				<HeaderMini title="단어장"></HeaderMini>
				<BottomNav active="word"></BottomNav>
				<LeftFix></LeftFix>
				<VocabookList></VocabookList>
		</div>
	);
};
export default VocaBook;