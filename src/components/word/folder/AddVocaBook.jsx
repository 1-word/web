import { useState, useRef, useEffect } from 'react';
import api, {MODE} from "@/services/api";
import Store, {COMM_MODE} from '@/store/store';
import { compileAsync } from 'sass';

function AddFolder({
    prevFolder,
    setFolderList,
    deleteModalAfterTime
}){
    const [folderInfo, setfolderInfo] = useState({});

    useEffect(() => {
        if (prevFolder) {
            setfolderInfo(prevFolder);
        }
    }, []);

    const nameInput = useRef();

    const onClickHandler = api();

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
        setfolderInfo({
            ...folderInfo,
            [colorName]: result_color
        });
    }

    function getRandomColor() {
	    return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    const handleConfirmClick = () => async(e) => {
        const folderData = {
            ...folderInfo,
            name: nameInput.current.value
        }
        
        // 수정
        if (prevFolder){
            const res = await onClickHandler(e, MODE.FOLDER_UPDATE, prevFolder.wordBookId, folderData);
            setFolderList(prev => {
                    return prev.map(folder => folder.wordBookId === prevFolder.wordBookId 
                        ? res
                        : folder
                    )
            });
            deleteModalAfterTime(0);
            return;
        }

        // 신규
        const res = await onClickHandler(e, MODE.FOLDER_SAVE, folderData);
        setFolderList(prev => {
            return [...prev, res]
        });
        deleteModalAfterTime(0);
    }

    // 컬러 KEY값 추출
    const foler_color_list = Object.keys(FOLDER_COLOR);
    const font_color_list = Object.keys(FONT_COLOR);

    return(
        <div className="color-cont">
            <div className="color-preview-area">
                <div className="preview" style={{'--color': folderInfo?.background}}>
                    <h3 style={{'color': folderInfo?.color}}>미리보기</h3>
                </div>
            </div>
            <div className="color-list">
                <div className="color-title">
                    <h3>이름 (10글자 이내로 적어주세요)</h3>
                </div>
                <div>
                    <input ref={nameInput} type="text" maxLength="10" defaultValue={folderInfo?.name}/>
                </div>
            </div>
            <div className="color-pick-area color-list">
                <div className="color-title">
                    <h3>단어장 색을 설정해주세요 (선택)</h3>
                </div>
                <div className="color-pick">
                    <div className="area">
                        { 
                            foler_color_list.map((key, idx) => 
                                <span key={`fcl${idx}`} className={FOLDER_COLOR[key] === folderInfo.background ? "color on" : "color"} style={{ '--color': FOLDER_COLOR[key] }} 
                                onClick={handleColorClick("background", FOLDER_COLOR[key])}></span>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='modal_full_btn_wrap'>
                <button className='btn-fill sizeL' onClick={handleConfirmClick()}>단어장 추가</button>
            </div>
        </div>
    )
}

export default AddFolder;