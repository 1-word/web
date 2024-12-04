import Top_SVG from "@images/top.svg";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useModal } from "@/hook/_hooks";
import Add from "@/components/modal/add/Add";
import FullModal from "./popup/FullModal";

const BottomNav = (activeClass) => {
	// 팝업 이벤트
	const [ openModal ] = useModal("add");
	const [btnState,setBtnState] = useState(false);

	const handleModal = e => {
		openModal(FullModal, Add);
	}
	useEffect(()=>{
		if({...activeClass}.active === "word"){
			setBtnState(true);
		}
	},[])

	
	return(
<nav className="bottom_nav">
	{
		btnState?
		<div className="bottom_nav_btn_wrap">
			<button className="bottom_nav_new_word" onClick={handleModal}><i className="xi-plus"></i></button>
			<button className="bottom_nav_top"><img src={Top_SVG} alt="top" /></button>
		</div>
		: ""
	}

<ul className="bottom_nav_list flex" {...activeClass}>
	<li className="flex">
		<Link to="/word"><i className="wordbook"></i>단어장</Link>
	</li>
	<li className="flex">
		<Link><i className="learn"></i>단어 학습</Link>
	</li>
	<li className="flex">
		<Link to="/daily_sentence/main"><i className="calendar"></i>오늘의 내 문장</Link>
	</li>
	<li className="flex">
		<Link to="/mypage" ><i className="user"></i>마이페이지</Link>
	</li>
</ul>
</nav>
	);
};
export default BottomNav;