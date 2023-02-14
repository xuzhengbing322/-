import { defineStore } from "pinia";
import requests from '@/api/ajax'
import { setToken, getToken, removeToken } from "@/utils/token"

export default defineStore('userData', {
    state: () => {
        return {
            code: "",
            // token在本地存储中拿，解决每次刷新丢失token的问题。
            token: getToken(),
            name: "",
            userInfo: {
                name: "" 
            }

        }
    },
    actions: {
        // 获取验证码
        async userCodeData(phone: any) {
            let result = await requests({ url: `/user/passport/sendCode/${phone}`, method: "get" })
            if (result.code == 200) {
                this.code = result.data
                return "ok";
            } else {
                return Promise.reject(new Error("faile"))
            }

        },
        // 用户注册
        async userRegister(phone: number, code: number, password: any) {
            let result = await requests({ url: `/user/passport/register`, method: "post", data: { phone, code, password } })
            if (result.code == 200) {
                return "ok"
            } else {
                return Promise.reject(new Error("faile"))
            }

        },
        // 用户登录
        async useLogin(phone: number, password: any) {
            let result = await requests({ url: `/user/passport/login`, method: "post", data: { phone, password } })
            //登陆成功后，服务器会给用户一个专属token
            this.token = result.data.token
            this.name = result.data.name
            // 页面刷新后，并没有再次调用useLogin请求。刷新后的页面就没有token了。因此，需要本地存储token，让token持久化。 
            setToken(result.data.token);
            if (result.code == 200) {
                return "ok"
            } else {
                return Promise.reject(new Error("faile"))
            }
        },
        // 退出登录
        async userLoginOut() {
            let result = await requests({ url: `/user/passport/logout`, method: "get" })
            // console.log(result)
            // debugger
            if (result.code == 200) {
                // 清除用户的token和名字

                this.token = ""
                this.userInfo.name = ""
                removeToken()
                return "ok"
            } else {
                return Promise.reject(new Error("faile"))
            }
        },
        // 获取用户信息，需要带着用户的token向服务器要用户信息
        async requserInfo() {
            // debugger
            let result = await requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
            this.userInfo = result.data
            if (result.code == 200) {
                return "ok"
            } else {
                alert("请先登录")
                return Promise.reject(new Error("faile"))
            }
        }
    },
    getters: {
        userNames: (state) => {
            return state.userInfo.name
        }
    },

    // persist: {
    //     // 修改存储中使用的键名称，默认为当前 Store的 id
    //     key: 'token',
    //     // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    //     paths: ['token'],
    // }
})

