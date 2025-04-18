import Top_SVG from "@images/top.svg";
import React, {useEffect, useRef, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useModal } from "@/hook/_hooks";
import Add from "@/components/modal/add/Add";
import FullModal from "./popup/FullModal";
import { isYandex } from "react-device-detect";

const BottomNav = (activeClass) => {
	// 팝업 이벤트
	const [ openModal ] = useModal("add");
	const topbtnRef = useRef({});
	const [btnState,setBtnState] = useState(false);
	const [topBtnState,setTopBtnState] = useState(false);
	const { wordBookId } = useParams();

	const handleModal = e => {
		openModal(FullModal, Add, {
			wordBookId
		});
	}

	const handleToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	const isScroll = () => {
		const scrollPos = window.scrollY;
		let timer;
		if(timer) clearTimeout(timer);
		timer = window.setTimeout(()=>{
			scrollPos > 100 ? setTopBtnState(true) : setTopBtnState(false)
		},100);
	}

	useEffect(()=>{
		if({...activeClass}.active === "word"){
			setBtnState(true);
		}
		window.addEventListener('scroll', isScroll);
		return () => window.removeEventListener('scroll', isScroll);
	},[])

	
	return(
<nav className="bottom_nav">
	{
		btnState?
		<div className={topBtnState ? "bottom_nav_btn_wrap" : "bottom_nav_btn_wrap active" }>
			<button className="bottom_nav_new_word" onClick={handleModal}><i className="xi-plus"></i></button>
			<button ref={topbtnRef} className="bottom_nav_top" onClick={handleToTop}><img src={Top_SVG} alt="top"/></button>
		</div>
		: ""
	}

<ul className="bottom_nav_list flex" {...activeClass}>
	<li className="flex">
		<Link to="/vocabook"><i className="wordbook"></i>단어장</Link>
	</li>
	<li className="flex">
		<Link to="/learn"><i className="learn"></i>단어 학습</Link>
	</li>
	<li className="flex">
		<Link to="/lounge"><i className="lounge"></i>라운지</Link>
	</li>
	<li className="flex">
		<Link to="/daily-sentence/main"><i className="calendar"></i>달력</Link>
	</li>
	<li className="flex">
		<Link to="/mypage" ><i className="user"></i>마이보카</Link>
	</li>
</ul>
</nav>
	);
};
export default BottomNav;