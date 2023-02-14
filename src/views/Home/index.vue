<template>
  <div>
      <TypeNav/>
      <ListContainer/>
      <Recommend/>
      <Rank/>
      <Like/>
      <Floor/>
      <Floor/>
      <Brand/>
  </div>
</template>

<script>
import { defineComponent} from "vue";
export default defineComponent({
  name: "Home",
});
</script>

<script setup>
import {onMounted, reactive,toRefs} from 'vue'
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank' 
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'
// 其他模块没有导入user组件，因此刷新会失去token
import userInfoStore from "@/store/user"

const userStore = userInfoStore()



</script>

<style scoped>
</style>