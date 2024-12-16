import axios from "axios";

/**
    @param {*} _method http method (GET, POST, PUT, DELETE)
    @param {*} _uri uri (read, search, save, update, remove...)
    @param {*} _id 검색, 삭제, 업데이트 시 URL에 붙일 데이터
    @param {*} _data POST, PUT, DELETE인 경우만 해당, BODY에 넣을 데이터
*/

async function connect(method, uri, data, token){
        const host = import.meta.env.VITE_APP_HOST;
        const url = `${host}${uri}`;
        const res = await axios({
            method,
            url,
            data,
            headers:{
                contentType: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        
        return res;
}

export default connect;