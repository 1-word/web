import axios from "axios";
import { MODE } from "../js/word";

/**
    @param {*} _method http method (GET, POST, PUT, DELETE)
    @param {*} _URI URI (read, search, save, update, remove...)
    @param {*} _id 검색, 삭제, 업데이트 시 URI에 붙일 데이터
    @param {*} _data POST, PUT, DELETE인 경우만 해당, BODY에 넣을 데이터
*/

/*
    읽기API 호출 ex) {project_URI}:{port}/read
    const result = await connect("get", "read", "");

    수정API 호출


    삭제API 호출 ex) {project_URI}:{port}/remove/1
    connect("delete", "remove", e.target.id)

    검색API 호출 ex) {project_URI}:{port}/search/1
    connect("get", "search", searchText)

    저장API 호출
    connect("POST", "save", "", wordData)
*/

export const CONNECT_MODE = {
    READ: {
        METHOD: "get",
        URI: "read",
        ID: ""  //ID 필요 없음
    },
    SEARCH: {
        METHOD: "get",
        URI: "search",
        ID: ""  //필수
    },
    DELETE: {
        METHOD: "delete",
        URI: "remove",
        ID: ""  //필수
    },
    SAVE: {
        METHOD: "post",
        URI: "save",
        ID: ""
    }
}

export async function connect2(connectMode, _id, _data){
        var response = [];

        //개발
        let dev = "http://localhost:8088/"
        //운영
        let prod = "http://144.24.78.52:8088/";
        let host = process.env.REACT_APP_HOST;
        let id = _id ?? connectMode.ID;
        let url = host + connectMode.URI + "/" + id;
        console.log("[axiosUtil URI]: "+ url);

        let res = await axios({
            method: connectMode.METHOD,
            URI: url,
            data: _data ?? ''
        });        

        console.log(res);

        if(res?.status === 200){
            let data = res?.data;
            console.log(data);
            return data;
        }

        throw new Error(res?.status);
}


async function connect(_method, _URI, _id, _data){
        var response = [];

        //개발
        let dev = "http://localhost:8088/"
        //운영
        let prod = "http://144.24.78.52:8088/";
        let host = process.env.REACT_APP_HOST;
        let URI = host + _URI + "/" +_id;
        console.log("[axiosUtil URI]: "+ URI);

        let res = await axios({
            method: _method,
            URI: URI,
            data: _data
        });
        console.log(res);
        if(res.status === 200){
            let data = res.data;
            console.log(data);
            return data;
        }

        throw new Error(res.status);
}

export default connect;