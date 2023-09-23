import { useState, useRef } from 'react';
import useEvntHandler, {MODE} from "../../js/useEvntHandler";
import './colorpick.css'

function Colorpick(){
    const [pickColor, setPickColor] = useState({
        color: "#202020",
        background: "#fff"
    });

    const folderNameInput = useRef();

    const onClickHandler = useEvntHandler();

    // KEY값 중복 없이 입력
    const FOLDER_COLOR = {
        LIGHT_ORANGE: "#D6C45C",    //연주황
        DARK_PURPLE: "#C8D65C",     //강낭콩
        GREEN: "#6ED65C",           //초록
        PURPLE: "#D65C8B",          //자주
        SKY: "#5C74D6",              //파랑
        CIAN: "#5CB8D6",            //시안
        PINK: "#CE5CD6",            //핑크
        VIOLET: "#A35CD6",          //보라
        LIGHT_RED: "#F27F7F",     //연다홍
        MINT: "#7CE0B0",          //민트
        WIGHT: "#fff",              //흰색
        GRAY: "#989393",          //회색
        BLACK: "#202020",          //검정
        RANDOM: "RANDOM",              //랜덤
    }

    const FONT_COLOR = {
        WIGHT: "#fff",              //흰색
        GRAY: "#989393",          //회색
        BLACK: "#202020",          //검정
        RANDOM: "RANDOM",              //랜덤
    }

    const handleColorClick = (colorName, color) => e => {
        let result_color = color;
        if (color === "RANDOM") result_color = getRandomColor();
        setPickColor({
            ...pickColor,
            [colorName]: result_color
        });
    }

    function getRandomColor() {
	    return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    const handleConfirmClick = () => e => {
        const folderData = {
            ...pickColor,
            folder_name: folderNameInput.current.value
        }
        onClickHandler(e, MODE.FOLDER_SAVE, folderData);
    }

    // 컬러 KEY값 추출
    const foler_color_list = Object.keys(FOLDER_COLOR);
    const font_color_list = Object.keys(FONT_COLOR);

    return(
        <aside class="color-wrap">
        <div class="color-cont">
            <div class="color-area">
                <div class="title-area">
                    <h2>새 폴더</h2>
                </div>
                <div class="preview-area">
                    <div class="preview" style={{'--color': pickColor?.background}}>
                        <h3 style={{'color': pickColor?.color}}>미리보기</h3>
                    </div>
                </div>
                <div class="name-area">
                    <div class="name-title title">
                        <h3>이름<span>(10글자 이내로 적어주세요)</span></h3>
                    </div>
                    <div class="name-input">
                        <input ref={folderNameInput} type="text" maxlength="10"/>
                    </div>
                </div>
                <div class="pick-area">
                    <div class="pick-title title">
                        <h3>폴더 색</h3>
                    </div>
                    <div class="wrap">
                        <div class="area">
                            { 
                                foler_color_list.map(key => 
                                    <span className="color" style={{ '--color': FOLDER_COLOR[key] }} 
                                    onClick={handleColorClick("background", FOLDER_COLOR[key])}></span>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div class="pick-area">
                    <div class="pick-title title">
                        <h3>글자 색</h3>
                    </div>
                    <div class="wrap">
                        <div class="area">
                            { 
                                font_color_list.map(key => 
                                    <span className="color" style={{ '--color': FONT_COLOR[key] }} 
                                    onClick={handleColorClick("color", FONT_COLOR[key])}></span>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='btn-area flex'>
                    <button className='btn'>취소</button>
                    <button className='btn' onClick={handleConfirmClick()}>확인</button>
                </div>
            </div>
        </div>
    </aside>
    )
}

export default Colorpick;