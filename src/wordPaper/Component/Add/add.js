import React, { useEffect, useState, useRef } from "react";
import "./add.css";

function Add(props){
    const [datas, setDatas] = useState([
        {
            "word": "",
            "mean": "",
            "wread": "",
            "memo": "",
            "synonyms": [
                {
                    "synonym": "",
                    "memo": ""
                }
            ]
        }
	]);
    
    let style = {
        top:90
    }

    const onWordHandler = (e) => {
        setDatas({
            word: e.currentTarget.value
        })
        console.log(datas)
    }

    const onMeanHandler = (e) => {
        setDatas({
            mean: e.currentTarget.value
        })
        console.log(datas)
    }

    const onWreadHandler = (e) => {
        setDatas({
            wread: e.currentTarget.value
        })
        console.log(datas)
    }

    const onSynoymsHandler = (e) => {
        setDatas({
            synonyms: e.currentTarget.value
        })
        console.log(datas)
    }

    const handleClick = (e) => {
        console.log("저장")
        console.log(datas)
    }

    return   <div  class="add">        
                <div  class="addframe">            
                <div  class="squareframe"></div>
                <button  class="delete" onClick={props.closePopup}> </button>
            <div  class="add7cea4238">                
            <button  class="save_btn" onClick={e=> {handleClick(e)}}/>                    
                <div  class="addgrid">                    
                
                <input class="x23876" name="word_input" type="text" onChange={onWordHandler}/>
                    <div  class="xa20b892b">단어</div>
                    <input class="x23876" name="mean_input" style={{top:"92px"}} type="text" onChange={onMeanHandler} />                        
                    <div  class="x997ddea9">뜻</div>
                    <input class="x23876" name="wread_input" style={{top:"184px"}} type="text"onChange={onWreadHandler} />
                    <div  class="x3725c0e4">발음</div>
                    <input class="x23876" name="synonym_input" style={{top:"276px"}} type="text"  onChange={onSynoymsHandler}/>
                    <div  class="x4eea8ba2">유의어</div>
</div>
</div>
            <div  class="plusicon">                
            <div  class="plusiconr2"></div>
                <div  class="plusiconr1"></div>
                <svg  preserveAspectRatio="none" viewBox="0 0 40 40" class="plusiconframe">
                    <path d="M 0 0 L 40 0 L 40 40 L 0 40 L 0 0 Z"  /></svg>
</div>
</div>
</div>
}

export default Add;