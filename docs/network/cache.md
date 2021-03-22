# 缓存 

### 缓存协议 有强缓存用强，没强缓存，在询问协商缓存

##### 强缓存
- expires 1.0 和客户端的时间对比 绝对值  是否过期
- cache-control：  max-age 时间相对值
- public   服务端和客户端都缓存
- private  客户端缓存
- no-cache 用协商
- no-store 不用强缓存和协商

##### 协商缓存
- Last-Modified / If-Modified-Since 时间  是否更新
- If-None-Match 文件hash  是否更新