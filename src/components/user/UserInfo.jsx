import {useState, useRef, useEffect} from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function UserInfo(){
	const compAnimation = useRef();


	useEffect(()=>{
		compAnimation.current.classList.add('active');
	})

	return(
		<div ref={compAnimation} className='comp_choose_wrap comp_ani'>
			<div className="login-area comp_area">
				<h2 className="comp_title comp_ani_title">
				보카박스에는<br />
				이런 기능이 있어요
				</h2>
				<div className="comp_ani_box">
					<div className="comp_swiper_wrap">
					<Swiper
						loop={true}
						pagination={true}
						modules={[Pagination]}
						className="comp_swiper"
					>
						<SwiperSlide className="comp_swiper_slide">
							<p className="comp_swiper_title">나만의 단어장을 만들어요</p>
						</SwiperSlide>
						<SwiperSlide className="comp_swiper_slide">
							<p className="comp_swiper_title">단어를 추가하고 수정해요</p>
						</SwiperSlide>
						<SwiperSlide className="comp_swiper_slide">
							<p className="comp_swiper_title">내 마음대로 커스텀해요</p>
						</SwiperSlide>
						<SwiperSlide className="comp_swiper_slide">
							<p className="comp_swiper_title">오늘은 무엇을 배웠나요?</p>
						</SwiperSlide>
						<SwiperSlide className="comp_swiper_slide">
							<p className="comp_swiper_title">내가 추가한 단어를 학습해요</p>
						</SwiperSlide>
					</Swiper>
					</div>
				</div>
			</div>
			<div className="comp_btn_wrap comp_ani_btn">
				<button className="btn-fill sizeL" >사용해보기</button>
			</div>
		</div>
	);
};
export default UserInfo;