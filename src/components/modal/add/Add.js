import React, { useRef } from "react";
import AddList from "./AddList";
import wordListStore, { WORD_KEY } from "@/store/wordListStore";
import Store from "@/store/store";
import api, { MODE } from "@/services/api";
import { textTypeCheck } from "@/util/textTypeCheck";

function Add(props){

    const {saveList, saveWordList} = wordListStore(state => state);
    const {clickedFolder} = Store(state=> state);
    const onClickHandler = api();

    const addframeRef = useRef();

    const handleClick = (e) => {
        let target_name = e.target.name;
        let target_id = e.target.id;
        let resultList = {};

        resultList = saveList;

        let folder_id = clickedFolder === -1 ? "" : clickedFolder;

        resultList = {
            ...saveList,
            folder_id: folder_id,
            type: textTypeCheck(saveList.word)
        }
        
        //저장 버튼 클릭시
        if(target_name === MODE.SAVE_BTN)
            onClickHandler(e, MODE.SAVE, resultList, props.closePopup);
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

    // 영어 add
    return  <div className="add add-e" onClick={handleElementClick()}>
    <div ref={addframeRef} className="add-wrap">
        <div className="add-cont">                
            <div className="add-title flex">
                <h2 className="lang-title">영어</h2>
                <button className="delete" onClick={props.closePopup}><i className="xi-close"></i> </button>
            </div>     
            <div className="add-word-cont">          
                <AddList name="word" text="단어" value={saveList.word} ></AddList>          
                {synonymInputList}
                <AddList name="wread" text="발음" value={saveList.wread} ></AddList>
                <div className="add-v">
                    <h3>동사</h3>
                <AddList name="mean" text="과거" value={saveList.mean} ></AddList>
                <AddList name="mean" text="과거분사" value={saveList.mean} ></AddList>
                <AddList name="mean" text="현재분사" value={saveList.mean} ></AddList>
                <AddList name="mean" text="3인칭 단수" value={saveList.mean} ></AddList>
                </div>
                <div className="add-n">
                    <h3>명사</h3>
                <AddList name="mean" text="복수" value={saveList.mean} ></AddList>
                </div>
            </div>
            <div className="btn-area">
            <button className="save_btn" name="save_btn" onClick={handleClick}>저장</button>                   
            </div>
        </div>
    </div>
</div>

    // return  <div className="add" onClick={handleElementClick()}>
    //             <div ref={addframeRef} className="addframe">
    //                 <div className="add-lang flex">
    //                     <h2 className="lang-title">일본어</h2>
    //                     <button className="delete" onClick={props.closePopup}><i className="xi-close"></i> </button>
    //                 </div>        
    //                 <div className="add7cea4238">                
    //                     <div className="addgrid">          
    //                         <AddList name="word" text="단어" value={saveList.word} ></AddList>          
    //                         <AddList name="mean" text="뜻" value={saveList.mean} ></AddList>
    //                         <AddList name="wread" text="발음" value={saveList.wread} ></AddList>
    //                         {synonymInputList}
    //                     </div>
    //                     <div className="btn-area">
    //                     <button className="save_btn" name="save_btn" onClick={handleClick}>저장</button>                   
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
}

export default Add;