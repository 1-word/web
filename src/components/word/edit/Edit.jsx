import { useEffect, useRef, useState } from "react";
import api, { MODE } from "@/services/api";

function Edit(props){
    const edit_cont = useRef();
    const [synonymList, setSynonymList] = useState(props.synonyms);
    const [editWordList, setEditWordList] = useState({
        word: props.word,
        mean: props.mean,
        wread: props.wread
    });
    const onClickHandler = api()

    const addSynonym = () => {
        let addList = {synonym: ""};
        setSynonymList([...synonymList, addList]);
    }

    const minusSynonym = idx => e => {
        const deleteList = synonymList.filter((item, i) => i !== idx);
        setSynonymList(deleteList);
    }

    const changeSynonym = idx => e => {
        const updatedList = synonymList.map((item, i) => i === idx ? { ...item, synonym: e.target.value } : item);
        setSynonymList(updatedList);      
    }

    const handleChangeMean = () => e => {
        setEditWordList(preList => ({
            ...preList,
            mean: e.target.value
        }));
    }

    const handleChangeWread = () => e => {
        setEditWordList(preList => ({
            ...preList,
            wread: e.target.value
        }));
    }

    const handleClickSave = () => {
        const saveList = {
            ...editWordList,
            synonyms: [...synonymList]
        }

        onClickHandler('', MODE.UPDATE, props.word_id, saveList);
        props.setEditExit();
    }

    return <div className="word_cont">
                <div className="word edit" ref={edit_cont}>
                    <div className="top_area flex">
                        <span>{props?.word}word</span>
                        <button className="headset"><i className="xi-headset"></i></button>
                    </div>
                    <div className="mid_area">
                        <div className="input_wrap">
                            <span>발음</span>
                            <input type="text" defaultValue={editWordList.wread} onChange={handleChangeWread()} className="edit_input"/>
                        </div>
                        <div className="input_wrap">
                            <span>뜻</span>
                            <input type="text" defaultValue={editWordList.mean} onChange={handleChangeMean()} className="edit_input"/>
                        </div>
                        <div className="input_wrap">
                            <span>유의어</span>
                            <div className="add_cont flex">
                                {/* {
                                    synonymList.map((_synonym, idx) =>                                        
                                        <div className="add_list flex" key={idx}>                                    
                                            <input type="text" value={_synonym.synonym} 
                                                    onChange={changeSynonym(idx)}/>
                                            <button onClick={minusSynonym(idx)}><i className="xi-close"></i></button>
                                        </div>       
                                    )
                                } */}
                                <button className="add_plus" onClick={addSynonym}><i className="xi-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="edit_foot flex">
                            <button className="btn-light sizeS" onClick={props.setEditExit}>취소</button>
                            <button className="btn-fill sizeS" onClick={handleClickSave}>수정</button>
                    </div>
                </div>
            </div>
}

export default Edit;