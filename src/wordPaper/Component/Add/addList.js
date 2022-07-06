import React, { useEffect, useState, useRef } from "react";

function AddList(props){

    //state 및 변수 선언 
     let wordDatas = {"word": "",
            "mean": "",
            "wread": "",
            "memo": "",
            "synonyms": [
            ]};

    wordDatas = props.getsetDatas("get");
    
    const synonymInputRef = useRef([]);

    // 버튼 이벤트 
    const handleOnClick = e => {
        let target_name = e.target.name;
        let target_id = e.target.id-1;
        wordDatas = props.getsetDatas("get");
        //유의어 input 추가
        if(target_name === "plus_btn") {
            //let value = synonymInputRef.current[target_id].value
            //console.log(value);

            //synonymInputRef.current[target_id].value = "1234";

            const _wordDatas = {
                "word": wordDatas.word,
                "mean": wordDatas.mean,
                "wread":wordDatas.wread,
                "memo":wordDatas.memo,
                "synonyms": wordDatas.synonyms.concat({})
            };
            props.getsetDatas("set", _wordDatas);

        //유의어 input 제거     
        }else if(target_name === "minus_btn"){
            //let value = synonymInputRef.current[target_id].value
            //synonymInputRef.current[target_id].value = "1234";
            //console.log(value);
            let newSynonymsDatas = wordDatas.synonyms.filter((data, idx) => idx !== target_id);            
            console.log("[add.js, filter]: "+ newSynonymsDatas.synonym);

            const _wordDatas = {
                "word": wordDatas.word,
                "mean": wordDatas.mean,
                "wread":wordDatas.wread,
                "memo":wordDatas.memo,
                "synonyms": newSynonymsDatas
            }
            props.getsetDatas("set", _wordDatas);
            console.log("minus_btn");
        }        
    }
    

    const handleOnchange = e => {
        //부모에게서 데이터 가져옴
        wordDatas = props.getsetDatas("get");
        //변수 설정
        let target_id = e.target.id-1;
        let target_value = e.target.value;        
        let target = e.target.name;

        //단어 입력
        if(target === "word_input"){
            wordDatas.word = target_value;
        //뜻 입력
        }else if(target === "mean_input"){
            wordDatas.mean = target_value;
        //읽기 입력
        }else if(target === "wread_input"){
            wordDatas.wread = target_value;
        //유의어 입력
        }else if(target === "synonym_input"){

            /*if(target_value == ""){
                console.log("target_value is empty!");
                //값이 비었을경우 객체 삭제
                var newDatas = wordDatas2.filter((item, idx) => idx != target_id-1);
                
            }*/

            //객체 삭제 후 데이터 길이 비교 (신규 작성 여부 확인 위함)
            let wordDatas_len = wordDatas.synonyms.length

             let _data = wordDatas.synonyms;
                _data.synonym = target_value;

                //값 변경
                _data[target_id].synonym = target_value;
                //값 변경 후 추가
                wordDatas.synonyms = _data;

                // 신규 작성 여부는 버튼 이벤트에서 처리
            /*//신규 작성 여부 확인 
            if(wordDatas_len < e.target.id){ //신규 작성이면
                
                //현재 입력되어있는 변수 가져옴(배열에 객체 추가 위함)
                const synonyms = wordDatas.synonyms;
                //입력한 데이터 넣을 변수 선언
                let synonym = {};
                
                //입력한 데이터 변수에 추가
                synonym.synonym = target_value;

                //현재 배열에 해당 객체 추가
                wordDatas.synonyms = synonyms.concat(synonym);

            //신규 작성이 아니라면
            }else{
                //임시로 배열 받기 (입력받은 값 변경 위함)
                let _data = wordDatas.synonyms;
                _data.synonym = target_value;

                //값 변경
                _data[target_id-1].synonym = target_value;
                //값 변경 후 추가
                wordDatas.synonyms = _data;
          }*/
        //유의어 입력 마지막 처리

        //해당하는 이벤트 아닐 때
        }else{
            console.log("[add handleOnchange]: else")
        }

        console.log("[addList]: "+ wordDatas);
        //부모로 데이터 전송
        props.getsetDatas("set", wordDatas);

    }

    let name = props.name;
    console.log(name);
    let synonymInputList;
    let synonymData = wordDatas.synonyms;
    if (name === "synonym_input"){ 
        synonymInputList = synonymData.map((item, idx) => (
        //const synonymInputList = arr.map((item, idx) => (
        <div> text </div>/*<>
        <div className="xa20b892b">{props.text}</div>
                <input ref= {el => {
                    synonymInputRef.current[idx] = el;
                    console.log("[addList, ref["+ idx + "]: "+ synonymInputRef);
                }} className="x23876" name={props.name} type="text" id={props.id} onChange={handleOnchange}/>
                    <button className={props.btnname} name={props.btnname} id={props.id} onClick={handleOnClick} />
        </>*/
    ));
    }

    const setRef = (id, el) => {
        if (name === "synonym_input"){
            console.log("[addList] : setRef["+id+"]");
            props.getsetRef("set", id, el);
        }
    }


    return <div className="addGroup">
        {/*{name !== "synonym_input"?
            <>
                <div className="xa20b892b">{props.text}</div>
                <input className="x23876" name={props.name} type="text"onChange={handleOnchange}/>
                {{props.name === "synonym_input"?
                    <button className={props.btnname} name={props.btnname} id={props.id} onClick={handleOnClick} />
                 :null
            }}
            </>
            : {synonymInputList}
        }*/}
         <div className="xa20b892b">{props.text}</div>
                <input ref={el => (setRef(props.id-1, el))} className="x23876" name={props.name} type="text"onChange={handleOnchange}/>
                {props.name === "synonym_input"?
                    <button className={props.btnname} name={props.btnname} id={props.id} onClick={handleOnClick} />
                 :null
            }
           </div>    
}

export default AddList;