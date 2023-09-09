import './Colorpick.css'

function Colorpick (){

    return(
        <aside class="color-wrap">
        <div class="color-cont">
            <div class="color-area">
                <div class="title-area">
                    <h2>새 폴더</h2>
                </div>
                <div class="preview-area">
                    <div class="preview">
                        <h3>미리보기</h3>
                    </div>
                </div>
                <div class="name-area">
                    <div class="name-title title">
                        <h3>이름<span>(10글자 이내로 적어주세요)</span></h3>
                    </div>
                    <div class="name-input">
                        <input type="text" maxlength="10"/>
                    </div>
                </div>
                <div class="pick-area">
                    <div class="pick-title title">
                        <h3>폴더 색</h3>
                    </div>
                    <div class="wrap">
                        <div class="area">
                            <span class="color" style="--color:#D6C45C">연한주황색</span>
                            <span class="color" style="--color:#C8D65C">강낭콩색</span>
                            <span class="color" style="--color:#6ED65C">초록색</span>
                            <span class="color" style="--color:#D65C8B">자주색</span>
                            <span class="color" style="--color:#5C74D6">파란색</span>
                            <span class="color" style="--color:#5CB8D6">시안</span>
                            <span class="color" style="--color:#CE5CD6">핑크색</span>
                            <span class="color" style="--color:#A35CD6">보라색</span>
                            <span class="color" style="--color:#F27F7F">연한다홍색</span>
                            <span class="color" style="--color:#7CE0B0">민트색</span>
                            <span class="color" style="--color:#fff">흰색</span>
                            <span class="color" style="--color:#989393">회색</span>
                            <span class="color" style="--color:#202020">검정색</span>
                            <span class="color" style="--color:#D6C45C">랜덤색상</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
    )
}

export default Colorpick;