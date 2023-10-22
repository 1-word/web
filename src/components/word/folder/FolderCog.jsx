import Store, {COMM_MODE} from '@/store/store';
import wordListStore from '@/store/wordListStore';
import api, {MODE} from '@/services/api';
import { useModal } from '@/hook/_hooks';
import Colorpick from '@components/word/folder/Colorpick';
import { useState } from 'react';

function FolderCog({folderCog}){
    const {folderList} = wordListStore(state => state);
    const [openModal] = useModal("colorPick");

    const [clickedFolderId, setClickedFolderId] = useState({
        folder_id: -1
    });
  
    const onClickHandler = api();

    const handleFolderNameClick = (folder_id) => e => {
        setClickedFolderId({
            folder_id: folder_id
        });
    }

    const handleFolderMoveClick = () => e => {
        if (folderCog.mode === COMM_MODE.MOVE){
        onClickHandler(e, MODE.WORD_FOLDER_UPDATE, folderCog.word_id, clickedFolderId);
        }
    }


    const handleFolderEditClick = (item) => e => {
        const editData = {
            folder_id: item.folder_id,
            folder_name: item.folder_name,
            color: item.color,
            background: item.background,
            mode: COMM_MODE.EDIT
        }
        openModal(<Colorpick colorPickPop={editData}></Colorpick>)
    }

    return(
        <div className=" add-cont folder-area">
            <div className="add-title title-area flex">
                <h2>폴더</h2>
            </div>
            <div className="name-area">
                {
                    folderList.map((item, idx) => 
                        <div key={'fl'+item.folder_id} className="name-title title flex" onClick={handleFolderNameClick(item.folder_id)}>
                            <span className="folder-color" style={{background: item.background}}></span>
                            <h3>{item.folder_name}</h3>
                            <div className='icon-area flex'>
                            { folderCog?.mode === COMM_MODE.EDIT &&
                                <>
                                    <span className="cog">
                                        <i className="xi-cog" onClick={handleFolderEditClick(item)}></i>
                                    </span>
                                    <span>
                                    <i className='xi-close'></i>
                                    </span>
                                </>
                            }
                                
                            </div>
                        </div>
                    )
                }
            </div>
            { folderCog.mode === COMM_MODE.MOVE &&
                <div className="btn-area">
                    <button className="btn" onClick={handleFolderMoveClick()}>이동하기</button>
                </div>
            }
        </div>
    )
}

export default FolderCog;