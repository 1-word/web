import { useEffect, useRef, useState } from "react";
import useEvntHandler, { MODE } from "../../../js/useEvntHandler";

function Edit(props){
    const edit_cont = useRef();
    const [synonymList, setSynonymList] = useState(props.synonyms);
    const [editWordList, setEditWordList] = useState({
        word: props.word,
        mean: props.mean,
        wread: props.wread
    });
    const onClickHandler = useEvntHandler()

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
                        <span>{props?.word}</span>
                        <button className="headset"><i className="xi-headset"></i></button>
                    </div>
                    <div className="mid_area">
                    <input defaultValue={editWordList.wread} onChange={handleChangeWread()} className="edit_input"/>
                        <div className="mean_wrap">
                            <input defaultValue={editWordList.mean} onChange={handleChangeMean()} className="edit_input"/>
                        </div>
                        <div className="synonym_wrap">
                            <span>유의어</span>
                            <div className="synonym_cont flex">
                                {
                                    synonymList.map((_synonym, idx) =>                                        
                                        <div className="synonym_add flex" key={idx}>                                    
                                            <input value={_synonym.synonym} 
                                                    onChange={changeSynonym(idx)}/>
                                            <button onClick={minusSynonym(idx)}><i className="xi-minus-circle"></i></button>
                                        </div>       
                                    )
                                }
                                <div className="flex synonym_plus_cont">
                                <button className="synonym_plus" onClick={addSynonym}><i className="xi-plus-circle"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="foot_area flex">
                        <div></div>
                        <div className="btn_area">
                            <button className="check" onClick={handleClickSave}><i className="xi-check-circle-o"></i></button>
                            {/* <button className="memo"><i className="xi-comment-o"></i></button> */}
                            <button className="close" onClick={props.setEditExit}><i className="xi-close"></i></button>
                        </div>
                    </div>
                </div>
            </div>
}

export default Edit;