import ModalStore from "@/store/modal";
import Store from "@/store/store";
import ModalPortal from "@components/modal/ModalPortal";
import Loading from "./modal/Loading";
import React, { useEffect, useRef } from "react";
import Confirm from "./modal/Confirm";
import Alert from "./modal/alert/Alert";
import Add from "@/components/modal/add/Add";

function Modals(){
    const { openedModals, deleteModal, alert, setAlert, loading } = ModalStore(modal => modal);
    const modalWrapRef = useRef([]);

    useEffect(()=>{
       if (openedModals.length > 0) {}
    //    document.body.style = 'position:fixed;overflow:hidden'
    }, )
    
    const handleClick = (idx) => e =>{
        // console.log(idx);
        deleteModal(idx);
    }

    
    const compCloseAction = (propsCloseAction) => e => {
        propsCloseAction();
        closeModal();
    }

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
            {/* modal 열렸을 때 모달 뒤 요소들 클릭 못하게 막고 modal외 다른 요소 클릭했을 때 닫음 */}
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
                                <div className="close-area">
                                    <button className="delete" onClick={closeModal}><i className="xi-close"></i></button>
                                </div>
                                {Modals[Object.keys(Modals)[0]]}
                                
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