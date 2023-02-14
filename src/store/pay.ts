import { defineStore } from "pinia";
import requests from "@/api/ajax";

export default defineStore('payInfoStore',{
    state:()=>{
        return {    
            payInfo:{}
        }
    },
    actions:{
        async reqPayInfo(orderId:any){
            let result = await requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
            this.payInfo = result.data
        }
    },
    getters:{}
})