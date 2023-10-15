import Store, {COMM_MODE} from '@/store/store';
import wordListStore from '@/store/wordListStore';
import api, {MODE} from '@/services/api';

function FolderCog(){
    const {setFolderCog, setColorPickPop, folderCog} = Store(state => state);
    const {folderList} = wordListStore(state => state);

    const onClickHandler = api();

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
        <aside className="add folder-wrap">
        <div className="add-wrap folder-cont">
            <div className=" add-cont folder-area">
                <div className="add-title title-area flex">
                    <h2>폴더</h2>
                    <span className='delete' onClick={setFolderCog}>
                        <i className="xi-close"></i>
                    </span>
                </div>
                <div className="name-area">
                    {
                        folderList.map((item, idx) => 
                            <div key={'fl'+item.folder_id} className="name-title title flex" onClick={handleFolderNameClick(item.folder_id)}>
                                <span className="folder-color" style={{background: item.background}}></span>
                                <h3>{item.folder_name}</h3>
                                <div className='icon-area flex'>
                                { folderCog.mode === COMM_MODE.EDIT &&
                                    <span className="cog">
                                        <i className="xi-cog" onClick={handleFolderEditClick(item)}></i>
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
            </div>
        </div>
    </aside>
    )
}

export default FolderCog;