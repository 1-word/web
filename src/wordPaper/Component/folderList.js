import React, {useEffect, useState} from "react";
import useEvntHandler, {MODE} from "../../js/useEvntHandler";
import wordListStore from "../../stores/wordListStore";
import Store from "../../stores/store";



function FolderList(){
    const {folderList, setMemoStatusInit} = wordListStore(state => state);
    const {setColorPickModal, setClickedfolder} = Store(state => state);

    const onClickHandler = useEvntHandler();

    useEffect(() => {
        onClickHandler('', MODE.FOLDER_READ, '');
    }, []); 

    const handleFolderOpenModal = () => e => {
        setColorPickModal(true);
    }

    return (<div className="folder_wrap">
                <ul className="flex folder_cont">
                    <li id="allFolder" onClick={()=>{
                        setClickedfolder(-1);
                        onClickHandler('', MODE.READ);
                    }}>전체</li>
                {
                    folderList.map(item => 
                        <li key={item.folder_id} style={{ background: item.background || '#5468ff', color: item.color || '#fff'}}
                            onClick={()=>{
                                setClickedfolder(item.folder_id);
                                setMemoStatusInit();
                                onClickHandler('', MODE.READ, item.folder_id);
                            }}
                        >{item.folder_name.slice(0,2)}</li>
                    )
                }
                    <li className="xi-plus" onClick={handleFolderOpenModal()}></li>
                </ul>
            </div>
    );
}

export default FolderList;