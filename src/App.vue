<template>
  <Header></Header>
  <!-- router-view确定视图的位置，展示路由对应的组件内容 -->
  <router-view></router-view>
  <Footer v-show="$route.meta.show"></Footer>
</template>

<script setup>
// 引入非路由Header组件
import Header from "./components/Header";
import Footer from "./components/Footer";
</script>



<style>
</style>
