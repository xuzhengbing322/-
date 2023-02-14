import { defineStore } from "pinia";
import requests from '@/api/ajax'

export default defineStore('typeNav',{
    state:()=>{
        return{
            dataList:[]
        }
    },
    getters:{},
    actions:{
        async getTypeNavData(){
            let result = await requests({url:'/product/getBaseCategoryList',method:'get'})
            this.dataList = result.data
        }
    }
})