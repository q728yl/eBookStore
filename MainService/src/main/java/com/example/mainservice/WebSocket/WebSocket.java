package com.example.mainservice.WebSocket;


import com.example.mainservice.model.KafkaOrderMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

//
@Component
@Slf4j
@ServerEndpoint("/websocket/{userId}")  // 接口路径 ws://localhost:8087/webSocket/userId;
public class WebSocket {

    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    private String userId;

    //concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。
    //虽然@Component默认是单例模式的，但springboot还是会为每个websocket连接初始化一个bean，所以可以用一个静态set保存起来。
    //  注：底下WebSocket是当前类名
    private static CopyOnWriteArraySet<WebSocket> webSockets =new CopyOnWriteArraySet<>();
    // 用来存在线连接用户信息
    private static ConcurrentHashMap<String,Session> sessionPool = new ConcurrentHashMap<String,Session>();

    /**
     * 链接成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session, @PathParam(value="userId")String userId) {
        try {
            this.session = session;
            this.userId = userId;
            webSockets.add(this);
            sessionPool.put(userId, session);
            System.out.println("【websocket消息】有新的连接，总数为:"+webSockets.size()+"，当前用户："+userId+"，session："+session);
        } catch (Exception e) {
        }
    }

    /**
     * 链接关闭调用的方法
     */
    @OnClose
    public void onClose() {
        try {
            webSockets.remove(this);
            sessionPool.remove(this.userId);
            System.out.println("【websocket消息】连接断开，总数为:"+webSockets.size());
        } catch (Exception e) {
        }
    }
    /** 发送错误时的处理
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {

        System.out.println("用户错误,原因:"+error.getMessage());
        error.printStackTrace();
    }



    // 此为单点消息
    public void sendOneMessage(String userId, KafkaOrderMessage kafkaOrderMessage) {
        System.out.println("userId:"+userId);
        Session session = sessionPool.get(userId);
        System.out.println("session:"+session);
        if (session != null&&session.isOpen()) {
            try {
                log.info("【websocket消息】 单点消息:"+kafkaOrderMessage);
                ObjectMapper objectMapper = new ObjectMapper(); // 使用Jackson库进行JSON序列化
                String jsonMessage = objectMapper.writeValueAsString(kafkaOrderMessage);
                session.getAsyncRemote().sendText(jsonMessage);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }



}
