import React, { useRef } from "react";
import AddList from "./AddList";
import wordListStore, { WORD_KEY } from "@/store/wordListStore";
import Store from "@/store/store";
import api, { MODE } from "@/services/api";
import { textTypeCheck } from "@/util/textTypeCheck";

function Add({children, props}){
    console.log(children, props);

    const {saveList, saveWordList} = wordListStore(state => state);
    const {clickedFolder} = Store(state=> state);
    const onClickHandler = api();

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
            onClickHandler(e, MODE.SAVE, resultList);
    }

    const synonymInputList = saveList.synonyms.map((data, idx) => (
        <AddList key={idx}
            btncls = {idx===0? "plus_btn xi-plus" : "minus_btn xi-minus"}
            btnname = {idx===0? "plus_btn" : "minus_btn"}
            name= {WORD_KEY.SYNONYMS}
            text= {idx===0? "유의어" : ""} 
            id = {idx}
            value = { data.synonym }
        />
    ));

    // 영어 add
    return  <div className="add-cont">                
                <div className="add-title flex">
                    <h2 className="lang-title">단어 추가</h2>
                </div>     
                <div className="add-word-cont">
                    <div className="add-main">
                    <AddList name="word" text="단어" value={saveList.word} ></AddList>          
                    <AddList name="mean" text="뜻" value={saveList.mean} ></AddList>
                    <AddList name="wread" text="발음" value={saveList.wread} ></AddList>
                    </div>       
                    <div className="add-sub">
                    <div className="add-title flex">
                        <h2 className="lang-title">세부사항 추가</h2>
                    </div>
                        <div>
                            <div className="sub-1">
                            <h3 className="sub-title flex">대분류 <i className="xi-cog"></i></h3>
                            <div className="box">
                                <div className="on">11</div>
                                <div>111111111111</div>
                                <div>11</div>
                                <div>11</div>
                                <div>11</div>
                                <div>11</div>
                                <div className="sub-add"><i className="xi-plus"></i></div>
                            </div>
                            </div>
                            <div className="sub-2">
                            <h3 className="sub-title flex">중분류(선택)<i className="xi-cog"></i></h3>
                            <div className="box">
                                <div className="on">11</div>
                                <div>11</div>
                                <div>11</div>
                                <div>11</div>
                                <div>11</div>
                                <div>11</div>
                                <div className="sub-add"><i className="xi-plus"></i></div>
                            </div>
                            </div>
                            <div className="sub-3 flex">
                                <div className="box flex">
                                    <div>유의어</div>
                                    <span>삭제</span>
                                </div>
                            </div>
                            <div className="sub-4">
                            {synonymInputList}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-area">
                    <button className="save_btn" name="save_btn" onClick={handleClick}>저장</button>                   
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