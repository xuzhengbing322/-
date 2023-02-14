import { defineStore } from "pinia";
import requests from "@/api/ajax";


export default defineStore("tradeInfo", {
    state: () => {
        return {
            address: [],
            order: {
                detailArrayList:[],
                userAddressList:[]
            },
            orderResult:{}

        }
    },

    actions: {
        async addressInfo() {
            let result = await requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
            console.log("address", result)
            this.address = result.data
        },
        async orderInfo() {
            let orderResult = await requests({ url: '/order/auth/trade', method: 'get' })
            console.log("order", orderResult)
            this.order = orderResult.data
        },
        async submitOrder(tradeNo:any,data:any){
            let submitOrderResult = await requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data:data,method:'post'})
            this.orderResult = submitOrderResult
        }
    },

    getters: {
        detailArrayList:(state)=>{
           return state.order.detailArrayList
        },
        userAddressList:(state)=>{
            return state.order.userAddressList
        },
    }
})