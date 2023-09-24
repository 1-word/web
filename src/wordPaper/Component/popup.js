import ModalPortal from "../../util/ModalPortal";
import Alert from "./Alert/alert";
import Add from "./Add/add";
import Store from "../../stores/store";
import Loading from "./loading";
import Confirm from "./confirm";
import Colorpick from "./colorpick";

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