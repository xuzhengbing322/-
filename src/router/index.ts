import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import useUserStore from "@/store/user"


const routes: Array<RouteRecordRaw> = [
  {
    // 根目录，页面最初的路径。
    path: '/',
    // redirect重定向：当页面路径为根目录/时，页面路径变为/home。
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      show: true
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      show: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register/index.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: () => import('@/views/Search/index.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/detail/:skuid?',
    name: 'detail',
    component: () => import('@/views/Detail/index.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/views/AddCartSuccess/index.vue'),
    meta: {
      show: true
    },
    //路由独享守卫：beforeEnter 守卫只在进入路由时触发，不会在 params、query 或 hash 改变时触发。
    //当没有商品信息和数量时，无法跳转到addcartsuccess路由
    beforeEnter: (to, from) => {
      // 得到要跳转到目路由的query参数
      const skuNum = to.query.skuNum
      //读取会话存储的商品信息
      const skuInfo = sessionStorage.getItem("SKUINFO")

      // 商品数量和信息存在时才放行
      if (skuNum && skuInfo) {
        return true
      } else {
        // 在组件对象创建前强制跳转到首页
        return { name: "home" }
      }
    }
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: () => import('@/views/ShopCart/index.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/trade',
    name: 'trade',
    component: () => import('@/views/Trade/index.vue'),
    meta: {
      show: true
    },
    /* 只能从购物车界面, 才能跳转到交易界面 */
    beforeEnter: (to, from) => {
      if (from.path === '/shopcart') {
        return true
      } else {
        return false
      }
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/Pay/index.vue'),
    meta: {
      show: true
    },
    /* 只能从交易界面, 才能跳转到支付界面 */
    beforeEnter: (to, from) => {
      if (from.path === '/trade') {
        return true
      } else {
        return { name: "trade" }
      }
    }
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: () => import('@/views/PaySuccess/index.vue'),
    meta: {
      show: true
    },
    /* 只有从支付界面, 才能跳转到支付成功的界面 */
    beforeEnter(to, from) {
      if (from.path === '/pay') {
        return true
      } else {
        return {name:"pay"}
      }
    }
  },
  {
    path: '/center',
    name: 'center',
    component: () => import('@/views/Center/index.vue'),
    meta: {
      show: true
    },
    children: [
      {
        path: "/center/myorder",
        name: "myorder",
        component: () => import("@/views/Center/myOrder/index.vue")
      },
      {
        path: "/center/groupbuy",
        name: "groupbuy",
        component: () => import("@/views/Center/groupOrder/index.vue")
      },
      {
        path: "",
        name: "warns",
        redirect: "/center/myorder"
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/*全局前置守卫：router.beforeEach 注册一个全局前置守卫。
当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于等待中。
to:即将要进入的目标
from：当前导航正要离开的路由
返回值：false:取消当前的导航。如果浏览器的URL改变了，那么URL地址会重置到from路由对应的地址。
      一个路由地址: 通过一个路由地址跳转到一个不同的地址，就像调用router.push() 一样。
      可以设置诸如 replace: true 或 name: 'home' 之类的配置。当前的导航被中断，然后进行一个新的导航，就和 from 一样。
      undefined/true：导航是有效的，并调用下一个导航守卫
*/
router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  //获取仓库中的token。
  let token = userStore.token;
  let name = userStore.userInfo.name;
  //存在token则证明用户登录
  if (token) {
    //已经登陆就不能再去登录和注册路由
    if (to.path == "/login" || to.path == '/register') {
      return false
    } else {
      //访问非登录和注册路由，且拥有用户信息
      if (name) {
        return true
      } else {
        //登陆但没有用户信息，则在路由跳转前获取用户信息，并放行。
        try {
          await userStore.requserInfo()
          return true
        } catch (error) {
          //用户信息获取失败就退出登录，并跳转到登录路由
          await userStore.userLoginOut()
          return { name: 'login' }
        }
      }
    }
  } else {
    //  未登录：不能去交易路由、不能去支付相关路由【pay|paysuccess】、不能去个人中心
    let toPath = to.path;
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      return { name: "login" }
    } else {
      //去其他路由就放行
      return true
    }

  }
});

export default router
