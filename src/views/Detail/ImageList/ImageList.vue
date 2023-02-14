<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <!-- 商品的多个图片 -->
      <div class="swiper-slide" v-for="(slide,index) in skuImageList" :key="slide.id">
        <!-- index是0,1,2,3,4的循环（for），currentIndex是当前选中的图片。
        index会和currentIndex进行比较，相等则为true，证明这是选中的图片，然后高亮。 -->
        <img :src="slide.imgUrl" @click="changeCurrentIndex(index)" :class="{active:currentIndex==index}"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script setup>
import Swiper from "swiper";
import bus from "@/libs/bus"
import { reactive, toRefs } from "@vue/reactivity";

const props = defineProps({
  skuImageList:Array
})

let data = reactive({
  currentIndex:0
})

let {currentIndex} = toRefs(data)

// 点击图片传输图片的index给zoom组件，以便zoom组件展示图片
function changeCurrentIndex(index){
  // currentIndex是选中的图片序号，因此点击时要用点击的图片序号修改currentIndex
  data.currentIndex = index
  bus.emit('getImgIndex',index)
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>