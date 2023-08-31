import './css/load.css'

function Loader (){

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

export default Loader;