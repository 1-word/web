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
        URI: "read"
    },
    SEARCH: {
        METHOD: "get",
        URI: "search"
    },
    DELETE: {
        METHOD: "delete",
        URI: "remove"
    },
    SAVE: {
        METHOD: "post",
        URI: "save"
    },
    LOGIN: {
        METHOD: "post",
        URI: "api/login"
    }
}

async function connect(_method, _uri, _id, _data){
        var response = [];

        //개발
        let dev = "http://localhost:8088/"
        //운영
        let prod = "http://144.24.78.52:8088/";
        let host = process.env.REACT_APP_HOST;
        //let url = host + _uri + "/" +_id;
        
        let method = _method.METHOD
        let rId = _id ?? ""
        let uri = _method.URI ?? ""
        //let url = host + uri + "/" + rId;
        let url = `${host}${uri}/${rId}`
        console.log("[axiosUtil url]: "+ url);

        let res = await axios({
            method: method,
            url: url,
            data: _data
        });

        // let res = await axios({
        //     method: _method,
        //     url: url,
        //     data: _data
        // });
        console.log(res);
        if(res.status === 200){
            let data = res.data;
            console.log(data);
            return data;
        }

        throw new Error(res.status);
}

export default connect;