import React from 'react';

/*
"details": [
        {
          "wordDetailId": 41,
          "wordGroupId": 1,
          "groupName": "동사",
          "title": "title2",
          "content": "content2",
          "createTime": "2024-11-27T23:17:20.338463",
          "updateTime": "2024-11-27T23:17:20.338463"
        },
        {
          "wordDetailId": 40,
          "wordGroupId": 1,
          "groupName": "동사",
          "title": "title1",
          "content": "content1",
          "createTime": "2024-11-27T23:17:20.334132",
          "updateTime": "2024-11-27T23:17:20.334132"
        },
        {
          "wordDetailId": 42,
          "wordGroupId": 3,
          "groupName": "명사",
          "title": "title3",
          "content": "content3",
          "createTime": "2024-11-27T23:17:20.340203",
          "updateTime": "2024-11-27T23:17:20.340203"
        }
      ]
    ]
*/

/*
[{
    "wordGroupId": 1,
    "groupName": "동사",
    "items": [{
        "title": "title2",
        "content": "content2",
        "createTime": "2024-11-27T23:17:20.338463",
        "updateTime": "2024-11-27T23:17:20.338463" 
    }, {
        "title": "title1",
        "content": "content1",
        "createTime": "2024-11-27T23:17:20.334132",
        "updateTime": "2024-11-27T23:17:20.334132"
    }]
    }, {
        "wordGroupId": 3,
        "groupName": "명사",
        "items": [{
            "title": "title3",
            "content": "content3",
            "createTime": "2024-11-27T23:17:20.340203",
            "updateTime": "2024-11-27T23:17:20.340203"
    }]
}]

*/

function WordDetailList({details}){
    return (
    <>
        <ul className="word_type_wrap flex">
    {
            details?.map(detail => 
                <>
                    <li key={detail.wordGroupId} className="word_type_list flex">
                        <span className="word_type_title">{detail.groupName}</span>
                        <ul className="word_type_cont flex">
                            {
                                detail?.groups?.map(group => 
                                    <li key={group.wordDetailId}>
                                        <span className="word_type_cont_title">{group.title}</span>
                                        <span>{group.content}</span>
                                    </li>
                                )
                            }
                        </ul>
                    </li>
                </>
    )}
        </ul>
    </>
    )

}

export default WordDetailList;