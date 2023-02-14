import { defineStore } from "pinia";
import requests from '@/api/ajax'

export default defineStore('shopCar',{
    state:()=>{
        return{
            shopCarData:{}
        }
    },
    actions:{
        async getShopCarData(skuId:any,skuNum:any){
            let result = await requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})
            this.shopCarData = result.data
        }
    },
    getters:{},
})