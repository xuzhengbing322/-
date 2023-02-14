import { defineStore } from "pinia";
import requests from '@/api/ajax'

export default defineStore('cartList',{
    state:()=>{
        return{
            cartListData:[]
        }
    },
    actions:{
        async getCartListData(){
            let result = await requests({url:'/cart/cartList ',method:'get'})
            this.cartListData = result.data
        }
    },
    getters:{
        cartList:(state)=>{
            return state.cartListData[0] ||{}
        },

    }
})