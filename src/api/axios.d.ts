/*axios 的返回值类型是 AxiosResponse，即：
export interface AxiosResponse<T = any>  {
 data: T;
 status: number;
 statusText: string;
 headers: any;
 config: AxiosRequestConfig;
 request?: any;
}
因此在返回值result中只能调用data等属性，不能调用code等属性。所以要新建一个扩展接口，然后用 AxiosResponse 来继承扩展接口

*/ 
import axios from 'axios'

declare module 'axios' {
 interface IAxios<D = null> {
   code: number
   message: string
   token:any
   extra: D
 }
 export interface AxiosResponse<T = any> extends IAxios<D> {}
}
