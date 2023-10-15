import ModalPortal from "@components/modal/ModalPortal";
import Alert from "@/components/modal/alert/Alert";
import Add from "@components/modal/add/Add";
import Store from "@/store/store";
import Loading from "@components/modal/Loading";
import Confirm from "@components/modal/Confirm";

function Popup(){
    const {alert, modal, loading, confirm, setModal} = Store(state=>state)
    return (
        <>
        {alert.show && <ModalPortal id="alert">
        <Alert type={alert.type} message={alert.message}></Alert>
        </ModalPortal>}
        {loading && <ModalPortal id="modal">
        <Loading></Loading>
        </ModalPortal>}
        {modal && <ModalPortal id="modal">
        <Add closePopup={() => setModal(false)}></Add>
        </ModalPortal>}
        {confirm.show && <ModalPortal id="modal">
        <Confirm></Confirm>
        </ModalPortal>}
        </>
    );
}

export default Popup;