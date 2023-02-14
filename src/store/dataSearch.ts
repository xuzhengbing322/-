import { defineStore } from "pinia";
import requests from '@/api/ajax'

export default defineStore('search',{
    state:()=>{
        return{
            searchData:{}
        }
    },
    getters:{},
    actions:{
        async getSearchData(params:any){
            let result = await requests({url:'/list',method:'post',data:params})
            this.searchData = result.data
        }
    }
})