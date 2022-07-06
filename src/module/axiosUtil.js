import axios from "axios";

/*
    @param: 
        _method: http method (GET, POST, PUT, DELETE)
        _uri: uri (read, search, save, update, remove...)
        _id: 검색, 삭제, 업데이트 시 URL에 붙일 데이터
        _data: POST, PUT, DELETE인 경우만 해당, BODY에 넣을 데이터
*/

async function connect(_method, _uri, _id, _data){
    try{
        var response = [];

        //개발
        let dev = "http://localhost:8088/"
        //운영
        let prod = "http://144.24.78.52:8088/";
        let env = prod;
        let url = env + _uri + "/" +_id
        console.log("[axiosUtil url]: "+ url);

        await axios({
            method: _method,
            url: url,
            data: _data
        }).then((res) => {      //.then의 res는 프로미스로 반환됨.
            response  = res.data;
            console.log("[axiosUtil res]: " + response);
            return response;
        }).catch((err) => {
            console.log(err)
        })
    } catch(err){
        console.log(err)
    }

    return response;
}

export default connect;