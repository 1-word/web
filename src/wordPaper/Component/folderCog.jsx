import './colorpick.css'
import Store, {COMM_MODE} from '../../stores/store';
import wordListStore from '../../stores/wordListStore';
import useEvntHandler, {MODE} from '../../js/useEvntHandler';
import { useState } from 'react';

function FolderCog(){
    const {setFolderCog, setColorPickPop, folderCog} = Store(state => state);
    const {folderList} = wordListStore(state => state);

    const [clickedFolderId, setClickedFolderId] = useState({
        folder_id: -1
    });

    const onClickHandler = useEvntHandler();

    const handleFolderNameClick = (folder_id) => e => {
        setClickedFolderId({
            folder_id: folder_id
        });
    }


    const handleFolderMoveClick = () => e => {
        onClickHandler(e, MODE.WORD_FOLDER_UPDATE, folderCog.word_id, clickedFolderId);
    }

    return(
        <aside class="folder-wrap">
        <div class="folder-cont">
            <div class="folder-area">
                <div class="title-area flex">
                    <h2>폴더</h2>
                    <span onClick={setFolderCog}>
                        <i class="xi-close"></i>
                    </span>
                </div>
                <div class="name-area">
                    {
                        folderList.map((item, idx) => 
                            <div key={'fl'+item.folder_id} class="name-title title flex" onClick={handleFolderNameClick(item.folder_id)}>
                                <span class="folder-color" style={{background: item.background}}></span>
                                <h3>{item.folder_name}</h3>
                                <div className='icon-area flex'>
                                { folderCog.mode === COMM_MODE.EDIT &&
                                    <span class="cog">
                                        <i class="xi-cog" onClick={()=> setColorPickPop({
                                        folder_id: item.folder_id,
                                        folder_name: item.folder_name,
                                        color: item.color,
                                        background: item.background,
                                        mode: COMM_MODE.EDIT,
                                        show: true
                                        })}></i>
                                    </span>
                                }
                                    <span>
                                        <i className='xi-close'></i>
                                    </span>
                                </div>
                            </div>
                        )
                    }
                </div>
                { folderCog.mode === COMM_MODE.MOVE &&
                    <div class="btn-area">
                        <button class="btn" onClick={handleFolderMoveClick()}>이동하기</button>
                    </div>
                }
            </div>
        </div>
    </aside>
    )
}

export default FolderCog;