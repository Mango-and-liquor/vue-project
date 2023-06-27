import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:1336/api',
  timeout: 3000
})
instance.interceptors.request.use(
  (config) => {
    // 设置token  这是和一个月的token 至2023.7.19
    config.headers.Authorization = `Bearer 71180631e21ed544d497d51736a288b7ce58dafe5785b6a892247cc78bcad1838d02cda6258033f96a2753fe36954fe7354a33d15be6a52f461db8c4fa89311ccf750fe5cf0565e9c87ebd3d6b845f26c2cc0f2d909a1e67ac81a99cd13756fd127f2481b95c6b86e2c1d085a9aa933fffff0979982802fb4f52d22789b0608d`
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// res => res.data  取出data数据，将来调用接口的时候直接拿到的就是后台的数据
instance.interceptors.response.use((res) => res.data)

interface dataFormat {
  username: string
  email: string
  password?: string
}
// 请求工具函数
export default (url: string, method: string, submitData?: dataFormat) => {
  // 负责发请求：请求地址，请求方式，提交的数据
  return instance({
    url,
    method,
    // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
    // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
