import Store, {COMM_MODE} from '@/store/store';
import wordListStore from '@/store/wordListStore';
import api, {MODE} from '@/services/api';
import { useModal } from '@/hook/_hooks';
import Colorpick from '@/components/word/folder/AddVocaBook';
import { useState } from 'react';

function FolderCog({folderCog}){
    const {folderList} = wordListStore(state => state);
    const [openModal] = useModal("colorPick");

    const [clickedFolderId, setClickedFolderId] = useState({
        folder_id: -1
    });
  
    const onClickHandler = api();

    const handlenameClick = (folder_id) => e => {
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

    const handleFolderDelete = (folderId) => e =>{
        onClickHandler(e, MODE.FOLDER_DELETE, folderId);
    }

    return(
        <div className="add-cont folder-cont">
            <ul className="add-area folder-lists">
                {
                    folderList.map((item, idx) => 
                        <li key={'fl'+item.folder_id} className="folder-list flex" onClick={handlenameClick(item.folder_id)}>
                            <span className="folder-color" style={{background: item.background}}></span>
                            <h3>{item.folder_name}</h3>
                            <div className='icon-area flex'>
                            { folderCog?.mode === COMM_MODE.EDIT &&
                                <>
                                    <span className="cog">
                                        <i className="xi-cog" onClick={handleFolderEditClick(item)}></i>
                                    </span>
                                    <span>
                                    <i className='xi-close' onClick={handleFolderDelete(item.folder_id)}></i>
                                    </span>
                                </>
                            }
                                
                            </div>
                        </li>
                    )
                }
            </ul>
            { folderCog.mode === COMM_MODE.MOVE &&
                <div className="btn-area">
                    <button className="btn-fill sizeM" onClick={handleFolderMoveClick()}>이동하기</button>
                </div>
            }
        </div>
    )
}

export default FolderCog;