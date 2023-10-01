import './colorpick.css'
import Store, {COMM_MODE} from '../../stores/store';
import wordListStore from '../../stores/wordListStore';
import useEvntHandler, {MODE} from '../../js/useEvntHandler';
import { useState } from 'react';

function FolderCog(){
    const {setFolderCog, setColorPickPop, folderCog} = Store(state => state);
    const {folderList} = wordListStore(state => state);

    const onClickHandler = useEvntHandler();

    const handleFolderNameClick = (folder_id) => e => {
        if (folderCog.mode === COMM_MODE.MOVE){
            onClickHandler(e, MODE.WORD_FOLDER_UPDATE, folderCog.word_id, {folder_id: folder_id});
            setFolderCog({show:false});
        }
    }

    const handleFolderEditClick = (item) => e => {
        setColorPickPop({
            folder_id: item.folder_id,
            folder_name: item.folder_name,
            color: item.color,
            background: item.background,
            mode: COMM_MODE.EDIT,
            show: true
        });
    }

    return(
        <aside className="folder-wrap">
        <div className="folder-cont">
            <div className="folder-area">
                <div className="title-area flex">
                    <h2>폴더</h2>
                    <span onClick={setFolderCog}>
                        <i className="xi-close"></i>
                    </span>
                </div>
                <div className="name-area">
                    {
                        folderList.map((item, idx) => 
                            <div key={'fl'+item.folder_id} className="name-title title flex" onClick={handleFolderNameClick(item.folder_id)}>
                                <span className="folder-color" style={{background: item.background}}></span>
                                <h3>{item.folder_name}</h3>

                                { folderCog.mode === COMM_MODE.EDIT &&
                                    <span className="cog">
                                        <i className="xi-cog" onClick={handleFolderEditClick(item)}></i>
                                    </span>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </aside>
    )
}

export default FolderCog;