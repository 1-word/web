import MyDeault_SVG from "@images/myImgDefault.svg";

import { useModal } from "@/hook/_hooks";
import BottomModalSelect from "@components/layout/popup/BottomModalSelect";
import BottomModal from "@components/layout/popup/BottomModal";

function MyPage(){
	const [photoConfigModal] = useModal("photoConfig");

	
	const handlePhotoConfigModal = (id) => e => {
		photoConfigModal(BottomModal, BottomModalSelect, {
			setting: [
				{
				title : "이미지 선택",
				onClick : "",
				},
				{
				title : "사진 촬영",
				onClick : "",
				},
				{
				title : "기본으로 설정",
				onClick : "",
				},
			],
		});
	}

	return (
		<div className="my_page_config_wrap">
			<div className="my_page_config_img_wrap" onClick={handlePhotoConfigModal()}>
				<img src={MyDeault_SVG} className="my_page_config_img" alt="default" />
			</div>
			<ul className="my_page_config_lists">
				<li className="input_wrap">
					<label>이름</label>
					<input type="text" />
					<div className="msg error">에러입니다</div>
				</li>
				<li className="input_wrap">
					<label>아이디</label>
					<input type="text" readOnly />
					<div className="msg correct">맞습니다</div>
				</li>
				<li className="input_wrap">
					<label>이메일</label>
					<input type="text" />
				</li>
				<li className="input_wrap">
					<label>새 비밀번호</label>
					<input type="password" />
				</li>
				<li className="input_wrap">
					<label>새 비밀번호 확인</label>
					<input type="password" />
				</li>
			</ul>
			<div className="my_page_config_btn_wrap">
				<button className="btn-fill sizeM">확인</button>
			</div>
		</div>
	);
}

export default MyPage;