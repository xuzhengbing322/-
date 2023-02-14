<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <!-- 勾选框 -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @click="changeChecked(cart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="handler('change', event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "ShopCart",
});
</script>

<script setup>
import useStoreData from "@/store/dataCartList";
import useShopCarData from "@/store/dataShopCar";
import useDeleteCart from "@/store/deleteCart";

const store = useStoreData();
const shopCartStore = useShopCarData();
const deleteCartStore = useDeleteCart();

onMounted(() => {
  getData();
});
// 请求数据
function getData() {
  store.getCartListData();
}

// 购物车数据
let cartInfoList = computed(() => {
  return store.cartList.cartInfoList || [];
});

// 计算购买产品的总价
let totalPrice = computed(() => {
  let sum = 1;
  cartInfoList.value.forEach((item) => {
    sum += item.skuNum * item.skuPrice;
  });
  return sum;
});

// 判断底部复选框是否勾选[全部产品都选中，才勾选]。研究：执行顺序
// debugger
// let isAllCheck = computed(()=>{
//   console.log(22)
//   let result =  cartInfoList.value.every((item)=>{item.isChecked ==1})
//   return result
// })

// console.log(11)

/*商品添加和减少的点击事件
type:事件类型。根据不同的类型区分加减。disNum:变化量。cart:操作的商品
*/
async function handler(type, disNum, cart) {
  switch (type) {
    // 加号
    case "add":
      disNum = 1;
      break;
    // 减号
    case "minus":
      disNum = cart.skuNum > 1 ? -1 : 0;
      break;
    case "change":
      // 用户输入进来的最终量，如果非法的（带有汉字|出现负数），带给服务器数字零
      if (isNaN(disNum) || disNum < 1) {
        disNum = 0;
      } else {
        // 正常情况（小数：取证），带给服务器变化的量 用户输入进来的 - 产品的起始个数
        disNum = parseInt(disNum) - cart.skuNum;
      }
      break;
  }
  // 给服务器发送信息
  try {
    await shopCartStore.getShopCarData(cart.skuId, disNum);
    //再次获取服务器更新后的购物车数据
    getData();
  } catch {}
}

// 删除某项商品
async function deleteCartById(cart) {
  try {
    await deleteCartStore.deleteCartList(cart.skuId);
    getData();
  } catch {}
}

// 修改商品的勾选状态，修改后需要向服务器发送数据，并重写获取购物车数据
// 事件的event不需要用参数传递和接受，直接在函数体中用即可。
async function changeChecked(cart) {
  try {
    //服务器要求isChecked值为0或1
    let isChecked = event.target.checked ? "1" : "0";
    await deleteCartStore.changeCartChecked(cart.skuId, isChecked);
    getData();
  } catch (error) {}
}

// 删除全部选中的商品
function deleteAllCheckedCart(){
  cartInfoList.value.forEach(item => {
    item.isChecked == 1 ? deleteCartStore.deleteCartList(item.skuId) : ""   
  });
  getData()
}



</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>