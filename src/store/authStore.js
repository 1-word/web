import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import persist from '../util/persist'

/**
 * @Description 로그인 상태 관리
 * @Author 정현경
 * @LastEdit 20230112
 */

const store = persist({
        key: 'auth',
        allowlist: ['isAuthenticated', 'token', "user_id", "userInfo", "storeFolderList"]
    }, (set) => ({
        isAuthenticated: false,
        token: {
            "refreshToken": "",
            "accessToken": ""
        },
        user_id: "",
        data: {
            "success": false,
            "code": 0,
            "msg": "",
            "data": {
                "grantType": "",
                "refreshToken": "",
                "accessToken": "",
                "accessTokenExpireDate": 0
            }
        },
        userInfo: {

        },
        setUserInfo: (user) => {
            set(() => ({
                userInfo: user
            }))
        },
        storeFolderList: [
            {
                "wordBookId": 0,
                "name": "",
                "background": "",
                "color": "",
                "memo": "",
                "totalCount": 0,
                "memorizedCount": 0,
                "unMemorizedCount": 0,
            }
        ],
        setStoreFolderList: (folderListRequest) => set(state => ({
            storeFolderList: folderListRequest
        })),
        /**
         * 로그인 데이터 저장
         * @param {*} user {user_id: '', password: ''}
         */
        save: (loginRequest) => set(() => ({
            data: loginRequest
        })),
      
        authenticate: (flag) => set(() => ({
            isAuthenticated: flag
        })),
        /**
         * 토큰 저장
         * @param {*} tokenRequest {refreshToken: '', accessToken: ''}
         */  
        saveToken: (tokenRequest) => set(() => ({
            token: tokenRequest,
        })),
        clearToken: () => set(() => ({
            token: {
            "refreshToken": "",
            "accessToken": ""
            },
            user_id: "",
            userInfo: null,
        }))
    }))

const authStore = create(
    store
)

// const wordListStore = create(devtools(store))

export default authStore