import './css/alert.css'

function Alert(){
    return(
        <section className="alert-wrap">
            <div className="alert-cont">
                <div className="box">
                    <div className="alert-area">
                        <div className="alert-img-area"></div>
                        <div className="alert-txt-area">
                            <h2>잠깐만요!</h2>
                            <p>정말 삭제하시겠습니까?</p>
                        </div>
                    </div>
                    <div className="btn-area">
                        <button className="btn btn-n">아니요</button>
                        <button className="btn btn-y">네</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Alert;