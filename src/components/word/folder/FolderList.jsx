import React, {useEffect, useState} from "react";
import api, {MODE} from "@/services/api";
import wordListStore from "@/store/wordListStore";
import Store, { COMM_MODE } from "@/store/store";
import { useModal } from "@/hook/_hooks";
import Colorpick from "@components/word/folder/Colorpick";
import FolderCog from "@components/word/folder/FolderCog";

function FolderList(){
    const {folderList, setMemoStatusInit, mode} = wordListStore(state => state);
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

    const handleAllFolderClck = () => {
        setClickedfolder(-1);
        onClickHandler('', mode.toLowerCase(), {folder_id:-1});
    }

    const handleFolder = (folder_id) => e =>{
        setClickedfolder(folder_id);
        setMemoStatusInit();
        onClickHandler('', mode.toLowerCase(), {folder_id:folder_id});
    }

    return (
            <div className="folder_wrap">
                <ul className="flex folder_cont">
                    <li onClick={handleConfigClick}>
                        <span>
                            <i className="xi-cog"></i>
                        </span>
                    </li>
                    <li id="allFolder" onClick={handleAllFolderClck}>전체</li>
                {
                    folderList.map(item => 
                        <li className={clickedFolder === item.folder_id? "on" : "off"} key={item.folder_id} style={{ background: item.background || '#5468ff', color: item.color || '#fff'}}
                            onClick={handleFolder(item.folder_id)}
                        >{item.folder_name.slice(0,2)}</li>
                    )
                }
                    <li className="xi-plus" onClick={handleAddClick}></li>
                </ul>
            </div>
        );
    }

export default FolderList;