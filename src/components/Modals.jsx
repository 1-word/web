import ModalStore from "@/store/modal";
import Store from "@/store/store";
import ModalPortal from "@components/modal/ModalPortal";
import Loading from "./modal/Loading";
import { useRef } from "react";
import Alert from "./modal/alert/Alert";

function Modals(){
    const { openedModals, deleteModal } = ModalStore(modal => modal);
    const { loading, alert } = Store(state=>state);
    const modalWrapRef = useRef([]);
    
    const handleClick = (idx) => e =>{
        console.log(idx);
        deleteModal(idx);
    }

    // callBack으로 작성,,
    // const closeAction = () => (propsCloseAction) => {
    //     propsCloseAction
    // }

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
        {/* 로딩 컴포넌트 및 alert 메시지 설정 */}
        {loading && <ModalPortal id="modal"><Loading></Loading></ModalPortal>}
        {alert.show && <ModalPortal id="alert"><Alert type={alert.type} message={alert.message}></Alert></ModalPortal>}
        {
            openedModals.length > 0 && <ModalPortal id="modal-fix">
                <div className="modal-fix" onClick={closeModal}></div>
            </ModalPortal>
        }
        <ModalPortal id="modal">
            <div className={!openedModals.length > 0 ? "top-wrap" : "top-wrap on"}>
        {
            openedModals.map((Modals, idx) =>
                <div className="modal-wrap" key={`modals${idx}`} ref={el => modalWrapRef.current[idx] = el}>
                    <div className="modal-cont">
                        <div className="close-area">
                            <button className="delete" 
                            onClick={closeModal}><i className="xi-close"></i></button>
                        </div>
                        { Modals[Object.keys(Modals)[0]] }
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