import Header from "@components/layout/header_mini";
import BottomNav from "@components/layout/bottom_nav";
import LeftFix from "@components/layout/left_fix";
import MyDeault_SVG from "@images/myImgDefault.svg";
import api, { MODE } from "@/services/api";
import { useModal } from "@/hook/_hooks";

import BottomModalSelect from "@components/layout/popup/BottomModalSelect";
import CenterModal from "@components/layout/popup/CenterModal";
import FullModal from "@components/layout/popup/FullModal";
import BottomModal from "@components/layout/popup/BottomModal";

import UserConfig from "@components/user/UserConfig";

function MyPage(){
	const [userConfigModal] = useModal("userConfig");
	const onClickHandler = api();
	const handleUserConfig = () => e => {
		userConfigModal(FullModal,UserConfig)
	}

	const signout = (e) => {
		onClickHandler(null, MODE.SIGNOUT);
	}

	return (
		<div className="wrap">
			<LeftFix></LeftFix>
			<BottomNav></BottomNav>
			<Header></Header>
			<div className="my_page_wrap">
				<div className="my_user">
					<div className="my_user_img">
					<img src={MyDeault_SVG} alt="default" />
					</div>
					<span className="my_user_name">유저 네임</span> 님, 오늘도 힘내봐요!
				</div>
				<ul className="my_page_list">
					<li onClick={handleUserConfig()}>내 계정 설정</li>
					<li>내 단어 그룹 관리</li>
					<li onClick={signout}>로그아웃</li>
					<li>계정탈퇴</li>
				</ul>
			</div>
		</div>
	);
}

export default MyPage;