<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <!-- 放大镜的鼠标移动事件 -->
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import bus from "@/libs/bus";

const props = defineProps({
  skuImageList: Array,
});

let data = reactive({
  //skuImageList数组的下标
  currentIndex: 0,
});

let { currentIndex } = toRefs(data);

// 计算skuImageList的属性，避免服务器未返回数据前，undefined.imgUrl的现象
let imgObj = computed(() => {
  return props.skuImageList[data.currentIndex] || {};
});

// 获取template中遮罩层和大图的dom
let mask = ref(null);
let big = ref(null);

// 鼠标移动时，大小图的效果
function handler(event) {
  /* 计算鼠标移动的距离。图片左和上边界到遮罩层的左和上边界的距离，就是鼠标移动的距离。
event是鼠标移动事件，其中event.offsetX是鼠标到图片左边界的距离。mask.value.offsetWidth是遮罩层的宽度。
*/
  // 鼠标左移的距离
  let left = event.offsetX - mask.value.offsetWidth / 2;
  let top = event.offsetY - mask.value.offsetHeight / 2;
  // 自定义两个遮罩层宽度就是图片宽度。约束left和top的范围
  if (left <= 0) left = 0;
  if (left >= mask.value.offsetWidth) left = mask.value.offsetWidth;
  if (top <= 0) top = 0;
  if (top >= mask.value.offsetHeight) top = mask.value.offsetHeight;
  // console.log("@@",left,top)
  // 修改遮罩层元素的left|top属性值，实现移动效果
  mask.value.style.left = left + "px";
  mask.value.style.top = top + "px";
  // // 自定义的大图比小图大两倍
  big.value.style.left = -2 * left + "px";
  big.value.style.top = -2 * top + "px";
}

bus.on("getImgIndex", (imgIndex) => {
  data.currentIndex = imgIndex;
});
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>