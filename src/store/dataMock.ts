import { defineStore } from "pinia";
import mockRequests from '@/api/mockAjax'

export default defineStore('mock',{
    state:()=>{
        return{
            listData:[],
            floorData:[]
        }
    },
    getters:{},
    actions:{
        async getMockData(){
            let results = await mockRequests({url:"/banner",method:'get'})
            this.listData = results.data
        },

        async getMockFloorData(){
            let results = await mockRequests({url:"/floor",method:'get'})
            this.floorData = results.data
        }
    }
})