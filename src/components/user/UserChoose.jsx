import {useState, useRef, useEffect} from 'react';
import MyDeault_SVG from "@images/myImgDefault.svg";

import { useModal } from "@/hook/_hooks";
import BottomModalSelect from "@components/layout/popup/BottomModalSelect";
import BottomModal from "@components/layout/popup/BottomModal";

function UserChoose(){
	const compAnimation = useRef();
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

	useEffect(()=>{
		compAnimation.current.classList.add('active');
	})

	return(
		<div ref={compAnimation} className='comp_choose_wrap comp_ani'>
			<div className="login-area comp_area">
				<h2 className="comp_title comp_ani_title">
					본인을 나타낼< br/>
					닉네임과 이미지를 정해주세요
				</h2>
				<div className="comp_ani_box">
					<div className="my_page_config_img_wrap" onClick={handlePhotoConfigModal()}>
						<img src={MyDeault_SVG} className="my_page_config_img" alt="default" />
					</div>
					<div className="input_wrap comp_choose_input_wrap">
						<label htmlFor="nickname">닉네임</label>
						<input id="nickname" name="" type="text" required spellCheck placeholder="닉네임을 입력해 주세요"/>
						<p className="msg error">에러입니다</p>
					</div>
				</div>
			</div>
			<div className="comp_btn_wrap comp_ani_btn">
				<button className="btn-fill sizeL" >다음</button>
			</div>
		</div>
	);
};
export default UserChoose;