import React from 'react';

/**
 * 단어 상세 정보 리스트 컴포넌트
 * details에 content가 있으면 subs는 확인하지 않는다
 * details에 content가 없으면 subs까지 확인
 * data: "details": [
            {
                "detail_id": 0,
                "title": {
                    "title_id": 0,
                    "title_name": "",
                },
                "content": "",
                "memo": "",
                "subs": [{
                    "detail_sub_id": 0,
                    "title": {
                        "title_id": 0,
                        "title_name": "",
                    },
                    "content": "",
                    "memo": "" 
                }]
            }
        ]
 */
    
// title_id가 같으면, 같은 줄에 있어야 함??
// 그럴거면 애초에 그냥 ,로 구분하는게 나을거 같은데??
const detail_id_arr_tmp = [];

function SynonsymsList({cls}){    
    return (
        <div className="synonym_wrap flex">
            {/* asdf */}
            {/* 상세정보 대분류 */}
            {cls.map((cl, idx) => 
                <React.Fragment key={'m'+cl?.detail_id}>
                <span>{cl?.title.title_name}</span>
                {cl?.content !== ""?
                    <p>{cl?.content}</p>
                    :
                    // 상세정보 소분류
                    cl.subs.map((sub) => 
                        <React.Fragment key={'s'+sub?.detail_sub_id}>
                            <span>{sub?.title.title_name}</span>
                            <p>{sub?.content}</p>
                        </React.Fragment>
                    )
                }
                </React.Fragment>
            )}
        </div>
    )

}

function isDuplication(detail_id){
    if (detail_id_arr_tmp.filter(v => v === detail_id).length === 0){
        detail_id_arr_tmp.push(detail_id);
        return false;        
    }
    return true;
}

export default SynonsymsList;