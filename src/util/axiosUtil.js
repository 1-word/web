import axios from "axios";

/**
    @param {*} _method http method (GET, POST, PUT, DELETE)
    @param {*} _uri uri (read, search, save, update, remove...)
    @param {*} _id 검색, 삭제, 업데이트 시 URL에 붙일 데이터
    @param {*} _data POST, PUT, DELETE인 경우만 해당, BODY에 넣을 데이터
*/

/*
    읽기API 호출 ex) {project_url}:{port}/read
    const result = await connect("get", "read", "");

    수정API 호출


    삭제API 호출 ex) {project_url}:{port}/remove/1
    connect("delete", "remove", e.target.id)

    검색API 호출 ex) {project_url}:{port}/search/1
    connect("get", "search", searchText)

    저장API 호출
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
    LOGIN: {
        METHOD: "post",
        URI: "api/login"
    }
}

async function connect(_method, _id, _data, _token){
        var response = [];

        //개발
        let dev = "http://localhost:8088/"
        //운영
        //let prod = "http://144.24.78.52:8088/";
        let prod = "http://app:8088/"
        let host = process.env.REACT_APP_HOST;
        
        let method = _method.METHOD
        let id = _id ?? ""
        let uri = _method.URI ?? ""
        let token = uri !== CONNECT_MODE.LOGIN.URI? _token : ""
        let url = `${host}${uri}/${id}`
        if (_method.URI == CONNECT_MODE.SEARCH.URI) url = `${host}${uri}/${id}/${_data}`
        console.log("[axiosUtil url]: "+ url);

        let res = await axios({
            method: method,
            url: url,
            data: _data,
            headers:{
                contentType: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        console.log(res);
        return res.data
}

export default connect;