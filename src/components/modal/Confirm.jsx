import ModalStore from "@/store/modal";

function Confirm({
	idx,
	title,
	content,
	submit,
	deleteModalAfterTime
}){

    const handleCancle = (millis) => e => {
			deleteModalAfterTime(millis);
    }

    const handleSubmit = () => {
			if (submit) {
				submit();
			}
			deleteModalAfterTime(0);
    }

    return(
        <section className="alert-wrap">
					<div className="alert-area">
							<div className="alert-img-area"></div>
							<div className="alert-txt-area">
									<h2>{title ?? "확인"}</h2>
									<p>{content ?? ""}</p>
							</div>
					</div>
					<div className="alert-btn vb-pop_btn">
							<button className="btn-light sizeS" onClick={handleCancle(0)}>아니요</button>
							<button className="btn-fill sizeS" onClick={(handleSubmit)}>네</button>
					</div>
        </section>
    )
}

export default Confirm;