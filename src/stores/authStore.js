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
        allowlist: ['isAuthenticated', 'token', "user_id"]
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
        saveToken: (tokenRequest, user_id) => set(() => ({
            token: tokenRequest,
            user_id: user_id
        })),
        clearToken: () => set(() => ({
            token: {
            "refreshToken": "",
            "accessToken": ""
            },
            user_id: ""
        }))
    }))

const authStore = create(
    process.env.NODE_ENV !== 'prod' ? devtools(store) : store
)

// const wordListStore = create(devtools(store))

export default authStore