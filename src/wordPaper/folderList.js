import React, {useEffect, useState} from "react";
import useEvntHandler, {MODE} from "../js/useEvntHandler";
import wordListStore from "../stores/wordListStore";



function FolderList(){
    const {update, folderList} = wordListStore(state => state);

    const onClickHandler = useEvntHandler();

    const [clickedFolder, setClickedfolder] = useState(0);

    useEffect(() => {
        onClickHandler('', MODE.FOLDER_READ, '');
    }, []); 


    return (<div className="folder_wrap">
                <ul className="flex folder_cont">
                    <li id="allFolder" onClick={()=>{
                        setClickedfolder(0);
                        onClickHandler('', MODE.READ);
                    }}>전체</li>
                {
                    folderList.map(item => 
                        <li onClick={()=>{
                            setClickedfolder(item.folder_id);
                            onClickHandler('', MODE.READ, item.folder_id);
                        }}>{item.folder_name.slice(0,2)}</li>
                    )
                }
                    <li className="xi-plus"></li>
                </ul>
            </div>
    );
}

export default FolderList;