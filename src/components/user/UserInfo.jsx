import {useState, useRef, useEffect} from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';

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
						<SwiperSlide className="comp_swiper_slide">Slide 1</SwiperSlide>
						<SwiperSlide className="comp_swiper_slide">Slide 2</SwiperSlide>
						<SwiperSlide className="comp_swiper_slide">Slide 3</SwiperSlide>
						<SwiperSlide className="comp_swiper_slide">Slide 4</SwiperSlide>
						<SwiperSlide className="comp_swiper_slide">Slide 5</SwiperSlide>
						<SwiperSlide className="comp_swiper_slide">Slide 6</SwiperSlide>
						<SwiperSlide className="comp_swiper_slide">Slide 7</SwiperSlide>
						<SwiperSlide className="comp_swiper_slide">Slide 8</SwiperSlide>
						<SwiperSlide className="comp_swiper_slide">Slide 9</SwiperSlide>
					</Swiper>
					</div>
				</div>
			</div>
			<div className="comp_btn_wrap comp_ani_btn">
				<button className="btn-fill sizeL" >다음</button>
			</div>
		</div>
	);
};
export default UserInfo;