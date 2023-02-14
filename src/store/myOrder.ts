import { defineStore } from "pinia";
import requests from "@/api/ajax";

export default defineStore('myOrder',{
    state:()=>{
        return {    
            orderList:{
                records:[]
            }
        }
    },
    actions:{
        async reqMyOrderList(page:any,limit:any){
            let ordeResult = await requests({url:`/order/auth/${page}/${limit}`,method:'get'})
            this.orderList = ordeResult.data
        }
    },
    getters:{
        records:(state)=>{
            return state.orderList.records
        }
    }
})