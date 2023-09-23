import './colorpick.css'

function FolderCog(){
    return(
        <aside class="folder-wrap">
        <div class="folder-cont">
            <div class="folder-area">
                <div class="title-area flex">
                    <h2>폴더</h2>
                    <span>
                        <i class="xi-close"></i>
                    </span>
                </div>
                <div class="name-area">
                    <div class="name-title title flex">
                        <span class="folder-color"></span>
                        <h3>이름</h3>
                        <span class="cog"><i class="xi-cog"></i></span>
                    </div>
                    <div class="name-title title flex">
                        <span class="folder-color"></span>
                        <h3>이름</h3>
                        <span class="cog"><i class="xi-cog"></i></span>
                    </div>
                </div>
                <div class="btn-area">
                    <button class="btn">추가하기</button>
                </div>
            </div>
        </div>
    </aside>
    )
}

export default FolderCog;