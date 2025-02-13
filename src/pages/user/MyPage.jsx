import HeaderMini from "@/components/layout/HeaderMini";
import BottomNav from "@/components/layout/BottomNav";
import LeftFix from "@/components/layout/LeftFix";
import MyDeault_SVG from "@images/myImgDefault.svg";
import api, { MODE } from "@/services/api";
import { useModal } from "@/hook/_hooks";

import BottomModalSelect from "@components/layout/popup/BottomModalSelect";
import CenterModal from "@components/layout/popup/CenterModal";
import CenterModalConfirm from "@/components/layout/popup/CenterModalConfirm";
import FullModal from "@components/layout/popup/FullModal";
import BottomModal from "@components/layout/popup/BottomModal";

import UserConfig from "@components/user/UserConfig";
import FolderList from "@/components/word/folder/VocaBookList";
import ChangePw from "@/components/user/ChangePw";
import Store from "@/store/store";
import authStore from "@/store/authStore";
import { Link } from "react-router-dom";
import AddTypeMore from "@/components/modal/add/AddTypeMore";

function MyPage(){
	const [userConfigModal] = useModal("userConfig");
	const [addTypeMoreModal] = useModal("addTypeMore");
	const [deleteAccountModal] = useModal("deleteAccount");
	const [changePwModal] = useModal("changePw");
	const {userInfo} = authStore(state => state);

	const onClickHandler = api();
	const handleUserConfig = () => e => {
		userConfigModal(FullModal,UserConfig)
	}
	const handleAddTypeMore = () => e => {
		addTypeMoreModal(FullModal,AddTypeMore)
	}
	const handleChangePwModal = () => e => {
		changePwModal(FullModal,ChangePw)
	}

	const signout = (e) => {
		onClickHandler(null, MODE.SIGNOUT);
	}

	const handleDeleteAccountModal = () => e => {
		deleteAccountModal(CenterModal,CenterModalConfirm,{
			title: "정말 떠나시는 건가요?",
			content: "계정 삭제시 이메일, 닉네임, 계정사진 및 모든 저장 사항이 삭제되어요. 그래도 진행하실 건가요?",
			onClick: () => {
				onClickHandler(null, MODE.USER_DELETE);
			},
		})
	}

	return (
		<div className="wrap">
			<LeftFix></LeftFix>
			<BottomNav active="mypage"></BottomNav>
			<HeaderMini title="마이페이지"></HeaderMini>
			<div className="my_page_wrap">
				<div className="my_user">
					<div className="my_user_img">
					<img src={userInfo?.profileImagePath ?? '/myImgDefault.svg'} alt="default" />
					</div>
					<span className="my_user_name">{userInfo?.nickname || ''}</span>님, 오늘도 힘내봐요!
				</div>
				<ul className="my_page_list">
					<li onClick={handleUserConfig()}>내 계정 설정
						<p className="my_page_email">{userInfo?.email}</p>
					</li>
					<li onClick={handleChangePwModal()}>비밀번호 변경</li>
					<li onClick={handleAddTypeMore()}>내 품사 관리</li>
					{/* 미구현 임시 none처리 */}
					<li className="disN"><Link to="/notice">공지사항</Link></li>
					<li onClick={signout}>로그아웃</li>
					<li onClick={handleDeleteAccountModal()}>계정 삭제</li>
				</ul>
			</div>
		</div>
	);
}

export default MyPage;