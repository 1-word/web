import React, {useEffect, useState} from "react";
import useEvntHandler, {MODE} from "../../js/useEvntHandler";
import wordListStore from "../../stores/wordListStore";
import Store from "../../stores/store";



function FolderList(){
    const {update, folderList} = wordListStore(state => state);
    const {colorPick, setColorPickModal} = Store(state => state);

    const onClickHandler = useEvntHandler();

    const [clickedFolder, setClickedfolder] = useState(0);

    useEffect(() => {
        onClickHandler('', MODE.FOLDER_READ, '');
    }, []); 

    const handleFolderOpenModal = () => e => {
        setColorPickModal(true);
    }

    return (
    // <div className="folder_wrap">
    //             <ul className="flex folder_cont">
    //                 <li>
    //                     <span>
    //                         <i className="xi-cog"></i>
    //                     </span>
    //                 </li>
    //                 <li id="allFolder" onClick={()=>{
    //                     setClickedfolder(0);
    //                     onClickHandler('', MODE.READ);
    //                 }}>전체</li>
    //             {
    //                 folderList.map(item => 
    //                     <li key={item.folder_id} onClick={()=>{
    //                         setClickedfolder(item.folder_id);
    //                         onClickHandler('', MODE.READ, item.folder_id);
    //                     }}>{item.folder_name.slice(0,2)}</li>
    //                 )
    //             }
    //                 <li className="xi-plus" onClick={handleFolderOpenModal()}></li>
    //             </ul>
    // </div>
    <aside class="folder-wrap">
    <div class="folder-cont">
        <div class="folder-area">
            <div class="title-area flex">
                <h2>내 폴더</h2>
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
                <div class="title config">
                    <div class="flex">
                        <span class="folder-color"></span>
                        <h3>이름</h3>
                        <span class="close"><i class="xi-close-thin"></i></span>
                        <span class="cog"><i class="xi-cog"></i></span>
                    </div>
                </div>
            </div>
            <div class="btn-area">
                <button class="btn">추가하기</button>
            </div>
        </div>
    </div>
</aside>
    );
}

export default FolderList;