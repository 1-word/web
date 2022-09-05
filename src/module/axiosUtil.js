import axios from "axios";

/*
    @param: 
        _method: http method (GET, POST, PUT, DELETE)
        _uri: uri (read, search, save, update, remove...)
        _id: 검색, 삭제, 업데이트 시 URL에 붙일 데이터
        _data: POST, PUT, DELETE인 경우만 해당, BODY에 넣을 데이터
*/

async function connect(_method, _uri, _id, _data){
        var response = [];

        //개발
        let dev = "http://localhost:8088/"
        //운영
        let prod = "http://144.24.78.52:8088/";
        let host = process.env.REACT_APP_HOST;
        let url = host + _uri + "/" +_id;
        console.log("[axiosUtil url]: "+ url);

        let res = await axios({
            method: _method,
            url: url,
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