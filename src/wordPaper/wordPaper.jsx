import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./wordPaper.css";
import SynonsymsList from "./Component/synonymsList";
import Add from "./Component/Add/add";
import ModalPortal from "../util/ModalPortal";
import connect from "../util/axiosUtil";
import Alert from "./Component/Alert/alert";
import wordListStore from "../stores/wordListStore";

//class WordPaper extends React.Component {
function WordPaper(){
    // Store 사용
    const {wordList, createWordList, updateWordList, deleteWordList, saveListClear} = wordListStore(state => state);


    const [state, setState] = useState({
        modal: false
    })

    //var datasList = [];
    //var datasList = datas;

    useEffect(() => {        
        console.log('1234');
        async function getWordData(){
            const result = await connect("get", "read", "");
            createWordList(result.list);
        }
        getWordData();
    }, []);

   // 버튼 이벤트 
    const handleClick = (mode, e) => {
        console.log("[mode]: "+ mode+ "// [id]: ", e.target.id);
        if(mode === "search"){
            //검색API 호출 ex) {project_url}:{port}/search/1
          let searchText = document.getElementById("search_input").value;
          console.log(searchText);
        //   const data = connect("get", "search", searchText)
        //   console.log("[wordSearch]: ", data)
          connect("get", "search", searchText)
            .then(res => {
            console.log("[wordSearch]: ", res)
            let wordListrequest = res.list
            //검색한 데이터 저장
            if(Array.isArray(wordListrequest)){
                createWordList(wordListrequest)
            }else{
                let arr = []
                arr.push(wordListrequest)
                createWordList(arr)
            }
          });
        }else if (mode === "delete"){
            //삭제API 호출 ex) {project_url}:{port}/remove/1
           connect("delete", "remove", e.target.id)
                .then(res =>{
                    console.log(res)
                });
           console.log("[wordDelete]: ");  
        }
        
        /*axios.delete('http://localhost:8088/remove/'+ e.target.id)
        .then((res) =>{
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })*/
    }

    // 팝업 이벤트
    const handleModal = (flag) => {
        if (flag === "open"){
            console.log("open")
            setState({modal:true})
        }
        else if(flag === "close"){
            setState({modal:false})
            saveListClear()
        }
        console.log(state.modal)
    }

    const onSearchHandler = (e) => {
        console.log("[input id]: ", e.target.id)
        //검색API 호출 ex) {project_url}:{port}/search/1
        //let searchText = document.getElementById("search_input").value
        let searchText = e.target.value
        console.log(searchText)
        if (searchText === "") searchText = "all"
        connect("get", "search", searchText)
            .then(res => {
            console.log("[wordSearch]: ", res)
            let wordListrequest = res.list
            //검색한 데이터 저장
            if(Array.isArray(wordListrequest)){
                createWordList(wordListrequest)
            }else{
                let arr = []
                arr.push(wordListrequest)
                createWordList(arr)
            }
        });
    }


    const dataList = wordList.map((data, idx) => {
    return <div  className="frame" key={data?.word_id}>  {/*단어 출력   */}
            <div  className="frame83f7e349"> 
                <div  className="wordea5202cf">
                    <SynonsymsList synonyms={data?.synonyms}></SynonsymsList>
                    <div  className="x16d628d6">{data?.word}</div>
                    <div className="x465a364d58"></div>
                    <div  className="xe5e28e22">
                        <div  className="bgd197c3b9"></div>
                        <div  className="x5ee0a870">유의어</div>
                    </div>
                    <div  className="xf63f2ca8">{data?.wread}</div>
                </div>
                <div  className="xd106727b">
                    <div  className="x4154b626">{data?.mean}</div>
                    <div  className="xb9a31159">
                        <button id={data?.word_id} class="delete_btn" onClick={e => {handleClick("delete", e)}}/>                            
                        <div  className="x471465d67bb6"></div>
                    </div> 
                </div>
            </div>
        <div className="x47abd6047f"> </div>
    </div>;
});

    return (
          <div  className="wordPaper">        
            <div  className="x8bc1b3ee">            
                <div  className="x18458">                
                    <button className="search_btn" id="search_btn" onClick={ e => {handleClick("search", e)}}></button>
                </div>
                <div  className="xf958f200">
                    <input class="text_input" id="search_input" placeholder="" type="text" required="" onChange={onSearchHandler}/>
                </div>
            </div> 
        <button className="plus_btn" id="plus_btn" onClick={e => {handleModal("open")}}/>
        <div  className="framec6cc90c6">{/*단어 전체 그리드*/}
            {dataList}
            {state.modal && (<ModalPortal id='modal'>
                <Add closePopup={e=> {handleModal("close")}}></Add>
            </ModalPortal>)
            }{''} 
        </div>
        <ModalPortal id='alert'>
            <Alert type="error" message="아이디 또는 비밀번호를 확인해주세요."></Alert>
        </ModalPortal>
    </div>
    );
}



export default WordPaper;
          