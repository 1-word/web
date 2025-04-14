import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import api, { MODE } from "@/services/api";

const Tutorial = ({ func }) => {
  const [isSwiperOver, setSwiperOver] = useState(false);
  const onClickHandler = api();

  const closeTutorial = () => {
    onClickHandler(null, MODE.USER_TUTORIAL_COMPLETE).then(() => func());
  };

  return (
    <div className="tutorial">
      <div className="tutorial_fixed"></div>
      <div className="tutorial_wrap">
        <div className="tutorial_cont">
          <h2 className="tutorial_title">
            보카박스에는
            <br />
            이런 기능이 있어요
            <button className="tutorial_skip" onClick={closeTutorial}>
              <i className="xi-angle-right"></i>
            </button>
          </h2>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            spaceBetween={12}
            modules={[Pagination]}
            onReachEnd={() => {
              setSwiperOver(true);
            }}
            className="tutorial_swiper"
          >
            <SwiperSlide className="tutorial_swiper_item">
              <div className="tutorial_swiper_img">
                <img src="tutorial/tuto1.png" alt="나만의 단어장을 만들어요" />
              </div>
              <p className="tutorial_swiper_title">나만의 단어장을 만들어요</p>
            </SwiperSlide>
            <SwiperSlide className="tutorial_swiper_item">
              <div className="tutorial_swiper_img">
                <video
                  autoPlay
                  muted
                  loop
                  src="tutorial/add.mp4"
                  title="단어를 추가하고 수정해요"
                />
              </div>
              <p className="tutorial_swiper_title">단어를 추가하고 수정해요</p>
            </SwiperSlide>
            <SwiperSlide className="tutorial_swiper_item">
              <div className="tutorial_swiper_img">
                <video
                  autoPlay
                  muted
                  loop
                  src="tutorial/custom.mp4"
                  title="내 마음대로 커스텀해요"
                />
              </div>
              <p className="tutorial_swiper_title">내 마음대로 커스텀해요</p>
            </SwiperSlide>
            <SwiperSlide className="tutorial_swiper_item">
              <div className="tutorial_swiper_img">
                <img src="tutorial/tuto2.png" alt="오늘은 무엇을 배웠나요?" />
              </div>
              <p className="tutorial_swiper_title">오늘은 무엇을 배웠나요?</p>
            </SwiperSlide>
            <SwiperSlide className="tutorial_swiper_item">
              <div className="tutorial_swiper_img">
                <img
                  src="tutorial/tuto3.png"
                  alt="내가 추가한 단어를 학습해요"
                />
              </div>
              <p className="tutorial_swiper_title">
                내가 추가한 단어를 학습해요
              </p>
            </SwiperSlide>
          </Swiper>
          <div className="tutorial_btn-fix">
            <button
              disabled={!isSwiperOver}
              className="btn-fill sizeL"
              onClick={closeTutorial}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tutorial;
