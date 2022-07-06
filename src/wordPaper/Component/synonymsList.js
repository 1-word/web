import React, { useEffect, useState } from 'react';

/*
    SynonsymsList Component
    props:
        - synonyms: 유의어 배열
*/

function SynonsymsList(props){    
    //유의어 데이터 변수 선언
    let synonymsList;

    //유의어가 있을 때만 출력
    if(props.synonyms.length > 0){
        let plus = 80;
        //첫번째 유의어는 ,를 붙이지 않음
        //&nbsp;로 유의어간 사이 조정
        synonymsList = props.synonyms.map((_synonym, idx) => (
            idx !== 0?
            <div key={_synonym.synonym_id} className="xd9f3fdf8" >,&nbsp;&nbsp;&nbsp;&nbsp;{_synonym.synonym}</div>:
            <div key={_synonym.synonym_id} className="xd9f3fdf8" >{_synonym.synonym}</div>
        ));

       // console.log("synonymList component")
        //console.log(synonymsList)
        //datas.concat(Object.assign({}, synonymsList))
        //console.log(datas)
    }

    return (
        <div className="synonymsContainer">
            {synonymsList}
        </div>
    )

}

export default SynonsymsList;