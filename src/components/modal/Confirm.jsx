import ModalStore from "@/store/modal";

function Confirm(){

    const {alert, setAlert} = ModalStore(state=>state);

    const handleCancle = () => {
        if (alert?.closeFunction)
            alert.closeFunction();
        setAlert({show:false});
    }

    const handleSubmit = () => {
        if (alert?.executionFunction)
            alert.executionFunction();
        setAlert({show:false});
    }

    return(
        <section className="alert-wrap vb-pop">
            <div className="alert-cont vb-pop-wrap">
                <div className="alert-box vb-pop-cont">
                    <div className="alert-area">
                        <div className="alert-img-area"></div>
                        <div className="alert-txt-area">
                            <h2>{alert?.title ?? "확인"}</h2>
                            <p>{alert?.content ?? ""}</p>
                        </div>
                    </div>
                    <div className="alert-btn vb-pop_btn">
                        <button className="btn-light sizeS" onClick={handleCancle}>아니요</button>
                        <button className="btn-fill sizeS" onClick={handleSubmit}>네</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Confirm;