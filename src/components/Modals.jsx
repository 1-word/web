import ModalStore from "@/store/modal";
import Store from "@/store/store";
import ModalPortal from "@components/modal/ModalPortal";
import Loading from "./modal/Loading";
import React, { useEffect, useRef, createElement } from "react";
import Confirm from "./modal/Confirm";
import Alert from "./modal/alert/Alert";

function Modals(){
    const { openedModals, deleteModal, loading } = ModalStore(modal => modal);
    const modalWrapRef = useRef([]);

    useEffect(()=>{
       if (openedModals.length > 0) {}
    //    document.body.style = 'position:fixed;overflow:hidden'
    }, )

    /**
		 * 해당하는 위치(idx)의 모달을 닫는다.
		 * 닫는 애니메이션은 없음 
		 * @param {int} idx 모달 위치
		 */
    const closeModal = (idx) => e => {
			deleteModal(idx);
    }

		/**
		 * "최상위"에 있는 모달(팝업)을 닫는다.
		 */
    const closeTopModal = () => {
        // 최상단 모달은 배열의 가장 끝 데이터가 됨
        const idx = openedModals.length - 1 ?? 0;
				// on, off로 맞춰야함
				modalWrapRef.current[0].classList.remove("on")
        modalWrapRef.current[0].classList.add("off")
        // modal.scss의 modal-wrap off에서 animation delay와 동일하게 변경 필요
        setTimeout(function() {
            deleteModal(idx);
        }, 150);
    }

		/**
		 * 일정 시간 후(애니메이션 이후) 모달을 닫는다.
		 * 
		 * @param {*} millis 애니메이션 시간 delay
		 * @param {*} idx 현재 팝업 위치
		 * @returns 
		 */
    const deleteModalAfterTime = (millis, idx) => {
			modalWrapRef.current[idx].classList.remove("on")
			modalWrapRef.current[idx].classList.add("off")
			// modal.scss의 modal-wrap off에서 animation delay와 동일하게 변경 필요
			setTimeout(function() {
					deleteModal(idx);
			}, millis);
	}

    return (
        <>
            {/* modal 열렸을 때 모달 뒤 요소들 클릭 못하게 막음 */}
            {
                openedModals.length > 0 && <ModalPortal id="modal-fix">
                    <div className="modal-fix" onClick={closeTopModal}></div>
                </ModalPortal>
            }

            <ModalPortal id="modal">
                {/* 로딩창 */}
                {loading && <Loading></Loading>}
                {/* 모달이 열렸을 때 열리는 애니메이션 주기 위한 컴포넌트 */}
                <div className={!openedModals.length > 0 ? "top-wrap" : "top-wrap on"}>
                {
                    // 등록된 모달 불러옴
                    openedModals.map((Modals, idx) =>
                        <div className="modal-wrap" key={`modals${idx}`} ref={el => modalWrapRef.current[idx] = el}>
                            <div className="modal-cont">
															{
																createElement(
																	Modals[Object.keys(Modals)[0]],
																	{
																		idx,
																		deleteModalAfterTime: (millis) => deleteModalAfterTime(millis, idx),
																		closeTopModal,
																		contents: Modals[Object.keys(Modals)[1]],
																		contentsProps: Modals[Object.keys(Modals)[2]],
																	},
																)
															}
                            </div>
                        </div>
                    )
                }
                </div>
            </ModalPortal>
        </>
    );
}

export default Modals;