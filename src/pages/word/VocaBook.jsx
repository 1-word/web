import HeaderMini from "@/components/layout/HeaderMini";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import LeftFix from "@/components/layout/LeftFix";
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