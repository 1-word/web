import connect from "../util/axiosUtil"

export const MODE = {
    READ: "read",
    SEARCH_ALL: "all",
    SEARCH: "search",
    DELETE: "delete",
    UPDATE: "update",
    OPEN: "open",
    CLOSE: "close",
    LOGIN: "login"
}

const clickMap = {
    read(){

    },
    all(){
        
    },
    search(){

    },
    delete(){

    },
    update(){

    },
    open(){

    },
    close(){

    },
    async login(e, user){
        const result = await connect("POST", "api/login","", user)
        console.log(result)
        // result?.code === 0? dataSave(result) : console.log("실패")
        result?.code === 0? console.log("성공") : console.log("실패")
        return result
    }
    // login(e, data){
    //     console.log("login")
    // }
}

function search(){

}

export function btnClick(e, modeType, data){
    return clickMap[modeType](e, data);
}