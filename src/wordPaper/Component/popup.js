import ModalPortal from "../../util/ModalPortal";
import Alert from "./Alert/alert";
import Add from "./Add/add";
import Store from "../../stores/store";

function Popup(){
    const {alert, modal, setModal} = Store(state=>state)
    return (
        <>
        {alert.show && <ModalPortal id="alert">
        <Alert type={alert.type} message={alert.message}></Alert>
        </ModalPortal>}
        {modal && <ModalPortal id="modal">
        <Add closePopup={() => setModal(false)}></Add>
        </ModalPortal>}
        </>
    );
}

export default Popup;