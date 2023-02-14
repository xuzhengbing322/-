<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <!-- 品牌 -->
        <ul class="logo-list">
          <li
            v-for="trademark in trademarkListData"
            :key="trademark.tmId"
            @click="tradeMatkHandler(trademark)"
          >
            {{ trademark.tmName }}
          </li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <!-- 平台售卖属性 -->
    <div
      class="type-wrap"
      v-for="attr in attrsListData"
      :key="attr.attrId"
    >
      <!-- 商品的各属性 -->
      <div class="fl key">{{ attr.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <!-- 商品属性的属性值 -->
          <li v-for="(attrValue, index) in attr.attrValueList" :key="index"  @click="attrInfo(attrValue,attr)">
            <a>{{ attrValue }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>


<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "SearchSelector",
});
</script>


<script setup>
import { reactive } from "vue";
import bus from "@/libs/bus";

// 接受父组件search传过来的数据
const props = defineProps({
  attrsListData: Array,
  trademarkListData: Array,
});

// 品牌点击事件
function tradeMatkHandler(trademark) {
  // 把品牌信息发给search组件，并在search组件中请求品牌信息
  bus.emit("trademarkInfo", trademark);
}

// 商品属性的点击事件
function attrInfo(attrValue,attr) {
  //["属性ID:属性值:属性名"]
  bus.emit("attrInfo", [attrValue,attr]);
}
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;

          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

      .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
      }
    }
  }
}
</style>