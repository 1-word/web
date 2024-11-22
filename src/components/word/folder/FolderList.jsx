import React, {useEffect, useState} from "react";
import api, {MODE} from "@/services/api";
import wordListStore from "@/store/wordListStore";
import Store, { COMM_MODE } from "@/store/store";
import { useModal } from "@/hook/_hooks";
import Colorpick from "@components/word/folder/Colorpick";
import FolderCog from "@components/word/folder/FolderCog";

function FolderList(){
    const {folderList, setMemoStatusInit} = wordListStore(state => state);
    const {clickedFolder, setColorPickModal, setClickedfolder, setFolderCog, setColorPickPop} = Store(state => state);
    
    const [openColorPick, closeColorPick ] = useModal("colorPick");
    const [openConfig, closeConfig ] = useModal("config");

    const onClickHandler = api();

    useEffect(() => {
    }, []); 

    const handleAddClick = () => {
        openColorPick(<Colorpick></Colorpick>)
    }

    const handleConfigClick = () => {
        const config = {
            mode: COMM_MODE.EDIT
        }
        openConfig(<FolderCog folderCog={config}></FolderCog>)
    }

    return (
            <div className="folder_wrap">
								{/* 미니헤더 컴포넌트 */}
								<header className="mini flex">
									<button className="back xi-angle-left"></button>
									<h2 className="title">내 단어장</h2>
									<button className="close xi-close"></button>
								</header>
								{/* 미니헤더 컴포넌트 */}
								<div className="folder_cont">
								<div className="folder_top flex">
                    <button onClick={handleConfigClick}>단어장 관리</button>
										<button className="folder_plus" onClick={handleAddClick}>새 단어장 만들기<i className="xi-plus"></i></button>
								</div>
                <ul className="folder_lists flex">
                    <li id="allFolder" onClick={()=>{
                        setClickedfolder(-1);
                        onClickHandler('', MODE.READ);
                    }}>전체</li>
                {
                    folderList.map(item => 
                        <li className={clickedFolder === item.folder_id? "on" : "off"} key={item.folder_id} style={{ background: item.background || '#5468ff', color: item.color || '#fff'}}
                            onClick={()=>{
                                setClickedfolder(item.folder_id);
                                setMemoStatusInit();
                                onClickHandler('', MODE.READ, item.folder_id);
                            }}
                        >{item.folder_name.slice(0,2)}</li>
                    )
                }
                    
                </ul>
								</div>
            </div>
        );
    }

export default FolderList;