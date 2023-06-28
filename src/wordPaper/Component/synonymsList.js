import React from 'react';

/*
    SynonsymsList Component
    props:
        - synonyms: 유의어 배열
*/

function SynonsymsList(props){    
    return (
        <div className="synonym_wrap flex">
            <span>유의어</span>
            <div className="synonym_cont flex">
                {props.synonyms.map(_synonym => 
                    <p>{_synonym.synonym}</p>
                )}
            </div>
        </div>
    )

}

export default SynonsymsList;