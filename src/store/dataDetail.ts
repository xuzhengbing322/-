import { defineStore } from "pinia";
import requests from '@/api/ajax'
import { getUUID } from "@/utils/uuid_token";

export default defineStore('detail', {
    state: () => {
        return {
            detailData: {
                categoryView: {},
                skuInfo: {
                    skuImageList: []
                },
                spuSaleAttrList: []
            },
            shopCarData:{},
            // 游客临时身份
            uuid_token:getUUID()
        }
    },
    actions: {
        async getDetailData(skuid: any) {
            let result = await requests({ url: `/item/${skuid}`, method: 'get' })
            this.detailData = result.data
        },
        async getShopCarData(skuId:any,skuNum:any){
            let result = await requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})
            // async/await的返回值是promise对象
            if(result.code == 200){
                return "ok"
            }else{
                return Promise.reject(new Error('faile'))
            }
        }
    },
    getters: {
        /* state.detailData.categoryView初始状态是空对象，{}.category1Name就是undefined，就不会报错。
                如果detailDate是{},当服务器数据返回之前，detailDate就是{}。那么{}.undefined.category1Name，就会报错。
                当服务器数据返回之后，模块才可以正常显示。因此，请求数据后，最好使用getters将数据路径简化到最表层。
                尽量不要用.方法获取数据。
                 */
        categoryView: (state) => {
            return state.detailData.categoryView
        },
        skuInfo: (state) => {
            return state.detailData.skuInfo
        },
        spuSaleAttrList: (state) => {
            return state.detailData.spuSaleAttrList
        },
        skuImageList: (state) => {
            return state.detailData.skuInfo.skuImageList
        }
    },
})