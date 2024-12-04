import HeaderMini from "@components/layout/header_mini";
import BottomNav from "@components/layout/bottom_nav";
import LeftFix from "@components/layout/left_fix";
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
import Store from "@/store/store";
import authStore from "@/store/authStore";

function MyPage(){
	const [userConfigModal] = useModal("userConfig");
	const [folderListModal] = useModal("folderList");
	const [deleteAccountModal] = useModal("deleteAccount");
	const {userInfo} = authStore(state => state);

	const onClickHandler = api();
	const handleUserConfig = () => e => {
		userConfigModal(FullModal,UserConfig)
	}
	const handleFolderList = () => e => {
		folderListModal(FullModal,FolderList)
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
					<li onClick={handleFolderList()}>내 단어장 관리</li>
					<li onClick={signout}>로그아웃</li>
					<li onClick={handleDeleteAccountModal()}>계정 삭제</li>
				</ul>
			</div>
		</div>
	);
}

export default MyPage;