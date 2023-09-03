import './load.css'

function Loading (){

    return(
        <aside className="loader-wrap">
            <div className="loader-cont">
                <div className='loader-dot'></div>
                <div className='loader-dot'></div>
                <div className='loader-dot'></div>
                <div className='loader-dot'></div>
            </div>
        </aside>
    );
}

export default Loading;