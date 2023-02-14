<template>
  <div class="pagination">
    <button @click="pageOn">上一页</button>
    <button v-if="startBoolean" @click="pageOne" :class="{ active: pageNo == 1 }">1</button>
    <button v-if="start_Boolean">···</button>

    <!-- v-for遍历startNumAndEndNum对象 -->
    <button v-for="(pageNum, index) in startNumAndEndNum.numArray" :key="index"
    @click="pageMiddle(pageNum)"
    :class="{ active: pageNo ==  pageNum}"
    >
      {{ pageNum }}
    </button>

    <button v-if="end_Boolean">···</button>
    <button v-if="endBoolean" @click="pageLast"  :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button @click="pageDown">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "Pagination",
});
</script>

<script setup>
// 将当前页码传递给父组件的pageNo
import bus from "@/libs/bus";
// 接受父组件传递过来的参数
const props = defineProps({
  pageNo: Number,
  pageSize: Number,
  total: Number,
  continues: Number,
});

//计算总共多少页
let totalPage = computed(() => {
  return Math.ceil(props.total / props.pageSize);
});
// 计算出连续的页码的起始数字和结束数字
let startNumAndEndNum = computed(() => {
  // 对象解构
  let { pageNo, total, continues } = props;
  // 定义两个变量存储起始数字和结束数字
  let start = 0;
  let end = 0;
  let num = 0;
  let numArray = [];
  // 连续页面为5，即证明总页面数大于5，排除总页面不足5的情况
  if (continues > totalPage) {
    start = 1;
    end = totalPage;
  } else {
    // 总页面数大于5
    // 起始数字
    start = pageNo - parseInt(continues / 2);
    // 结束数字
    end = pageNo + parseInt(continues / 2);
    // 排除start数字出现0或负数的情况
    if (start < 1) {
      start = 1;
      end = continues;
    }
    // 排除end数字大于总页码的情况
    if (end > totalPage) {
      end = totalPage;
      start = totalPage - continues + 1;
    }
  }

  for (num = start; num <= end; num++) {
    numArray.push(num);
  }

  return { numArray, start, end };
});

// 当连续页面的起始值大于1时，startBoolean为真，以便隐藏按钮
let startBoolean = computed(() => {
  return startNumAndEndNum.value.start > 1;
});

// 隐藏按钮
let start_Boolean = computed(() => {
  return startNumAndEndNum.value.start > 2;
});

// 隐藏按钮
let endBoolean = computed(() => {
  return startNumAndEndNum.value.end < totalPage.value;
});

// 隐藏按钮
let end_Boolean = computed(() => {
  return startNumAndEndNum.value.end < totalPage.value - 1;
});


function pageOn() {
  bus.emit("getPageNo", props.pageNo - 1);
}

function pageDown() {
  bus.emit("getPageNo", props.pageNo + 1);
}

function pageOne() {
  bus.emit("getPageNo", 1);
}

// nextTick(function pageOne() {
//   console.log("!!");
//   bus.emit("getPageNo", 1);
// })
function pageMiddle(page){
  bus.emit("getPageNo",page)
}

// 当点击这个函数后，其他的点击函数会失效
function pageLast(){
  bus.emit("getPageNo",totalPage)
}

</script>



<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}

.active{
  background: skyblue;
}

</style>