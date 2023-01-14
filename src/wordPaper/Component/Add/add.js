import React, { useEffect, useState, useRef } from "react";
import connect from "../../../module/axiosUtil";
import "./add.css";
import AddList from "./addList";
import wordListStore from "../../../stores/wordListStore";

function Add(props){

    let datas = {"word": "",
            "mean": "",
            "wread": "",
            "memo": "",
            "synonyms": [{
            }
        ]
    };

    const synonymInputRef = useRef([]);

    //const [saveList, saveWordList] = useState(datas);
    const {saveList, saveWordList} = wordListStore(state => state);

    const handleClick = (e) => {
        let target_name = e.target.name;
        let target_id = e.target.id;
        //저장 버튼 클릭시
        if(target_name === "save_btn"){
            console.log("저장");
            console.log(saveList);
            connect("POST", "save", "", saveList)
            .then(res => {
                console.log(res);
            });
        //유의어 추가 버튼 클릭
        }
    }

    const getsetDatas = (work, _datas) => {
        //set일 때, 변수에 입력한 데이터 저장
        console.log(_datas);

        if(work === "set"){
            saveWordList(_datas);
        //get일 때, 데이터 리턴
        }else if(work === "get"){
            console.log(saveList);
            return saveList;
        }        
    }

    // const getsetRef = (work, id, el) => {
    //     if(work === "set"){
    //         console.log("set Ref!!");
    //         //synonymInputRef.current[id-1] = el;
    //     }
    // }

    function getsetRef(work, id, el){
         if(work === "set"){
            synonymInputRef.current[id] = el;
        }
    }   

    const synonymInputList = saveList.synonyms.map((data, idx) => (
        <AddList key={idx}
                 btnname = {idx===0? "plus_btn" : "minus_btn"} 
                 /*btnname = "minus_btn"*/
                 name="synonym_input" 
                 text= {"유의어" + idx} 
                 id = {idx+1}
                 getsetDatas={getsetDatas}
                 getsetRef={getsetRef}
        />
    ));

    return   <div  class="add">        
                <div  class="addframe">            
                    <div  class="squareframe"></div>
                    <button  class="delete" onClick={props.closePopup}> </button>
                <div  class="add7cea4238">                
                <button  class="save_btn" name="save_btn" onClick={handleClick}/>                    
                        <div class="addgrid">          
                            <AddList name="word_input" text="단어" getsetDatas={getsetDatas}></AddList>          
                            <AddList name="mean_input" text="뜻"  getsetDatas={getsetDatas}></AddList>
                            <AddList name="wread_input" text="발음"  getsetDatas={getsetDatas}></AddList>
                            {synonymInputList}
                            {/*<AddList 
                                name="synonym_input" 
                                text= "유의어" 
                                getsetDatas={getsetDatas}
    />*/}
                        </div>
                    </div>
                </div>
            </div>
}

export default Add;