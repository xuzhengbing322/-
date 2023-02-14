import { defineStore } from "pinia";
import requests from '@/api/ajax'

export default defineStore('deleteCart',{
    state:()=>{
        return{
            deleteData:{}
        }
    },
    getters:{},
    actions:{
        async deleteCartList(skuId:any){
            let result = await requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
            this.deleteData = result.data
        },
        async changeCartChecked(skuID:any,isChecked:any){
            let result = await requests({url:`/cart/checkCart/${skuID}/${isChecked}`})
        }
    }
})