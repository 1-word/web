import {useState, useRef, useEffect} from 'react';
import MyDeault_SVG from "@images/myImgDefault.svg";

import { useModal } from "@/hook/_hooks";
import BottomModalSelect from "@components/layout/popup/BottomModalSelect";
import BottomModal from "@components/layout/popup/BottomModal";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

function addTypeMore(){
	// const [photoConfigModal] = useModal("photoConfig");

	// const handlePhotoConfigModal = (id) => e => {
	// 	photoConfigModal(BottomModal, BottomModalSelect, {
	// 		setting: [
	// 			{
	// 			title : "이미지 선택",
	// 			onClick : "",
	// 			},
	// 			{
	// 			title : "사진 촬영",
	// 			onClick : "",
	// 			},
	// 			{
	// 			title : "기본으로 설정",
	// 			onClick : "",
	// 			},
	// 		],
	// 	});
	// }



	return(
		<div className="add_type_wrap">
			<h2 className="modal_center_title">그룹 지정</h2>
			<div className="add_type_swiper_wrap">
				<Swiper
					slidesPerView={3}
					spaceBetween={12}
					grid={{
						rows: 2,
					}}
					pagination={true}
					modules={[Grid, Pagination]}
					className="add_type_swiper"
				>
					{/* 최대 12글자 제한 */}
					<SwiperSlide className="add_type_swiper_slide">
						동명사시시사사사사사사사
					</SwiperSlide>
				</Swiper>
			</div>
			<div className='modal_center_btn'>
				<button className='btn-light sizeM'>그룹 추가</button>
			</div>
		</div>
	);
};
export default addTypeMore;