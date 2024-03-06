# eBookStore 线上电子书店
1. 使用 Kafka 消息中间件应对高密度请求，建立全双工的 Websocket 通信机制，使用 Transaction 增加对下订单服务的事务控制，使用 Redis缓存加速查找
2. 利用 eureka 构建 Springboot 微服务架构，并用 Gateway 进行请求转发
3. 将书籍图片信息转成 Base64字符存入Mongodb 数据库，使用 neo4j 数据库实现相邻标签书籍的关联搜索，增加 GraphQL 接口提高灵活性
4. 使用 Nginx 进行E-bookstore 集群的负载均衡，使用 Hadoop 的 MapReduce 和 Spark 集群统计关键词，并将整个项目前后端部署在 Docker 中
