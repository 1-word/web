import axios from "axios";

/**
    @param {*} _method http method (GET, POST, PUT, DELETE)
    @param {*} _uri uri (read, search, save, update, remove...)
    @param {*} _id 검색, 삭제, 업데이트 시 URL에 붙일 데이터
    @param {*} _data POST, PUT, DELETE인 경우만 해당, BODY에 넣을 데이터
*/

/*
    읽기api 호출 ex) {project_url}:{port}/read
    const result = await connect("get", "read", "");

    수정api 호출


    삭제api 호출 ex) {project_url}:{port}/remove/1
    connect("delete", "remove", e.target.id)

    검색api 호출 ex) {project_url}:{port}/search/1
    connect("get", "search", searchText)

    저장api 호출
    connect("POST", "save", "", wordData)
*/

export const CONNECT_MODE = {
    READ: {
        METHOD: "get",
        URI: "word/read"
    },
    SEARCH: {
        METHOD: "get",
        URI: "word/search"
    },
    DELETE: {
        METHOD: "delete",
        URI: "word/remove"
    },
    SAVE: {
        METHOD: "post",
        URI: "word/save"
    },
    UPDATE: {
        METHOD: "put",
        URI: "word/update/all"
    },
    UPDATE_MEMO: {
        METHOD: "put",
        URI: "word/update/memo"
    },
    LOGIN: {
        METHOD: "post",
        URI: "login"
    },
    SIGNUP: {
        METHOD: "post",
        URI: "signup"
    },
    FOLDER_READ:{
        METHOD: "get",
        URI: "word/folder"
    },
    FOLDER_UPDATE:{
        METHOD: "put",
        URI: "word/folder"
    },
    FOLDER_SAVE:{
        METHOD: "post",
        URI: "word/folder"
    },
    FOLDER_DELETE:{
        METHOD: "delete",
        URI: "word/folder"
    },
    MEMORIZATION: {
        METHOD: "put",
        URI: "word/update/memorization"   
    },
    WORD_FOLDER_UPDATE:{
        METHOD: "put",
        URI: "word/update/wordFolder"   
    }
}

async function connect(_method, _id, _data, _token){
        const host = process.env.REACT_APP_HOST;
        
        const method = _method.METHOD;
        const id = _id ?? "";
        const uri = _method.URI ?? "";
        const token = uri !== CONNECT_MODE.LOGIN.URI? _token : "";
        let url = `${host}${uri}/${id}`;
        if (_method.URI === CONNECT_MODE.SEARCH.URI) url = `${host}${uri}/${_data}`;

        let res = await axios({
            method: method,
            url: url,
            data: _data,
            headers:{
                contentType: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        
        return res.data;
}

export default connect;