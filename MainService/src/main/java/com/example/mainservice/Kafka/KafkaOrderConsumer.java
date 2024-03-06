package com.example.mainservice.Kafka;

import com.example.mainservice.Service.OrderService;
import com.example.mainservice.WebSocket.WebSocket;
import com.example.mainservice.model.KafkaOrderMessage;
import com.example.mainservice.model.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;


@Component
public class KafkaOrderConsumer {
    @Autowired
    private com.example.mainservice.Kafka.KafkaOrderProducer kafkaOrderProducer;
    @Autowired
    private OrderService orderService;
    @Resource
    private WebSocket webSocket;
//    @KafkaListener(topics = "order-topic", groupId = "my-consumer-group")
//    public void listen1(@Payload KafkaOrderMessage kafkaOrderMessage) throws JsonProcessingException {
//        System.out.println("Kafka收到订单请求: 用户" + kafkaOrderMessage.getUserId() + "的订单已生成");
//        Message message = orderService.placeOrder(Long.valueOf(kafkaOrderMessage.getUserId()));
//       // KafkaOrderMessage kafkaOrderMessage = new KafkaOrderMessage();
//        if(message.getOk()){
//
//            kafkaOrderMessage.setSuccess(true);
//            kafkaOrderMessage.setMessage("订单处理成功");
//            kafkaOrderProducer.sendOrderHandleMessage(kafkaOrderMessage);
//        }
//        else{
//            System.out.println("订单生成失败");
//
//            kafkaOrderMessage.setSuccess(false);
//            kafkaOrderMessage.setMessage("订单生成失败: " + message.getMsg());
//            kafkaOrderProducer.sendOrderHandleMessage(kafkaOrderMessage);
//        }


//    }
//
//    @KafkaListener(topics = "order-handle-topic", groupId = "my-consumer-group")
//    public void listen2(KafkaOrderMessage kafkaOrderMessage) {
//        System.out.println(kafkaOrderMessage.getUserId() + ": " + kafkaOrderMessage.getMessage());
//       //websocket发消息,对应前端
//        webSocket.sendOneMessage(kafkaOrderMessage.getUserId(), kafkaOrderMessage);
//    }
}
