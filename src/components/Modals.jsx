import ModalStore from "@/store/modal";
import Store from "@/store/store";
import ModalPortal from "@components/modal/ModalPortal";
import Loading from "./modal/Loading";
import React, { useEffect, useRef, createElement } from "react";
import Confirm from "./modal/Confirm";
import Alert from "./modal/alert/Alert";

function Modals(){
    const { openedModals, deleteModal, alert, setAlert, loading } = ModalStore(modal => modal);
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
    const handleClick = (idx) => e =>{
        deleteModal(idx);
    }

    /**
		 * 모달 닫기 전 각 컴포넌트에서 할 작업을 실행하고 가장 최상위에 있는 모달(팝업)을 닫는다.
		 * @param {function} propsCloseAction 닫기 전 실행할 함수
		 */
    const compCloseAction = (propsCloseAction) => e => {
        propsCloseAction();
        closeModal();
    }

		/**
		 * 가장 최상위에 있는 모달(팝업)을 닫는다.
		 */
    const closeModal = () => {
        // 최상단 모달은 배열의 가장 끝 데이터가 됨
        const idx = openedModals.length - 1 ?? 0;
        modalWrapRef.current[idx].className = "modal-wrap off";
        // modal.scss의 modal-wrap off에서 animation delay와 동일하게 변경 필요
        setTimeout(function() {
            deleteModal(idx);
        }, 150);
    }

    return (
        <>
            {/* Alert 메시지 설정, type:msg, confirm */}
            {alert.show && 
                <ModalPortal id="alert">
                    <Alert msgType={alert.msgType} message={alert.message}>
                        {alert.type === 'confirm' && alert.component}
                    </Alert>
                </ModalPortal>
            }
            {/* modal 열렸을 때 모달 뒤 요소들 클릭 못하게 막음 */}
            {
                openedModals.length > 0 && <ModalPortal id="modal-fix">
                    <div className="modal-fix" onClick={closeModal}></div>
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
																		handleClick,
																		compCloseAction
																	}
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