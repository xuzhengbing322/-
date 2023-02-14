/*游客身份uuid是随机生成的字符串，且每次执行不能发生变化，因此要将游客身份通过本地存储进行存储。
    游客身份的用处在于当用户向服务器发送添加购买商品的请求时，服务器可以知道是谁要购买，并将它要购买的商品存储起来。
当用户访问购物车时，服务器就可以根据用户的游客身份，将它之前存储的信息返回给它。
    向服务器发送添加购买商品的请求的地址只能携带商品的数量和信息两个参数，因此要在请求头中设置token，表明此次请求是谁发出的
*/ 
import { v4 as uuidv4 } from 'uuid';

export const getUUID = ()=>{
   //先从本地存储获取uuid
   let uuid_token = localStorage.getItem('UUIDTOKEN');
   //如果没有。if判断保证uuid只有一个
   if(!uuid_token){
       //生成游客临时身份
      uuid_token = uuidv4();
      //本地存储存储一次
      localStorage.setItem('UUIDTOKEN',uuid_token);
   }
   //切记有返回值,没有返回值undefined
   return uuid_token;
}