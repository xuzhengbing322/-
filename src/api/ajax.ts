//对于发送请求的axios进行二次封装
import axios from "axios";
// 引入进度条  start：进度条开始，done：进度条结束
import nprogress from "nprogress";
//在当前模块中引入store
import useStoreData from '@/store/dataDetail';
import useStore from "@/store/user"
// 引入进度条样式
import "nprogress/nprogress.css";



//通过axios.create()创建axios实例对象requests。配置对象中明确请求的基础路径和请求超时时间
let requests = axios.create({
  //基础路径。默认给每个请求路径加上/api(端口号后)，减少手动书写重复路径。
  baseURL: "/api",
  //请求不能超过5S
  timeout: 5000,
});

// 请求拦截器：在请求发出去之前，请求拦截器可以检测到这次请求，并在请求发出去之前完成一些操作。
// 配置对象config中有headers(请求头)属性
requests.interceptors.request.use((config) => {
  // 需要在app.use(pinia)初始化之后调用，因此推迟useStoreDate()的调用，将它们放在安装 pinia 后始终运行的函数中。
  const store = useStoreData()
  // 给请求头添加“游客身份”，服务器收到请求就是知道谁发的请求，然后将客户端发来的信息存储到对应的db
  if(store.uuid_token){
    //headers可能是undefined，要进行排除判断。给请求头添加字段userTempId(后端规定好的) 
    if(config && config.headers){
      config.headers.userTempId = store.uuid_token
    }
  }
  //每次请求时，需要携带token带给服务器，这样才能获取指定用户的信息
  const userStore = useStore()
  if(userStore.token){
    if(config&&config.headers){
      config.headers.token = userStore.token;
    }
  }
  nprogress.start();
  return config;
});

//响应拦截器：在服务器响应之后进行一些操作
requests.interceptors.response.use(
  // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，并完成一些操作。
  (res) => {
    //进度条结束
    nprogress.done();
    //返回成功的数据即可
    return res.data;
  },
  // 响应失败的回调函数
  (err) => {
    return Promise.reject(new Error('faile'))
    // alert("服务器响应数据失败");
  }
);

// //最终需要对外暴露（不对外暴露外面模块没办法使用）
// //这里的代码是暴露一个axios实例
export default requests;
