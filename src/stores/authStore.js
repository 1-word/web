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
        allowlist: ['isAuthenticated', 'token']
    }, (set) => ({
        isAuthenticated: false,
        token: {
            "refreshToken": "",
            "accessToken": ""
        },
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
         * 
         * @param {*} user {username: '', password: ''}
         */
        save: (loginRequest) => set(() => ({
            data: loginRequest
        })),
      
        authenticate: (flag) => set(() => ({
            isAuthenticated: flag
        })),
        /**
         * @param {*} tokenRequest {refreshToken: '', accessToken: ''}
         */  
        saveToken: (tokenRequest) => set(() => ({
            token: tokenRequest
        }))
    }))

const authStore = create(
    process.env.NODE_ENV !== 'prod' ? devtools(store) : store
)

// const wordListStore = create(devtools(store))

export default authStore