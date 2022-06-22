
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./wordPaper.css";
import SynonsymsList from "./Component/synonymsList";
import Add from "./Component/Add/add";
import ModalPortal from "../ModalPortal";

//class WordPaper extends React.Component {
function WordPaper(){
    const [datas, setDatas] = useState([
        {
            "word_id": 0,
            "word": "",
            "mean": "",
            "wread": "",
            "memo": "",
            "synonyms": [
                {
                    "synonym_id": 0,
                    "synonym": "",
                    "memo": ""
                },
                {
                    "synonym_id": 0,
                    "synonym": "",
                    "memo": ""
                }
            ]
        }
	]);

    const [state, setState] = useState({
        modal: false
    })

    var datasList = datas;

    useEffect(() => {
    console.log('1234');
    //axios.get('https://webhook.site/10df5162-f210-4aae-b221-2f155c347a31')
    axios.get('http://localhost:8088/read')
    .then((Response)=> {
      /*
        Response Data:
          word_id: 기본키
          word: 단어
          mean: 뜻
          wread: 발음
          memo: 메모
          synonyms: [ {
                synonym_id: 기본키
                synonym: 유의어
                memo: 메모
          }]
      */
     console.log(Response);
      datasList = Response.data;
      console.log(datasList);
      console.log('data request success!');
      setDatas(datasList);  //서버에서 가져온 값 매핑
    })
    .catch((Error)=>{console.log(Error)})
    }, []);

   //const gridDatas = ["단어1"];
   console.log('data printing...');
   console.log(datasList)
   console.log("auto rebuild test")
   // console.log(datasList[0].synonyms[0].synonym)

   // 버튼 이벤트 
    const handleClick = (e) => {
        console.log(e.target.id)
        if(e.target.id === "search_btn"){
            //검색API 호출 ex) {project_url}:{port}/search/1
          console.log("search_btn");   
        }else if (e.target.id === "delete_btn"){
            //삭제API 호출 ex) {project_url}:{port}/remove/1
           console.log("delete_btn");    
        }
    }

    // 팝업 이벤트
    const handleModal = (flag) => {
        if (flag === "open"){
            console.log("open")
            setState({modal:true})
        }
        else if(flag === "close"){
            setState({modal:false})
        }
        console.log(state.modal)
    }

    const dataList = datasList.map((data, idx) => {
        console.log("map start")

    return <div  className="frame" key={data.word_id}>  {/*단어 출력   */}
                    <div  className="frame83f7e349"> 
                    <div  className="wordea5202cf">
                        
                        <SynonsymsList synonyms={data.synonyms}></SynonsymsList>
                    {/*<div  className="xd9f3fdf8">data</div>
                    <div  className="xd9f3fdf8" style={{left:"200px"}}>data</div> */}
                        <div  className="x16d628d6">{data.word}</div>
                    <img className="small_line" src="/img/small_line.png"></img>    
                        <div  className="xe5e28e22">
                            <div  className="bgd197c3b9"></div>
                            <div  className="x5ee0a870">유의어</div>
                        </div>
                    <svg  preserveAspectRatio="none" viewBox="0 -0.100006103515625 471 0.20001220703125" className="x465a364d58">
                    <path d="M 0 0 L 471 0"  />
                    </svg>
                    <div  className="xf63f2ca8">{data.wread}</div>
                    </div>
                <div  className="xd106727b">
                <div  className="x4154b626">{data.mean}</div>
                    <div  className="xb9a31159">
                    <button id={data.word_id} class="delete_btn" onClick={e => {handleClick(e)}}/>                            
                        <div  className="x471465d67bb6"></div>
</div> 
</div>
</div>
                <svg  preserveAspectRatio="none" viewBox="0 -0.5 1024 1" className="x47abd6047f"><path d="M 0 0 L 1024 0"  /></svg>
</div>;
});

    return (
          <div  className="wordPaper">        
            <div  className="x8bc1b3ee">            
                <div  className="x18458">                
                    <button className="search_btn" id="search_btn" 
                            onClick={ e => {handleClick(e)} } 
                    ></button>
                </div>
            <div  className="xf958f200">
                <input class="text_input" name="search_input" placeholder="" type="text" required="" />
            </div>
        </div> 
        <button className="plus_btn" id="plus_btn" onClick={e => {handleModal("open")}}/>
        <div  className="framec6cc90c6">{/*단어 전체 그리드*/}
        {dataList}
        {state.modal && (<ModalPortal>
            <Add closePopup={e=> {handleModal("close")}}></Add>
        </ModalPortal>
        )
        }{''} 
    </div>
</div>

);
}



export default WordPaper;
          