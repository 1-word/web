import React, { useEffect, useState, useRef } from "react";
import connect from "../../../util/axiosUtil";
import "./add.css";
import AddList from "./addList";
import wordListStore from "../../../stores/wordListStore";

function Add(props){

    const {saveList, saveWordList, saveListClear} = wordListStore(state => state);

    const handleClick = (e) => {
        let target_name = e.target.name;
        let target_id = e.target.id;
        //저장 버튼 클릭시
        if(target_name === "save_btn"){
            async function saveWordData(){
                const result = await connect("POST", "save", "", saveList)
                saveWordList(saveList);
                saveListClear();
            }
            saveWordData();
        }
    }

    const synonymInputList = saveList.synonyms.map((data, idx) => (
        <AddList key={idx}
            btnname = {idx===0? "plus_btn" : "minus_btn"} 
            name="synonym_input" 
            text= {idx===0? "유의어" : ""} 
            id = {idx}
            value = { data.synonym }
        />
    ));

    return  <div  class="add">        
                <div  class="addframe">            
                    <div  class="squareframe"></div>
                    <button  class="delete" onClick={props.closePopup}> </button>
                    <div  class="add7cea4238">                
                        <button  class="save_btn" name="save_btn" onClick={handleClick}/>                    
                        <div class="addgrid">          
                            <AddList name="word_input" text="단어" value={saveList.word} ></AddList>          
                            <AddList name="mean_input" text="뜻" value={saveList.mean} ></AddList>
                            <AddList name="wread_input" text="발음" value={saveList.wread} ></AddList>
                            {synonymInputList}
                        </div>
                    </div>
                </div>
            </div>
}

export default Add;