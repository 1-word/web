import {useState, useRef, useEffect} from 'react';
import MyDeault_SVG from "@images/myImgDefault.svg";

import { useModal } from "@/hook/_hooks";
import BottomModalSelect from "@components/layout/popup/BottomModalSelect";
import BottomModal from "@components/layout/popup/BottomModal";
import CenterModal from "@components/layout/popup/CenterModal";
import AddName from './AddName';
import GroupEdit from './GroupEdit';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

function AddTypeMore(){
	const [groupEditModal] = useModal("groupEdit");

	const handleGroupEditModal = () => e => {
		groupEditModal(CenterModal,GroupEdit)
	}

	return(
		<div className="add_type_wrap">
			<h2 className="modal_center_title">품사 지정</h2>
			<div className="add_type_swiper_wrap">
				<Swiper
					slidesPerView={2}
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
						동명사
					</SwiperSlide>
				</Swiper>
			</div>
			<div className='modal_center_btn'>
				<button className='btn-light sizeM' onClick={handleGroupEditModal()}>품사 추가</button>
			</div>
		</div>
	);
};
export default AddTypeMore;