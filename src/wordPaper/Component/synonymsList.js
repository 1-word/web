import React, { useEffect, useState } from 'react';

function SynonsymsList(props){
    //const datas = [];
    let datas;
    /*const [datas, setDatas] = useState()
    useEffect(()=> {
        setDatas(synonymsList)
    }, [])
*/
    if(props.synonyms.length > 0){
        let style = {
            left: 91
         }
        let plus = 50
        const synonymsList = props.synonyms.map((_synonym, idx) => {
        idx===0 ? console.log(style.left) : style.left += plus

               return  <div className="xd9f3fdf8" style={style}>{_synonym.synonym}</div>
    });
        console.log("synonymList component")
        console.log(synonymsList)
        datas = synonymsList;
        //datas.concat(Object.assign({}, synonymsList))
        console.log(datas)
    }

    return (
        <div>
            {datas}
        </div>
    )

}

export default SynonsymsList;