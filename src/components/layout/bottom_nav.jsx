import Top_SVG from "@images/top.svg";
import { Link } from "react-router-dom";
import { useModal } from "@/hook/_hooks";
import Add from "@/components/modal/add/Add";

const BottomNav = () => {
	// 팝업 이벤트
	const [ openModal ] = useModal("add");
	const handleModal = e => {
		openModal(Add);
	}
	return(
<nav className="bottom_nav">
<div className="bottom_nav_btn_wrap">
	<button className="bottom_nav_new_word" onClick={handleModal}><i className="xi-plus"></i></button>
	<button className="bottom_nav_top"><img src={Top_SVG} alt="top" /></button>
</div>
<ul className="bottom_nav_list flex">
	<li className="flex">
		<Link><i className="wordbook"></i>단어장</Link>
	</li>
	<li className="flex">
		<Link><i className="learn"></i>단어 학습</Link>
	</li>
	<li className="flex">
		<Link><i className="search"></i>검색</Link>
	</li>
	<li className="flex">
		<Link><i className="user"></i>마이페이지</Link>
	</li>
</ul>
</nav>
	);
};
export default BottomNav;