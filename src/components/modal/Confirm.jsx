import Store from '@/store/store';

function Confirm(){
    const {confirm} = Store(state=>state);

    return(
        <section className="alert-wrap">
            <div className="alert-cont">
                <div className="box">
                    <div className="alert-area">
                        <div className="alert-img-area"></div>
                        <div className="alert-txt-area">
                            <h2>{confirm.title}</h2>
                            <p>{confirm.content}</p>
                        </div>
                    </div>
                    <div className="btn-area">
                        <button className="btn btn-n" onClick={confirm.closeFunction}>아니요</button>
                        <button className="btn btn-y" onClick={confirm.executionFunction}>네</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Confirm;