import React, { useRef } from "react";
import "./add.css";
import AddList from "./addList";
import wordListStore, { WORD_KEY } from "../../../stores/wordListStore";
import useEvntHandler, { MODE } from "../../../js/useEvntHandler";

function Add(props){

    const {update, saveList, setUpdateFlag, saveListClear} = wordListStore(state => state);
    const onClickHandler = useEvntHandler()

    const addframeRef = useRef();

    const handleClick = (e) => {
        let target_name = e.target.name;
        let target_id = e.target.id;
        //저장 버튼 클릭시
        if(target_name === MODE.SAVE_BTN)
            onClickHandler(e, MODE.SAVE, saveList, props.closePopup)
    }

    const synonymInputList = saveList.synonyms.map((data, idx) => (
        <AddList key={idx}
            btncls = {idx===0? "plus_btn xi-plus-circle" : "minus_btn xi-minus-circle"}
            btnname = {idx===0? "plus_btn" : "minus_btn"}
            name= {WORD_KEY.SYNONYMS}
            text= {idx===0? "유의어" : ""} 
            id = {idx}
            value = { data.synonym }
        />
    ));

    const handleElementClick = () => e => {
        if (addframeRef.current && !addframeRef.current.contains(e.target)) 
            props.closePopup();        
    }

    return  <div className="add" onClick={handleElementClick()}>
                <div ref={addframeRef} className="addframe">            
                    <button className="delete" onClick={props.closePopup}><i className="xi-close"></i> </button>
                    <div className="add7cea4238">                
                        <div className="addgrid">          
                            <AddList name="word" text="단어" value={saveList.word} ></AddList>          
                            <AddList name="mean" text="뜻" value={saveList.mean} ></AddList>
                            <AddList name="wread" text="발음" value={saveList.wread} ></AddList>
                            {synonymInputList}
                        </div>
                        <div className="btn-area">
                        <button className="save_btn" name="save_btn" onClick={handleClick}>저장</button>                   
                        </div>
                    </div>
                </div>
            </div>
}

export default Add;